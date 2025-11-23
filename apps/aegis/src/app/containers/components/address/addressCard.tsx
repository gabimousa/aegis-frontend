import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Edit, Trash } from 'tabler-icons-react';
import { CountriesContext } from '../../../shared/countries/countriesContext';
import { Address } from './model/address';

type AddressCardProps = {
  address: Address;
  onEdit?: () => void;
  onDelete?: () => void;
};

function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  const { countriesMap } = useContext(CountriesContext);

  const getAddressTypeLabel = (type: Address['type']) => {
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
      <Card.Header>{getAddressTypeLabel(address.type)}</Card.Header>
      <Card.Body>
        <Card.Text>
          {address.street} {address.number}
          <br />
          {address.zipCode} {address.city}
          <br />
          {address.state}
          <br />
          {countriesMap[address.countryCode] || address.countryCode}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={onEdit}>
            <Edit size={16} />
          </Button>
          <Button variant="danger" className="ms-1" onClick={onDelete}>
            <Trash size={16} />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default AddressCard;
