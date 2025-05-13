'use client';

import React, { useState } from 'react';

interface QuestionAnswer {
  question: string;
  answer: string;
  answerSource?: string;
  reasoningText?: string;
  phaseName?: string;
}

interface AssessmentQABreakdownSectionProps {
  questionAnswerHistory: QuestionAnswer[];
}

const AssessmentQABreakdownSection: React.FC<AssessmentQABreakdownSectionProps> = ({ 
  questionAnswerHistory 
}) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  
  // Group questions by phase if available
  const questionsByPhase: Record<string, QuestionAnswer[]> = {};
  
  questionAnswerHistory.forEach(qa => {
    const phase = qa.phaseName || 'Other';
    if (!questionsByPhase[phase]) {
      questionsByPhase[phase] = [];
    }
    questionsByPhase[phase].push(qa);
  });

  // If no phases are available or all questions are unphased
  const phases = Object.keys(questionsByPhase).length > 0 
    ? Object.keys(questionsByPhase) 
    : ['All Questions'];

  const toggleQuestion = (index: number) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  // Get an appropriate icon for each question based on content
  const getQuestionIcon = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('strategy') || lowerQuestion.includes('goal')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    } else if (lowerQuestion.includes('team') || lowerQuestion.includes('people') || lowerQuestion.includes('staff')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    } else if (lowerQuestion.includes('data') || lowerQuestion.includes('information')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      );
    } else if (lowerQuestion.includes('technology') || lowerQuestion.includes('tool') || lowerQuestion.includes('software')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6V4M12 6a2 2 0 0 0-2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1M12 6a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1"></path>
        </svg>
      );
    } else if (lowerQuestion.includes('budget') || lowerQuestion.includes('fund') || lowerQuestion.includes('money') || lowerQuestion.includes('invest')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
          <path d="M12 18V6"></path>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="17" x2="12" y2="17"></line>
        </svg>
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section with Introduction */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-[#103138] mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#20E28F" className="w-6 h-6 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          Assessment Questions & Answers
        </h2>
        <p className="text-[#103138]/80 leading-relaxed mb-2">
          Below is a complete breakdown of all questions from your assessment and the responses you provided.
          This data forms the foundation of your AI maturity analysis and recommendations.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-white to-[#F3FDF5] p-6 rounded-xl shadow-sm border border-[#20E28F]/10 transition-all duration-300 hover:shadow-md hover:border-[#20E28F]/30">
          <div className="text-3xl font-bold text-[#103138] mb-2">{questionAnswerHistory.length}</div>
          <div className="text-[#103138]/70 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#20E28F" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Questions Answered
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#F3FDF5] p-6 rounded-xl shadow-sm border border-[#20E28F]/10 transition-all duration-300 hover:shadow-md hover:border-[#20E28F]/30">
          <div className="text-3xl font-bold text-[#103138] mb-2">{Object.keys(questionsByPhase).length}</div>
          <div className="text-[#103138]/70 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#20E28F" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
            </svg>
            Assessment Categories
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-[#F3FDF5] p-6 rounded-xl shadow-sm border border-[#20E28F]/10 transition-all duration-300 hover:shadow-md hover:border-[#20E28F]/30">
          <div className="text-3xl font-bold text-[#103138] mb-2">100%</div>
          <div className="text-[#103138]/70 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#20E28F" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Completion Rate
          </div>
        </div>
      </div>

      {phases.length > 1 ? (
        // Render questions grouped by phase
        phases.map((phase, phaseIndex) => (
          <div key={phase} className="mb-10">
            <div className="flex items-center mb-4 pb-2 border-b border-[#20E28F]/20">
              <div className="w-8 h-8 rounded-full bg-[#F3FDF5] flex items-center justify-center mr-3 border border-[#20E28F]/20">
                <span className="text-[#103138] font-bold">{phaseIndex + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-[#103138]">{phase}</h3>
            </div>
            
            <div className="space-y-4 pl-4">
              {questionsByPhase[phase].map((qa, qaIndex) => {
                const globalIndex = questionAnswerHistory.findIndex(q => q === qa);
                const isEven = qaIndex % 2 === 0;
                
                return (
                  <div 
                    key={qaIndex} 
                    className={`border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md ${
                      expandedQuestion === globalIndex 
                        ? 'border-[#20E28F]/50 bg-white shadow-md' 
                        : isEven
                          ? 'border-gray-100 bg-white' 
                          : 'border-gray-100 bg-[#FAFFFE]'
                    }`}
                  >
                    <div 
                      className="flex items-start gap-3 p-5 cursor-pointer" 
                      onClick={() => toggleQuestion(globalIndex)}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 
                        ${expandedQuestion === globalIndex 
                          ? 'bg-[#20E28F] text-white'
                          : 'bg-[#F3FDF5] text-[#103138]'
                        }`}
                      >
                        {getQuestionIcon(qa.question)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-[#103138] mb-2">{qa.question}</h4>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="text-[#103138]/90">
                            {typeof qa.answer === 'string' ? qa.answer : JSON.stringify(qa.answer)}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${expandedQuestion === globalIndex ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {expandedQuestion === globalIndex && qa.reasoningText && (
                      <div className="px-5 pb-5 pt-0 border-t border-gray-100 bg-[#FAFFFE]">
                        <div className="ml-13 pl-10">
                          <div className="mt-4 bg-white p-4 rounded-lg border border-[#20E28F]/10 shadow-sm">
                            <p className="text-sm font-medium text-[#103138] mb-2 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#20E28F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              Assessment Reasoning
                            </p>
                            <p className="text-[#103138]/80 whitespace-pre-line">{qa.reasoningText}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        // Render all questions without phases
        <div className="space-y-4">
          {questionAnswerHistory.length > 0 ? (
            questionAnswerHistory.map((qa, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  className={`border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md ${
                    expandedQuestion === index 
                      ? 'border-[#20E28F]/50 bg-white shadow-md' 
                      : isEven
                        ? 'border-gray-100 bg-white' 
                        : 'border-gray-100 bg-[#FAFFFE]'
                  }`}
                >
                  <div 
                    className="flex items-start gap-3 p-5 cursor-pointer" 
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 
                      ${expandedQuestion === index 
                        ? 'bg-[#20E28F] text-white'
                        : 'bg-[#F3FDF5] text-[#103138]'
                      }`}
                    >
                      {getQuestionIcon(qa.question)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#103138] mb-2">{qa.question}</h4>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-[#103138]/90">
                          {typeof qa.answer === 'string' ? qa.answer : JSON.stringify(qa.answer)}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${expandedQuestion === index ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {expandedQuestion === index && qa.reasoningText && (
                    <div className="px-5 pb-5 pt-0 border-t border-gray-100 bg-[#FAFFFE]">
                      <div className="ml-13 pl-10">
                        <div className="mt-4 bg-white p-4 rounded-lg border border-[#20E28F]/10 shadow-sm">
                          <p className="text-sm font-medium text-[#103138] mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#20E28F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Assessment Reasoning
                          </p>
                          <p className="text-[#103138]/80 whitespace-pre-line">{qa.reasoningText}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#F3FDF5] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#20E28F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#103138] mb-2">No Assessment Data Available</h3>
              <p className="text-[#103138]/70 max-w-md mx-auto">
                The assessment data could not be found or has not been generated yet. Please complete the assessment to view your results.
              </p>
              <button className="mt-6 px-6 py-2 bg-[#20E28F] text-white rounded-full font-medium shadow hover:shadow-md transition-all">
                Start Assessment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentQABreakdownSection; 