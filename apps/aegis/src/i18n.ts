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
            name: 'Name',
            website: 'Website',
            email: 'Email',
            phoneNumber: 'Phone Number',
            iban: 'IBAN',
            bic: 'BIC',
            code: 'Code',
            notResults: 'No results found.',
            actions: 'Actions',
            edit: 'Edit',
            delete: 'Delete',
            previous: 'Previous',
            next: 'Next',
            add: 'Add',
          },
          suppliers: {
            title: 'Suppliers',
            searchPlaceholder: 'Search suppliers...',
            errorLoading: 'Error loading suppliers: {{error}}',
            listTitle: 'Supplier List',
            totalCount: 'Total: {{count}} suppliers',
          },
          customers: {
            title: 'Customers',
            searchPlaceholder: 'Search customers...',
            errorLoading: 'Error loading customers: {{error}}',
            listTitle: 'Customer List',
            totalCount: 'Total: {{count}} customers',
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
            name: 'Naam',
            website: 'Website',
            email: 'E-mail',
            phoneNumber: 'Telefoonnummer',
            iban: 'IBAN',
            bic: 'BIC',
            code: 'Code',
            notResults: 'Geen resultaten gevonden.',
            actions: 'Acties',
            edit: 'Bewerken',
            delete: 'Verwijderen',
            previous: 'Vorige',
            next: 'Volgende',
            add: 'Toevoegen',
          },
          suppliers: {
            title: 'Leveranciers',
            searchPlaceholder: 'Zoek leveranciers...',
            errorLoading: 'Fout bij het laden van leveranciers: {{error}}',
            listTitle: 'Leverancierslijst',
            totalCount: 'Totaal: {{count}} leveranciers',
          },
          customers: {
            title: 'Klanten',
            searchPlaceholder: 'Zoek klanten...',
            errorLoading: 'Fout bij het laden van klanten: {{error}}',
            listTitle: 'Klantenlijst',
            totalCount: 'Totaal: {{count}} klanten',
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
