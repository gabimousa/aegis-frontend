import { RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomerDetailsModel } from '../model';

function useCustomerDetailsFormConfig() {
  const { t } = useTranslation();

  const codeFormConfig: RegisterOptions<CustomerDetailsModel, 'code'> = {
    maxLength: { value: 50, message: t('customers.codeTooLong') },
    required: t('customers.codeIsRequired'),
  };
  const nameFormConfig: RegisterOptions<CustomerDetailsModel, 'name'> = {
    maxLength: { value: 100, message: t('customers.nameTooLong') },
    required: t('customers.nameIsRequired'),
  };
  const websiteFormConfig: RegisterOptions<CustomerDetailsModel, 'website'> = {
    maxLength: { value: 150, message: t('customers.websiteTooLong') },
    pattern: {
      value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/i,
      message: t('customers.pleaseProvideValidWebsite'),
    },
  };
  const emailFormConfig: RegisterOptions<CustomerDetailsModel, 'email'> = {
    maxLength: { value: 250, message: t('customers.emailTooLong') },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: t('customers.pleaseProvideValidEmail'),
    },
  };
  const phoneNumberFormConfig: RegisterOptions<CustomerDetailsModel, 'phoneNumber'> = {
    maxLength: { value: 25, message: t('customers.phoneNumberTooLong') },
    pattern: {
      value: /^\+?[0-9\s\-()]{7,25}$/,
      message: t('customers.pleaseProvideValidPhoneNumber'),
    },
  };
  const ibanFormConfig: RegisterOptions<CustomerDetailsModel, 'iban'> = {
    maxLength: { value: 34, message: t('customers.ibanTooLong') },
    pattern: {
      value: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/,
      message: t('customers.pleaseProvideValidIban'),
    },
  };
  const bicFormConfig: RegisterOptions<CustomerDetailsModel, 'bic'> = {
    maxLength: { value: 11, message: t('customers.bicTooLong') },
    pattern: {
      value: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
      message: t('customers.pleaseProvideValidBic'),
    },
  };

  const streetConfig: RegisterOptions<CustomerDetailsModel, `addresses.${number}.street`> = {
    maxLength: { value: 250, message: t('addresses.streetTooLong') },
  };
  const numberConfig: RegisterOptions<CustomerDetailsModel, `addresses.${number}.number`> = {
    maxLength: { value: 20, message: t('addresses.numberTooLong') },
  };
  const zipCodeConfig: RegisterOptions<CustomerDetailsModel, `addresses.${number}.zipCode`> = {
    maxLength: { value: 20, message: t('addresses.zipCodeTooLong') },
  };
  const cityConfig: RegisterOptions<CustomerDetailsModel, `addresses.${number}.city`> = {
    maxLength: { value: 100, message: t('addresses.cityTooLong') },
  };
  const stateConfig: RegisterOptions<CustomerDetailsModel, `addresses.${number}.state`> = {
    maxLength: { value: 100, message: t('addresses.stateTooLong') },
  };
  const countryCodeConfig: RegisterOptions<
    CustomerDetailsModel,
    `addresses.${number}.countryCode`
  > = {
    minLength: { value: 3, message: t('addresses.countryCodeTooShort') },
    maxLength: { value: 3, message: t('addresses.countryCodeTooLong') },
  };

  return {
    codeConfig: { registerConfig: codeFormConfig },
    nameConfig: { registerConfig: nameFormConfig },
    websiteConfig: { registerConfig: websiteFormConfig },
    emailConfig: { registerConfig: emailFormConfig },
    phoneNumberConfig: { registerConfig: phoneNumberFormConfig },
    ibanConfig: { registerConfig: ibanFormConfig },
    bicConfig: { registerConfig: bicFormConfig },
    addresses: {
      streetConfig: { registerConfig: streetConfig },
      numberConfig: { registerConfig: numberConfig },
      zipCodeConfig: { registerConfig: zipCodeConfig },
      cityConfig: { registerConfig: cityConfig },
      stateConfig: { registerConfig: stateConfig },
      countryCodeConfig: { registerConfig: countryCodeConfig },
    },
  };
}

export default useCustomerDetailsFormConfig;
