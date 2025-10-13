import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next) // Passes i18n down to React
  .init({
    resources: {
      en: {
        translation: {
          common: {
            language: 'Language',
            english: 'English',
            dutch: 'Dutch',
            home: 'Home',
            suppliers: 'Suppliers',
            articles: 'Articles',
            customers: 'Customers',
          },
          suppliers: {
            title: 'Suppliers',
            name: 'Name',
            searchPlaceholder: 'Search suppliers...',
            addButton: 'Add Supplier',
            errorLoading: 'Error loading suppliers: {{error}}',
            listTitle: 'Supplier List',
            noResults: 'No suppliers found.',
            table: {
              code: 'Code',
              name: 'Name',
              website: 'Website',
              email: 'Email',
              phoneNumber: 'Phone Number',
              iban: 'IBAN',
              bic: 'BIC',
              actions: 'Actions',
              edit: 'Edit',
              delete: 'Delete',
            },
            totalCount: 'Total: {{count}} suppliers',
            previous: 'Previous',
            next: 'Next',
          },
        },
      },
      nl: {
        translation: {
          common: {
            language: 'Taal',
            english: 'Engels',
            dutch: 'Nederlands',
            home: 'Startpagina',
            articles: 'Artikelen',
            customers: 'Klanten',
            suppliers: 'Leveranciers',
          },
          suppliers: {
            title: 'Leveranciers',
            name: 'Naam',
            searchPlaceholder: 'Zoek leveranciers...',
            addButton: 'Voeg leverancier toe',
            errorLoading: 'Fout bij het laden van leveranciers: {{error}}',
            listTitle: 'Leverancierslijst',
            noResults: 'Geen leveranciers gevonden.',
            table: {
              code: 'Code',
              name: 'Naam',
              website: 'Website',
              email: 'E-mail',
              phoneNumber: 'Telefoonnummer',
              iban: 'IBAN',
              bic: 'BIC',
              actions: 'Acties',
              edit: 'Bewerken',
              delete: 'Verwijderen',
            },
            totalCount: 'Totaal: {{count}} leveranciers',
            previous: 'Vorige',
            next: 'Volgende',
          },
        },
      },
    },
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
