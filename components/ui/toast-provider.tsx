'use client';

import React, { createContext, useContext, useState } from 'react';
import { Toaster as SonnerToaster } from 'sonner';

type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
};

type ToastContextType = {
  toast: (props: ToastProps) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      ...props,
      duration: props.duration || 5000,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto-remove toast after duration
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, newToast.duration);
  };

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <SonnerToaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'white',
            color: '#103138',
            border: '1px solid #e2e8f0',
          },
        }}
      />
      <div id="toast-container" className="fixed bottom-0 right-0 p-4 z-50"></div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right" 
      toastOptions={{
        style: {
          background: 'white',
          color: '#103138',
          border: '1px solid #e2e8f0',
        },
      }}
    />
  );
} 