'use client';
import React, { useState } from 'react';

// Static dummy data for the report
const DUMMY_REPORT = {
  tier: 'Enabler',
  keyFindings: {
    strengths: [
      'Strong adoption of AI tools across marketing team',
      'Clear data governance practices in place',
      'Effective integration of AI in customer segmentation'
    ],
    weaknesses: [
      'Limited technical expertise for custom AI solutions',
      'Siloed AI initiatives across departments',
      'Inconsistent measurement of AI ROI'
    ]
  },
  actionPlan: [
    'Develop cross-functional AI training program',
    'Implement centralized AI governance committee',
    'Create standardized AI performance metrics'
  ],
  questionHistory: [
    { question: 'Dummy Q1', answer: 'Dummy A1' },
    { question: 'Dummy Q2', answer: 'Dummy A2' },
    // Add more dummy data as needed
  ]
};

// Define the tab structure
const TABS = [
  'Your AI Tier',
  'Key Findings',
  'Strategic Action Plan',
  'Resources',
  'Assessment Q&A'
];

export default function StaticResultsPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="min-h-screen bg-sg-light-mint text-sg-dark-teal font-sans">
      {/* Main layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="lg:w-72 bg-white/80 backdrop-blur-md shadow-lg p-6 flex flex-col">
          <div className="mb-8">
            <div className="text-2xl font-bold text-sg-dark-teal mb-1">AI Scorecard</div>
            <div className="text-sm text-gray-500">Your assessment results</div>
          </div>
          
          <nav className="flex-grow">
            <ul className="space-y-1">
              {TABS.map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center ${
                      activeTab === tab
                        ? 'bg-sg-bright-green text-white shadow-md'
                        : 'text-sg-dark-teal/70 hover:bg-sg-light-mint'
                    }`}
                  >
                    <span className="truncate">{tab}</span>
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
        
        {/* Main content */}
        <div className="flex-1 p-4 lg:p-10 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 bg-white/60 backdrop-blur-sm p-5 rounded-2xl shadow-sm">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sg-dark-teal to-sg-bright-green">
                {activeTab}
              </h1>
              <p className="text-sg-dark-teal/80 mt-1">
                {activeTab === 'Your AI Tier' ? 'Your AI maturity assessment results' : 
                 activeTab === 'Key Findings' ? 'Strengths and areas for improvement' :
                 activeTab === 'Strategic Action Plan' ? 'Your personalized next steps' :
                 activeTab === 'Assessment Q&A' ? 'Your responses to the assessment' :
                 'Insights and recommendations'}
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button 
                className="flex items-center gap-2 px-4 py-2 text-sm text-sg-dark-teal bg-sg-light-mint hover:bg-sg-light-mint/80 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              
              <button 
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-sg-bright-green rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-6 lg:p-10 shadow-xl">
            {/* Your AI Tier */}
            {activeTab === 'Your AI Tier' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                  <div className="md:w-1/3 flex-shrink-0">
                    <div className="aspect-square rounded-full bg-sg-dark-teal flex items-center justify-center p-1">
                      <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-sg-dark-teal to-sg-bright-green">
                            {DUMMY_REPORT.tier}
                          </div>
                          <div className="text-sm text-gray-500">AI Maturity</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold text-sg-dark-teal mb-3">Your AI Maturity: {DUMMY_REPORT.tier}</h2>
                    <p className="text-sg-dark-teal/80 mb-4">
                      Based on your assessment, your organization is at the <strong>{DUMMY_REPORT.tier}</strong> level 
                      of AI maturity. This means you have established AI practices but have opportunities to further 
                      enhance your capabilities and strategic implementation.
                    </p>
                    <div className="flex items-center justify-between w-full bg-gray-100 rounded-full h-4 mb-4">
                      <div className="bg-sg-bright-green h-4 rounded-full w-2/3"></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Dabbler</span>
                      <span className="font-medium text-sg-dark-teal">Enabler</span>
                      <span>Leader</span>
                    </div>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p>
                    As an <strong>Enabler</strong>, your organization has successfully integrated AI tools into your 
                    marketing workflows, leading to measurable improvements in efficiency and effectiveness. You 
                    have a solid foundation to build upon, with clear opportunities to advance to the Leader tier.
                  </p>
                  
                  <p>
                    Organizations at the Enabler level typically have operational AI capabilities but may not be 
                    maximizing strategic advantages or fully scaling AI implementations across the organization.
                  </p>
                </div>
              </div>
            )}
            
            {/* Key Findings */}
            {activeTab === 'Key Findings' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-sg-dark-teal mb-4 flex items-center">
                    <span className="w-8 h-8 bg-sg-light-mint text-sg-bright-green rounded-full flex items-center justify-center mr-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Strengths
                  </h2>
                  <ul className="space-y-3">
                    {DUMMY_REPORT.keyFindings.strengths.map((strength, index) => (
                      <li key={index} className="bg-sg-light-mint p-4 rounded-lg">
                        <div className="flex">
                          <div className="flex-shrink-0 mr-3">
                            <div className="w-8 h-8 bg-sg-light-mint rounded-full flex items-center justify-center text-sg-bright-green">
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-sg-dark-teal">{strength}</p>
                            <p className="text-sm text-sg-dark-teal/80 mt-1">
                              This provides a strong foundation for future AI initiatives and demonstrates your commitment to innovation.
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-sg-dark-teal mb-4 flex items-center">
                    <span className="w-8 h-8 bg-sg-light-mint text-sg-orange rounded-full flex items-center justify-center mr-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </span>
                    Areas for Improvement
                  </h2>
                  <ul className="space-y-3">
                    {DUMMY_REPORT.keyFindings.weaknesses.map((weakness, index) => (
                      <li key={index} className="bg-sg-light-mint p-4 rounded-lg">
                        <div className="flex">
                          <div className="flex-shrink-0 mr-3">
                            <div className="w-8 h-8 bg-sg-light-mint rounded-full flex items-center justify-center text-sg-orange">
                              {index + 1}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-sg-dark-teal">{weakness}</p>
                            <p className="text-sm text-sg-dark-teal/80 mt-1">
                              Addressing this gap will help you advance to the next level of AI maturity and maximize your technology investments.
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Strategic Action Plan */}
            {activeTab === 'Strategic Action Plan' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-sg-dark-teal mb-4">Your Personalized Action Plan</h2>
                
                <p className="text-sg-dark-teal/80">
                  Based on your assessment results, we've developed the following action plan to help you advance your AI maturity:
                </p>
                
                <div className="space-y-6 mt-6">
                  {DUMMY_REPORT.actionPlan.map((action, index) => (
                    <div key={index} className="relative pl-8">
                      <div className="absolute left-0 top-0 w-6 h-6 bg-sg-light-mint rounded-full flex items-center justify-center text-sg-dark-teal font-medium">
                        {index + 1}
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <h3 className="text-lg font-medium text-sg-dark-teal mb-2">{action}</h3>
                        <p className="text-sg-dark-teal/80 text-sm">
                          This strategic initiative will help address key gaps identified in your assessment and accelerate your AI maturity journey.
                        </p>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center text-sm">
                            <span className="text-sg-dark-teal font-medium">Priority:</span>
                            <span className="ml-2 px-2 py-1 bg-sg-light-mint text-sg-dark-teal rounded text-xs font-medium">
                              {index === 0 ? 'High' : index === 1 ? 'Medium' : 'Standard'}
                            </span>
                            <span className="ml-auto text-gray-500">Est. Timeline: {index + 1} {index === 0 ? 'month' : 'months'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Resources */}
            {activeTab === 'Resources' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-sg-dark-teal mb-4">Recommended Resources</h2>
                  <p className="text-sg-dark-teal/80 mb-6">
                    We've curated these resources specifically for organizations at the {DUMMY_REPORT.tier} level:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <div className="text-sg-dark-teal mb-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-sg-dark-teal mb-2">AI Strategy Playbook</h3>
                      <p className="text-sg-dark-teal/80 text-sm mb-4">
                        A comprehensive guide to developing and implementing an effective AI strategy for marketing teams.
                      </p>
                      <button className="text-sg-dark-teal text-sm font-medium hover:text-sg-dark-teal/80">
                        Download PDF →
                      </button>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <div className="text-sg-dark-teal mb-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-sg-dark-teal mb-2">AI Implementation Workshop</h3>
                      <p className="text-sg-dark-teal/80 text-sm mb-4">
                        An on-demand workshop series focused on practical AI implementation for marketing professionals.
                      </p>
                      <button className="text-sg-dark-teal text-sm font-medium hover:text-sg-dark-teal/80">
                        Watch Series →
                      </button>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <div className="text-sg-dark-teal mb-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-sg-dark-teal mb-2">AI ROI Calculator Template</h3>
                      <p className="text-sg-dark-teal/80 text-sm mb-4">
                        A template to help quantify the return on investment for your AI marketing initiatives.
                      </p>
                      <button className="text-sg-dark-teal text-sm font-medium hover:text-sg-dark-teal/80">
                        Access Template →
                      </button>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <div className="text-sg-dark-teal mb-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-sg-dark-teal mb-2">AI Skills Assessment</h3>
                      <p className="text-sg-dark-teal/80 text-sm mb-4">
                        Identify skill gaps in your team and develop targeted training programs to build AI capabilities.
                      </p>
                      <button className="text-sg-dark-teal text-sm font-medium hover:text-sg-dark-teal/80">
                        Start Assessment →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Assessment Q&A */}
            {activeTab === 'Assessment Q&A' && (
              <div>
                <h2 className="text-xl font-semibold text-sg-dark-teal mb-4">Your Assessment Responses</h2>
                <p className="text-sg-dark-teal/80 mb-6">
                  Here's a summary of your responses to the assessment questions:
                </p>
                
                <div className="space-y-4">
                  {DUMMY_REPORT.questionHistory.map((qa, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="md:w-8/12">
                          <div className="flex items-start mb-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-sg-light-mint rounded-full flex items-center justify-center text-sg-dark-teal font-medium mr-2 mt-0.5">
                              Q
                            </div>
                            <p className="font-medium text-sg-dark-teal">{qa.question}</p>
                          </div>
                          <div className="flex items-start pl-8">
                            <div className="flex-shrink-0 w-6 h-6 bg-sg-light-mint rounded-full flex items-center justify-center text-sg-dark-teal font-medium mr-2 mt-0.5">
                              A
                            </div>
                            <p className="text-sg-dark-teal/80">{qa.answer}</p>
                          </div>
                        </div>
                        <div className="md:w-4/12 bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-500 font-medium mb-1">AI Analysis</div>
                          <p className="text-sm text-gray-600">
                            This response indicates a {index % 2 === 0 ? 'strong' : 'moderate'} level of AI adoption in this area, 
                            aligning with the {DUMMY_REPORT.tier} tier assessment.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
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
