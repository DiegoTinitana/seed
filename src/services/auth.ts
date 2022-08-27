import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import { getUserByEmail } from './user';
import { CredentialI } from '../interfaces/user';
import InvoiceError from '../utils/invoiceError';
dotenv.config();

export const checkCredential = async (email: string, password: string): Promise<CredentialI> => {
  try {
    const user = await getUserByEmail(email);

    if (user === null) {
      throw new InvoiceError('oauth', 'Email or password are wrong');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new InvoiceError('oauth', 'Email or password are wrong');
    }

    const secret = process.env.JWT_KEY ?? '';

    return {
      token: jwt.sign({ id: user.id }, secret, { expiresIn: '1h' }),
      user: {
        name: user.name
      }
    };

  } catch (error) {
    throw new InvoiceError('auth', 'Email or password are wrong');
  }
};

export const decodeToken = async (token: string): Promise<string> => {
  try {
    const secret = process.env.JWT_KEY ?? '';
    const decode: any = jwt.verify(token, secret);
    return  decode.id;
  } catch (error) {
    throw new InvoiceError('oauth', 'invalid token');
  }
};
