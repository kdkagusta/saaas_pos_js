const Joi = require('joi');

const PostCustomerPayloadSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().allow(''),
  address: Joi.string().allow(''),
  description: Joi.string().allow(''),
});

module.exports = PostCustomerPayloadSchema;
