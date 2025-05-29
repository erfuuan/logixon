import { faker } from "@faker-js/faker";
import AccountingDocument from "../models/accountingdocuments.js";
import AccountingEntry from "../models/accountingentries.js";
import Account from "../models/accounts.js";
import Invoice from "../models/invoices.js";
import Partner from "../models/partners.js";
import Transaction from "../models/transactions.js";

function getRandomDelay(maxSeconds = 10) {
    return Math.floor(Math.random() * maxSeconds * 1000);
}

async function getRandomExistingId(model) {
    const record = await model.findOne({ order: [['id', 'ASC']] });
    if (!record) return null;
    return record.id;
}


async function updateRandomAccountingDocument() {
    const id = await getRandomExistingId(AccountingDocument);
    if (!id) return console.log("No AccountingDocument found to update.");
    const doc = await AccountingDocument.findByPk(id);
    if (!doc) return;
    await doc.update({
        docnumber: faker.string.uuid().slice(0, 20),
        description: faker.lorem.sentence(),
        createdat: faker.date.recent(),
    });
    console.log(`Updated accountingdocument id=${id}`);
}

async function updateRandomAccountingEntry() {
    const id = await getRandomExistingId(AccountingEntry);
    if (!id) return console.log("No AccountingEntry found to update.");
    const entry = await AccountingEntry.findByPk(id);
    if (!entry) return;
    await entry.update({
        documentid: faker.number.int({ min: 1000, max: 9999 }),
        accountid: faker.number.int({ min: 1, max: 100 }),
        debit: faker.finance.amount(100, 1000000) * 100,
        credit: faker.finance.amount(100, 1000000) * 100,
        description: faker.lorem.sentence(),
    });
    console.log(`Updated accountingentry id=${id}`);
}

async function updateRandomAccount() {
    const id = await getRandomExistingId(Account);
    if (!id) return console.log("No Account found to update.");
    const acc = await Account.findByPk(id);
    if (!acc) return;
    await acc.update({
        name: faker.company.name().slice(0, 100),
        bankname: faker.company.buzzVerb(),
        accountnumber: faker.finance.accountNumber(5),
        isblacklisted: faker.datatype.boolean() ? '1' : '0',
    });
    console.log(`Updated account id=${id}`);
}

async function updateRandomInvoice() {
    const id = await getRandomExistingId(Invoice);
    if (!id) return console.log("No Invoice found to update.");
    const inv = await Invoice.findByPk(id);
    if (!inv) return;
    await inv.update({
        partnerid: faker.number.int({ min: 1, max: 100 }),
        amount: faker.finance.amount(100, 1000000) * 100,
        status: faker.helpers.arrayElement(["pending", "paid", "canceled"]),
        createdat: faker.date.recent(),
    });
    console.log(`Updated invoice id=${id}`);
}

async function updateRandomPartner() {
    const id = await getRandomExistingId(Partner);
    if (!id) return console.log("No Partner found to update.");
    const partner = await Partner.findByPk(id);
    if (!partner) return;
    await partner.update({
        name: faker.person.fullName(),
        phone: faker.phone.number('09#########').slice(0, 20),
        email: faker.internet.email().slice(0, 100),
        balance: faker.finance.amount(100, 1000000) * 100,
        createdat: faker.date.recent(),
    });
    console.log(`Updated partner id=${id}`);
}

async function updateRandomTransaction() {
    const id = await getRandomExistingId(Transaction);
    if (!id) return console.log("No Transaction found to update.");
    const trans = await Transaction.findByPk(id);
    if (!trans) return;
    await trans.update({
        type: faker.helpers.arrayElement(["debit", "credit"]),
        amount: faker.finance.amount(100, 1000000) * 100,
        accountid: faker.number.int({ min: 1, max: 100 }),
        partnerid: faker.number.int({ min: 1, max: 100 }),
        description: faker.lorem.sentence(),
        createdat: faker.date.recent(),
    });
    console.log(`Updated transaction id=${id}`);
}

function scheduleUpdate(func) {
    async function loop() {
        try {
            await func();
        } catch (e) {
            console.error("Update error:", e);
        }
        setTimeout(loop, getRandomDelay(10));
    }
    loop();
}

async function main() {
    scheduleUpdate(updateRandomAccountingDocument);
    scheduleUpdate(updateRandomAccountingEntry);
    scheduleUpdate(updateRandomAccount);
    scheduleUpdate(updateRandomInvoice);
    scheduleUpdate(updateRandomPartner);
    scheduleUpdate(updateRandomTransaction);
}

export default main
