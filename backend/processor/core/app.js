import Service from './service/index.js'
import { faker } from "@faker-js/faker";
import coldStartRulesToRedis from './utils/coldStart.js';
(async () => {
  try {
    await coldStartRulesToRedis()
    await Service.kafka.startConsumer("newdb.public.transactions", faker.string.uuid());
    await Service.kafka.startConsumer("newdb.public.partners", faker.string.uuid());
    await Service.kafka.startConsumer("newdb.public.invoices", faker.string.uuid());
    await Service.kafka.startConsumer("newdb.public.accounts", faker.string.uuid());
    await Service.kafka.startConsumer("newdb.public.accountingdocuments", faker.string.uuid());
    await Service.kafka.startConsumer("newdb.public.accountingentries", faker.string.uuid());

  } catch (err) {
    console.log(err)
    process.exit(1);
  }
})();


