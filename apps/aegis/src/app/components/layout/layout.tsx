import { ReactNode } from 'react';
import styles from './layout.module.scss';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.bodyWrapper} data-bs-theme="dark">
    {children}
  </div>
);

export default Layout;
