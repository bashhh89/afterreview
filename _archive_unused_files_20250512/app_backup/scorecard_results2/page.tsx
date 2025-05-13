'use client';
import React, { useMemo, useState, useEffect } from 'react';
import ReportSidebar from '@/components/scorecard/ReportSidebar';
import MainContentHeader from '@/components/scorecard/MainContentHeader';
import OverallTierSection from '@/components/scorecard/sections/OverallTierSection';
import KeyFindingsSection from '@/components/scorecard/sections/KeyFindingsSection';
import StrategicActionPlanSection from '@/components/scorecard/sections/StrategicActionPlanSection';
import GettingStartedResourcesSection from '@/components/scorecard/sections/GettingStartedResourcesSection';
import IllustrativeBenchmarksSection from '@/components/scorecard/sections/IllustrativeBenchmarksSection';
import PersonalizedLearningPathSection from '@/components/scorecard/sections/PersonalizedLearningPathSection';
import AssessmentQABreakdownSection from '@/components/scorecard/sections/AssessmentQABreakdownSection';
import LearningHubDirectionSection from '@/components/scorecard/sections/LearningHubDirectionSection';

// Helper to extract sections from the Markdown string
function extractSections(markdown: string): Record<string, string> {
  if (!markdown) return {};
  const sectionRegex = /(^##\s+.*$)/gim;
  const parts = markdown.split(sectionRegex).filter(Boolean);
  const sections: Record<string, string> = {};
  let currentTitleKey = '';
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (part.startsWith('##')) {
      currentTitleKey = part.replace(/^##\s*/, '').trim();
      // Ensure 'Overall Tier' is specifically captured if its title is slightly different in markdown
      if (currentTitleKey.toLowerCase().startsWith('overall tier')) {
        sections['Overall Tier'] = (sections['Overall Tier'] || '') + part + '\n\n' + (parts[i + 1] || '');
      } else {
        sections[currentTitleKey] = (sections[currentTitleKey] || '') + part + '\n\n' + (parts[i + 1] || '');
      }
      i++; // Skip next part as it's content of current section
    } else if (currentTitleKey) {
      // Append content if it was split unexpectedly
      sections[currentTitleKey] = (sections[currentTitleKey] || '') + '\n\n' + part;
    }
  }
  return sections;
}

const cardOrder = [
  'Overall Tier',
  'Key Findings',
  'Strategic Action Plan',
  'Getting Started & Resources',
  'Illustrative Benchmarks',
  'Personalized Learning Path',
  'Learning Hub',
  'Assessment Q&A Breakdown',
];

const cardTitles: Record<string, string> = {
  'Overall Tier': 'Your AI Tier',
  'Key Findings': 'Key Findings',
  'Strategic Action Plan': 'Strategic Action Plan',
  'Getting Started & Resources': 'Getting Started & Resources',
  'Illustrative Benchmarks': 'Illustrative Benchmarks',
  'Personalized Learning Path': 'Personalized Learning Path',
  'Learning Hub': 'Continue Your Journey',
  'Assessment Q&A Breakdown': 'Assessment Q&A Breakdown',
};

export default function ScorecardResultsPage() {
  // State to store the report and history data loaded from sessionStorage
  const [reportMarkdown, setReportMarkdown] = useState<string>('');
  const [questionAnswerHistory, setQuestionAnswerHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabChanging, setTabChanging] = useState(false);

  // Load data from sessionStorage when component mounts
  useEffect(() => {
    // Function to load data from sessionStorage
    const loadDataFromStorage = () => {
      try {
        const reportData = sessionStorage.getItem('reportMarkdown');
        const historyData = sessionStorage.getItem('questionAnswerHistory');
        
        if (reportData) {
          setReportMarkdown(reportData);
          console.log('FRONTEND: Loaded reportMarkdown:', reportData.substring(0, 100) + '...');
        } else {
          console.error('No report data found in sessionStorage');
        }
        
        if (historyData) {
          setQuestionAnswerHistory(JSON.parse(historyData));
          console.log('FRONTEND: Loaded questionAnswerHistory:', JSON.parse(historyData).length, 'items');
        } else {
          console.error('No question history found in sessionStorage');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data from sessionStorage:', error);
        setIsLoading(false);
      }
    };
    
    // Load data if in browser environment
    if (typeof window !== 'undefined') {
      loadDataFromStorage();
    }
  }, []);

  const sections = useMemo(() => {
    const extracted = extractSections(reportMarkdown);
    console.log('FRONTEND: Extracted sections:', extracted);
    return extracted;
  }, [reportMarkdown]);
  
  const extractedTier = useMemo(() => {
    if (!sections['Overall Tier']) return null;
    const tierRegex = /^##\s*Overall Tier:\s*(.*)$/im;
    const match = sections['Overall Tier']?.match(tierRegex);
    return match ? match[1].trim() : null;
  }, [sections]);

  const [activeTab, setActiveTab] = useState(cardOrder[0]);
  
  // Handle tab change with animation
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    
    setTabChanging(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTabChanging(false);
    }, 200);
  };
  
  // Effect to reset to the first tab if reportMarkdown changes
  useEffect(() => {
    setActiveTab(cardOrder[0]);
  }, [reportMarkdown]);

  const currentSectionMarkdown = sections[activeTab] || '';

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-sg-light-mint text-sg-dark-teal font-sans flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-20 h-20 border-4 border-sg-bright-green/20 border-t-sg-bright-green rounded-full animate-spin mx-auto mb-8"></div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sg-dark-teal to-sg-bright-green mb-2">Loading Your Scorecard</h2>
          <p className="text-sg-dark-teal/80 mt-2">Your insights are being prepared...</p>
        </div>
      </div>
    );
  }

  // Show error state if no data was found
  if (!reportMarkdown) {
    return (
      <div className="min-h-screen bg-sg-light-mint text-sg-dark-teal font-sans flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto p-10 bg-white rounded-3xl shadow-2xl animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 text-sg-bright-green">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sg-dark-teal to-sg-bright-green mb-4">Scorecard Not Found</h2>
          <p className="text-sg-dark-teal/80 mb-8">We couldn't find your scorecard results. You may need to complete the assessment first.</p>
          
          <div className="flex flex-col gap-4 mt-4">
            <a 
              href="/" 
              className="px-6 py-3 bg-gradient-to-r from-sg-dark-teal to-sg-bright-green text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Start Assessment
            </a>
            
            <button
              onClick={() => {
                // Attempt to recover from localStorage if available
                const localReport = localStorage.getItem('reportMarkdown');
                const localHistory = localStorage.getItem('questionAnswerHistory');
                
                if (localReport) {
                  // Save to sessionStorage and reload
                  sessionStorage.setItem('reportMarkdown', localReport);
                  if (localHistory) {
                    sessionStorage.setItem('questionAnswerHistory', localHistory);
                  }
                  window.location.reload();
                } else {
                  alert('No backup data found. Please complete the assessment again.');
                }
              }}
              className="px-6 py-3 bg-white border-2 border-sg-light-mint text-sg-dark-teal rounded-full font-medium hover:bg-sg-light-mint transition-colors"
            >
              Try to Recover Data
            </button>
          </div>
          
          <p className="text-xs text-sg-dark-teal/70 mt-8">
            This error may occur if your session expired or if you're viewing this page without completing the assessment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sg-light-mint text-sg-dark-teal font-sans">
      {/* Background elements */}
      <div className="absolute inset-0 bg-pattern-grid opacity-5 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-bl from-sg-light-mint via-transparent to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-sg-light-mint via-transparent to-transparent z-0"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-40 left-20 w-96 h-96 rounded-full bg-sg-bright-green/20 opacity-50 blur-4xl z-0"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-sg-dark-teal/20 opacity-50 blur-4xl z-0"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left sidebar with modern design */}
        <div className="lg:w-72 bg-white/80 backdrop-blur-md shadow-lg p-6 flex flex-col">
          <div className="mb-8">
            <div className="text-2xl font-bold text-sg-dark-teal mb-1">AI Scorecard</div>
            <div className="text-sm text-gray-500">Your personalized assessment results</div>
          </div>
          
          <nav className="flex-grow">
            <ul className="space-y-1">
              {cardOrder.map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => handleTabChange(tab)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center ${
                      activeTab === tab
                        ? 'bg-sg-bright-green text-white shadow-md'
                        : 'text-sg-dark-teal/70 hover:bg-sg-light-mint'
                    }`}
                  >
                    <span className="truncate">{cardTitles[tab]}</span>
                    {activeTab === tab && (
                      <svg className="ml-auto h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-auto pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sg-dark-teal/70 hover:text-sg-dark-teal transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              <a href="/" className="text-sm font-medium">Back to Assessment</a>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 p-4 lg:p-10 overflow-y-auto">
          {/* Header with action buttons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 bg-white/60 backdrop-blur-sm p-5 rounded-2xl shadow-sm">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sg-dark-teal to-sg-bright-green">
                {cardTitles[activeTab]}
              </h1>
              <p className="text-sg-dark-teal/80 mt-1">
                {activeTab === 'Overall Tier' ? 'Your AI maturity assessment results' : 
                 activeTab === 'Key Findings' ? 'Strengths and areas for improvement' :
                 activeTab === 'Strategic Action Plan' ? 'Your personalized next steps' :
                 activeTab === 'Assessment Q&A Breakdown' ? 'Your responses to the assessment' :
                 'Insights and recommendations'}
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button 
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-sg-dark-teal bg-sg-light-mint hover:bg-sg-light-mint/80 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              
              <button 
                onClick={() => {
                  const element = document.createElement('a');
                  const file = new Blob([reportMarkdown], {type: 'text/markdown'});
                  element.href = URL.createObjectURL(file);
                  element.download = 'AI_Scorecard_Report.md';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-sg-bright-green rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>
          </div>
          
          {/* Content card with modern design */}
          <div className="relative animate-fade-in">
            {/* Content card */}
            <div className={`bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-6 lg:p-10 shadow-xl ${
              tabChanging ? 'opacity-0 transform translate-y-4 transition-all duration-200' : 
                          'opacity-100 transform translate-y-0 transition-all duration-200'
            }`}>
              {/* Overall Tier Section */}
              {activeTab === 'Overall Tier' && sections['Overall Tier'] && (
                <OverallTierSection
                  markdownContent={sections['Overall Tier']}
                  extractedTier={extractedTier}
                />
              )}
              
              {/* Key Findings Section */}
              {activeTab === 'Key Findings' && sections['Key Findings'] && (
                <KeyFindingsSection markdownContent={sections['Key Findings']} />
              )}
              
              {/* Strategic Action Plan Section */}
              {activeTab === 'Strategic Action Plan' && sections['Strategic Action Plan'] && (
                <StrategicActionPlanSection reportMarkdown={sections['Strategic Action Plan']} />
              )}
              
              {/* Getting Started & Resources Section */}
              {activeTab === 'Getting Started & Resources' && sections['Getting Started & Resources'] && (
                <GettingStartedResourcesSection markdownContent={sections['Getting Started & Resources']} />
              )}
              
              {/* Illustrative Benchmarks Section */}
              {activeTab === 'Illustrative Benchmarks' && sections['Illustrative Benchmarks'] && (
                <IllustrativeBenchmarksSection markdownContent={sections['Illustrative Benchmarks']} />
              )}
              
              {/* Personalized Learning Path Section */}
              {activeTab === 'Personalized Learning Path' && sections['Personalized Learning Path'] && (
                <PersonalizedLearningPathSection markdownContent={sections['Personalized Learning Path']} />
              )}
              
              {/* Learning Hub Direction Section */}
              {activeTab === 'Learning Hub' && (
                <LearningHubDirectionSection tierLevel={extractedTier || undefined} />
              )}
              
              {/* Assessment Q&A Breakdown Section */}
              {activeTab === 'Assessment Q&A Breakdown' && (
                <AssessmentQABreakdownSection questionAnswerHistory={questionAnswerHistory} />
              )}
              
              {/* Fallback for empty/unknown sections */}
              {!currentSectionMarkdown && activeTab !== 'Assessment Q&A Breakdown' && activeTab !== 'Learning Hub' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 text-sg-bright-green">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-sg-dark-teal mb-4">Content Not Available</h3>
                  <p className="text-sg-dark-teal/70 max-w-md mx-auto">The content for the section "{cardTitles[activeTab]}" is currently not available or is being processed.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer with attribution */}
          <div className="mt-10 text-center text-sm text-gray-500">
            <p>AI Efficiency Scorecard • Powered by AI • {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 text-sg-dark-teal focus:outline-none"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
