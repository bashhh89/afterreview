import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to check if auto-complete feature should be enabled
export const isAutoCompleteEnabled = (): boolean => {
  // Check specific environment variable first
  if (typeof process.env.NEXT_PUBLIC_ENABLE_AUTO_COMPLETE === 'string') {
    return process.env.NEXT_PUBLIC_ENABLE_AUTO_COMPLETE.toLowerCase() === 'true';
  }
  
  // Fallback to development environment check
  return process.env.NODE_ENV === 'development';
}; 