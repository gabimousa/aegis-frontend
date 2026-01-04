import { AddressType } from '@aegis/shared';
import { FieldErrorsFeedback } from '@aegis/ui';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash } from 'tabler-icons-react';
import { FloatingLabelInput } from '../../../../components';
import { CountriesContext } from '../../../../shared/countries/countriesContext';
import { AddressModel } from '../../model';
import useSupplierDetailsFormConfig from '../useSupplierDetailsFormConfig';

type AddressFormProps = {
  index: number;
  address: AddressModel;
  onRemove?: () => void;
};

export function AddressForm({ index, address, onRemove }: AddressFormProps) {
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
    formState: { errors },
  } = useSupplierDetailsFormConfig();

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
    <div className="card bg-base-100 shadow-xl">
      <div className="card-header flex justify-between items-center p-4">
        <div>{getAddressTypeLabel(address.type)}</div>
        <button className="btn btn-outline btn-error" onClick={onRemove}>
          <Trash size={16} />
        </button>
      </div>
      <div className="card-body p-4">
        <div className="grid grid-cols-12 gap-2 mb-2">
          <div className="col-span-7">
            <FloatingLabelInput
              label={t('addresses.street')}
              type="text"
              placeholder={t('addresses.street')}
              {...streetConfig.registerConfig(index)}
              errors={errors}
              fieldName={`addresses.${index}.street`}
            />
          </div>
          <div className="col-span-5">
            <FloatingLabelInput
              label={t('addresses.number')}
              type="text"
              placeholder={t('addresses.number')}
              {...numberConfig.registerConfig(index)}
              errors={errors}
              fieldName={`addresses.${index}.number`}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 mb-2">
          <div className="col-span-4">
            <FloatingLabelInput
              label={t('addresses.zipCode')}
              type="text"
              placeholder={t('addresses.zipCode')}
              {...zipCodeConfig.registerConfig(index)}
              errors={errors}
              fieldName={`addresses.${index}.zipCode`}
            />
          </div>
          <div className="col-span-8">
            <FloatingLabelInput
              label={t('addresses.city')}
              type="text"
              placeholder={t('addresses.city')}
              {...cityConfig.registerConfig(index)}
              errors={errors}
              fieldName={`addresses.${index}.city`}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <FloatingLabelInput
              label={t('addresses.state')}
              type="text"
              placeholder={t('addresses.state')}
              {...stateConfig.registerConfig(index)}
              errors={errors}
              fieldName={`addresses.${index}.state`}
            />
          </div>
          <div className="col-span-6">
            <FloatingLabelInput
              label={t('addresses.country')}
              errors={errors}
              fieldName={`addresses.${index}.countryCode`}
            >
              <select
                className={`select select-bordered w-full ${
                  errors.addresses?.[index]?.countryCode ? 'select-error' : ''
                }`}
                {...countryCodeConfig.registerConfig(index)}
              >
                <option value={undefined} />
                {countries.map((country) => (
                  <option key={country.code.toString()} value={country.code.toString()}>
                    {country.name}
                  </option>
                ))}
              </select>
            </FloatingLabelInput>
          </div>
        </div>
      </div>
    </div>
  );
}
