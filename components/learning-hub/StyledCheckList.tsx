'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

// Component for styled lists with checkmarks
export const StyledCheckList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2 my-4">
    {items.map((item, index) => (
      <li key={index} className="flex items-center text-emerald-700">
        <span className="bg-brand-mint-green text-brand-dark-teal rounded-full w-6 h-6 text-sm flex items-center justify-center mr-3 shadow-sm">
          <FontAwesomeIcon icon={faLightbulb} />
        </span>
        {item}
      </li>
    ))}
  </ul>
); 