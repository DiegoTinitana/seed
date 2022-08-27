export default class InvoiceError extends Error {
  type: string;
  message: string;
  constructor (type: string, message = 'Internal Server Error', error?: any,) {
    super(error);
    this.type = type;
    this.message = (error) ? error.message : message;
  }
}
