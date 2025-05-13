'use client';

import React from 'react';

interface NoSidebarLayoutProps {
  children: React.ReactNode;
}

export default function NoSidebarLayout({ children }: NoSidebarLayoutProps) {
  return (
    <div className="min-h-screen bg-sg-light-mint">
      {/* Main Content - Full width without sidebar */}
      <div className="w-full">
        <div className="content-container">
          {children}
        </div>
      </div>
    </div>
  );
} 