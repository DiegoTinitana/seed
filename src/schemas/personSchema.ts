import Joi from 'joi';

export const PersonSchema = Joi.object().keys({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .required(),
  dni: Joi.string().required(),
  createdBy: Joi.string().guid().required(),
  updatedBy: Joi.string().guid().required(),
  isActive: Joi.boolean().default(true),
});

