import { RegisterOptions } from 'react-hook-form';
import { Customer } from '../model/customer.model';

export const codeFormConfig: RegisterOptions<Customer, 'code'> = { required: 'Code is required' };
export const nameFormConfig: RegisterOptions<Customer, 'name'> = { required: 'Name is required' };
export const websiteFormConfig: RegisterOptions<Customer, 'website'> = {
  pattern: {
    value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/i,
    message: 'Please provide a valid website',
  },
};
export const emailFormConfig: RegisterOptions<Customer, 'email'> = {
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please provide a valid email',
  },
};
export const phoneNumberFormConfig: RegisterOptions<Customer, 'phoneNumber'> = {
  pattern: {
    value: /^\+?[0-9\s\-()]{7,25}$/,
    message: 'Please provide a valid phone number',
  },
};
export const ibanFormConfig: RegisterOptions<Customer, 'iban'> = {
  pattern: {
    value: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/,
    message: 'Please provide a valid IBAN',
  },
};
export const bicFormConfig: RegisterOptions<Customer, 'bic'> = {
  pattern: {
    value: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
    message: 'Please provide a valid BIC',
  },
};

const formConfig = {
  code: { config: codeFormConfig },
  name: { config: nameFormConfig },
  website: { config: websiteFormConfig },
  email: { config: emailFormConfig },
  phoneNumber: { config: phoneNumberFormConfig },
  iban: { config: ibanFormConfig },
  bic: { config: bicFormConfig },
};
export default formConfig;
