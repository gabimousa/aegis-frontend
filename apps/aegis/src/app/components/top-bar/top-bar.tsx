import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { Package, TruckDelivery, Users } from 'tabler-icons-react';

export const TopBar = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" data-bs-theme="dark" bg="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Aegis
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" eventKey="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/suppliers" eventKey="/suppliers">
              <TruckDelivery size={16} className="me-2" />
              Suppliers
            </Nav.Link>
            <Nav.Link as={Link} to="/articles" eventKey="/articles">
              <Package size={16} className="me-2" />
              Articles
            </Nav.Link>
            <Nav.Link as={Link} to="/customers" eventKey="/customers">
              <Users size={16} className="me-2" />
              Customers
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
