import { PropsWithChildren } from 'react';
import styles from './body-wrapper.module.scss';

const BodyWrapper = ({ children }: PropsWithChildren) => (
  <div className={`${styles.bodyWrapper}`}>{children}</div>
);

export default BodyWrapper;
