import Joi from 'joi';
import { CommonSchema } from './commonSchema';
import { PersonSchema } from './personSchema';

export const UserSchema = PersonSchema.keys({
  password: Joi.string().required(),
  phones: Joi.array().items(CommonSchema).min(1).required(),
  addresses: Joi.array().items(CommonSchema).min(1).required(),
  roles: Joi.array().items(Joi.string().guid()).min(1).required(),
}).required()
  .label('User');

export const UpdateUserSchema = PersonSchema.keys({
  createdBy: Joi.string().guid().allow(null),
  roles: Joi.array().items(Joi.string().guid()).min(1).required(),
})
  .required()
  .label('User');
