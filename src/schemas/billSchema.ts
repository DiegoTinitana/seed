import Joi from 'joi';

export const BillSchema = Joi.object().keys({
  dni: Joi.string().required(),
  date: Joi.date().iso().required(),
  createdBy: Joi.string().guid().required(),
  updatedBy: Joi.string().guid().required(),
  isActive: Joi.boolean().default(true),
  details: Joi.array().items(Joi.object({
    id: Joi.string().guid().required(),
    amount: Joi.number().required(),
    pvp: Joi.number().required()
  })).min(1).required()
})  .required()
.label('Bill');



