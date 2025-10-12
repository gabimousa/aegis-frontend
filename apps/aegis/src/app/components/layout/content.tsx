import { ReactNode } from 'react';
import styles from './content.module.scss';

const Content = ({ children }: { children: ReactNode }) => (
  <div className={styles.bodyWrapper}>{children}</div>
);

export default Content;
