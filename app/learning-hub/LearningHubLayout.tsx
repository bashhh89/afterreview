"use client";
import React, { useEffect, useRef, Suspense } from 'react';
import Link from 'next/link'; // Import Link
import SidebarNavComponent from '../../components/learning-hub/SidebarNav';

interface SidebarLink {
  title: string;
  href: string;
}

// Mock user data (will need to be replaced with actual user data later)
const mockUser = {
  name: 'User',
  avatar: '',
  tier: 'Dabbler'
};

interface LearningHubLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (sectionTitle: string) => void;
  links: SidebarLink[]; // Add links prop
}

export default function LearningHubLayout({ children, activeSection, onSectionChange, links }: LearningHubLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const prevScrollRef = useRef<number>(0);

  // Save scroll position before section change and restore it after
  useEffect(() => {
    if (contentRef.current) {
      // Store the current scroll position to restore it
      contentRef.current.scrollTop = prevScrollRef.current;
    }
  }, [activeSection]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-brand-light-mint">
      {/* Sidebar: updated background to brand-dark-teal */}
      <aside className="w-full md:w-80 bg-brand-dark-teal flex-shrink-0 relative z-20 shadow-xl border-r border-brand-dark-teal/50">
        <SidebarNavComponent
          links={links} // Use the links prop
          userName={mockUser.name}
          tier={mockUser.tier}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      </aside>
      
      {/* Main Content Area */}
      <main
        ref={contentRef}
        className="flex-1 overflow-y-auto relative"
      >
        <Suspense fallback={<div>Loading...</div>}>
          {/* Content card with shadow */}
          <div className="relative mt-8 animate-sg-fade-in p-4 md:p-8 lg:p-12">
            {/* Shadow/glow effect for the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-dark-teal/10 blur-xl rounded-xl transform translate-y-4 scale-95 z-0"></div>
            
            {/* Main content card */}
            <div className={`relative bg-brand-white border border-gray-200 rounded-xl p-6 md:p-8 lg:p-10 shadow-lg z-10 transition-all duration-200`}>
              {children}
            </div>
          </div>
        </Suspense>
      </main>
    </div>
  );
}
