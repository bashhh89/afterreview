'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Check if assessment is completed from session storage
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  
  // Check assessment status on component mount
  React.useEffect(() => {
    // Check if session storage has reportMarkdown which indicates assessment is completed
    const reportMarkdown = sessionStorage.getItem('reportMarkdown');
    setAssessmentCompleted(!!reportMarkdown);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const navItems = [
    {
      section: 'Assessment',
      links: [
        { href: '/', label: 'Dashboard', icon: 'home' },
        { href: '/assessment', label: 'Take Assessment', icon: 'clipboard' },
        { href: '/scorecard/results', label: 'View Results', icon: 'chart-bar' }
      ]
    },
    {
      section: 'Learning Hub',
      links: [
        { href: '/learning-hub', label: 'Learning Hub', icon: 'book-open' },
        { href: '/learning-hub/new-design', label: 'New Learning Hub', icon: 'book-open' },
        { href: '/learning-hub/templates', label: 'Templates', icon: 'template' },
        { href: '/learning-hub/recommended-tools', label: 'AI Tools', icon: 'tool' }
      ]
    }
  ];

  // Filter nav items based on assessment completion
  const getFilteredNavItems = () => {
    return navItems.map(section => {
      // For Learning Hub section, we need to filter out links if assessment is not completed
      if (section.section === 'Learning Hub' && !assessmentCompleted) {
        return {
          ...section,
          links: section.links.map(link => ({
            ...link,
            disabled: true,
            tooltip: 'Complete the assessment to unlock'
          }))
        };
      }
      return section;
    });
  };

  const filteredNavItems = getFilteredNavItems();

  // Function to render icons based on icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'clipboard':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'chart-bar':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'book-open':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'template':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case 'tool':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-sg-light-mint">
      {/* Sidebar */}
      <div className={`sg-sidebar ${sidebarCollapsed ? 'sg-sidebar-collapsed' : ''}`}>
        <div className="sg-sidebar-header">
          <div className="flex items-center">
            {!sidebarCollapsed && (
              <span className="text-xl font-semibold text-sg-bright-green">AI Scorecard</span>
            )}
            {sidebarCollapsed && (
              <span className="text-xl font-semibold text-sg-bright-green">AI</span>
            )}
          </div>
          <button 
            onClick={toggleSidebar} 
            className="text-white hover:text-sg-bright-green transition-colors duration-200"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {sidebarCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {filteredNavItems.map((item) => (
            <div key={item.section}>
              {!sidebarCollapsed && (
                <div className="sg-sidebar-section">{item.section}</div>
              )}
              {item.links.map((link) => {
                const isActive = pathname === link.href;
                const isDisabled = 'disabled' in link && link.disabled;
                
                return (
                  <div key={link.href} className="relative group">
                    <Link 
                      href={isDisabled ? '#' : link.href}
                      className={`sg-sidebar-link ${isActive ? 'active' : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={(e) => isDisabled && e.preventDefault()}
                    >
                      <span>{renderIcon(link.icon)}</span>
                      {!sidebarCollapsed && <span>{link.label}</span>}
                    </Link>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          {!sidebarCollapsed && (
            <div className="text-xs text-white/60">
              <p>Social Garden</p>
              <p>AI Efficiency Scorecard</p>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="text-xs text-white/60 text-center">SG</div>
          )}
        </div>
      </div>

      {/* Main Content - Updated to use new classes */}
      <div className={`main-content-wrapper ${sidebarCollapsed ? 'main-content-wrapper-expanded' : ''}`}>
        <div className="content-container">
          {children}
        </div>
      </div>

      {/* Mobile sidebar toggle - add for responsiveness */}
      <button 
        className="fixed bottom-4 right-4 md:hidden z-50 bg-sg-dark-teal text-white p-3 rounded-full shadow-lg"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
} 