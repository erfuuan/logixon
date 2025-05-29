import { faker } from "@faker-js/faker";
import sequelize from "../connection/db.js";
import AccountingDocument from "../models/accountingdocuments.js";
import AccountingEntry from "../models/accountingentries.js";
import Account from "../models/accounts.js";
import Invoice from "../models/invoices.js";
import Partner from "../models/partners.js";
import Transaction from "../models/transactions.js";

function getRandomDelay(maxSeconds = 10) {
    return Math.floor(Math.random() * maxSeconds * 1000);
}

async function insertRandomAccountingDocument() {
    await AccountingDocument.create({
        id: faker.number.int({ min: 1000, max: 9999 }),
        docnumber: faker.string.uuid().slice(0, 20),
        description: faker.lorem.sentence(),
        createdat: faker.date.recent(),
    });
    console.log("Inserted accountingdocument");
}

async function insertRandomAccountingEntry() {
    await AccountingEntry.create({
        id: faker.number.int({ min: 1000, max: 9999 }),
        documentid: faker.number.int({ min: 1000, max: 9999 }),
        accountid: faker.number.int({ min: 1, max: 100 }),
        debit: faker.finance.amount(100, 1000000) * 100,
        credit: faker.finance.amount(100, 1000000) * 100,
        description: faker.lorem.sentence(),
    });
    console.log("Inserted accountingentry");
}

async function insertRandomAccount() {
    await Account.create({
        id: faker.number.int({ min: 1000, max: 9999 }),
        name: faker.company.name().slice(0, 100),
        bankname: faker.company.buzzVerb(),
        accountnumber: faker.finance.accountNumber(5),
        isblacklisted: faker.datatype.boolean() ? '1' : '0',
    });
    console.log("Inserted account");
}

async function insertRandomInvoice() {
    await Invoice.create({
        id: faker.number.int({ min: 1000, max: 9999 }),
        partnerid: faker.number.int({ min: 1, max: 100 }),
        amount:faker.finance.amount(100, 1000000) * 100,
        status: faker.helpers.arrayElement(["pending", "paid", "canceled"]),
        createdat: faker.date.recent(),
    });
    console.log("Inserted invoice");
}

async function insertRandomPartner() {
    await Partner.create({
        id: faker.number.int({ min: 1000, max: 9999 }),
        name: faker.person.fullName(),
        phone: faker.phone.number('09#########').slice(0, 20),
        email: faker.internet.email().slice(0, 100),
        balance: faker.finance.amount(100, 1000000) * 100,
        createdat: faker.date.recent(),
    });
    console.log("Inserted partner");
}



async function insertRandomTransaction() {
    await Transaction.create({
        id: faker.number.int({ min: 1000, max: 9999 }),
        type: faker.helpers.arrayElement(["debit", "credit"]),
        amount: faker.finance.amount(100, 1000000) * 100,
        accountid: faker.number.int({ min: 1, max: 100 }),
        partnerid: faker.number.int({ min: 1, max: 100 }),
        description: faker.lorem.sentence(),
        createdat: faker.date.recent(),
    });
    console.log("Inserted transaction");
}


function scheduleInsert(func) {
    async function loop() {
        try {
            await func();
        } catch (e) {
            console.error("Insert error:", e);
        }
        setTimeout(loop, getRandomDelay(10));
    }
    loop();
}

async function main() {
    await sequelize.sync();

    scheduleInsert(insertRandomAccountingDocument);
    scheduleInsert(insertRandomAccountingEntry);
    scheduleInsert(insertRandomAccount);
    scheduleInsert(insertRandomInvoice);
    scheduleInsert(insertRandomPartner);
    scheduleInsert(insertRandomTransaction);
}

export default main