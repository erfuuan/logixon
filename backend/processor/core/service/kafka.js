import { Kafka } from 'kafkajs'
import Service from './index.js'
import jsonLogic from 'json-logic-js';
import task from '../task/index.js'
import report from '../repository/report.js';
import rule from '../../../api/core/validator/rule.js';

async function startConsumer(topic, groupId) {
    const kafka = new Kafka({ brokers: ['localhost:9094', "localhost:9092"] });
    const consumer = kafka.consumer({ groupId: groupId });

    // newdb.public.transactions
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: false });

    console.log(`Kafka consumer subscribed to topic: ${topic}`);

    await consumer.run({
        eachMessage: async ({ message }) => {
            try {
                const event = JSON.parse(message.value.toString());
                const patternKey = `rule_engnie_${topic.split('.')[2]}*`
                const rules = await Service.redisHandler.getKeysByPattern(patternKey.replaceAll(" ", ""))
                if (rules.length) {
                    await Promise.all(rules.map(async (rules) => {
                        let ruleData = await Service.redisHandler.get(rules)
                        ruleData = JSON.parse(ruleData)
                        const jsonLogicRule = {
                            [ruleData.trigger_condition.operator]: [
                                { "var": ruleData.trigger_condition.operand1 },
                                ruleData.trigger_condition.operand2
                            ]
                        };

                        const result = jsonLogic.apply(jsonLogicRule, event.payload?.after);
                        if (result && ruleData.action) {
                            console.log({ result })
                            if (ruleData.action.email) {
                                await task.email()
                                await report.createReport({
                                    rule_id: ruleData.id,
                                    accountingdocuments_id: ruleData.type == "accountingdocuments" ? event.payload?.after.id : null,
                                    accountingentries_id: ruleData.type == "accountingentries" ? event.payload?.after.id : null,
                                    accounts_id: ruleData.type == "accounts" ? event.payload?.after.id : null,
                                    invoices_id: ruleData.type == "invoices" ? event.payload?.after.id : null,
                                    partners_id: ruleData.type == "partners" ? event.payload?.after.id : null,
                                    transactions_id: ruleData.type == "transactions" ? event.payload?.after.id : null,
                                })
                            }
                        }
                    }))
                }
            } catch (error) {
                console.log(`Error processing message: ${error.message}`);
                throw error
            }
        }
    });
}

export default { startConsumer };
