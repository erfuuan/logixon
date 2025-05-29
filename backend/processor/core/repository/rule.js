import Model from '../models/index.js';

export default {
    // async create(data) {
    //     try {
    //         return await Model.rule.create(data);
    //     } catch (err) {
    //         console.log('repo createRule error');
    //         throw err;
    //     }
    // },

    // async getOne(condition) {
    //     try {
    //         return await Model.rule.findOne({ where: condition, raw: true });
    //     } catch (err) {
    //         console.log('repo getOneRule error');
    //         throw err;
    //     }
    // },

    async getAll() {
        try {
            return await Model.rule.findAll({})
        } catch (err) {
            console.log('repo getAllRules error');
            throw err;
        }
    },

    // async update(id, data) {
    //     try {
    //         const rule = await Model.rule.findByPk(id);
    //         if (!rule) return null;
    //         return await rule.update(data);
    //     } catch (err) {
    //         console.log('repo updateRule error');
    //         throw err;
    //     }
    // },

    // async delete(id) {
    //     try {
    //         const rule = await Model.rule.findByPk(id);
    //         if (!rule) return null;
    //         await rule.destroy();
    //         return true;
    //     } catch (err) {
    //         console.log('repo deleteRule error');
    //         throw err;
    //     }
    // }
};
