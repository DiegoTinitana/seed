export interface AbstractMethds<T> {
  create(): T;
  read(id: string): T;
  readMany(): [T];
  update(id: string): T;
  delete(id: string): string;
}

export interface InvoiceFactory<T> {
  user(): AbstractMethds<T>;
}