import Joi from 'joi';
import { CommonSchema } from './commonSchema';

export const PhoneSchema = Joi.object({
  userId: Joi.string().guid().required(),
  phones: Joi.array().items(CommonSchema).min(1).required(),
  createdBy: Joi.string().guid().required(),
  updatedBy: Joi.string().guid().required(),
})
  .required()
  .label('Phone');

  export const UpdatePhoneSchema = CommonSchema.keys({
    updatedBy: Joi.string().guid().required(),
  })
    .required()
    .label('Phone');
