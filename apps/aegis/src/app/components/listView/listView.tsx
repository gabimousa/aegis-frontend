import { PropsWithChildren, ReactElement, useCallback, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import SearchInput from '../search-input/search-input';

type ListViewProps = PropsWithChildren<{
  header: string | ReactElement;
  searchPlaceholder?: string;
  actions?: ReactElement;
  errorMessage?: string;
  loading: boolean;
  loadingLabel?: string;
  showFooter?: boolean;
  loadMoreLabel?: string | ReactElement;
  footerLabel?: string | ReactElement;
  canLoadMore?: boolean;
  onSearchChange: (value: string) => void;
  onLoadMore?: () => void;
}>;

function ListView({
  header,
  searchPlaceholder,
  actions,
  errorMessage,
  loading,
  loadingLabel,
  children,
  showFooter,
  footerLabel,
  loadMoreLabel,
  canLoadMore,
  onSearchChange,
  onLoadMore,
}: ListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onSearchChange(value);
    },
    [onSearchChange]
  );

  return (
    <Container fluid className="h-100 overflow-hidden d-flex flex-column">
      <Row className="mb-2">
        <Col md={12} className="d-flex align-items-center flex-wrap">
          <div className="flex-grow-1">{header}</div>
          <div className="flex-grow-1 flex-sm-grow-0">{actions}</div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <div className="d-flex">
            <SearchInput
              placeholder={searchPlaceholder}
              value={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </div>
        </Col>
      </Row>

      {errorMessage && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">{errorMessage}</Alert>
          </Col>
        </Row>
      )}

      <Row className="flex-grow-1 overflow-auto">
        <Col className="h-100">
          <Card className="h-100 d-flex flex-column">
            {/* <Card.Header>
              <h5 className="mb-0">{cardTitle}</h5>
            </Card.Header> */}
            <Card.Body className="flex-grow-1 overflow-auto p-0">
              {/* {loading ? (
                <div className="text-center p-4">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">{loadingLabel}</span>
                  </Spinner>
                </div>
              ) : ( */}
              {children}
              {/* )} */}
            </Card.Body>
            {showFooter && (
              <Card.Footer>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">{footerLabel}</small>
                  </div>
                  <div>
                    <Button
                      onClick={onLoadMore}
                      variant="outline-secondary"
                      size="sm"
                      disabled={!canLoadMore}
                      className="me-2"
                    >
                      {loadMoreLabel}
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
