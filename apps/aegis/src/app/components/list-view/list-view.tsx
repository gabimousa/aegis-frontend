import { ReactElement, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import SearchInput from '../search-input/search-input';

type ListViewProps = {
  header: string | ReactElement;
  searchPlaceholder?: string;
  actions?: ReactElement;
  errorMessage?: string;
  loading: boolean;
  cardTitle: string | ReactElement;
  loadingLabel?: string;
  children: ReactElement;
  showFooter?: boolean;
  nextPageLabel?: string | ReactElement;
  prevPageLabel?: string | ReactElement;
  footerLabel?: string | ReactElement;
  isPrevPageDisabled?: boolean;
  isNextPageDisabled?: boolean;
  onSearchChange: (value: string) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
};

function ListView({
  header,
  cardTitle,
  searchPlaceholder,
  actions,
  errorMessage,
  loading,
  loadingLabel,
  children,
  showFooter,
  footerLabel,
  nextPageLabel,
  prevPageLabel,
  isPrevPageDisabled,
  isNextPageDisabled,
  onSearchChange,
  onPrevPage,
  onNextPage,
}: ListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">{header}</div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={10}>
          <div className="d-flex">
            <SearchInput
              placeholder={searchPlaceholder}
              value={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </div>
        </Col>
        <Col md={2} className="text-end">
          {actions}
        </Col>
      </Row>

      {errorMessage && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">{errorMessage}</Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">{cardTitle}</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center p-4">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">{loadingLabel}</span>
                  </Spinner>
                </div>
              ) : (
                children
              )}
            </Card.Body>
            {showFooter && (
              <Card.Footer>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">{footerLabel}</small>
                  </div>
                  <div>
                    <Button
                      onClick={onPrevPage}
                      variant="outline-secondary"
                      size="sm"
                      disabled={isPrevPageDisabled}
                      className="me-2"
                    >
                      {prevPageLabel}
                    </Button>
                    <Button
                      onClick={onNextPage}
                      variant="outline-secondary"
                      size="sm"
                      disabled={isNextPageDisabled}
                    >
                      {nextPageLabel}
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

export default ListView;
