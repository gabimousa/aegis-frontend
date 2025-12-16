import { RouterProvider } from 'react-router';
import { router } from './appRoutes';
import { DialogProvider } from './hooks/useDialog';
import { CountriesProvider } from './shared/countries/countriesContext';

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
