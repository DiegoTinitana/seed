import Joi from 'joi';
import { PersonSchema } from './personSchema';

export const ClientSchema = PersonSchema.keys({
  phone: Joi.string().required(),
  address: Joi.string().required(),
  createdBy: Joi.string().guid().allow(null),
})
  .required()
  .label('Client');
