import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { Plus, Search, TruckDelivery } from 'tabler-icons-react';
import { useSuppliers } from '../../hooks/useSuppliers';

export function Suppliers() {
  const { data, loading, error, refetch } = useSuppliers({ first: 10 });

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch({ first: 10 });
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">
            <TruckDelivery size={32} className="me-3" />
            <h2 className="mb-0">Suppliers</h2>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={8}>
          <Form onSubmit={handleFilterSubmit}>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search suppliers by name or code..."
                className="me-2"
              />
              <Button type="submit" variant="outline-primary">
                <Search size={16} />
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="primary">
            <Plus size={16} className="me-2" />
            Add Supplier
          </Button>
        </Col>
      </Row>

      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">Error loading suppliers: {error}</Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Suppliers List</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center p-4">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : data?.suppliers.edges.length === 0 ? (
                <p className="text-muted text-center p-4">
                  No suppliers found.
                </p>
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.suppliers.edges.map(({ node: supplier }) => (
                      <tr key={supplier.id}>
                        <td>
                          <code>{supplier.code}</code>
                        </td>
                        <td>{supplier.name}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
            {data?.suppliers.pageInfo && (
              <Card.Footer>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {data.suppliers.totalCount && (
                      <small className="text-muted">
                        Total: {data.suppliers.totalCount} suppliers
                      </small>
                    )}
                  </div>
                  <div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      disabled={!data.suppliers.pageInfo.hasPreviousPage}
                      className="me-2"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      disabled={!data.suppliers.pageInfo.hasNextPage}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Suppliers;
