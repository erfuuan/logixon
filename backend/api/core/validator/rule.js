import Joi from 'joi';

const triggerConditionSchema = Joi.object({
    operand1: Joi.string().valid('amount','balance','debit').required(),
    operator: Joi.string().valid('>', '<', '>=', '<=', '==', '!=').required(),
    operand2: Joi.number().required()
});

const action = Joi.object({
    email: Joi.boolean().required(),

});

const ruleCreateUpdateSchema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().allow(null, '').optional(),
    trigger_condition: triggerConditionSchema.required(),
    action: action,
    is_active: Joi.boolean().optional(),
    type: Joi.string()
        .valid(
            "transactions",
            "partners",
            "accountingdocuments",
            "accountingentries",
            "accounts",
            "invoices"
        )
        .required(),
});
const ruleIdSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});


export default {
    ruleCreateUpdateSchema,
    ruleIdSchema
}