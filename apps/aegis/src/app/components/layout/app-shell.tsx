import { Outlet } from 'react-router';
import styles from './app-shell.module.scss';
import BodyWrapper from './body-wrapper/body-wrapper';
import TopBar from './top-bar/top-bar';
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
