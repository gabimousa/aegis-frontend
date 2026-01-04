import { Outlet } from 'react-router';
import { BodyWrapper } from './bodyWrapper';
import { TopBar } from './topBar';

export function AppShell() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      <TopBar />
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
    </div>
  );
}
