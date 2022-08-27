import Joi from 'joi';
import { CommonSchema } from './commonSchema';

export const UserSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .required(),
  password: Joi.string().required(),
  dni: Joi.string().required(),
  createdBy: Joi.string().guid().required(),
  updatedBy: Joi.string().guid().required(),
  isActive: Joi.boolean().default(true),
  phones: Joi.array().items(CommonSchema).min(1).required(),
  addresses: Joi.array().items(CommonSchema).min(1).required(),
  roles: Joi.array().items(Joi.string().guid()).min(1).required(),
})
  .required()
  .label('User');

export const UpdateUserSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .required(),
  dni: Joi.string().required(),
  updatedBy: Joi.string().guid().required(),
  isActive: Joi.boolean().required(),
  roles: Joi.array().items(Joi.string().guid()).min(1).required(),
})
  .required()
  .label('User');
