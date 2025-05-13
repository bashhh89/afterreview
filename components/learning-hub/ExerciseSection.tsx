'use client';

import React, { useState } from 'react';

export const ExerciseSection: React.FC<{ title: string; description: string; defaultText?: string }> = ({
  title,
  description,
  defaultText = ''
}) => {
  const [userInput, setUserInput] = useState(defaultText);
  
  return (
    <div className="my-6 p-5 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-xl font-bold text-[#103138] mb-3">{title}</h3>
      <p className="text-[#103138]/80 mb-4">{description}</p>
      
      <div className="bg-white border border-blue-200 rounded-lg p-2 shadow-inner">
        <textarea 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full min-h-[150px] p-3 focus:outline-none text-[#103138]"
          placeholder="Type your response here..."
        />
      </div>
      
      <div className="flex justify-end mt-3">
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Response
        </button>
      </div>
    </div>
  );
}; 