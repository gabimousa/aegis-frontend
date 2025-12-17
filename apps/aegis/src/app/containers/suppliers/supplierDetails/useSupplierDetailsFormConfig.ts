import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SupplierDetailsModel } from '../model';

function useSupplierDetailsFormConfig() {
  const { t } = useTranslation();
  const { register, formState } = useFormContext<SupplierDetailsModel>();

  const codeFormConfig = register('code', {
    maxLength: { value: 50, message: t('suppliers.codeTooLong') },
    required: t('suppliers.codeIsRequired'),
  });
  const nameFormConfig = register('name', {
    maxLength: { value: 100, message: t('suppliers.nameTooLong') },
    required: t('suppliers.nameIsRequired'),
  });
  const websiteFormConfig = register('website', {
    maxLength: { value: 150, message: t('suppliers.websiteTooLong') },
    pattern: {
      value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/i,
      message: t('suppliers.pleaseProvideValidWebsite'),
    },
  });
  const emailFormConfig = register('email', {
    maxLength: { value: 250, message: t('suppliers.emailTooLong') },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: t('suppliers.pleaseProvideValidEmail'),
    },
  });
  const phoneNumberFormConfig = register('phoneNumber', {
    maxLength: { value: 25, message: t('suppliers.phoneNumberTooLong') },
    pattern: {
      value: /^\+?[0-9\s\-()]{7,25}$/,
      message: t('suppliers.pleaseProvideValidPhoneNumber'),
    },
  });
  const ibanFormConfig = register('iban', {
    maxLength: { value: 34, message: t('suppliers.ibanTooLong') },
    pattern: {
      value: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/,
      message: t('suppliers.pleaseProvideValidIban'),
    },
  });
  const bicFormConfig = register('bic', {
    maxLength: { value: 11, message: t('suppliers.bicTooLong') },
    pattern: {
      value: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
      message: t('suppliers.pleaseProvideValidBic'),
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

export default useSupplierDetailsFormConfig;
