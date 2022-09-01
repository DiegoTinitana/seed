import { CommonI } from '../interfaces/user';

export const addCreatedAndUpdatedByToSchema = (
  schemas: CommonI[],
  createdBy: string,
  updatedBy: string
) => {
  return schemas.map((schema: CommonI) => {
    const newAddress = {
      ...schema,
      createdBy: createdBy,
      updatedBy: updatedBy,
    };
    return newAddress;
  });
};
