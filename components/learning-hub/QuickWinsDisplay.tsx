"use client";

import React, { useState } from 'react';

interface QuickWin {
  title: string;
  description: string;
  actions: string[];
}

interface QuickWinsDisplayProps {
  wins: QuickWin[];
}

const QuickWinsDisplay: React.FC<QuickWinsDisplayProps> = ({ wins }) => {
  const [currentWinIndex, setCurrentWinIndex] = useState(0);
  const currentWin = wins[currentWinIndex];

  const handleNext = () => {
    if (currentWinIndex < wins.length - 1) {
      setCurrentWinIndex(currentWinIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentWinIndex > 0) {
      setCurrentWinIndex(currentWinIndex - 1);
    }
  };

  if (!currentWin) {
    return <div>No quick wins found.</div>; // Handle case with no wins
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-[#103138]">Your AI Quick Wins</h2>

      {/* Progress Indicator */}
      <div className="text-lg text-[#103138]/80">
        Win {currentWinIndex + 1} of {wins.length}
      </div>

      {/* Current Win Display */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-[#20E28F] mb-3">Win {currentWinIndex + 1}: {currentWin.title}</h3>
        <p className="text-[#103138]/90 mb-4">{currentWin.description}</p>
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-[#103138]">Actions:</h4>
          <ul className="list-disc list-inside space-y-2 text-[#103138]/80">
            {currentWin.actions.map((action, actionIndex) => (
              <li key={actionIndex}>{action}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentWinIndex === 0}
          className="bg-gray-200 text-[#103138] font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous Win
        </button>
        {currentWinIndex < wins.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-sg-bright-green text-[#103138] font-semibold py-2 px-4 rounded"
          >
            Next Win
          </button>
        ) : (
          <div className="text-lg font-bold text-sg-bright-green">Course Complete!</div>
        )}
      </div>
    </div>
  );
};

export default QuickWinsDisplay;
