import { RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SupplierDetailsModel } from '../model/supplierDetails.model';

function useSupplierDetailsFormConfig() {
  const { t } = useTranslation();

  const codeFormConfig: RegisterOptions<SupplierDetailsModel, 'code'> = {
    maxLength: { value: 50, message: t('suppliers.codeTooLong') },
    required: t('suppliers.codeIsRequired'),
  };
  const nameFormConfig: RegisterOptions<SupplierDetailsModel, 'name'> = {
    maxLength: { value: 100, message: t('suppliers.nameTooLong') },
    required: t('suppliers.nameIsRequired'),
  };
  const websiteFormConfig: RegisterOptions<SupplierDetailsModel, 'website'> = {
    maxLength: { value: 150, message: t('suppliers.websiteTooLong') },
    pattern: {
      value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/i,
      message: t('suppliers.pleaseProvideValidWebsite'),
    },
  };
  const emailFormConfig: RegisterOptions<SupplierDetailsModel, 'email'> = {
    maxLength: { value: 250, message: t('suppliers.emailTooLong') },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: t('suppliers.pleaseProvideValidEmail'),
    },
  };
  const phoneNumberFormConfig: RegisterOptions<SupplierDetailsModel, 'phoneNumber'> = {
    maxLength: { value: 25, message: t('suppliers.phoneNumberTooLong') },
    pattern: {
      value: /^\+?[0-9\s\-()]{7,25}$/,
      message: t('suppliers.pleaseProvideValidPhoneNumber'),
    },
  };
  const ibanFormConfig: RegisterOptions<SupplierDetailsModel, 'iban'> = {
    maxLength: { value: 34, message: t('suppliers.ibanTooLong') },
    pattern: {
      value: /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/,
      message: t('suppliers.pleaseProvideValidIban'),
    },
  };
  const bicFormConfig: RegisterOptions<SupplierDetailsModel, 'bic'> = {
    maxLength: { value: 11, message: t('suppliers.bicTooLong') },
    pattern: {
      value: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
      message: t('suppliers.pleaseProvideValidBic'),
    },
  };

  const streetConfig: RegisterOptions<SupplierDetailsModel, `addresses.${number}.street`> = {
    maxLength: { value: 250, message: t('addresses.streetTooLong') },
  };
  const numberConfig: RegisterOptions<SupplierDetailsModel, `addresses.${number}.number`> = {
    maxLength: { value: 20, message: t('addresses.numberTooLong') },
  };
  const zipCodeConfig: RegisterOptions<SupplierDetailsModel, `addresses.${number}.zipCode`> = {
    maxLength: { value: 20, message: t('addresses.zipCodeTooLong') },
  };
  const cityConfig: RegisterOptions<SupplierDetailsModel, `addresses.${number}.city`> = {
    maxLength: { value: 100, message: t('addresses.cityTooLong') },
  };
  const stateConfig: RegisterOptions<SupplierDetailsModel, `addresses.${number}.state`> = {
    maxLength: { value: 100, message: t('addresses.stateTooLong') },
  };
  const countryCodeConfig: RegisterOptions<
    SupplierDetailsModel,
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

export default useSupplierDetailsFormConfig;
