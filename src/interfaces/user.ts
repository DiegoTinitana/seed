import { CommonEnum } from './common';

export interface NewUserI {
  id?: string
  name: string
  lastName: string
  email: string
  password: string
  dni: string
  createdBy: string
  isActive: boolean
  phones: CommonI []
  addresses: CommonI []
  roles: string []
  createdAt?: Date
  updatedAt?: Date
}

export type UserI = Omit<NewUserI, 'password'>


export interface CommonI {
  id?: string
  type: CommonEnum
  value: string
  description?: string
}

export interface CredentialI {
  token: string,
  user: {
    name: string
  }
}

export interface UserDataI {
  id: string,
  roles: string []
}

