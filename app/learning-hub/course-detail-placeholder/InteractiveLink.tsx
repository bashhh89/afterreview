"use client";

import Link from 'next/link';
import { useState } from 'react';

interface InteractiveLinkProps {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  baseBackgroundColor: string;
  hoverBackgroundColor: string;
}

export default function InteractiveLink({ 
  href, 
  children, 
  style,
  baseBackgroundColor,
  hoverBackgroundColor 
}: InteractiveLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const combinedStyle: React.CSSProperties = {
    ...style,
    backgroundColor: isHovered ? hoverBackgroundColor : baseBackgroundColor,
  };

  return (
    <Link 
      href={href} 
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
} 