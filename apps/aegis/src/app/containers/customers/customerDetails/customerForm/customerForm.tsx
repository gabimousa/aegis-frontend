import { FieldErrorsFeedback } from '@aegis/ui';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
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
    <>
      <Form.Group className="mb-2" controlId="customerCode">
        <FloatingLabel controlId="customerCode" label={t('common.code')}>
          <Form.Control
            type="text"
            placeholder={t('customers.enterCustomerCode')}
            {...codeConfig.registerConfig}
            isInvalid={!!errors.code}
          />
          <FieldErrorsFeedback errors={errors} fieldName="code" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="customerName">
        <FloatingLabel controlId="customerName" label={t('common.name')}>
          <Form.Control
            type="text"
            placeholder={t('customers.enterCustomerName')}
            {...nameConfig.registerConfig}
            isInvalid={!!errors.name}
          />
          <FieldErrorsFeedback errors={errors} fieldName="name" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="customerWebsite">
        <FloatingLabel controlId="customerWebsite" label={t('common.website')}>
          <Form.Control
            type="text"
            placeholder={t('customers.enterCustomerWebsite')}
            {...websiteConfig.registerConfig}
            isInvalid={!!errors.website}
          />
          <FieldErrorsFeedback errors={errors} fieldName="website" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="customerEmail">
        <FloatingLabel controlId="customerEmail" label={t('common.email')}>
          <Form.Control
            type="email"
            placeholder={t('customers.enterCustomerEmail')}
            {...emailConfig.registerConfig}
            isInvalid={!!errors.email}
          />
          <FieldErrorsFeedback errors={errors} fieldName="email" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="customerPhoneNumber">
        <FloatingLabel controlId="customerPhoneNumber" label={t('common.phoneNumber')}>
          <Form.Control
            type="tel"
            placeholder={t('customers.enterCustomerPhoneNumber')}
            {...phoneNumberConfig.registerConfig}
            isInvalid={!!errors.phoneNumber}
          />
          <FieldErrorsFeedback errors={errors} fieldName="phoneNumber" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="customerIban">
        <FloatingLabel controlId="customerIban" label={t('common.iban')}>
          <Form.Control
            type="text"
            placeholder={t('customers.enterCustomerIban')}
            {...ibanConfig.registerConfig}
            isInvalid={!!errors.iban}
          />
          <FieldErrorsFeedback errors={errors} fieldName="iban" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="customerBic">
        <FloatingLabel controlId="customerBic" label={t('common.bic')}>
          <Form.Control
            type="text"
            placeholder={t('customers.enterCustomerBic')}
            {...bicConfig.registerConfig}
            isInvalid={!!errors.bic}
          />
          <FieldErrorsFeedback errors={errors} fieldName="bic" />
        </FloatingLabel>
      </Form.Group>
    </>
  );
}
