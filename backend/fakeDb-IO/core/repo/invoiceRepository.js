import Invoice from "../models/invoices.js";

const InvoiceRepository = {
  async create(data) {
    return await Invoice.create(data);
  },

  async findById(id) {
    return await Invoice.findByPk(id);
  },

  async findAll() {
    return await Invoice.findAll();
  },

  async update(id, data) {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) throw new Error("Invoice not found");
    return await invoice.update(data);
  },

  async delete(id) {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) throw new Error("Invoice not found");
    await invoice.destroy();
    return true;
  },
};

export default InvoiceRepository;
