'use client';

import React, { useState, ReactNode } from 'react';

interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems(
        openItems.includes(id)
          ? openItems.filter(itemId => itemId !== id)
          : [...openItems, id]
      );
    } else {
      setOpenItems(openItems.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <div
            key={item.id}
            className={`divine-card p-0 ${
              isOpen 
                ? 'border-l-4 border-sg-bright-green border-t-0 border-r-0 border-b-0 pl-0' 
                : ''
            }`}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full flex justify-between items-center p-5 cursor-pointer transition-all text-left rounded-divine ${
                isOpen ? 'bg-gradient-to-r from-sg-light-mint to-white' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                {item.icon && <div className="text-sg-bright-green">{item.icon}</div>}
                <h3 className={`font-title-card ${isOpen ? 'text-sg-bright-green' : 'text-sg-dark-teal'}`}>
                  {item.title}
                </h3>
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm transition-all duration-300 ${isOpen ? 'bg-sg-bright-green/10 border-sg-bright-green/30' : ''}`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke={isOpen ? "#20E28F" : "#103138"} 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </button>
            
            {/* Accordion Content */}
            {isOpen && (
              <div className="p-6 bg-white">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
} 