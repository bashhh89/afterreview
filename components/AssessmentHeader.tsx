'use client';

import React from 'react';

interface AssessmentHeaderProps {
  currentStep: string;
  currentQuestionNumber: number;
  maxQuestions: number;
  onStartAssessment?: () => void;
  isStarted: boolean;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  currentStep,
  currentQuestionNumber,
  maxQuestions,
  onStartAssessment,
  isStarted
}) => {
  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          {/* Logo & Title */}
          <div className="mr-6">
            <div className="text-sg-mint-green font-bold text-lg">AI Efficiency</div>
            <div className="text-sg-dark-teal font-extrabold text-2xl tracking-tight">SCORECARD</div>
          </div>
          
          {/* Separator */}
          <div className="h-12 w-px bg-gray-200 mx-4 hidden md:block"></div>
          
          {/* Assessment Stage */}
          <div className="hidden md:block">
            <div className="text-gray-500 text-sm">Current Phase</div>
            <div className="text-sg-dark-teal font-semibold">{currentStep === 'landing' ? 'Getting Started' : currentStep === 'assessment' ? 'Answering Questions' : 'Viewing Results'}</div>
          </div>
        </div>
        
        {/* Progress */}
        {currentStep === 'assessment' && isStarted && (
          <div className="flex items-center bg-sg-light-mint px-4 py-2 rounded-lg">
            <div className="flex flex-col mr-4">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sg-dark-teal font-bold">{Math.round((currentQuestionNumber / maxQuestions) * 100)}%</span>
            </div>
            <div className="w-40 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-sg-mint-green to-[#00C4B8] h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentQuestionNumber / maxQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Action Button */}
        {currentStep === 'landing' && !isStarted && onStartAssessment && (
          <button
            onClick={onStartAssessment}
            className="bg-gradient-to-r from-sg-mint-green to-[#00C4B8] hover:from-sg-mint-green hover:to-[#00A89F] text-sg-dark-teal font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
          >
            Start Assessment
          </button>
        )}
        
        {/* Help Button */}
        {currentStep === 'assessment' && isStarted && (
          <button className="text-gray-500 hover:text-sg-dark-teal font-medium flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Help
          </button>
        )}
      </div>
      
      {/* Mobile view: Assessment stage info */}
      <div className="md:hidden text-center pb-2 border-t border-gray-100 pt-2 bg-gray-50">
        <div className="text-sg-dark-teal font-medium">{currentStep === 'landing' ? 'Getting Started' : currentStep === 'assessment' ? 'Answering Questions' : 'Viewing Results'}</div>
      </div>
    </div>
  );
};

export default AssessmentHeader; 