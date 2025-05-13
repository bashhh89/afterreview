'use client';

import React, { useEffect, useState } from 'react';
import ScorecardResultsDisplay from '@/components/ScorecardResultsDisplay';
import NoSidebarLayout from '@/components/NoSidebarLayout';

export default function ResultsDisplayPage() {
  const [reportMarkdown, setReportMarkdown] = useState<string>('');
  const [questionAnswerHistory, setQuestionAnswerHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showQA, setShowQA] = useState(false);
  const [sections, setSections] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // Load data from sessionStorage when component mounts
    if (typeof window !== 'undefined') {
      try {
        const reportData = sessionStorage.getItem('reportMarkdown');
        const historyData = sessionStorage.getItem('questionAnswerHistory');
        
        if (reportData) {
          setReportMarkdown(reportData);
          console.log('Results Display: Loaded reportMarkdown data');
          
          // Extract sections
          const extractedSections = extractSections(reportData);
          setSections(extractedSections);
        } else {
          console.error('No report data found in sessionStorage');
        }
        
        if (historyData) {
          setQuestionAnswerHistory(JSON.parse(historyData));
          console.log('Results Display: Loaded question history data');
        } else {
          console.error('No question history found in sessionStorage');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data from sessionStorage:', error);
        setIsLoading(false);
      }
    }
  }, []);

  // Function to extract sections from markdown
  const extractSections = (markdown: string) => {
    if (!markdown) return {};
    
    const sectionRegex = /## ([^\n]+)/g;
    const result: {[key: string]: string} = {};
    
    let match;
    let lastIndex = 0;
    let lastTitle = '';
    
    while ((match = sectionRegex.exec(markdown)) !== null) {
      if (lastTitle) {
        result[lastTitle] = markdown.substring(lastIndex, match.index).trim();
      }
      lastTitle = match[1];
      lastIndex = match.index;
    }
    
    if (lastTitle) {
      result[lastTitle] = markdown.substring(lastIndex).trim();
    }
    
    return result;
  };

  // Function to determine which tier the user is in
  const getUserTier = () => {
    const tierSection = sections['Overall Tier'] || '';
    if (tierSection.includes('Leader')) return 'Leader';
    if (tierSection.includes('Enabler')) return 'Enabler';
    if (tierSection.includes('Dabbler')) return 'Dabbler';
    return 'Unknown';
  };

  // Get tier-specific colors
  const getTierColors = () => {
    const tier = getUserTier();
    switch (tier) {
      case 'Leader':
        return { bg: 'bg-sg-bright-green', text: 'text-sg-dark-teal', light: 'bg-sg-light-mint' };
      case 'Enabler':
        return { bg: 'bg-sg-dark-teal', text: 'text-sg-bright-green', light: 'bg-sg-light-mint' };
      case 'Dabbler':
        return { bg: 'bg-sg-orange', text: 'text-sg-dark-teal', light: 'bg-sg-light-mint' };
      default:
        return { bg: 'bg-gray-500', text: 'text-gray-600', light: 'bg-gray-50' };
    }
  };

  const tierColors = getTierColors();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sg-light-mint">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-sg-light-mint border-t-sg-dark-teal rounded-full animate-spin mx-auto mb-8"></div>
          <h2 className="text-xl font-bold text-sg-dark-teal">Preparing Your Results</h2>
          <p className="text-sg-dark-teal/80 mt-2">Analyzing your assessment data...</p>
        </div>
      </div>
    );
  }

  if (!reportMarkdown) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-sg-light-mint">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 text-sg-dark-teal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-sg-dark-teal">No Results Found</h1>
          <p className="mb-8 text-sg-dark-teal/80">You need to complete the assessment first to view your personalized AI Efficiency Scorecard.</p>
          <a 
            href="/" 
            className="bg-sg-dark-teal text-white px-8 py-3 rounded-xl hover:bg-sg-dark-teal/90 transition-all shadow-lg hover:shadow-xl"
          >
            Start Assessment
          </a>
        </div>
      </div>
    );
  }

  // Enhanced interactive version
  return (
    <div className="min-h-screen bg-sg-light-mint pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-sg-dark-teal to-sg-bright-green text-white py-8 px-6 md:px-12 mb-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Efficiency Scorecard</h1>
          <p className="text-white/80 text-lg">Your detailed assessment results and recommendations</p>
          
          <div className="flex space-x-6 mt-8">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium rounded-lg transition-all ${activeTab === 'overview' 
                ? 'bg-white text-sg-dark-teal' 
                : 'text-white hover:bg-white/10'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('findings')}
              className={`px-4 py-2 font-medium rounded-lg transition-all ${activeTab === 'findings' 
                ? 'bg-white text-sg-dark-teal' 
                : 'text-white hover:bg-white/10'}`}
            >
              Key Findings
            </button>
            <button 
              onClick={() => setActiveTab('action-plan')}
              className={`px-4 py-2 font-medium rounded-lg transition-all ${activeTab === 'action-plan' 
                ? 'bg-white text-sg-dark-teal' 
                : 'text-white hover:bg-white/10'}`}
            >
              Action Plan
            </button>
            <button 
              onClick={() => setActiveTab('full-report')}
              className={`px-4 py-2 font-medium rounded-lg transition-all ${activeTab === 'full-report' 
                ? 'bg-white text-sg-dark-teal' 
                : 'text-white hover:bg-white/10'}`}
            >
              Full Report
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier Card */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`${tierColors.bg} px-6 py-8 text-white`}>
                  <h2 className="text-2xl font-bold mb-1">Your AI Tier</h2>
                  <p className="text-white/80 text-sm">Assessment Result</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-center">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center border-8 ${tierColors.bg} mb-4`}>
                      <span className="text-white text-4xl font-bold">{getUserTier().charAt(0)}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center text-sg-dark-teal mb-2">{getUserTier()}</h3>
                  <p className="text-center text-sg-dark-teal/80 mb-4">
                    {getUserTier() === 'Leader' && 'You\'re leading the pack in AI adoption and implementation!'}
                    {getUserTier() === 'Enabler' && 'You have a solid foundation in AI with room to grow!'}
                    {getUserTier() === 'Dabbler' && 'You\'re taking your first steps into the world of AI!'}
                  </p>
                  <div className="mt-4">
                    <button 
                      onClick={() => setActiveTab('full-report')}
                      className={`w-full ${tierColors.bg} text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity`}
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Plan Summary */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg h-full">
                <div className="px-6 py-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-sg-dark-teal">Strategic Action Plan</h2>
                  <p className="text-sg-dark-teal/80">Top recommendations based on your assessment</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {sections['Strategic Action Plan']?.split(/\d+\.\s+\*\*[^*]+\*\*/)
                      .slice(1, 4)
                      .map((item, index) => (
                        <div 
                          key={index}
                          className="flex items-start p-4 rounded-xl hover:bg-sg-light-mint transition-colors cursor-pointer"
                        >
                          <div className={`flex-shrink-0 ${tierColors.light} w-10 h-10 rounded-full flex items-center justify-center ${tierColors.text} font-bold mr-4`}>
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-bold text-sg-dark-teal mb-1">
                              {item.split(/\n/)[0].replace(/^\s*-\s*\*\*Sub-steps:\*\*.*$/s, '').trim()}
                            </h3>
                            <p className="text-sm text-sg-dark-teal/80">Click to expand details</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="mt-6">
                    <button 
                      onClick={() => setActiveTab('action-plan')}
                      className="w-full bg-sg-light-mint hover:bg-sg-light-mint/80 text-sg-dark-teal px-4 py-3 rounded-lg font-medium transition-colors"
                    >
                      See Full Action Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'findings' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-sg-dark-teal">Key Findings</h2>
                <p className="text-sg-dark-teal/80">Insights from your AI efficiency assessment</p>
              </div>
              <div className="p-6">
                <div className="whitespace-pre-line">
                  {sections['Key Findings']?.replace(/## Key Findings/g, '').replace(/\*\*/g, '')}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'action-plan' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-sg-dark-teal">Strategic Action Plan</h2>
                <p className="text-sg-dark-teal/80">Recommended steps to improve your AI efficiency</p>
              </div>
              <div className="p-6">
                <div className="whitespace-pre-line">
                  {sections['Strategic Action Plan']?.replace(/## Strategic Action Plan/g, '').replace(/\*\*/g, '')}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'full-report' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-sg-dark-teal">Full Assessment Report</h2>
              <button 
                onClick={() => setShowQA(!showQA)}
                className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow text-sg-dark-teal"
              >
                {showQA ? 'Hide Q&A History' : 'Show Q&A History'}
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <ScorecardResultsDisplay 
                reportMarkdown={reportMarkdown} 
                questionAnswerHistory={questionAnswerHistory} 
              />
            </div>
            
            {showQA && (
              <div className="mt-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-sg-dark-teal mb-4">Assessment Q&A History</h3>
                  <div className="space-y-4">
                    {questionAnswerHistory.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <p className="font-bold text-sg-dark-teal mb-2">Q: {item.question}</p>
                        <p className="text-sg-dark-teal/80">A: {typeof item.answer === 'string' ? item.answer : JSON.stringify(item.answer)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Compare designs link */}
        <div className="mt-8 text-center">
          <div className="inline-flex space-x-4">
            <a 
              href="/scorecard/results"
              className="text-sg-dark-teal/80 hover:text-sg-dark-teal transition-colors"
            >
              View New Design
            </a>
            <span className="text-gray-400">|</span>
            <a 
              href="/scorecard-dashboard-demo"
              className="text-sg-dark-teal/80 hover:text-sg-dark-teal transition-colors"
            >
              View Dashboard Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
