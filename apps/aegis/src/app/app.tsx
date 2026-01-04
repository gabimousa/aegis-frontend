import { DialogProvider } from '@aegis/shared';
import { RouterProvider } from 'react-router';
import { router } from './router';
import { CountriesProvider } from './shared';

export function App() {
  return (
    <div className="bg-base-100 min-h-screen">
      <CountriesProvider>
        <DialogProvider>
          <RouterProvider router={router} />
        </DialogProvider>
      </CountriesProvider>
    </div>
  );
}

export default App;
