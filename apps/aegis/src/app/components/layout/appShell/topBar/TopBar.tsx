import { Dropdown } from '@aegis/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useMatch, useNavigate } from 'react-router';
import { CodeCircle, Package, Settings, TruckDelivery, Users, World } from 'tabler-icons-react';
import { ThemeSwitcher } from '../../../ThemeSwitcher';

export function TopBar() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const homeIsActive = useMatch('/');
  const customersIsActive = useMatch('/customers/*');
  const articlesIsActive = useMatch('/articles/*');
  const suppliersIsActive = useMatch('/suppliers/*');
  const navigate = useNavigate();
  const menuItems = [
    {
      label: (
        <span className="inline-flex items-center">
          <CodeCircle className="mr-2" size={20} /> {t('common.fieldDefinitions')}
        </span>
      ),
      to: '/settings/field-definitions',
    },
    {
      label: (
        <span className="inline-flex items-center">
          <Settings className="mr-2" size={20} /> {t('common.customFields')}
        </span>
      ),
      to: '/settings/custom-fields',
    },
  ];

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Brand and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              className="rounded-md p-2 hover:bg-blue-700 focus:ring-2 focus:ring-white focus:outline-none lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Brand */}
            <Link
              to="/"
              className="hover:text-primary-content/70 text-xl font-bold transition-colors"
            >
              Aegis
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-6 lg:flex">
            <Link
              to="/"
              className={`rounded-md px-3 py-2 transition-colors ${
                homeIsActive ? 'bg-primary-content/20 text-white' : 'hover:bg-primary-content/10'
              }`}
            >
              {t('common.home')}
            </Link>
            <Link
              to="/suppliers"
              className={`flex items-center space-x-2 rounded-md px-3 py-2 transition-colors ${
                suppliersIsActive
                  ? 'bg-primary-content/20 text-white'
                  : 'hover:bg-primary-content/10'
              }`}
            >
              <TruckDelivery size={16} />
              <span>{t('common.suppliers')}</span>
            </Link>
            <Link
              to="/articles"
              className={`flex items-center space-x-2 rounded-md px-3 py-2 transition-colors ${
                articlesIsActive
                  ? 'bg-primary-content/20 text-white'
                  : 'hover:bg-primary-content/10'
              }`}
            >
              <Package size={16} />
              <span>{t('common.articles')}</span>
            </Link>
            <Link
              to="/customers"
              className={`flex items-center space-x-2 rounded-md px-3 py-2 transition-colors ${
                customersIsActive
                  ? 'bg-primary-content/20 text-white'
                  : 'hover:bg-primary-content/10'
              }`}
            >
              <Users size={16} />
              <span>{t('common.customers')}</span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                className="rounded-full p-2 transition-colors hover:bg-blue-700"
                onClick={() => {
                  const newLang = i18n.language === 'en' ? 'nl' : 'en';
                  i18n.changeLanguage(newLang);
                }}
                title={`Switch to ${i18n.language === 'en' ? 'Dutch' : 'English'}`}
              >
                <World size={20} />
              </button>
            </div>

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Settings dropdown */}
            <Dropdown
              items={menuItems}
              buttonClasses="rounded-full p-2 transition-colors hover:bg-blue-700"
              align="end"
              label={<Settings size={20} />}
              labelSelector={(item) => item.label}
              onSelect={(item) => navigate(item.to)}
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 border-t border-blue-500 pt-4 lg:hidden">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`rounded-md px-3 py-2 transition-colors ${
                  homeIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('common.home')}
              </Link>
              <Link
                to="/suppliers"
                className={`flex items-center space-x-2 rounded-md px-3 py-2 transition-colors ${
                  suppliersIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <TruckDelivery size={16} />
                <span>{t('common.suppliers')}</span>
              </Link>
              <Link
                to="/articles"
                className={`flex items-center space-x-2 rounded-md px-3 py-2 transition-colors ${
                  articlesIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package size={16} />
                <span>{t('common.articles')}</span>
              </Link>
              <Link
                to="/customers"
                className={`flex items-center space-x-2 rounded-md px-3 py-2 transition-colors ${
                  customersIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={16} />
                <span>{t('common.customers')}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
