import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components';
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
    <fieldset className="fieldset border-base-100 rounded-box w-full">
      <Input
        label={t('common.code')}
        type="text"
        placeholder={t('suppliers.enterSupplierCode')}
        className="mb-2"
        {...codeConfig.registerConfig}
        errors={errors}
        fieldName="code"
      />

      <Input
        label={t('common.name')}
        type="text"
        placeholder={t('suppliers.enterSupplierName')}
        className="mb-2"
        {...nameConfig.registerConfig}
        errors={errors}
        fieldName="name"
      />

      <Input
        label={t('common.website')}
        type="text"
        placeholder={t('suppliers.enterSupplierWebsite')}
        className="mb-2"
        {...websiteConfig.registerConfig}
        errors={errors}
        fieldName="website"
      />

      <Input
        label={t('common.email')}
        type="email"
        placeholder={t('suppliers.enterSupplierEmail')}
        className="mb-2"
        {...emailConfig.registerConfig}
        errors={errors}
        fieldName="email"
      />

      <Input
        label={t('common.phoneNumber')}
        type="tel"
        placeholder={t('suppliers.enterSupplierPhoneNumber')}
        className="mb-2"
        {...phoneNumberConfig.registerConfig}
        errors={errors}
        fieldName="phoneNumber"
      />

      <Input
        label={t('common.iban')}
        type="text"
        placeholder={t('suppliers.enterSupplierIban')}
        className="mb-2"
        {...ibanConfig.registerConfig}
        errors={errors}
        fieldName="iban"
      />

      <Input
        label={t('common.bic')}
        type="text"
        placeholder={t('suppliers.enterSupplierBic')}
        className="mb-2"
        {...bicConfig.registerConfig}
        errors={errors}
        fieldName="bic"
      />
    </fieldset>
  );
}
