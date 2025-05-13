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
    <div className="w-80 bg-white shadow-xl border-r border-gray-100 p-8 flex flex-col">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-sg-bright-green tracking-tight">AI Efficiency</h1>
        <h2 className="text-3xl font-extrabold text-sg-dark-teal tracking-tighter">SCORECARD</h2>
        <div className="mt-2 text-gray-600 font-light">
          {companyName ? `${companyName} Dashboard` : 'Executive Dashboard'}
        </div>
      </div>
      
      <div className="flex flex-col gap-3 flex-1">
        {cardOrder.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
              activeTab === key 
                ? 'bg-sg-bright-green text-sg-dark-teal shadow-md border-l-4 border-sg-dark-teal' 
                : 'hover:bg-sg-light-mint text-gray-600 hover:text-sg-dark-teal hover:border-l-2 hover:border-sg-bright-green/50'
            }`}
          >
            <div className={`w-2 h-12 rounded-full transition-all duration-300 ${
              activeTab === key ? 'bg-sg-dark-teal' : 'bg-gray-300 group-hover:bg-sg-bright-green/50'
            }`}></div>
            <span className={`text-lg ${activeTab === key ? 'font-semibold' : 'font-medium'}`}>
              {cardTitles[key]}
            </span>
            
            {/* Add a subtle arrow indicator for active tab */}
            {activeTab === key && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-auto text-sg-dark-teal" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-auto pt-8 border-t border-gray-200 flex justify-between items-center">
        <button className="text-gray-500 hover:text-sg-dark-teal transition-colors p-2 rounded-full hover:bg-sg-light-mint">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
        <button className="bg-sg-bright-green hover:bg-sg-bright-green/90 text-sg-dark-teal px-5 py-2 rounded-lg transition-all font-medium shadow-sm hover:shadow-md">
          New Assessment
        </button>
      </div>
    </div>
  );
};

export default ReportSidebar; 