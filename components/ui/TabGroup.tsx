'use client';

import React, { useState, ReactNode } from 'react';

interface TabProps {
  tabs: { id: string; label: string; content: ReactNode }[];
  defaultTabId?: string;
  onChange?: (id: string) => void;
  className?: string;
  contentClassName?: string;
}

export function TabGroup({ 
  tabs, 
  defaultTabId, 
  onChange,
  className = '',
  contentClassName = '',
}: TabProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || (tabs.length > 0 ? tabs[0].id : ''));

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex border-b border-gray-200 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`py-3 px-5 font-button text-sm rounded-t-lg transition-all duration-200
              ${activeTab === tab.id 
                ? 'text-sg-bright-green border-b-2 border-sg-bright-green bg-white' 
                : 'text-gray-600 border-b-2 border-transparent hover:text-sg-dark-teal hover:border-gray-300 hover:bg-sg-light-mint/50'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`py-6 animate-fadeIn ${contentClassName}`}>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
} 