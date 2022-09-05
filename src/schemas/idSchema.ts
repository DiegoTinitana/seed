import Joi from 'joi';

export const IdSchema = Joi.object({
  id: Joi.string().guid().required(),
}).required().label('Id is requerid');

export const CodeSchema = Joi.object({
  code: Joi.string().required(),
}).required().label('Id is requerid');


