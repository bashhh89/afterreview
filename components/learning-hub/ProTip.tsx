'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

// Component for Pro Tips
export const ProTip: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 text-amber-800 rounded-r-lg shadow">
    <h4 className="font-bold flex items-center text-[#103138]">
      <FontAwesomeIcon icon={faLightbulb} className="mr-2 text-amber-500" />
      {title}
    </h4>
    {children}
  </div>
); 