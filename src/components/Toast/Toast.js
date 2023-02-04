import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

import { ToastContext } from '../ToastProvider/ToastProvider';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ id, children, variant }) {
  const Icon = ICONS_BY_VARIANT[variant];

  const { handleDismiss } = React.useContext(ToastContext);

  //if I want to dismiss the toasts one by one

  /* React.useEffect(() => {
    function closeToasts(event) {
      if (event.code === 'Escape') {
        handleDismiss(id);
      }
    }
    document.addEventListener('keydown', closeToasts);

    return () => {
      document.removeEventListener('keydown', closeToasts);
    };
  }, [id, handleDismiss]);
  */

  return (
    <div key={id} className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={() => handleDismiss(id)}
        aria-label='Dismiss message'
        aria-live='off'
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
