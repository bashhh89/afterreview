'use client';

import React from 'react';
import Link from 'next/link';

interface ModuleNavigationProps {
  prevModule?: {
    id: string;
    label: string;
  };
  nextModule?: {
    id: string;
    label: string;
  };
  onModuleChange: (id: string) => void;
  backToCoursesUrl: string;
}

export default function ModuleNavigation({
  prevModule,
  nextModule,
  onModuleChange,
  backToCoursesUrl
}: ModuleNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-10 gap-8">
      <div className="flex-1">
        {prevModule ? (
          <button 
            onClick={() => onModuleChange(prevModule.id)}
            className="btn-secondary-divine flex items-center gap-2 hover:bg-sg-light-mint/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>{prevModule.label}</span>
          </button>
        ) : (
          <Link href={backToCoursesUrl} 
                className="btn-secondary-divine flex items-center gap-2 hover:bg-sg-light-mint/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Courses</span>
          </Link>
        )}
      </div>
      
      <div className="flex-1 flex justify-end">
        {nextModule ? (
          <button 
            onClick={() => onModuleChange(nextModule.id)}
            className="bg-sg-bright-green hover:bg-sg-bright-green/90 text-white font-button py-3 px-6 rounded-divine shadow-sm transition-colors flex items-center gap-2">
            <span>{nextModule.label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        ) : (
          <button 
            disabled
            className="bg-sg-bright-green/50 text-white font-button py-3 px-6 rounded-divine shadow-sm cursor-not-allowed flex items-center gap-2">
            <span>Complete Course</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
} 