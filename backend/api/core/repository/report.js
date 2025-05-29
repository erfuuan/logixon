import Model from "../models/index.js"

export default {
    async getOne(condition) {
        try {
            return await Model.Report.findOne({ where: condition, raw: true });
        } catch (err) {
            console.log("repo err")
            throw err
        }
    },

    async getAll(condition) {
        try {
            return await Model.Report.findOne({ where: condition, raw: true });
        } catch (err) {
            console.log("repo err")
            throw err
        }
    }

};
