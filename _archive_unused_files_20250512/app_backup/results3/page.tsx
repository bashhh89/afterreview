'use client';
import React, { useState, useEffect } from 'react';

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
    { question: 'How often does your team use AI tools?', answer: 'Daily' },
    { question: 'What percentage of your marketing campaigns use AI?', answer: '60-80%' },
    { question: 'Do you have a dedicated AI strategy?', answer: 'Yes, but it needs refinement' },
    { question: 'How do you measure AI effectiveness?', answer: 'Through improved KPIs and ROI' },
    { question: 'What\'s your biggest challenge with AI adoption?', answer: 'Finding qualified talent' }
  ]
};

// Define the tab structure
const TABS = [
  'Overall Tier',
  'Key Findings',
  'Strategic Action Plan',
  'Resources',
  'Q&A History'
];

export default function Results3Page() {
  const [activeTab, setActiveTab] = useState('Overall Tier');
  const [animating, setAnimating] = useState(false);
  
  // Define our godly color palette
  const colors = {
    brightGreen: '#20E28F',
    darkTeal: '#103138',
    white: '#FFFFFF',
    lightMint: '#F3FDF5',
    orange: '#FE7F01',
    yellow: '#FEC401',
    lightBlue: '#01CEFE',
    brightYellow: '#FFFF00',
    cream1: '#FFF9F2',
    cream2: '#FFFCF2',
    lightBlueShade: '#F5FDFF'
  };

  const handleTabChange = (tab: string) => {
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimating(false);
    }, 300);
  };

  const tier = "Enabler";
  const strengths = [
    'Strong adoption of AI tools across marketing team',
    'Clear data governance practices in place',
    'Effective integration of AI in customer segmentation'
  ];
  const weaknesses = [
    'Limited technical expertise for custom AI solutions',
    'Siloed AI initiatives across departments',
    'Inconsistent measurement of AI ROI'
  ];
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.lightMint, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Custom global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        body {
          background-color: ${colors.lightMint};
          color: ${colors.darkTeal};
          overflow-x: hidden;
        }
        
        .gradient-text {
          background: linear-gradient(90deg, ${colors.darkTeal} 0%, ${colors.brightGreen} 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }
        
        .nav-item {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        
        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 0;
          background: ${colors.brightGreen};
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .nav-item:hover::before {
          width: 100%;
        }
        
        .nav-item.active {
          color: ${colors.brightGreen};
          font-weight: 600;
        }
        
        .nav-item.active::before {
          width: 100%;
        }
        
        .card {
          background: ${colors.white};
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 50px rgba(32, 226, 143, 0.1);
        }
        
        .btn-primary {
          background: ${colors.brightGreen};
          color: ${colors.darkTeal};
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(32, 226, 143, 0.2);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(32, 226, 143, 0.3);
        }
        
        .tier-indicator {
          position: relative;
          z-index: 1;
        }
        
        .tier-indicator::before {
          content: '';
          position: absolute;
          top: -3px;
          right: -3px;
          bottom: -3px;
          left: -3px;
          background: linear-gradient(45deg, ${colors.brightGreen}, ${colors.lightBlue});
          border-radius: 50%;
          z-index: -1;
        }
        
        .section-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .strength-card {
          border-left: 4px solid ${colors.brightGreen};
        }
        
        .weakness-card {
          border-left: 4px solid ${colors.orange};
        }
      `}</style>
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.brightGreen}, ${colors.lightBlue})` }}>
            <span style={{ color: colors.darkTeal, fontWeight: 800 }}>AI</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: colors.darkTeal }}>AI Efficiency Scorecard</h1>
        </div>
        <div className="flex gap-4">
          <button className="btn-primary flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Share Report
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-12 gap-8">
        {/* Left sidebar */}
        <aside className="col-span-3">
          <div className="sticky top-6">
            <div className="mb-8">
              <div className="text-sm font-medium text-gray-500 mb-2">Your Assessment</div>
              <div className="relative w-32 h-32 mx-auto mb-4 tier-indicator">
                <div className="absolute inset-0 rounded-full" style={{ backgroundColor: colors.cream1 }}></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-3xl font-bold gradient-text">{tier}</div>
                  <div className="text-sm" style={{ color: colors.darkTeal }}>AI Maturity</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm mb-2">Your Progress</div>
                <div className="h-2 w-full rounded-full" style={{ backgroundColor: 'rgba(16, 49, 56, 0.1)' }}>
                  <div className="h-full rounded-full" style={{ width: '66%', background: `linear-gradient(to right, ${colors.brightGreen}, ${colors.lightBlue})` }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Dabbler</span>
                  <span style={{ color: colors.brightGreen, fontWeight: 600 }}>{tier}</span>
                  <span>Leader</span>
                </div>
              </div>
            </div>
            
            <nav>
              <div className="text-sm font-medium text-gray-500 mb-2">Navigation</div>
              <ul className="space-y-2">
                {['Overall Tier', 'Key Findings', 'Strategic Action Plan', 'Resources', 'Q&A History'].map((tab) => (
                  <li key={tab} 
                    className={`nav-item cursor-pointer py-2 px-4 rounded-lg ${activeTab === tab ? 'active' : ''}`}
                    style={{ backgroundColor: activeTab === tab ? 'rgba(32, 226, 143, 0.1)' : 'transparent' }}
                    onClick={() => handleTabChange(tab)}>
                    {tab}
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-12 p-4 rounded-xl" style={{ backgroundColor: colors.cream2 }}>
              <div className="text-sm font-medium mb-2">Need Help?</div>
              <p className="text-sm mb-3">We're here to assist you in understanding your AI maturity assessment.</p>
              <button className="text-sm flex items-center gap-1" style={{ color: colors.brightGreen, fontWeight: 600 }}>
                Contact Support
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </aside>
        
        {/* Main content area */}
        <div className="col-span-9">
          <div className={`transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
            {/* Overall Tier Content */}
            {activeTab === 'Overall Tier' && (
              <div className="section-fade-in">
                <div className="flex justify-between items-center mb-8">
                  <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.darkTeal }}>Your AI Tier: <span className="gradient-text">{tier}</span></h2>
                  <div className="flex gap-3">
                    <button className="btn-primary" style={{ backgroundColor: colors.white, color: colors.darkTeal, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M17 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H8C6.89543 3 6 3.89543 6 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 17H5C3.89543 17 3 16.1046 3 15V9C3 7.89543 3.89543 7 5 7H14C15.1046 7 16 7.89543 16 9V15C16 16.1046 15.1046 17 14 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Print Report
                    </button>
                    <button className="btn-primary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M4 16V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V16M16 12L12 16M12 16L8 12M12 16V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Download PDF
                    </button>
                  </div>
                </div>
                
                <div className="card p-8 mb-8">
                  <div className="flex items-start gap-8">
                    <div className="w-1/3">
                      <div className="relative aspect-square rounded-full overflow-hidden mb-4">
                        <div className="absolute inset-0 animate-pulse" style={{ background: `linear-gradient(225deg, ${colors.brightGreen}33, ${colors.lightBlue}33)` }}></div>
                        <div className="absolute inset-4 rounded-full" style={{ backgroundColor: colors.white }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-5xl font-bold" style={{ color: colors.brightGreen }}>{tier}</div>
                            <div className="text-sm mt-1" style={{ color: colors.darkTeal }}>AI Maturity</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-2/3">
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: colors.darkTeal }} className="mb-3">Achievement Unlocked: {tier} Status</h3>
                      
                      <p className="mb-4" style={{ lineHeight: 1.6 }}>
                        Based on your assessment, your organization has reached the <strong>{tier}</strong> level of AI maturity. 
                        This means you've established foundational AI practices and are seeing measurable benefits, 
                        but have significant opportunities to enhance capabilities and strategic implementation.
                      </p>
                      
                      <div className="mt-6">
                        <div className="flex justify-between mb-2 text-sm">
                          <span>Current Position</span>
                          <span style={{ color: colors.brightGreen }}>{tier} Tier - 66% Complete</span>
                        </div>
                        <div className="h-3 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(16, 49, 56, 0.08)' }}>
                          <div style={{ width: '66%', height: '100%', background: `linear-gradient(to right, ${colors.brightGreen}, ${colors.lightBlue})` }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs">
                          <span>Dabbler</span>
                          <span>Enabler</span>
                          <span>Leader</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex gap-4">
                        <div className="p-3 rounded-lg" style={{ backgroundColor: colors.lightMint }}>
                          <div className="text-sm font-semibold mb-1">Strongest Area</div>
                          <div className="text-xs">Data Management</div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: colors.cream1 }}>
                          <div className="text-sm font-semibold mb-1">Growth Opportunity</div>
                          <div className="text-xs">Technical Implementation</div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: colors.lightBlueShade }}>
                          <div className="text-sm font-semibold mb-1">Time to Leader Tier</div>
                          <div className="text-xs">6-9 Months</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-8 mb-8">
                  <div className="card p-6 w-1/2">
                    <div className="flex gap-3 items-center mb-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.brightGreen}22` }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L9 16L19 6" stroke={colors.brightGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: colors.darkTeal }}>What This Means</h3>
                    </div>
                    
                    <p className="mb-4" style={{ lineHeight: 1.6 }}>
                      As an <strong>{tier}</strong>, your organization has successfully integrated AI tools into your 
                      marketing workflows, leading to measurable improvements in efficiency and effectiveness.
                    </p>
                    
                    <p style={{ lineHeight: 1.6 }}>
                      Organizations at the {tier} level typically have operational AI capabilities but may not be 
                      maximizing strategic advantages or fully scaling AI implementations across the organization.
                    </p>
                  </div>
                  
                  <div className="card p-6 w-1/2">
                    <div className="flex gap-3 items-center mb-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.lightBlue}22` }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8V16M12 8L8 12M12 8L16 12" stroke={colors.lightBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: colors.darkTeal }}>Next Steps</h3>
                    </div>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                            stroke={colors.brightGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Review your detailed strategic action plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                            stroke={colors.brightGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Identify your key growth opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                            stroke={colors.brightGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Explore your personalized learning path</span>
                      </li>
                    </ul>
                    
                    <button className="btn-primary mt-6 w-full">
                      See Your Strategic Action Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Key Findings Content */}
            {activeTab === 'Key Findings' && (
              <div className="section-fade-in">
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.darkTeal }} className="mb-8">Key Findings</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '18px', fontWeight: 600, color: colors.darkTeal }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.brightGreen}22` }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L9 16L19 6" stroke={colors.brightGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      Strengths
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {strengths.map((strength, i) => (
                        <div key={i} className="card strength-card p-6">
                          <div className="flex">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: `${colors.brightGreen}22`, color: colors.brightGreen, fontWeight: 600 }}>
                              {i + 1}
                            </div>
                            <div>
                              <div className="font-medium mb-2">{strength}</div>
                              <p className="text-sm" style={{ color: 'rgba(16, 49, 56, 0.8)' }}>
                                This provides a strong foundation for future AI initiatives and demonstrates your commitment to innovation.
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '18px', fontWeight: 600, color: colors.darkTeal }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.orange}22` }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 9V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                            stroke={colors.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      Areas For Improvement
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {weaknesses.map((weakness, i) => (
                        <div key={i} className="card weakness-card p-6">
                          <div className="flex">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: `${colors.orange}22`, color: colors.orange, fontWeight: 600 }}>
                              {i + 1}
                            </div>
                            <div>
                              <div className="font-medium mb-2">{weakness}</div>
                              <p className="text-sm" style={{ color: 'rgba(16, 49, 56, 0.8)' }}>
                                Addressing this gap will help you advance to the next level of AI maturity and maximize your technology investments.
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Minimal placeholders for other tabs */}
            {activeTab === 'Strategic Action Plan' && (
              <div className="section-fade-in">
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.darkTeal }} className="mb-8">Strategic Action Plan</h2>
                <div className="card p-6">
                  <p>Your personalized action plan would be displayed here.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'Resources' && (
              <div className="section-fade-in">
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.darkTeal }} className="mb-8">Resources</h2>
                <div className="card p-6">
                  <p>Your recommended resources would be displayed here.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'Q&A History' && (
              <div className="section-fade-in">
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: colors.darkTeal }} className="mb-8">Assessment Q&A History</h2>
                <div className="card p-6">
                  <p>Your assessment questions and answers would be displayed here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 