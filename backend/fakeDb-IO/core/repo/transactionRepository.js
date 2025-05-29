import Transaction from "../models/transactions.js";

const TransactionRepository = {
  async create(data) {
    return await Transaction.create(data);
  },

  async findById(id) {
    return await Transaction.findByPk(id);
  },

  async findAll() {
    return await Transaction.findAll();
  },

  async update(id, data) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new Error("Transaction not found");
    return await transaction.update(data);
  },

  async delete(id) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) throw new Error("Transaction not found");
    await transaction.destroy();
    return true;
  },
};

export default TransactionRepository;
