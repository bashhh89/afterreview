'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
  onDismiss?: () => void;
};

export const Toast = ({ 
  title, 
  description, 
  variant = 'default',
  onDismiss 
}: ToastProps) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss?.();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  return (
    <div 
      className={`fixed bottom-4 right-4 px-6 py-4 rounded-md shadow-md max-w-md animate-in fade-in slide-in-from-bottom-5 z-50
        ${variant === 'destructive' ? 'bg-red-50 border-l-4 border-red-500 text-red-700' : 'bg-white border-l-4 border-[#20E28F] text-[#103138]'}`}
      role="alert"
    >
      {title && <h3 className="font-semibold text-sm mb-1">{title}</h3>}
      {description && <p className="text-sm opacity-90">{description}</p>}
      <button 
        onClick={onDismiss} 
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        aria-label="Close toast"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export const Toaster = ({ toasts, dismissToast }: { 
  toasts: ToastProps[]; 
  dismissToast: (id: string) => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  if (!isMounted) return null;
  
  const toastContainer = document.getElementById('toast-container') || document.body;
  
  return createPortal(
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onDismiss={() => dismissToast(toast.id as string)}
        />
      ))}
    </>,
    toastContainer
  );
}; 