const Joi = require("joi");

const earlyAccesSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  jobType: Joi.string().required(),
});

const contactSchema = Joi.object({
  name: Joi.string().required(),
  jobType: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required().min(1).max(300),
});

const requestFeature = Joi.object({
  name: Joi.string().required(),
  jobType: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required().min(1).max(300),
});

module.exports = {
  earlyAccesSignupSchema,
  contactSchema,
  requestFeature,
};
