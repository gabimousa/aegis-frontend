import { PropsWithChildren } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import styles from './master-detail.module.scss';

type MasterDetailProps = PropsWithChildren<{
  detailsOpen: boolean;
}>;

function MasterDetail({ detailsOpen, children }: MasterDetailProps) {
  const navigate = useNavigate();

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
        onClick={() => navigate({ pathname: '' })}
      />
      {/* Sliding details panel (renders Outlet when :id matches) */}
      <section
        className={`${styles.panel} ${detailsOpen ? styles.open : ''}`}
        aria-hidden={!detailsOpen}
      >
        <div className={styles.panelHeader}>
          <Link
            to=""
            relative="path"
            aria-label="Close details"
            className={styles.close}
          >
            ✕
          </Link>
          <h2>Details</h2>
        </div>
        <div className={styles.panelBody}>
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default MasterDetail;
