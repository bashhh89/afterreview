'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ModuleItem {
  id: string;
  label: string;
  completed?: boolean;
}

interface MiniFloatingSidebarProps {
  modules: ModuleItem[];
  activeModuleId: string;
  onModuleChange: (id: string) => void;
  className?: string;
}

export default function MiniFloatingSidebar({
  modules,
  activeModuleId,
  onModuleChange,
  className = '',
}: MiniFloatingSidebarProps) {
  return (
    <div className={`sticky top-8 ml-6 ${className}`}>
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-4 border border-sg-bright-green/10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-sg-dark-teal mb-4 px-2">Course Modules</h3>
        
        <div className="space-y-1">
          {modules.map((module, index) => {
            const isActive = module.id === activeModuleId;
            const isCompleted = module.completed;
            
            // Extract descriptive title or use the full label if it's not a generic "Module X" format
            const displayLabel = module.label.startsWith('Module') && module.label.split(' ').length <= 2
              ? `${module.label}: ${getModuleTitle(module.id)}` 
              : module.label;
            
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={`relative w-full px-3 py-2 text-left rounded-lg transition-all text-sm
                  ${isActive 
                    ? 'bg-sg-bright-green/10 text-sg-bright-green font-medium' 
                    : isCompleted
                      ? 'text-sg-dark-teal hover:bg-sg-light-mint/50' 
                      : 'text-sg-dark-teal/80 hover:bg-sg-light-mint/30'
                  }`}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mr-2 mt-0.5
                    ${isActive 
                      ? 'bg-sg-bright-green text-white' 
                      : isCompleted 
                        ? 'bg-sg-bright-green/20 text-sg-bright-green' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className="line-clamp-2">{displayLabel}</span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

// Helper function to get descriptive titles for modules with generic labels
function getModuleTitle(id: string): string {
  const moduleTitles: Record<string, string> = {
    'introduction': 'Introduction',
    'module1': 'The Absolute Basics',
    'module2': 'The 5 Golden Keys',
    'module3': 'Prompt Recipes',
    'module4': 'Mastering Iteration',
    'module5': 'Practical Applications',
    'section-0': 'Getting Started',
    'section-1': 'Core Concepts',
    'section-2': 'Advanced Techniques',
    'section-3': 'Practical Examples',
    'section-4': 'Case Studies',
    'section-5': 'Implementation Guide',
    'section-overview': 'Overview',
    // Add more mappings as needed
  };
  
  return moduleTitles[id] || 'Content';
} 