import { RouterProvider } from 'react-router';
import { router } from './appRoutes';
import { DialogProvider } from './hooks/useDialog';

export function App() {
  return (
    <DialogProvider>
      <RouterProvider router={router} />
    </DialogProvider>
  );
}

export default App;
