import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router';
import styles from './masterDetail.module.scss';

type MasterDetailProps = {
  // title?: string;
  detailsOpen: boolean;
  // closeOnBackdropClick?: boolean;
  // onClose?: () => void;
  onBackdropClick?: () => void;
};

function MasterDetail({
  detailsOpen,
  onBackdropClick,
  children,
}: PropsWithChildren<MasterDetailProps>) {
  return (
    <div className={styles.wrap}>
      {/* Full-screen list behind the panel */}
      <div className={styles.list} aria-hidden={detailsOpen}>
        {children}
      </div>
      {/* Backdrop (click to close) */}
      <button
        className={`${styles.backdrop} ${detailsOpen ? styles.show : ''}`}
        aria-hidden={!detailsOpen}
        onClick={() => onBackdropClick && onBackdropClick()}
      />
      {/* Sliding details panel (renders Outlet when :id matches) */}
      <section
        className={`${styles.panel} ${detailsOpen ? styles.open : ''}`}
        aria-hidden={!detailsOpen}
      >
        <Outlet />
      </section>
    </div>
  );
}

export default MasterDetail;
