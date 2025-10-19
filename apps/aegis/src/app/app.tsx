import { RouterProvider } from 'react-router';
import { router } from './appRoutes';

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
