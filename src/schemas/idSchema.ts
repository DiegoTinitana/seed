import Joi from 'joi';

export const IdSchema = Joi.object({
  id: Joi.string().guid().required(),
}).required().label('Id is requerid');

