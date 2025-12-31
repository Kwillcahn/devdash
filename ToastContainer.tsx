import React, { useState, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import Icon from './Icon';
import type { ToastMessage } from '../types';

const Toast: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleDismiss();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timerId);
  }, [toast.id]);

  const handleDismiss = () => {
    setIsExiting(true);
    // Wait for fade-out animation to finish before removing from state
    setTimeout(() => {
      onDismiss(toast.id);
    }, 300); // Matches animation duration
  };
  
  const typeClasses = {
    success: { bg: 'bg-green-500/10', border: 'border-primary-green/50', text: 'text-primary-green', icon: 'success' },
    error: { bg: 'bg-red-500/10', border: 'border-red-500/50', text: 'text-red-500', icon: 'error' },
    info: { bg: 'bg-blue-500/10', border: 'border-primary-cyan/50', text: 'text-primary-cyan', icon: 'info' },
    warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/50', text: 'text-yellow-500', icon: 'warning' },
  };

  const classes = typeClasses[toast.type];

  return (
    <div
      role="alert"
      className={`
        flex items-start p-4 mb-4 w-full max-w-sm rounded-lg shadow-lg border backdrop-blur-xl
        ${classes.bg} ${classes.border}
        ${isExiting ? 'animate-toast-out' : 'animate-toast-in'}
      `}
    >
      <div className={`flex-shrink-0 ${classes.text}`}>
        <Icon name={classes.icon} className="w-6 h-6" />
      </div>
      <div className="ml-3 flex-1 pt-0.5 text-sm font-medium text-gray-800 dark:text-gray-200">
        {toast.message}
      </div>
      <button onClick={handleDismiss} className="ml-4 flex-shrink-0 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Close">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};


const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="fixed top-24 right-0 z-[100] p-4 sm:p-6 w-full max-w-md">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;