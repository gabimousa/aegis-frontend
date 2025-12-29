import { DialogProvider } from '@aegis/shared';
import { RouterProvider } from 'react-router';
import { router } from './router';
import { CountriesProvider } from './shared';

export function App() {
  return (
    <CountriesProvider>
      <DialogProvider>
        <RouterProvider router={router} />
      </DialogProvider>
    </CountriesProvider>
  );
}

export default App;
