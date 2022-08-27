import Joi from 'joi';

export const CredentialsSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})
  .required()
  .label('Credentials');

