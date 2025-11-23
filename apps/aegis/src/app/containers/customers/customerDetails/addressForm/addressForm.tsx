import { useContext } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Trash } from 'tabler-icons-react';
import FieldErrorsFeedback from '../../../../components/fieldErrorsFeedback/fieldErrorsFeedback';
import { AddressType } from '../../../../gql/graphql';
import { CountriesContext } from '../../../../shared/countries/countriesContext';
import { Address } from '../../model/address.model';
import { CustomerDetailsModel } from '../../model/customerDetails.model';
import useCustomerDetailsFormConfig from '../useCustomerDetailsFormConfig';

type AddressFormProps = {
  index: number;
  address: Address;
  onRemove?: () => void;
};

function AddressForm({ index, address, onRemove }: AddressFormProps) {
  const { t } = useTranslation();
  const { countries } = useContext(CountriesContext);
  const {
    addresses: {
      stateConfig,
      cityConfig,
      zipCodeConfig,
      numberConfig,
      streetConfig,
      countryCodeConfig,
    },
  } = useCustomerDetailsFormConfig();

  const {
    register,
    formState: { errors },
  } = useFormContext<CustomerDetailsModel>();

  const getAddressTypeLabel = (type: AddressType) => {
    switch (type) {
      case 'VISITING':
        return 'Visiting Address';
      case 'MAILING':
        return 'Mailing Address';
      case 'DELIVERY':
        return 'Delivery Address';
      default:
        return 'Unknown Address';
    }
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          {getAddressTypeLabel(address.type)}
          <Button variant="outline-danger" className="ms-1" onClick={onRemove}>
            <Trash size={16} />
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row className="g-2 mb-2">
          <Col sm={7}>
            <Form.Group>
              <FloatingLabel controlId="addresses.street" label={t('addresses.street')}>
                <Form.Control
                  type="text"
                  placeholder={t('addresses.street')}
                  {...register(`addresses.${index}.street`, streetConfig.registerConfig)}
                  isInvalid={!!errors.addresses?.[index]?.street}
                />
              </FloatingLabel>
              <FieldErrorsFeedback errors={errors} fieldName={`addresses.${index}.street`} />
            </Form.Group>
          </Col>
          <Col sm={5}>
            <Form.Group>
              <FloatingLabel controlId="addresses.number" label={t('addresses.number')}>
                <Form.Control
                  type="text"
                  placeholder={t('addresses.number')}
                  {...register(`addresses.${index}.number`, numberConfig.registerConfig)}
                  isInvalid={!!errors.addresses?.[index]?.number}
                />
              </FloatingLabel>
              <FieldErrorsFeedback errors={errors} fieldName={`addresses.${index}.number`} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col sm={4}>
            <Form.Group>
              <FloatingLabel controlId="addresses.zipCode" label={t('addresses.zipCode')}>
                <Form.Control
                  type="text"
                  placeholder={t('addresses.zipCode')}
                  {...register(`addresses.${index}.zipCode`, zipCodeConfig.registerConfig)}
                  isInvalid={!!errors.addresses?.[index]?.zipCode}
                />
              </FloatingLabel>
              <FieldErrorsFeedback errors={errors} fieldName={`addresses.${index}.zipCode`} />
            </Form.Group>
          </Col>
          <Col sm={8}>
            <Form.Group>
              <FloatingLabel controlId="addresses.city" label={t('addresses.city')}>
                <Form.Control
                  type="text"
                  placeholder={t('addresses.city')}
                  {...register(`addresses.${index}.city`, cityConfig.registerConfig)}
                  isInvalid={!!errors.addresses?.[index]?.city}
                />
              </FloatingLabel>
              <FieldErrorsFeedback errors={errors} fieldName={`addresses.${index}.city`} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <FloatingLabel controlId="addresses.state" label={t('addresses.state')}>
                <Form.Control
                  type="text"
                  placeholder={t('addresses.state')}
                  {...register(`addresses.${index}.state`, stateConfig.registerConfig)}
                  isInvalid={!!errors.addresses?.[index]?.state}
                />
              </FloatingLabel>
              <FieldErrorsFeedback errors={errors} fieldName={`addresses.${index}.state`} />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <FloatingLabel controlId="addresses.countryCode" label={t('addresses.country')}>
                <Form.Select
                  // value={address.countryCode?.toString()}
                  {...register(`addresses.${index}.countryCode`, countryCodeConfig.registerConfig)}
                  isInvalid={!!errors.addresses?.[index]?.countryCode}
                >
                  <option value={undefined} />
                  {countries.map((country) => (
                    <option key={country.code.toString()} value={country.code.toString()}>
                      {country.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              <FieldErrorsFeedback errors={errors} fieldName={`addresses.${index}.countryCode`} />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default AddressForm;
