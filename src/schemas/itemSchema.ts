import Joi from 'joi';

const pvpsSchema = Joi.object().keys({
  id: Joi.number().required(),
  value: Joi.number().required(),
  percent: Joi.number().required(),
});


export const ItemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null),
  code: Joi.string().allow(null),
  barCode: Joi.string().allow(null),
  hasIva: Joi.boolean().default(false),
  purchasePrice: Joi.number().default(0),
  stock: Joi.number().default(0),
  isActive: Joi.boolean().default(true),
  photo: Joi.string().allow(null),
  pvps: Joi.array()
    .items(pvpsSchema)
    .min(1)
    .required(),
  createdBy: Joi.string().guid().allow(null),
  updatedBy: Joi.string().guid().allow(null),
})
  .required()
  .label('Item');

export const UpdateItemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null),
  code: Joi.string().allow(null),
  barCode: Joi.string().allow(null),
  hasIva: Joi.boolean().default(false),
  purchasePrice: Joi.number().default(0),
  isActive: Joi.boolean(),
  photo: Joi.string().allow(null),
  createdBy: Joi.string().guid().allow(null),
  updatedBy: Joi.string().guid().allow(null),
})
  .required()
  .label('Item');

export const UpdateItemStockSchema = Joi.object({
  stock: Joi.number().required(),
})
  .required()
  .label('Item');

export const UpdateItemPricesSchema = Joi.object({
  pvps: Joi.array()
    .items(pvpsSchema)
    .min(1)
    .required(),
})
  .required()
  .label('Item');

  export const SetItemToCategoriesSchema = Joi.object({
    categories: Joi.array().items(Joi.string().guid()).min(1).required(),
    createdBy: Joi.string().guid().allow(null),
    updatedBy: Joi.string().guid().allow(null),
  })
    .required()
    .label('Category');