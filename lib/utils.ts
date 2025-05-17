import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to check if auto-complete feature should be enabled
export const isAutoCompleteEnabled = (): boolean => {
  // Debug logging to help identify environment issues
  console.log(`[DEBUG] NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`[DEBUG] NEXT_PUBLIC_ENABLE_AUTO_COMPLETE: ${process.env.NEXT_PUBLIC_ENABLE_AUTO_COMPLETE}`);
  
  // Check specific environment variable first
  if (typeof process.env.NEXT_PUBLIC_ENABLE_AUTO_COMPLETE === 'string') {
    const enabled = process.env.NEXT_PUBLIC_ENABLE_AUTO_COMPLETE.toLowerCase() === 'true';
    console.log(`[DEBUG] Auto-complete explicitly ${enabled ? 'ENABLED' : 'DISABLED'} by environment variable`);
    return enabled;
  }
  
  // Strict check for development environment
  const isDev = process.env.NODE_ENV === 'development';
  console.log(`[DEBUG] Auto-complete ${isDev ? 'ENABLED' : 'DISABLED'} based on NODE_ENV=${process.env.NODE_ENV}`);
  return isDev;
}; 