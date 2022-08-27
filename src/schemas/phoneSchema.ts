import Joi from 'joi';
import { CommonSchema, userId } from './commonSchema';

export const PhoneSchema = Joi.array()
.items(
  CommonSchema,
  userId
)
.min(1)
.required()
.label('Phone');
