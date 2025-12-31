import { FieldErrorsFeedback } from '@aegis/ui';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
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
      <Form.Group className="mb-2" controlId="supplierCode">
        <FloatingLabel controlId="supplierCode" label={t('common.code')}>
          <Form.Control
            type="text"
            placeholder={t('suppliers.enterSupplierCode')}
            {...codeConfig.registerConfig}
            isInvalid={!!errors.code}
          />
          <FieldErrorsFeedback errors={errors} fieldName="code" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="supplierName">
        <FloatingLabel controlId="supplierName" label={t('common.name')}>
          <Form.Control
            type="text"
            placeholder={t('suppliers.enterSupplierName')}
            {...nameConfig.registerConfig}
            isInvalid={!!errors.name}
          />
          <FieldErrorsFeedback errors={errors} fieldName="name" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="supplierWebsite">
        <FloatingLabel controlId="supplierWebsite" label={t('common.website')}>
          <Form.Control
            type="text"
            placeholder={t('suppliers.enterSupplierWebsite')}
            {...websiteConfig.registerConfig}
            isInvalid={!!errors.website}
          />
          <FieldErrorsFeedback errors={errors} fieldName="website" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="supplierEmail">
        <FloatingLabel controlId="supplierEmail" label={t('common.email')}>
          <Form.Control
            type="email"
            placeholder={t('suppliers.enterSupplierEmail')}
            {...emailConfig.registerConfig}
            isInvalid={!!errors.email}
          />
          <FieldErrorsFeedback errors={errors} fieldName="email" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="supplierPhoneNumber">
        <FloatingLabel controlId="supplierPhoneNumber" label={t('common.phoneNumber')}>
          <Form.Control
            type="tel"
            placeholder={t('suppliers.enterSupplierPhoneNumber')}
            {...phoneNumberConfig.registerConfig}
            isInvalid={!!errors.phoneNumber}
          />
          <FieldErrorsFeedback errors={errors} fieldName="phoneNumber" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="supplierIban">
        <FloatingLabel controlId="supplierIban" label={t('common.iban')}>
          <Form.Control
            type="text"
            placeholder={t('suppliers.enterSupplierIban')}
            {...ibanConfig.registerConfig}
            isInvalid={!!errors.iban}
          />
          <FieldErrorsFeedback errors={errors} fieldName="iban" />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-2" controlId="supplierBic">
        <FloatingLabel controlId="supplierBic" label={t('common.bic')}>
          <Form.Control
            type="text"
            placeholder={t('suppliers.enterSupplierBic')}
            {...bicConfig.registerConfig}
            isInvalid={!!errors.bic}
          />
          <FieldErrorsFeedback errors={errors} fieldName="bic" />
        </FloatingLabel>
      </Form.Group>
    </>
  );
}
