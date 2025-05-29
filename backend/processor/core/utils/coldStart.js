import Redis from '../service/redis.js';
import rule from '../repository/rule.js';
import chalk from 'chalk';

async function coldStartRulesToRedis() {
    try {
        console.log(chalk.blue('⏳ Cold starting: Fetching rules from DB...'));
        
        const rules = await rule.getAll({})

        for (const rule of rules) {
            const key = `rule:${rule.id}`;
            const value = JSON.stringify(rule); // serialize rule
            await Redis.put(key, value); // optionally add timeout
        }

        console.log(chalk.green(`✅ Successfully cached ${rules.length} rules to Redis.`));
    } catch (err) {
        console.log(chalk.red('🔥 Error during cold start:'), err);
        throw err;
    }
}

export default coldStartRulesToRedis;
