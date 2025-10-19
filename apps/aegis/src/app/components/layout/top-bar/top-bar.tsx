import { useState } from 'react';
import { Container, NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { Link, useMatch } from 'react-router';
import { Package, TruckDelivery, Users } from 'tabler-icons-react';
import { useColorMode } from '../theme/useColorMode';

export const TopBar = () => {
  const { mode, setMode, isDark } = useColorMode();
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const homeIsActive = useMatch('/');
  const customersIsActive = useMatch('/customers/*');
  const articlesIsActive = useMatch('/articles/*');
  const suppliersIsActive = useMatch('/suppliers/*');

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      bg="primary"
      variant="dark"
      onToggle={setExpanded}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Aegis
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="underline" className="me-auto">
            <Nav.Link as={Link} to="/" eventKey="/" active={!!homeIsActive}>
              {t('common.home')}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/suppliers"
              eventKey="/suppliers"
              active={!!suppliersIsActive}
            >
              <TruckDelivery size={16} className="me-2" />
              {t('common.suppliers')}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/articles"
              eventKey="/articles"
              active={!!articlesIsActive}
            >
              <Package size={16} className="me-2" />
              {t('common.articles')}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/customers"
              eventKey="/customers"
              active={!!customersIsActive}
            >
              <Users size={16} className="me-2" />
              {t('common.customers')}
            </Nav.Link>
          </Nav>
          <div
            className={
              'd-flex gap-3 align-items-center text-white px-2 mt-2 mt-lg-0'
            }
          >
            <NavDropdown
              align={expanded ? 'start' : 'end'}
              title={
                i18n.language === 'nl' ? t('common.dutch') : t('common.english')
              }
              id="settings-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => i18n.changeLanguage('en')}>
                {t('common.english')}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => i18n.changeLanguage('nl')}>
                {t('common.dutch')}
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={isDark ? t('Dark') : t('Light')}
              id="theme-dropdown"
              align={expanded ? 'start' : 'end'}
            >
              <NavDropdown.Item
                onClick={() => setMode('light')}
                active={mode === 'light'}
              >
                {t('Light')}
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => setMode('dark')}
                active={mode === 'dark'}
              >
                {t('Dark')}
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => setMode('auto')}
                active={mode === 'auto'}
              >
                {t('System')}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
