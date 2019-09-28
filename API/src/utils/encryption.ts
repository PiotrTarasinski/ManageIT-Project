import * as CryptoJS from 'crypto-js';
import { app, env } from '../config';

function hash(value: string): string {
  return CryptoJS.SHA256(value).toString();
}

const decryptValue: (value: string) => string = (value: string) => {
  try {
    const { salt } = app;
    const decrypted = CryptoJS.AES.decrypt(value, salt);
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return '';
  }
};

const encryptValue = (value: string | number) => {
  const { salt } = app;

  return CryptoJS.AES.encrypt(JSON.stringify(value), salt).toString();
};

export default {
  decryptValue,
  encryptValue,
  hash
};
