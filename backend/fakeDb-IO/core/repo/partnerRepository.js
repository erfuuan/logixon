import Partner from "../models/partners.js";

const PartnerRepository = {
  async create(data) {
    return await Partner.create(data);
  },

  async findById(id) {
    return await Partner.findByPk(id);
  },

  async findAll() {
    return await Partner.findAll();
  },

  async update(id, data) {
    const partner = await Partner.findByPk(id);
    if (!partner) throw new Error("Partner not found");
    return await partner.update(data);
  },

  async delete(id) {
    const partner = await Partner.findByPk(id);
    if (!partner) throw new Error("Partner not found");
    await partner.destroy();
    return true;
  },
};

export default PartnerRepository;
