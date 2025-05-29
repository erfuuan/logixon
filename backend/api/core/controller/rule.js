import responseBuilder from "../utils/responseBuilder.js"
import ruleValidator from "../validator/index.js"
import repository from "../repository/index.js"
import Joi from 'joi'
import Service from "../service/index.js"
export default {
    async create(req, res, next) {
        try {
            const result = ruleValidator.rule.ruleCreateUpdateSchema.validate(req.body)
            if (result.error) return responseBuilder.badRequest(res, null, result.error.details[0].message)
            const created = await repository.rule.create(req.body)
            console.log(created)
            await Service.redisHandler.put(`rule_engnie_${created.type}_${created.name.replaceAll(" ", "")}`, JSON.stringify(created))
            return responseBuilder.success(res, created, "Rule created successfully")

        } catch (err) {
            console.log(err)
            next(err)

        }
    },

    async getAll(req, res, next) {
        try {
            const allRules = await repository.rule.getAll()
            return responseBuilder.success(res, allRules, "Rules fetched successfully")

        } catch (err) {
            console.log(err)
            next(err)
        }
    },

    async getOne(req, res, next) {
        try {
            const result = ruleValidator.rule.ruleIdSchema.validate(req.params)
            if (result.error) return responseBuilder.badRequest(res, null, result.error.details[0].message)
            const rule = await repository.rule.getOne({ id: req.params.id })
            if (!rule) return responseBuilder.notFound(res, null, "Rule not found")

            return responseBuilder.success(res, rule, "Rule fetched successfully")

        } catch (err) {
            console.log(err)
            next(err)
        }
    },

    async update(req, res, next) {
        try {
            const idValidation = ruleValidator.rule.ruleIdSchema.validate(req.params)
            if (idValidation.error) return responseBuilder.badRequest(res, null, idValidation.error.details[0].message)

            const dataValidation = ruleValidator.rule.ruleCreateUpdateSchema.validate(req.body)
            if (dataValidation.error) return responseBuilder.badRequest(res, null, dataValidation.error.details[0].message)
            const checkExist = await repository.rule.getOne({ id: req.params.id })
            if (!checkExist) { return responseBuilder.notFound(res, null, "Rule not found to update") }
            const updated = await repository.rule.update(req.params.id, req.body)
            if (!updated) return responseBuilder.notFound(res, null, "Rule not found to update")
            await Service.redisHandler.del(`rule_engnie_${checkExist.type}_${checkExist.name.replaceAll(" ", "")}`)
            await Service.redisHandler.put(`rule_engnie_${checkExist.type}_${checkExist.name.replaceAll(" ", "")}`, JSON.stringify(updated.dataValues))
            return responseBuilder.success(res, updated, "Rule updated successfully")

        } catch (err) {
            console.log(err)
            next(err)
        }
    },

    async delete(req, res, next) {
        try {
            const result = ruleValidator.rule.ruleIdSchema.validate(req.params)
            if (result.error) return responseBuilder.badRequest(res, null, result.error.details[0].message)
            const checkExist = await repository.rule.getOne({ id: req.params.id })
            const deleted = await repository.rule.delete(req.params.id)
            if (!deleted) return responseBuilder.notFound(res, null, "Rule not found to delete")
            await Service.redisHandler.del(`rule_engnie_${checkExist.type}_${checkExist.name.replaceAll(" ", "")}`)

            return responseBuilder.success(res, null, "Rule deleted successfully")

        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}
