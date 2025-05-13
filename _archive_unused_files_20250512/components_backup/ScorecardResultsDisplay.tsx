'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { marked } from 'marked';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Add props interface
type AnswerHistoryEntry = {
  question: string;
  answer: any;
  phaseName?: string;
  answerType?: string;
  options?: string[] | null;
  reasoningText?: string | null;
  index?: number;
};

interface ScorecardResultsDisplayProps {
  reportMarkdown: string;
  questionAnswerHistory: AnswerHistoryEntry[];
}

const ScorecardResultsDisplay: React.FC<ScorecardResultsDisplayProps> = ({ reportMarkdown, questionAnswerHistory }) => {
  const [showQAHistory, setShowQAHistory] = useState(false);
  const [currentTab, setCurrentTab] = useState<'overview' | 'details' | 'actions'>('overview');
  const [activeSection, setActiveSection] = useState('Key Findings');
  const [sections, setSections] = useState<Record<string, string>>({});
  
  // Function to generate PDF (could be implemented in the future)
  const handleGeneratePDF = () => {
    alert("PDF generation feature coming soon!");
  };

  // Function to show Q&A breakdown
  const toggleQAHistory = () => {
    setShowQAHistory(!showQAHistory);
  };
  
  // Build tier distribution from history
  const tierDistribution = useMemo(() => {
    const distribution: Record<string, number> = {
      'Beginner': 0,
      'Intermediate': 0,
      'Advanced': 0
    };
    
    questionAnswerHistory.forEach((item, index) => {
      const answer = typeof item.answer === 'string' ? item.answer : '';
      if (answer.toLowerCase().includes('beginner')) {
        distribution.Beginner++;
      } else if (answer.toLowerCase().includes('intermediate')) {
        distribution.Intermediate++;
      } else if (answer.toLowerCase().includes('advanced')) {
        distribution.Advanced++;
      }
    });
    
    return distribution;
  }, [questionAnswerHistory]);

  // Parse markdown into sections
  const reportSections = useMemo(() => {
    if (!reportMarkdown) return {};
    
    const sections: Record<string, string> = {};
    
    // Extract overall tier
    const tierMatch = reportMarkdown.match(/## Overall Tier: (.+?)($|\n)/);
    if (tierMatch) {
      sections.overallTier = tierMatch[1].trim();
    }
    
    // Extract key findings
    const keyFindingsMatch = reportMarkdown.match(/## Key Findings\s+([\s\S]*?)(?=##|$)/);
    if (keyFindingsMatch) {
      sections.keyFindings = keyFindingsMatch[1].trim();
    }
    
    // Extract strategic action plan
    const actionPlanMatch = reportMarkdown.match(/## Strategic Action Plan\s+([\s\S]*?)(?=##|$)/);
    if (actionPlanMatch) {
      sections.actionPlan = actionPlanMatch[1].trim();
    }
    
    // Extract resources
    const resourcesMatch = reportMarkdown.match(/## Getting Started & Resources\s+([\s\S]*?)(?=##|$)/);
    if (resourcesMatch) {
      sections.resources = resourcesMatch[1].trim();
    }
    
    // Extract benchmarks
    const benchmarksMatch = reportMarkdown.match(/## Illustrative Benchmarks\s+([\s\S]*?)(?=##|$)/);
    if (benchmarksMatch) {
      sections.benchmarks = benchmarksMatch[1].trim();
    }
    
    return sections;
  }, [reportMarkdown]);

  // Group Q&A history by phase using actual phase data when available
  const groupedHistory = useMemo(() => {
    const grouped: Record<string, Array<{ question: string; answer: any; index: number; answerType?: string; options?: string[] | null; reasoningText?: string | null }>> = {};
    
    questionAnswerHistory.forEach((item, index) => {
      // Use provided phase name or fallback to placeholder
      const phase = item.phaseName || 'Assessment';
      
      if (!grouped[phase]) {
        grouped[phase] = [];
      }
      
      grouped[phase].push({
        ...item, 
        index
      });
    });
    
    return grouped;
  }, [questionAnswerHistory]);

  // Parse the markdown into sections
  useEffect(() => {
    const extractedSections: Record<string, string> = {};
    
    // Function to extract sections from markdown
    const extractSections = () => {
      const sectionRegex = /##\s+([^#\n]+)/g;
      let match;
      let lastIndex = 0;
      const sectionStarts: number[] = [];
      
      // Find all section headers
      questionAnswerHistory.forEach((item, index) => {
        const sectionName = `Question ${index + 1}`;
        extractedSections[sectionName] = `## ${sectionName}\n\n**Q:** ${item.question}\n\n**A:** ${item.answer}`;
      });
      
      // Add the reportMarkdown sections
      while ((match = sectionRegex.exec(reportMarkdown)) !== null) {
        sectionStarts.push(match.index);
      }
      
      // Extract content for each section
      for (let i = 0; i < sectionStarts.length; i++) {
        const start = sectionStarts[i];
        const end = i < sectionStarts.length - 1 ? sectionStarts[i + 1] : reportMarkdown.length;
        const sectionContent = reportMarkdown.substring(start, end);
        const titleMatch = sectionContent.match(/##\s+([^#\n]+)/);
        
        if (titleMatch && titleMatch[1]) {
          const title = titleMatch[1].trim();
          extractedSections[title] = sectionContent;
        }
      }
    };
    
    if (reportMarkdown) {
      extractSections();
    }
    
    setSections(extractedSections);
  }, [reportMarkdown, questionAnswerHistory]);

  // Extract tier color based on tier text
  const getTierColor = (tier?: string) => {
    if (!tier) return 'bg-gray-200 text-gray-700';
    if (tier.includes('Leader')) return 'bg-sg-bright-green text-sg-dark-teal';
    if (tier.includes('Enabler')) return 'bg-sg-orange text-white';
    if (tier.includes('Dabbler')) return 'bg-sg-light-blue text-white';
    return 'bg-gray-200 text-gray-700';
  };

  const getTierEmoji = (tier?: string) => {
    if (!tier) return '🔍';
    if (tier.includes('Leader')) return '🏆';
    if (tier.includes('Enabler')) return '📈';
    if (tier.includes('Dabbler')) return '🌱';
    return '🔍';
  };

  // Parse markdown content
  const parseMarkdown = (content: string) => {
    try {
      return { __html: marked(content) };
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return { __html: '<p>Error parsing content</p>' };
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header with tabs */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-sg-dark-teal mb-2">
              AI Efficiency Scorecard Report
            </h1>
            <p className="text-lg text-sg-dark-teal/70">
              Insights and recommendations for your organization
            </p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button 
              onClick={toggleQAHistory}
              className="sg-button-secondary flex items-center text-sm"
            >
              {showQAHistory ? 'Hide Q&A History' : 'Show Q&A History'}
            </button>
            
            <button 
              onClick={handleGeneratePDF}
              className="sg-button-primary flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`py-3 px-5 border-b-2 font-medium text-sm ${
              currentTab === 'overview'
                ? 'border-sg-bright-green text-sg-dark-teal'
                : 'border-transparent text-gray-500 hover:text-sg-dark-teal/70'
            }`}
            onClick={() => setCurrentTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-3 px-5 border-b-2 font-medium text-sm ${
              currentTab === 'details'
                ? 'border-sg-bright-green text-sg-dark-teal'
                : 'border-transparent text-gray-500 hover:text-sg-dark-teal/70'
            }`}
            onClick={() => setCurrentTab('details')}
          >
            Detailed Analysis
          </button>
          <button
            className={`py-3 px-5 border-b-2 font-medium text-sm ${
              currentTab === 'actions'
                ? 'border-sg-bright-green text-sg-dark-teal'
                : 'border-transparent text-gray-500 hover:text-sg-dark-teal/70'
            }`}
            onClick={() => setCurrentTab('actions')}
          >
            Action Plan
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Tab Content */}
        {currentTab === 'overview' && (
          <>
            {/* Tier Card - Span Full Width */}
            <div className="lg:col-span-3">
              <div className="sg-card-featured flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center">
                  <div className={`rounded-full p-4 mr-4 ${getTierColor(sections.overallTier).split(' ')[0]}`}>
                    <span className="text-2xl">{getTierEmoji(sections.overallTier)}</span>
                  </div>
                  <div>
                    <p className="text-sm uppercase font-medium text-sg-dark-teal/70">Overall Maturity Level</p>
                    <h2 className="text-2xl font-bold text-sg-dark-teal">{sections.overallTier || 'Assessment Complete'}</h2>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex space-x-2">
                  <div className="text-center p-3 bg-sg-light-mint rounded-lg">
                    <p className="text-sm text-sg-dark-teal/70">Questions</p>
                    <p className="text-xl font-semibold text-sg-dark-teal">{questionAnswerHistory.length}</p>
                  </div>
                  <div className="text-center p-3 bg-sg-light-mint rounded-lg">
                    <p className="text-sm text-sg-dark-teal/70">Phases</p>
                    <p className="text-xl font-semibold text-sg-dark-teal">{Object.keys(groupedHistory).length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key Findings/Summary Card */}
            <div className="lg:col-span-2">
              <div className="sg-card h-full">
                <h3 className="text-xl font-semibold text-sg-dark-teal mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Findings
                </h3>
                {sections.keyFindings ? (
                  <div 
                    className="prose prose-sm max-w-none text-sg-dark-teal/80"
                    dangerouslySetInnerHTML={parseMarkdown(sections.keyFindings)} 
                  />
                ) : (
                  <p className="text-sg-dark-teal/70">No key findings available.</p>
                )}
              </div>
            </div>
            
            {/* Quick Stats/Benchmarks Card */}
            <div className="lg:col-span-1">
              <div className="sg-card h-full">
                <h3 className="text-xl font-semibold text-sg-dark-teal mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Benchmarks
                </h3>
                {sections.benchmarks ? (
                  <div 
                    className="prose prose-sm max-w-none text-sg-dark-teal/80"
                    dangerouslySetInnerHTML={parseMarkdown(sections.benchmarks)} 
                  />
                ) : (
                  <p className="text-sg-dark-teal/70">No benchmarks available.</p>
                )}
              </div>
            </div>
          </>
        )}
        
        {/* Details Tab Content */}
        {currentTab === 'details' && (
          <div className="lg:col-span-3">
            <div className="sg-card">
              <h3 className="text-xl font-semibold text-sg-dark-teal mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Assessment Q&A Breakdown
              </h3>
              
              {/* Q&A History displayed in interactive accordions by phase */}
              {Object.entries(groupedHistory).map(([phaseName, phaseQuestions]) => (
                <div key={phaseName} className="mb-6 border border-gray-100 rounded-lg overflow-hidden">
                  <div className="bg-sg-light-mint p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="font-medium text-lg text-sg-dark-teal">{phaseName}</span>
                      <span className="ml-3 px-2 py-1 text-xs font-medium bg-white text-sg-dark-teal rounded-full">
                        {phaseQuestions.length} Questions
                      </span>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {phaseQuestions.map((item, idx) => (
                      <div key={idx} className="p-4 bg-white hover:bg-gray-50 transition-colors">
                        <div className="mb-2 flex items-start space-x-2">
                          <span className="flex-shrink-0 mt-1 font-medium text-sm bg-sg-dark-teal text-white h-6 w-6 flex items-center justify-center rounded-full">
                            Q
                          </span>
                          <span className="text-sg-dark-teal font-medium">{item.question}</span>
                        </div>
                        
                        <div className="pl-8 mt-3 text-sg-dark-teal/80">
                          <p className="mb-1 text-sm font-medium text-sg-dark-teal/70">Response:</p>
                          {typeof item.answer === 'string' ? (
                            <p className="text-sm bg-sg-light-mint/40 p-2 rounded">{item.answer}</p>
                          ) : (
                            <p className="text-sm bg-sg-light-mint/40 p-2 rounded">
                              {JSON.stringify(item.answer)}
                            </p>
                          )}
                          
                          {item.reasoningText && (
                            <div className="mt-3">
                              <p className="mb-1 text-sm font-medium text-sg-dark-teal/70">AI Analysis:</p>
                              <p className="text-sm bg-sg-light-blue/10 p-2 rounded border-l-2 border-sg-light-blue text-sg-dark-teal/70">
                                {item.reasoningText}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Plan Tab Content */}
        {currentTab === 'actions' && (
          <>
            <div className="lg:col-span-3">
              <div className="sg-card">
                <h3 className="text-xl font-semibold text-sg-dark-teal mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Strategic Action Plan
                </h3>
                
                {sections.actionPlan ? (
                  <div className="prose prose-lg max-w-none text-sg-dark-teal/80">
                    <div dangerouslySetInnerHTML={parseMarkdown(sections.actionPlan)} />
                  </div>
                ) : (
                  <p className="text-sg-dark-teal/70">No action plan available.</p>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-3 mt-6">
              <div className="sg-card">
                <h3 className="text-xl font-semibold text-sg-dark-teal mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Resources & Next Steps
                </h3>
                
                {sections.resources ? (
                  <div className="prose prose-sm max-w-none text-sg-dark-teal/80">
                    <div dangerouslySetInnerHTML={parseMarkdown(sections.resources)} />
                  </div>
                ) : (
                  <p className="text-sg-dark-teal/70">No resources available.</p>
                )}
                
                <div className="mt-8 bg-sg-light-mint rounded-lg p-6">
                  <h4 className="text-lg font-medium text-sg-dark-teal mb-4">Need Expert Guidance?</h4>
                  <p className="text-sg-dark-teal/80 mb-6">
                    Get personalized support from our AI strategy consultants to implement your action plan and accelerate your AI journey.
                  </p>
                  <button className="sg-button-primary">
                    Book a Strategy Call
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScorecardResultsDisplay; 