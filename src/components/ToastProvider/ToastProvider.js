import React from 'react';
import useEscapeKey from '../../hooks/useEscapeKey';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [stackedToasts, setStackedToasts] = React.useState([]);

  //aggiungi un toast, poi resetta textarea e checkboxes
  function createToast(message, variant) {
    const newToast = [
      ...stackedToasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setStackedToasts(newToast);
  }

  useEscapeKey(() => {
    setStackedToasts([]);
  });

  //cerca solo i risultati che non corrispondono all'id che ho passato e ritornali in un nuovo array
  function handleDismiss(id) {
    const nextToasts = stackedToasts.filter((toast) => {
      return toast.id !== id;
    });

    setStackedToasts(nextToasts);
  }

  const value = {
    stackedToasts,
    createToast,
    handleDismiss,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
