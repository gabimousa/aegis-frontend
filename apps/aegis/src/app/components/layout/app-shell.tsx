import { Outlet } from 'react-router';
import styles from './app-shell.module.scss';
import BodyWrapper from './bodyWrapper/bodyWrapper';
import TopBar from './topBar/topBar';
function AppShell() {
  return (
    <div className={styles.layout}>
      <TopBar />
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
    </div>
  );
}

export default AppShell;
