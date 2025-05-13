'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

// Component for Prompt Example Card
export const PromptExampleCard: React.FC<{ title: string; promptText: string }> = ({ 
  title, 
  promptText 
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 bg-slate-50 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <h4 className="font-medium text-slate-700">{title}</h4>
        <button 
          onClick={handleCopy} 
          className="text-slate-500 hover:text-slate-700 transition-colors"
          aria-label="Copy prompt text"
        >
          <FontAwesomeIcon icon={faCopy} className={copied ? 'text-green-500' : ''} />
          <span className="sr-only">Copy</span>
        </button>
      </div>
      <div className="p-4">
        <div className="bg-white border border-slate-200 rounded p-3 text-slate-700 font-mono text-sm whitespace-pre-wrap">
          {promptText}
        </div>
      </div>
    </div>
  );
}; 