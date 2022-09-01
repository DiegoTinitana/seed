import Joi from 'joi';

export const CommonSchema = Joi.object().keys({
  type: Joi.string().required(),
  value: Joi.string().required(),
  description: Joi.string().allow(null),
});