const Joi = require('joi');

const ClinicSearchRequestSchema = Joi.object()
  .keys({
    clinicName: Joi.string().optional(),
    state: Joi.string().optional(),
    from: Joi.string().optional(),
    to: Joi.string().optional(),
  })
  .or('clinicName', 'state', 'from', 'to') // At least one of these keys must be in the object to be valid.
  .and('from', 'to') // Both of these keys must be in the object to be valid.
  .required();

module.exports = {
  ClinicSearchRequestSchema,
};
