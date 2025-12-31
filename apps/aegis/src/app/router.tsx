import { createBrowserRouter } from 'react-router';
import { AppShell } from './components';
import { ArticleDetails, Articles } from './containers/articles';
import { CustomerDetails, Customers } from './containers/customers';
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
        path: '/suppliers',
        element: <Suppliers />,
        children: [
          {
            path: '/suppliers/:id',
            element: <SupplierDetails />,
          },
        ],
      },
      {
        path: '/customers',
        element: <Customers />,
        children: [
          {
            path: '/customers/:id',
            element: <CustomerDetails />,
          },
        ],
      },
      {
        path: '/articles',
        element: <Articles />,
        children: [
          {
            path: '/articles/:id',
            element: <ArticleDetails />,
          },
        ],
      },
    ],
  },
]);
