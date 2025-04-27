import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{9,10}$/)
    .messages({ "string.pattern.base": `Phone number must have 9-10 digits.` })
    .required(),
  owner: Joi.number().integer().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
  phone: Joi.string()
    .regex(/^[0-9]{9,10}$/)
    .messages({ "string.pattern.base": `Phone number must have 9-10 digits.` }),
});

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
