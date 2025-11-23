import { PropsWithChildren, ReactElement } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { X } from 'tabler-icons-react';
import styles from './detailsPanel.module.scss';

type DetailsPanelProps = {
  title: ReactElement | string;
  onClose?: () => void;
  actions?: ReactElement;
  loading?: boolean;
};

function DetailsPanel({
  title,
  actions,
  children,
  loading,
  onClose,
}: PropsWithChildren<DetailsPanelProps>) {
  return (
    <div className={styles.detailsPanel}>
      <div className={styles.header}>
        <div className={`${styles.title} text-primary`}>{title}</div>
        <Button variant="outline-light text-danger" size="sm" onClick={() => onClose && onClose()}>
          <X size={20}></X>
        </Button>
      </div>
      <div className={styles.body}>{children}</div>
      {actions && <div className={styles.footer}>{actions}</div>}
      {loading && (
        <div className={styles.spinnerContainer}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}
export default DetailsPanel;
