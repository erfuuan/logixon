import AccountingDocument from "../models/accountingdocuments.js";

const AccountingDocumentRepository = {
    async create(data) {
        return await AccountingDocument.create(data);
    },

    async findById(id) {
        return await AccountingDocument.findByPk(id);
    },

    async findAll() {
        return await AccountingDocument.findAll();
    },

    async update(id, data) {
        const doc = await AccountingDocument.findByPk(id);
        if (!doc) throw new Error("AccountingDocument not found");
        return await doc.update(data);
    },

    async delete(id) {
        const doc = await AccountingDocument.findByPk(id);
        if (!doc) throw new Error("AccountingDocument not found");
        await doc.destroy();
        return true;
    },
};

export default AccountingDocumentRepository;
