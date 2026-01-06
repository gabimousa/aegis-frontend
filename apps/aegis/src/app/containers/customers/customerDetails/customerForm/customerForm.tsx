import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/forms';
import useCustomerDetailsFormConfig from '../useCustomerDetailsFormConfig';

export function CustomerForm() {
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
  } = useCustomerDetailsFormConfig();

  return (
    <fieldset className="fieldset border-base-100 rounded-box w-full">
      <Input
        label={t('common.code')}
        type="text"
        placeholder={t('customers.enterCustomerCode')}
        errors={errors}
        fieldName="code"
        {...codeConfig.registerConfig}
      />

      <Input
        label={t('common.name')}
        type="text"
        placeholder={t('customers.enterCustomerName')}
        errors={errors}
        fieldName="name"
        {...nameConfig.registerConfig}
      />

      <Input
        label={t('common.website')}
        type="text"
        placeholder={t('customers.enterCustomerWebsite')}
        errors={errors}
        fieldName="website"
        {...websiteConfig.registerConfig}
      />

      <Input
        label={t('common.email')}
        type="email"
        placeholder={t('customers.enterCustomerEmail')}
        errors={errors}
        fieldName="email"
        {...emailConfig.registerConfig}
      />

      <Input
        label={t('common.phoneNumber')}
        type="tel"
        placeholder={t('customers.enterCustomerPhoneNumber')}
        errors={errors}
        fieldName="phoneNumber"
        {...phoneNumberConfig.registerConfig}
      />

      <Input
        label={t('common.iban')}
        type="text"
        placeholder={t('customers.enterCustomerIban')}
        errors={errors}
        fieldName="iban"
        {...ibanConfig.registerConfig}
      />

      <Input
        label={t('common.bic')}
        type="text"
        placeholder={t('customers.enterCustomerBic')}
        errors={errors}
        fieldName="bic"
        {...bicConfig.registerConfig}
      />
    </fieldset>
  );
}
