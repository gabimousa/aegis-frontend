import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomerDetailsModel } from '../model';

function useCustomerDetailsFormConfig() {
  const { t } = useTranslation();
  const { register, formState } = useFormContext<CustomerDetailsModel>();

  const codeFormConfig = register('code', {
    maxLength: { value: 50, message: t('customers.codeTooLong') },
    required: t('customers.codeIsRequired'),
    pattern: { value: /^(?!\s*$).+/, message: t('customers.codeCannotBeEmpty') },
  });
  const nameFormConfig = register('name', {
    maxLength: { value: 100, message: t('customers.nameTooLong') },
    required: t('customers.nameIsRequired'),
    pattern: { value: /^(?!\s*$).+/, message: t('customers.nameCannotBeEmpty') },
  });
  const websiteFormConfig = register('website', {
    maxLength: { value: 150, message: t('customers.websiteTooLong') },
    pattern: {
      value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/i,
      message: t('customers.pleaseProvideValidWebsite'),
    },
  });
  const emailFormConfig = register('email', {
    maxLength: { value: 250, message: t('customers.emailTooLong') },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: t('customers.pleaseProvideValidEmail'),
    },
  });
  const phoneNumberFormConfig = register('phoneNumber', {
    maxLength: { value: 25, message: t('customers.phoneNumberTooLong') },
    pattern: {
      value: /^\+?[0-9\s\-()]{7,25}$/,
      message: t('customers.pleaseProvideValidPhoneNumber'),
    },
  });
  const ibanFormConfig = register('iban', {
    maxLength: { value: 34, message: t('customers.ibanTooLong') },
    pattern: {
      value: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/,
      message: t('customers.pleaseProvideValidIban'),
    },
  });
  const bicFormConfig = register('bic', {
    maxLength: { value: 11, message: t('customers.bicTooLong') },
    pattern: {
      value: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
      message: t('customers.pleaseProvideValidBic'),
    },
  });

  const streetConfig = (idx: number) =>
    register(`addresses.${idx}.street`, {
      maxLength: { value: 250, message: t('addresses.streetTooLong') },
    });
  const numberConfig = (idx: number) =>
    register(`addresses.${idx}.number`, {
      maxLength: { value: 20, message: t('addresses.numberTooLong') },
    });
  const zipCodeConfig = (idx: number) =>
    register(`addresses.${idx}.zipCode`, {
      maxLength: { value: 20, message: t('addresses.zipCodeTooLong') },
    });
  const cityConfig = (idx: number) =>
    register(`addresses.${idx}.city`, {
      maxLength: { value: 100, message: t('addresses.cityTooLong') },
    });
  const stateConfig = (idx: number) =>
    register(`addresses.${idx}.state`, {
      maxLength: { value: 100, message: t('addresses.stateTooLong') },
    });
  const countryCodeConfig = (idx: number) =>
    register(`addresses.${idx}.countryCode`, {
      minLength: { value: 3, message: t('addresses.countryCodeTooShort') },
      maxLength: { value: 3, message: t('addresses.countryCodeTooLong') },
    });

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
    formState,
  };
}

export default useCustomerDetailsFormConfig;
