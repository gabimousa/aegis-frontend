import { useTranslation } from 'react-i18next';
import { FloatingLabelInput } from '../../../../components/forms';
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
    <div className="space-y-4">
      <FloatingLabelInput
        label={t('common.code')}
        type="text"
        placeholder={t('customers.enterCustomerCode')}
        errors={errors}
        fieldName="code"
        {...codeConfig.registerConfig}
      />

      <FloatingLabelInput
        label={t('common.name')}
        type="text"
        placeholder={t('customers.enterCustomerName')}
        errors={errors}
        fieldName="name"
        {...nameConfig.registerConfig}
      />

      <FloatingLabelInput
        label={t('common.website')}
        type="text"
        placeholder={t('customers.enterCustomerWebsite')}
        errors={errors}
        fieldName="website"
        {...websiteConfig.registerConfig}
      />

      <FloatingLabelInput
        label={t('common.email')}
        type="email"
        placeholder={t('customers.enterCustomerEmail')}
        errors={errors}
        fieldName="email"
        {...emailConfig.registerConfig}
      />

      <FloatingLabelInput
        label={t('common.phoneNumber')}
        type="tel"
        placeholder={t('customers.enterCustomerPhoneNumber')}
        errors={errors}
        fieldName="phoneNumber"
        {...phoneNumberConfig.registerConfig}
      />

      <FloatingLabelInput
        label={t('common.iban')}
        type="text"
        placeholder={t('customers.enterCustomerIban')}
        errors={errors}
        fieldName="iban"
        {...ibanConfig.registerConfig}
      />

      <FloatingLabelInput
        label={t('common.bic')}
        type="text"
        placeholder={t('customers.enterCustomerBic')}
        errors={errors}
        fieldName="bic"
        {...bicConfig.registerConfig}
      />
    </div>
  );
}
