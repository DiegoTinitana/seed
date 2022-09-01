import Joi from 'joi';
import { CommonSchema } from './commonSchema';
import { PersonSchema } from './personSchema';

export const ProviderSchema = PersonSchema.keys({
  company: Joi.string().required(),
  phones: Joi.array().items(CommonSchema).min(1).required(),
  addresses: Joi.array().items(CommonSchema).min(1).required(),
}).required()
  .label('User');

export const UpdateProviderSchema = PersonSchema.keys({
  company: Joi.string().required(),
  createdBy: Joi.string().guid().allow(null),
})
  .required()
  .label('User');
