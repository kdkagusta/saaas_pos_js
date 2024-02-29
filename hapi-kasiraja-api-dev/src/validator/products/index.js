const { PostProductPayloadSchema, PutProductPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ProductsValidator = {
  validatePostProductPayload: (payload) => {
    const validationResult = PostProductPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutProductPayload: (payload) => {
    const validationResult = PutProductPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ProductsValidator;
