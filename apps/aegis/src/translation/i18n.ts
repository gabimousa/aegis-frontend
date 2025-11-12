import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './resources/en';
import nl from './resources/nl';

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next) // Passes i18n down to React
  .init({
    resources: {
      en,
      nl,
    },
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
