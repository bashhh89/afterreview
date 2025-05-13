import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'medium', className = '' }) => {
  // Determine size classes
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const spinnerSize = sizeClasses[size];
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${spinnerSize} border-4 border-sg-bright-green/20 border-t-sg-bright-green rounded-full animate-spin`} 
           role="status" 
           aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}; 