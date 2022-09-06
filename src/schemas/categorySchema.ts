import Joi, { array, string } from 'joi';

export const CategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null).allow(''),
  items: Joi.array().items(Joi.string().guid()),
  createdBy: Joi.string().guid().required(),
  updatedBy: Joi.string().guid().required(),
})
  .required()
  .label('Category');

export const UpdateCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null).allow(''),
  items: Joi.array().items(Joi.string().guid()),
  updatedBy: Joi.string().guid().required(),
})
  .required()
  .label('Category');

  export const SetCategorySchema = Joi.object({
    items: Joi.array().items(Joi.string().guid()).min(1).required(),
    createdBy: Joi.string().guid().allow(null),
    updatedBy: Joi.string().guid().allow(null),
  })
    .required()
    .label('Category');