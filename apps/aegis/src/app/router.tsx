import { createBrowserRouter } from 'react-router';
import { AppShell } from './components';
import { ArticleDetails, Articles } from './containers/articles';
import { CustomerDetails, Customers } from './containers/customers';
import {
  CustomFields,
  FieldDefinitionDetails,
  FieldDefinitions,
  Settings,
} from './containers/settings';
import { SupplierDetails, Suppliers } from './containers/suppliers';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: 'suppliers',
        element: <Suppliers />,
        children: [
          {
            path: ':id',
            element: <SupplierDetails />,
          },
        ],
      },
      {
        path: 'customers',
        element: <Customers />,
        children: [
          {
            path: ':id',
            element: <CustomerDetails />,
          },
        ],
      },
      {
        path: 'articles',
        element: <Articles />,
        children: [
          {
            path: ':id',
            element: <ArticleDetails />,
          },
        ],
      },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          {
            path: 'field-definitions',
            element: <FieldDefinitions />,
            children: [
              {
                path: ':id',
                element: <FieldDefinitionDetails />,
              },
            ],
          },
          {
            path: 'custom-fields',
            element: <CustomFields />,
          },
        ],
      },
    ],
  },
]);
