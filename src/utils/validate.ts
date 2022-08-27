import InvoiceError from './invoiceError';

export const validator = async (schame: any, data: any) => {
  try {
    await schame.validateAsync(data);
  } catch (err) {
    throw new InvoiceError('validate', '', err);
  }
};
