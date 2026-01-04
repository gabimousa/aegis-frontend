import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useMatch } from 'react-router';
import { Package, TruckDelivery, Users, World } from 'tabler-icons-react';
import { ThemeSwitcher } from '../../../ThemeSwitcher';

export function TopBar() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const homeIsActive = useMatch('/');
  const customersIsActive = useMatch('/customers/*');
  const articlesIsActive = useMatch('/articles/*');
  const suppliersIsActive = useMatch('/suppliers/*');

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Brand and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Brand */}
            <Link to="/" className="text-xl font-bold hover:text-blue-200 transition-colors">
              Aegis
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md transition-colors ${
                homeIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
              }`}
            >
              {t('common.home')}
            </Link>
            <Link
              to="/suppliers"
              className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                suppliersIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
              }`}
            >
              <TruckDelivery size={16} />
              <span>{t('common.suppliers')}</span>
            </Link>
            <Link
              to="/articles"
              className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                articlesIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
              }`}
            >
              <Package size={16} />
              <span>{t('common.articles')}</span>
            </Link>
            <Link
              to="/customers"
              className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                customersIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
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
                className="p-2 rounded-full hover:bg-blue-700 transition-colors"
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
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 border-t border-blue-500 pt-4">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md transition-colors ${
                  homeIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('common.home')}
              </Link>
              <Link
                to="/suppliers"
                className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                  suppliersIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <TruckDelivery size={16} />
                <span>{t('common.suppliers')}</span>
              </Link>
              <Link
                to="/articles"
                className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                  articlesIsActive ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package size={16} />
                <span>{t('common.articles')}</span>
              </Link>
              <Link
                to="/customers"
                className={`px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
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
