'use client';

// Adapted from shadcn/ui toast component
import { useEffect, useState } from 'react';

type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
};

type ToastActionType = (props: ToastProps) => void;

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  
  const toast: ToastActionType = (props) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = {
      id,
      ...props,
      duration: props.duration || 5000,
    };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto-remove toast after duration
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, newToast.duration);
  };
  
  return {
    toast,
    toasts,
    dismissToast: (id: string) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    },
  };
} 