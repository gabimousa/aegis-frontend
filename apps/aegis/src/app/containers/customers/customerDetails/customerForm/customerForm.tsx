import { Alert, FloatingLabel, Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FieldErrorsFeedback from '../../../../components/fieldErrorsFeedback/fieldErrorsFeedback';
import { CustomerDetailsModel } from '../../model/customerDetails.model';
import useCustomerDetailsFormConfig from '../useCustomerDetailsFormConfig';

function CustomerForm() {
  const { t } = useTranslation();
  const {
    codeConfig,
    nameConfig,
    websiteConfig,
    emailConfig,
    phoneNumberConfig,
    ibanConfig,
    bicConfig,
  } = useCustomerDetailsFormConfig();

  const {
    register,
    formState: { errors },
  } = useFormContext<CustomerDetailsModel>();

  return (
    <>
      <Form.Group className="mb-2" controlId="customerCode">
        <FloatingLabel controlId="customerCode" label={t('common.code')}>
          <Form.Control
            type="text"
            placeholder={t('customers.enterCustomerCode')}
            {...register('code', codeConfig.registerConfig)}
            isInvalid={!!errors.code}
          />
        </FloatingLabel>
        <FieldErrorsFeedback errors={errors} fieldName="code" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="customerName">
        <FloatingLabel controlId="customerName" label={t('common.name')}>
          <Form.Control
            type="text"
            placeholder={t('customers.enterCustomerName')}
            {...register('name', nameConfig.registerConfig)}
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
            {...register('website', websiteConfig.registerConfig)}
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
            {...register('email', emailConfig.registerConfig)}
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
            {...register('phoneNumber', phoneNumberConfig.registerConfig)}
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
            {...register('iban', ibanConfig.registerConfig)}
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
            {...register('bic', bicConfig.registerConfig)}
            isInvalid={!!errors.bic}
          />
          <FieldErrorsFeedback errors={errors} fieldName="bic" />
        </FloatingLabel>
      </Form.Group>
    </>
  );
}

export default CustomerForm;
