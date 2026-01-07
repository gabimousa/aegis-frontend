import { useContext } from 'react';
import { ToastContext } from './toastProvider';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'toast-top toast-start'
  | 'toast-top toast-center'
  | 'toast-top toast-end'
  | 'toast-middle toast-start'
  | 'toast-middle toast-center'
  | 'toast-middle toast-end'
  | 'toast-bottom toast-start'
  | 'toast-bottom toast-center'
  | 'toast-bottom toast-end';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
}

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  duration?: number;
  position?: ToastPosition;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, options?: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, removeToast, clearAllToasts } = context;

  // Convenience methods for different toast types
  const success = (message: string, options?: Omit<ToastOptions, 'type'>) =>
    addToast(message, { ...options, type: 'success' });

  const error = (message: string, options?: Omit<ToastOptions, 'type'>) =>
    addToast(message, { ...options, type: 'error' });

  const warning = (message: string, options?: Omit<ToastOptions, 'type'>) =>
    addToast(message, { ...options, type: 'warning' });

  const info = (message: string, options?: Omit<ToastOptions, 'type'>) =>
    addToast(message, { ...options, type: 'info' });

  return {
    toast: addToast,
    success,
    error,
    warning,
    info,
    remove: removeToast,
    clear: clearAllToasts,
  };
};
