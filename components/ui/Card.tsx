'use client';

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'accent' | 'filled' | 'divine';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  hover = true,
}: CardProps) => {
  // Base styles
  let baseStyles = 'rounded-lg overflow-hidden transition-all duration-200';
  
  // Size styles
  const sizeStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  // Variant styles
  const variantStyles = {
    default: 'bg-white border border-gray-200 shadow-sm',
    outline: 'bg-white border-2 border-sg-bright-green/20',
    accent: 'bg-white border-l-4 border-sg-bright-green border-t border-r border-b border-gray-200',
    filled: 'bg-sg-light-mint border border-sg-bright-green/20',
    divine: 'divine-card' // Use the divine-card class from globals.css
  };
  
  // Hover styles - disabled for divine variant as hover is handled in the divine-card class
  const hoverStyles = hover && variant !== 'divine' 
    ? 'hover:shadow-md hover:border-sg-bright-green/30 hover:transform hover:translate-y-[-2px]' 
    : '';
  
  // Don't apply size padding for divine variant as it's handled in the component
  const appliedSizeStyle = variant === 'divine' ? '' : sizeStyles[size];
  
  const combinedClassName = `${baseStyles} ${appliedSizeStyle} ${variantStyles[variant]} ${hoverStyles} ${className}`;
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className = '',
  withBorder = true
}: {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
}) => {
  const borderStyle = withBorder ? 'border-b border-gray-100 mb-4 pb-4' : 'mb-4';
  return (
    <div className={`${borderStyle} ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={`font-title-card flex items-center ${className}`}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={`font-body-sm mt-1 ${className}`}>
      {children}
    </p>
  );
};

export const CardContent = ({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const CardFooter = ({
  children,
  className = '',
  withBorder = true
}: {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
}) => {
  const borderStyle = withBorder ? 'border-t border-gray-100 mt-4 pt-4' : 'mt-4';
  return (
    <div className={`${borderStyle} ${className}`}>
      {children}
    </div>
  );
}; 