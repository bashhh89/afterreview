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
import DetailedAnalysisSection from '@/components/scorecard/sections/DetailedAnalysisSection';
import { db } from '@/lib/firebase'; // Import Firestore DB
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import ReportLoadingIndicator from '@/components/scorecard/ReportLoadingIndicator'; // Import loading indicator
import { toast } from 'sonner'; // Ensure sonner is imported

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
  'Detailed Analysis',
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
  'Detailed Analysis': 'Detailed Analysis',
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
  const [userName, setUserName] = useState<string>('');
  const [userData, setUserData] = useState<{
    leadName?: string;
    companyName?: string;
    email?: string;
    industry?: string;
  }>({});
  // Add state for reportId
  const [reportId, setReportId] = useState<string | null>(null);
  // Add state for error
  const [error, setError] = useState<string | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Helper function to safely update button state
  const updateButtonState = (buttonId: string, action: 'loading' | 'success' | 'error' | 'reset', text?: string) => {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    if (!button) return;
    
    // First remove all states
    button.classList.remove('is-loading', 'success-flash', 'error-flash');
    
    switch (action) {
      case 'loading':
        button.disabled = true;
        button.classList.add('is-loading');
        if (text) button.innerHTML = text;
        break;
      case 'success':
        button.classList.add('success-flash');
        if (text) button.innerHTML = text;
        break;
      case 'error':
        button.disabled = false;
        button.classList.add('error-flash');
        if (text) button.innerHTML = text;
        break;
      case 'reset':
        button.disabled = false;
        if (text) button.innerHTML = text;
        break;
    }
  };

  // Function to generate button SVG content with proper className
  const getSvgContent = (type: 'loading' | 'success' | 'error' | 'download' | 'share') => {
    switch (type) {
      case 'loading':
        return '<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>';
      case 'success':
        return '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>';
      case 'error':
        return '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>';
      case 'download':
        return '<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H16M8 12H16M8 17H12M4 4.5V19.5C4 19.9644 4 20.1966 4.02567 20.391C4.2029 21.8381 5.16192 22.7971 6.60896 22.9743C6.80336 23 7.03558 23 7.5 23H16.5C16.9644 23 17.1966 23 17.391 22.9743C18.8381 22.7971 19.7971 21.8381 19.9743 20.391C20 20.1966 20 19.9644 20 19.5V4.5C20 4.03558 20 3.80336 19.9743 3.60896C19.7971 2.16192 18.8381 1.2029 17.391 1.02567C17.1966 1 16.9644 1 16.5 1H7.5C7.03558 1 6.80336 1 6.60896 1.02567C5.16192 1.2029 4.2029 2.16192 4.02567 3.60896C4 3.80336 4 4.03558 4 4.5Z"></path></svg>';
      case 'share':
        return '<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>';
      default:
        return '';
    }
  };

  // Load data from sessionStorage when component mounts
  useEffect(() => {
    // Function to load data from sessionStorage
    const loadDataFromStorage = () => {
      try {
        const reportData = sessionStorage.getItem('reportMarkdown');
        const historyData = sessionStorage.getItem('questionAnswerHistory');
        const userDataString = sessionStorage.getItem('userData');
        // Load reportId from sessionStorage
        const storedReportId = sessionStorage.getItem('reportId');
        
        if (reportData) {
          setReportMarkdown(reportData);
          console.log('FRONTEND: Loaded reportMarkdown:', reportData.substring(0, 100) + '...');
          
          // Try to extract user name from the report data
          const nameMatch = reportData.match(/leadName:\s*"([^"]+)"|companyName:\s*"([^"]+)"|name:\s*"([^"]+)"/i);
          if (nameMatch) {
            const extractedName = nameMatch[1] || nameMatch[2] || nameMatch[3];
            setUserName(extractedName);
            console.log('FRONTEND: Extracted user name:', extractedName);
          }
        } else {
          console.error('No report data found in sessionStorage');
        }
        
        if (historyData) {
          setQuestionAnswerHistory(JSON.parse(historyData));
          console.log('FRONTEND: Loaded questionAnswerHistory:', JSON.parse(historyData).length, 'items');
        } else {
          console.error('No question history found in sessionStorage');
        }
        
        // If we have user data stored separately, use that
        if (userDataString) {
          try {
            const userData = JSON.parse(userDataString);
            if (userData.leadName || userData.name) {
              setUserName(userData.leadName || userData.name);
              console.log('FRONTEND: Using stored user name:', userData.leadName || userData.name);
            }
          } catch (e) {
            console.error('Error parsing userData:', e);
          }
        }

        // Set the reportId state
        if (storedReportId) {
          setReportId(storedReportId);
          console.log('FRONTEND: Loaded reportId:', storedReportId);
        } else {
          console.warn('No reportId found in sessionStorage');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data from sessionStorage:', error);
        setError('Failed to load report data. Please try again or start a new assessment.');
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

  const [activeTab, setActiveTab] = useState('Overall Tier');

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
    setActiveTab('Overall Tier');
  }, [reportMarkdown]);

  const currentSectionMarkdown = sections[activeTab] || '';

  const handleDownloadPdf = async () => {
    const currentReportId = sessionStorage.getItem('currentReportID') || reportId; // Ensure we get reportId
    if (!currentReportId) {
      toast.error('Report ID not found. Cannot download PDF.');
      return;
    }
    setIsDownloadingPdf(true);
    toast('Generating your PDF report, please wait...', {
      description: 'This may take a moment depending on your connection.',
      duration: 5000,
    });
    
    // The updateButtonState and getSvgContent functions seem specific to the old button style.
    // For simplicity, we will use a direct approach for this new button.
    // If those functions are generic, they could be adapted.

    try {
      const pdfUrl = `/api/generate-pdf?reportId=${currentReportId}`;
      window.open(pdfUrl, '_blank');
      
      // Show success toast after a short delay, giving time for the PDF to start downloading
      setTimeout(() => {
        toast.success('Your PDF download has started!');
      }, 2000);
      
    } catch (error) {
      console.error('Error triggering PDF download:', error);
      toast.error('Failed to generate PDF. Please try again.', {
        description: 'There was a problem generating your PDF report.'
      });
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 3000);
    }
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return <ReportLoadingIndicator />;
  }

  // Show error state if data fetching failed or report not found
  if (error) {
    return (
      <div className="min-h-screen bg-sg-light-mint text-sg-dark-teal font-sans flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto p-10 bg-white rounded-3xl shadow-lg border border-sg-light-mint animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 text-sg-bright-green">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sg-dark-teal to-sg-bright-green mb-4">Error Loading Scorecard</h2>
          <p className="text-sg-dark-teal/80 mb-8">{error}</p>

          <div className="flex flex-col gap-4 mt-4">
            <a
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-sg-dark-teal to-sg-bright-green text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Start New Assessment
            </a>
            {/* Optionally add a retry button if applicable */}
            {/* <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white border-2 border-sg-light-mint text-sg-dark-teal rounded-full font-medium hover:bg-sg-light-mint transition-colors"
            >
              Retry Loading
            </button> */}
          </div>

          <p className="text-xs text-sg-dark-teal/70 mt-8">
            Please ensure you have the correct report link.
          </p>
        </div>
      </div>
    );
  }

  // Show "not found" state if reportMarkdown is null after loading
  if (!reportMarkdown) {
     return (
      <div className="min-h-screen bg-sg-light-mint text-sg-dark-teal font-sans flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto p-10 bg-white rounded-3xl shadow-lg border border-sg-light-mint animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 text-sg-bright-green">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sg-dark-teal to-sg-bright-green mb-4">Scorecard Not Found</h2>
          <p className="text-sg-dark-teal/80 mb-8">We couldn't find your scorecard results. The report ID might be incorrect or the report may have been deleted.</p>

          <div className="flex flex-col gap-4 mt-4">
            <a
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-sg-dark-teal to-sg-bright-green text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Start New Assessment
            </a>
          </div>

          <p className="text-xs text-sg-dark-teal/70 mt-8">
            Please ensure you have the correct report link.
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-sg-light-mint text-sg-dark-teal font-plus-jakarta">
      {/* Background elements */}
      <div className="absolute inset-0 bg-pattern-grid opacity-5 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-bl from-sg-light-mint via-transparent to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-sg-light-mint via-transparent to-transparent z-0"></div>

      {/* Decorative blobs */}
      <div className="absolute top-40 left-20 w-96 h-96 rounded-full bg-sg-bright-green/10 opacity-50 blur-4xl z-0"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-sg-dark-teal/10 opacity-50 blur-4xl z-0"></div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left sidebar with God-Tier Design */}
        <div className="lg:w-80 bg-sg-dark-teal shadow-lg border-r border-sg-dark-teal/20">
          <div className="p-6 border-b border-white/10">
            <div className="bg-divine-gradient text-transparent bg-clip-text">
              <h1 className="text-2xl font-bold tracking-tight">AI Efficiency</h1>
              <h2 className="text-3xl font-extrabold tracking-tighter">SCORECARD</h2>
            </div>
            <div className="mt-2 text-white/70 font-medium">
              {userData?.companyName ? `Report for ${userData.companyName}` : 'Executive Dashboard'}
            </div>
          </div>

          <nav className="p-6">
            <ul className="space-y-3">
              {cardOrder.map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => handleTabChange(tab)}
                    className={`sidebar-nav-item w-full`}
                  >
                    <div className={`w-1.5 h-10 rounded-full transition-all duration-300 ${
                      activeTab === tab ? 'bg-sg-bright-green' : 'bg-white/20'
                    }`}></div>
                    <span className={`font-medium ${activeTab === tab ? 'text-white' : 'text-white/80'}`}>
                      {cardTitles[tab]}
                    </span>
                    {activeTab === tab && (
                      <svg className="ml-auto h-5 w-5 text-sg-bright-green" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-6 pt-6 mt-auto border-t border-white/10 absolute bottom-0 w-full">
            <div className="flex items-center gap-3 text-white/70 hover:text-white pb-6 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              <a href="/" className="text-sm font-medium">Back to Assessment</a>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-4 lg:p-10 overflow-y-auto bg-gradient-sg-mint">
          {/* Header with action buttons */}
          <div className="divine-card mb-8 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="font-title-main bg-divine-gradient text-transparent bg-clip-text">
                  {cardTitles[activeTab]}
                </h1>
                <p className="font-body-md text-sg-dark-teal/70 mt-1">
                  {activeTab === 'Overall Tier' ? 'Your AI maturity assessment results' :
                  activeTab === 'Key Findings' ? 'Strengths and areas for improvement' :
                  activeTab === 'Strategic Action Plan' ? 'Your personalized next steps' :
                  activeTab === 'Assessment Q&A Breakdown' ? 'Your responses to the assessment' :
                  'Insights and recommendations'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-6 md:mt-0">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="btn-secondary-divine flex items-center gap-2 py-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>

                {/* Share Report Button */}
                <button
                  onClick={() => {
                    // Get the current URL
                    const url = window.location.href;
                    // Set loading state
                    updateButtonState('share-button', 'loading', getSvgContent('loading') + ' Copying...');

                    // Try to use the newer Share API if available
                    if (navigator.share) {
                      navigator.share({
                        title: `AI Efficiency Scorecard - ${extractedTier} Tier`,
                        text: 'Check out my AI Efficiency Scorecard results:',
                        url: url
                      }).then(() => {
                        // Success feedback
                        updateButtonState('share-button', 'success', getSvgContent('success') + ' Shared!');

                        // Reset after 2 seconds
                        setTimeout(() => {
                          updateButtonState('share-button', 'reset');
                        }, 2000);
                      }).catch(err => {
                        // Fallback to clipboard if share fails
                        copyToClipboard();
                      });
                    } else {
                      // Browser doesn't support Share API, fallback to clipboard
                      copyToClipboard();
                    }

                    function copyToClipboard() {
                      // Copy to clipboard
                      navigator.clipboard.writeText(url)
                        .then(() => {
                          // Visual feedback - change button text temporarily
                          updateButtonState('share-button', 'success', getSvgContent('success') + ' Link Copied!');

                          // Reset after 2 seconds
                          setTimeout(() => {
                            updateButtonState('share-button', 'reset');
                          }, 2000);
                        })
                        .catch(err => {
                          console.error('Failed to copy URL: ', err);
                          updateButtonState('share-button', 'error', getSvgContent('error') + ' Copy Failed');
                          
                          // Reset after 2 seconds
                          setTimeout(() => {
                            updateButtonState('share-button', 'reset');
                          }, 2000);
                        });
                    }
                  }}
                  id="share-button"
                  className="btn-secondary-divine flex items-center gap-2 py-2"
                >
                  {getSvgContent('share')}
                  Share Report
                </button>

                <button
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="btn-primary-divine flex items-center gap-2 py-2"
                  id="new-download-pdf-button"
                >
                  {isDownloadingPdf ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating your PDF...</span>
                    </span>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download Report PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Content card with God-Tier design */}
          <div className="relative animate-fade-in">
            {/* Content card */}
            <div className={`divine-card p-6 lg:p-10 ${
              tabChanging ? 'opacity-0 transform translate-y-4 transition-all duration-200' :
                          'opacity-100 transform translate-y-0 transition-all duration-200'
            }`}>
              {/* Overall Tier Section */}
              {activeTab === 'Overall Tier' && sections['Overall Tier'] && (
                <div className="prose prose-lg max-w-none">
                  <OverallTierSection
                    markdownContent={sections['Overall Tier']}
                    extractedTier={extractedTier}
                    userName={userName}
                  />
                </div>
              )}

              {/* Key Findings Section */}
              {activeTab === 'Key Findings' && sections['Key Findings'] && (
                <div className="prose prose-lg max-w-none">
                  <KeyFindingsSection markdownContent={sections['Key Findings']} />
                </div>
              )}

              {/* Strategic Action Plan Section */}
              {activeTab === 'Strategic Action Plan' && sections['Strategic Action Plan'] && (
                <div className="prose prose-lg max-w-none">
                  <StrategicActionPlanSection reportMarkdown={sections['Strategic Action Plan']} />
                </div>
              )}

              {/* Detailed Analysis Section */}
              {activeTab === 'Detailed Analysis' && (
                <div className="prose prose-lg max-w-none">
                  <DetailedAnalysisSection markdownContent={reportMarkdown} questionAnswerHistory={questionAnswerHistory.slice(0, 5)} />
                </div>
              )}

              {/* Getting Started & Resources Section */}
              {activeTab === 'Getting Started & Resources' && sections['Getting Started & Resources'] && (
                <div className="prose prose-lg max-w-none">
                  <GettingStartedResourcesSection markdownContent={sections['Getting Started & Resources']} />
                </div>
              )}

              {/* Illustrative Benchmarks Section */}
              {activeTab === 'Illustrative Benchmarks' && sections['Illustrative Benchmarks'] && (
                <div className="prose prose-lg max-w-none">
                  <IllustrativeBenchmarksSection markdownContent={sections['Illustrative Benchmarks']} />
                </div>
              )}

              {/* Personalized Learning Path Section */}
              {activeTab === 'Personalized Learning Path' && sections['Personalized Learning Path'] && (
                <div className="prose prose-lg max-w-none">
                  <PersonalizedLearningPathSection markdownContent={sections['Personalized Learning Path']} />
                </div>
              )}

              {/* Learning Hub Direction Section */}
              {activeTab === 'Learning Hub' && (
                <div className="prose prose-lg max-w-none">
                  <LearningHubDirectionSection tierLevel={extractedTier || undefined} />
                </div>
              )}

              {/* Assessment Q&A Breakdown Section */}
              {activeTab === 'Assessment Q&A Breakdown' && (
                <div className="prose prose-lg max-w-none">
                  <AssessmentQABreakdownSection questionAnswerHistory={questionAnswerHistory} />
                </div>
              )}

              {/* Fallback for empty/unknown sections */}
              {!currentSectionMarkdown && 
               activeTab !== 'Assessment Q&A Breakdown' && 
               activeTab !== 'Learning Hub' && 
               activeTab !== 'Detailed Analysis' && (
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
            <p className="font-body-sm">AI Efficiency Scorecard • Powered by AI • {new Date().getFullYear()}</p>
            <p className="text-xs text-sg-dark-teal/50 mt-1">This is a testing environment. Results are for development purposes only.</p>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-divine-card hover:shadow-divine-card-hover transition-all transform hover:scale-110 text-sg-dark-teal focus:outline-none border border-sg-bright-green/20"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
