import responseBuilder from "../utils/responseBuilder.js"
import ruleValidator from "../validator/index.js"
import repository from "../repository/index.js"
import Joi from 'joi'
import Service from "../service/index.js"
export default {

    async getAll(req, res, next) {
        try {
            const allRules = await repository.report.getAll({})
            return responseBuilder.success(res, allRules, "fetched successfully")

        } catch (err) {
            console.log(err)
            next(err)
        }
    },

    async getOne(req, res, next) {
        try {
            const result = ruleValidator.rule.ruleIdSchema.validate(req.params)
            if (result.error) return responseBuilder.badRequest(res, null, result.error.details[0].message)
            const rule = await repository.report.getOne({ id: req.params.id })
            if (!rule) return responseBuilder.notFound(res, null, "Rule not found")

            return responseBuilder.success(res, rule, "Rule fetched successfully")

        } catch (err) {
            console.log(err)
            next(err)
        }
    },


}
