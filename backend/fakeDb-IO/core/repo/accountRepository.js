import Account from "../models/accounts.js";

const AccountRepository = {
  async create(data) {
    return await Account.create(data);
  },

  async findById(id) {
    return await Account.findByPk(id);
  },

  async findAll() {
    return await Account.findAll();
  },

  async update(id, data) {
    const account = await Account.findByPk(id);
    if (!account) throw new Error("Account not found");
    return await account.update(data);
  },

  async delete(id) {
    const account = await Account.findByPk(id);
    if (!account) throw new Error("Account not found");
    await account.destroy();
    return true;
  },
};

export default AccountRepository;
