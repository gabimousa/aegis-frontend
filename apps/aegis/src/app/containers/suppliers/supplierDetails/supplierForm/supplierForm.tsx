import { FieldErrorsFeedback } from '@aegis/ui';
import { useTranslation } from 'react-i18next';
import { FloatingLabelInput } from '../../../../components';
import useSupplierDetailsFormConfig from '../useSupplierDetailsFormConfig';

export function SupplierForm() {
  const { t } = useTranslation();
  const {
    codeConfig,
    nameConfig,
    websiteConfig,
    emailConfig,
    phoneNumberConfig,
    ibanConfig,
    bicConfig,
    formState: { errors },
  } = useSupplierDetailsFormConfig();

  return (
    <>
      <FloatingLabelInput
        label={t('common.code')}
        type="text"
        placeholder={t('suppliers.enterSupplierCode')}
        className="mb-2"
        {...codeConfig.registerConfig}
        errors={errors}
        fieldName="code"
      />

      <FloatingLabelInput
        label={t('common.name')}
        type="text"
        placeholder={t('suppliers.enterSupplierName')}
        className="mb-2"
        {...nameConfig.registerConfig}
        errors={errors}
        fieldName="name"
      />

      <FloatingLabelInput
        label={t('common.website')}
        type="text"
        placeholder={t('suppliers.enterSupplierWebsite')}
        className="mb-2"
        {...websiteConfig.registerConfig}
        errors={errors}
        fieldName="website"
      />

      <FloatingLabelInput
        label={t('common.email')}
        type="email"
        placeholder={t('suppliers.enterSupplierEmail')}
        className="mb-2"
        {...emailConfig.registerConfig}
        errors={errors}
        fieldName="email"
      />

      <FloatingLabelInput
        label={t('common.phoneNumber')}
        type="tel"
        placeholder={t('suppliers.enterSupplierPhoneNumber')}
        className="mb-2"
        {...phoneNumberConfig.registerConfig}
        errors={errors}
        fieldName="phoneNumber"
      />

      <FloatingLabelInput
        label={t('common.iban')}
        type="text"
        placeholder={t('suppliers.enterSupplierIban')}
        className="mb-2"
        {...ibanConfig.registerConfig}
        errors={errors}
        fieldName="iban"
      />

      <FloatingLabelInput
        label={t('common.bic')}
        type="text"
        placeholder={t('suppliers.enterSupplierBic')}
        className="mb-2"
        {...bicConfig.registerConfig}
        errors={errors}
        fieldName="bic"
      />
    </>
  );
}
