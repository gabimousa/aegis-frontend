import { AegisUi } from '@aegis/ui';
import { aegisUtils } from '@aegis/utils';
import { RouterProvider } from 'react-router';
import { router } from './appRoutes';
import { DialogProvider } from './hooks/useDialog';
import { CountriesProvider } from './shared/countries/countriesContext';

aegisUtils();
export function App() {
  return (
    <CountriesProvider>
      <DialogProvider>
        <AegisUi></AegisUi>
        <RouterProvider router={router} />
      </DialogProvider>
    </CountriesProvider>
  );
}

export default App;
