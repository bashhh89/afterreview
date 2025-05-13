'use client';

import React from 'react';

interface ReportSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cardOrder: string[];
  cardTitles: Record<string, string>;
  companyName?: string; // Optional company name for display
}

const ReportSidebar: React.FC<ReportSidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  cardOrder, 
  cardTitles,
  companyName 
}) => {
  return (
    <div className="w-80 bg-sg-dark-teal text-white shadow-lg p-6 flex flex-col">
      <div className="mb-10 border-b border-white/10 pb-6">
        <div className="bg-divine-gradient text-transparent bg-clip-text">
          <h1 className="text-2xl font-bold tracking-tight">AI Efficiency</h1>
          <h2 className="text-3xl font-extrabold tracking-tighter">SCORECARD</h2>
        </div>
        <div className="mt-2 text-white/70 font-medium">
          {companyName ? `Report for ${companyName}` : 'Executive Dashboard'}
        </div>
      </div>
      
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
        {cardOrder.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`sidebar-nav-item ${
              activeTab === key 
                ? 'active' 
                : ''
            }`}
          >
            <div className={`w-1.5 h-10 rounded-full transition-all duration-300 ${
              activeTab === key ? 'bg-sg-bright-green' : 'bg-white/20'
            }`}></div>
            <span className={`text-lg ${activeTab === key ? 'font-semibold' : 'font-medium'}`}>
              {cardTitles[key]}
            </span>
            
            {/* Add an arrow indicator for active tab */}
            {activeTab === key && (
              <svg 
                className="ml-auto h-5 w-5 text-sg-bright-green" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white/70">Powered by</span>
          <span className="text-sm font-bold text-sg-bright-green">Social Garden</span>
        </div>
      </div>
    </div>
  );
};

export default ReportSidebar; 