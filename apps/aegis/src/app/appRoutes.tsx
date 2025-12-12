import { createBrowserRouter } from 'react-router';
import AppShell from './components/layout/app-shell';
import ArticleDetails from './containers/articles/articleDetails/articleDetails';
import ArticleList from './containers/articles/articleList/articleList';
import CustomerDetails from './containers/customers/customerDetails/customerDetails';
import Customers from './containers/customers/customers';
import SupplierDetails from './containers/suppliers/supplierDetails/supplierDetails';
import Suppliers from './containers/suppliers/suppliers';

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
        element: <ArticleList />,
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
