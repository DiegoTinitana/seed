import { CommonEnum } from './common';
import { CommonI } from './user';

export interface NewProviderI {
  id?: string
  name?: string
  lastName?: string
  email?: string
  company: string
  dni: string
  createdBy: string
  isActive: boolean
  phones: CommonI []
  addresses: CommonI []
  createdAt?: Date
  updatedAt?: Date
}