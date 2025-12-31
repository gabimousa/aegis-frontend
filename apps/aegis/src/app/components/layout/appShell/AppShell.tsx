import { Outlet } from 'react-router';
import styles from './AppShell.module.scss';
import { BodyWrapper } from './bodyWrapper';
import { TopBar } from './topBar';

export function AppShell() {
  return (
    <div className={styles.layout}>
      <TopBar />
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
    </div>
  );
}
