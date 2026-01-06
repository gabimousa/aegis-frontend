import { AddressType } from '@aegis/shared';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash } from 'tabler-icons-react';
import { Input, Select } from '../../../../components';
import { CountriesContext } from '../../../../shared/countries/countriesContext';
import { AddressModel } from '../../model';
import useCustomerDetailsFormConfig from '../useCustomerDetailsFormConfig';

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
  } = useCustomerDetailsFormConfig();

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
    <fieldset className="fieldset border-base-100 rounded-box w-full">
      <legend className="fieldset-legend text-primary/50">
        <button className="btn btn-xs btn-ghost btn-error" onClick={onRemove}>
          <Trash size={16} />
        </button>
        {getAddressTypeLabel(address.type)}
      </legend>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-6">
        <div className="md:col-span-4">
          <Input
            label={t('addresses.street')}
            type="text"
            placeholder={t('addresses.street')}
            {...streetConfig.registerConfig(index)}
            errors={errors}
            fieldName={`addresses.${index}.street`}
          />
        </div>
        <div className="md:col-span-2">
          <Input
            label={t('addresses.number')}
            type="text"
            placeholder={t('addresses.number')}
            {...numberConfig.registerConfig(index)}
            errors={errors}
            fieldName={`addresses.${index}.number`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-6">
        <div className="md:col-span-2">
          <Input
            label={t('addresses.zipCode')}
            type="text"
            placeholder={t('addresses.zipCode')}
            {...zipCodeConfig.registerConfig(index)}
            errors={errors}
            fieldName={`addresses.${index}.zipCode`}
          />
        </div>
        <div className="md:col-span-4">
          <Input
            label={t('addresses.city')}
            type="text"
            placeholder={t('addresses.city')}
            {...cityConfig.registerConfig(index)}
            errors={errors}
            fieldName={`addresses.${index}.city`}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-6">
        <div className="md:col-span-3">
          <Input
            label={t('addresses.state')}
            type="text"
            placeholder={t('addresses.state')}
            {...stateConfig.registerConfig(index)}
            errors={errors}
            fieldName={`addresses.${index}.state`}
          />
        </div>
        <div className="md:col-span-3">
          <Select
            label={t('addresses.country')}
            {...countryCodeConfig.registerConfig(index)}
            errors={errors}
            fieldName={`addresses.${index}.countryCode`}
            options={countries}
            labelKey="name"
            valueKey="code"
          ></Select>
        </div>
      </div>
    </fieldset>
  );
}
