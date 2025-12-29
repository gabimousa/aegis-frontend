import { PropsWithChildren, ReactElement, useCallback, useState } from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { SearchInput } from '../searchInput';

type ListViewProps = PropsWithChildren<{
  header: string | ReactElement;
  searchPlaceholder?: string;
  actions?: ReactElement;
  errorMessage?: string;
  showFooter?: boolean;
  footerLabel?: string | ReactElement;
  allowSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}>;

export function ListView({
  header,
  searchPlaceholder,
  actions,
  errorMessage,
  children,
  showFooter,
  footerLabel,

  allowSearch = true,
  onSearchChange,
}: ListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onSearchChange?.(value);
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

      {allowSearch && (
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
      )}

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
            <Card.Body className="flex-grow-1 overflow-auto p-0">{children}</Card.Body>
            {showFooter && (
              <Card.Footer>
                <small className="text-muted">{footerLabel}</small>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
