import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.name().required(),
  email: Joi.email().required(),
  phone: Joi.phone().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.name(),
  email: Joi.email(),
  phone: Joi.phone(),
});
