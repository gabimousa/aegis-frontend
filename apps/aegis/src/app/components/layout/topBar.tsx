import { Container, NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Package, TruckDelivery, Users } from 'tabler-icons-react';
import { useColorMode } from './theme/useColorMode';
import styles from './topBar.module.scss';

export const TopBar = () => {
  const { mode, setMode, isDark } = useColorMode();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  return (
    <Navbar expand="lg" sticky="top" className={styles.navbar}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className={styles.brandLink}>
          Aegis
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            variant="underline"
            className="me-auto"
            activeKey={location.pathname}
          >
            <Nav.Link as={Link} to="/" eventKey="/" className={styles.navLink}>
              {t('common.home')}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/suppliers"
              eventKey="/suppliers"
              className={styles.navLink}
            >
              <TruckDelivery size={16} className="me-2" />
              {t('common.suppliers')}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/articles"
              eventKey="/articles"
              className={styles.navLink}
            >
              <Package size={16} className="me-2" />
              {t('common.articles')}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/customers"
              eventKey="/customers"
              className={styles.navLink}
            >
              <Users size={16} className="me-2" />
              {t('common.customers')}
            </Nav.Link>
          </Nav>
          <div className="d-flex gap-2 align-items-center">
            <NavDropdown
              align="end"
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
              align="end"
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
