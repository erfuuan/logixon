
import responseBuilder from "../utils/responseBuilder.js"
import ruleValidator from "../validator/index.js"
import repository from "../repository/index.js"
import { generateJWT } from '../utils/tokenGenerator.js'
import Joi from 'joi'
import md5 from 'md5'
export default {
    async login(req, res, next) {
        try {
            const result = ruleValidator.loginSchema.validate(req.body)
            if (result.error) { return responseBuilder.badRequest(res, result.value, result.error.details[0].message) }
            let { email, password } = await Joi.attempt(req.body, ruleValidator.loginSchema)
            const checkUserExsit = await repository.user.getOne({ email: email, password: md5(password) })
            if (!checkUserExsit) {
                return responseBuilder.unauthorized(res, null, "user or password is eshtebah")
            }
            const token = generateJWT(checkUserExsit)
            return responseBuilder.success(res, { token: token }, "success")

        } catch (err) {
            console.log(err)
            next(err)
        }

    }
}