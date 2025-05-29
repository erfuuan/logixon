import AccountingEntry from "../models/accountingentries.js";

const AccountingEntryRepository = {
  async create(data) {
    return await AccountingEntry.create(data);
  },

  async findById(id) {
    return await AccountingEntry.findByPk(id);
  },

  async findAll() {
    return await AccountingEntry.findAll();
  },

  async update(id, data) {
    const entry = await AccountingEntry.findByPk(id);
    if (!entry) throw new Error("AccountingEntry not found");
    return await entry.update(data);
  },

  async delete(id) {
    const entry = await AccountingEntry.findByPk(id);
    if (!entry) throw new Error("AccountingEntry not found");
    await entry.destroy();
    return true;
  },
};

export default AccountingEntryRepository;
