'use client';

import React from 'react';

export const CongratulationsMessage: React.FC<{ message: string; subtext?: string }> = ({ 
  message,
  subtext
}) => (
  <div className="my-8 text-center">
    <div className="inline-block p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-3xl font-bold text-gray-800 mb-2">{message}</h2>
    {subtext && <p className="text-lg text-gray-600">{subtext}</p>}
  </div>
); 