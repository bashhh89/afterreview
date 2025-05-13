'use client';

import React, { useState, useEffect } from 'react';

export default function DebugSessionPage() {
  // State for all the data we want to display
  const [userData, setUserData] = useState({
    industry: '',
    userName: '',
    companyName: '',
    email: '',
  });
  const [scoreData, setScoreData] = useState({
    userTier: '',
    finalScore: '',
    reportId: '',
  });
  const [questionAnswerHistory, setQuestionAnswerHistory] = useState<any[]>([]);
  const [reportMarkdown, setReportMarkdown] = useState('');
  const [parsedSections, setParsedSections] = useState<Record<string, string>>({});
  
  // State for manual input fields
  const [manualInputs, setManualInputs] = useState({
    questionAnswerHistory: '',
    reportMarkdown: '',
  });

  // State for notification
  const [notification, setNotification] = useState('');

  // Load data from sessionStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Debug logging - show all sessionStorage keys and values
        console.log('DEBUG PAGE: Checking all sessionStorage items:');
        const sessionStorageItems: Record<string, string> = {};
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key) {
            const value = sessionStorage.getItem(key);
            sessionStorageItems[key] = value ? (value.length > 50 ? value.substring(0, 50) + '...' : value) : 'null';
          }
        }
        console.table(sessionStorageItems);
        
        // Also check localStorage as data might be there
        console.log('DEBUG PAGE: Checking all localStorage items:');
        const localStorageItems: Record<string, string> = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            const value = localStorage.getItem(key);
            localStorageItems[key] = value ? (value.length > 50 ? value.substring(0, 50) + '...' : value) : 'null';
          }
        }
        console.table(localStorageItems);

        // User data
        // Try different user data storage patterns
        let userData: {
          industry: string;
          userName: string;
          companyName: string;
          email: string;
        } = {
          industry: '',
          userName: '',
          companyName: '',
          email: '',
        };
        
        // Try userData object
        const storedUserData = sessionStorage.getItem('userData') || localStorage.getItem('userData');
        if (storedUserData) {
          try {
            const parsedUserData = JSON.parse(storedUserData);
            userData = {
              industry: parsedUserData.industry || '',
              userName: parsedUserData.leadName || parsedUserData.name || '',
              companyName: parsedUserData.companyName || '',
              email: parsedUserData.email || '',
            };
            console.log('DEBUG PAGE: Parsed userData object:', parsedUserData);
          } catch (e) {
            console.error('Error parsing userData:', e);
          }
        }
        
        // Try individual user data fields (overwrite if found)
        const leadName = sessionStorage.getItem('scorecardLeadName') || sessionStorage.getItem('scorecardUserName') || localStorage.getItem('scorecardLeadName') || localStorage.getItem('scorecardUserName');
        const companyName = sessionStorage.getItem('scorecardLeadCompany') || localStorage.getItem('scorecardLeadCompany');
        const email = sessionStorage.getItem('scorecardLeadEmail') || localStorage.getItem('scorecardLeadEmail');
        const industry = sessionStorage.getItem('industry') || localStorage.getItem('industry');
        
        if (leadName) userData.userName = leadName;
        if (companyName) userData.companyName = companyName;
        if (email) userData.email = email;
        if (industry) userData.industry = industry;
        
        // Set the user data
        setUserData(userData);
        console.log('DEBUG PAGE: Final user data being set:', userData);
        
        // Score and tier data - try multiple possible keys
        const storedUserTier = 
          sessionStorage.getItem('userAITier') || 
          sessionStorage.getItem('tier') || 
          sessionStorage.getItem('aiTier') || 
          sessionStorage.getItem('userTier') ||
          localStorage.getItem('userAITier') || 
          localStorage.getItem('tier') || 
          localStorage.getItem('aiTier') || 
          localStorage.getItem('userTier');
          
        const storedFinalScore = sessionStorage.getItem('finalScore') || localStorage.getItem('finalScore');
        
        // ReportId can be stored under multiple keys
        const storedReportId = 
          sessionStorage.getItem('reportId') || 
          sessionStorage.getItem('currentReportID') ||
          localStorage.getItem('reportId') || 
          localStorage.getItem('currentReportID');
        
        if (storedUserTier || storedFinalScore || storedReportId) {
          const scoreData = {
            userTier: storedUserTier || '',
            finalScore: storedFinalScore || '',
            reportId: storedReportId || '',
          };
          setScoreData(scoreData);
          console.log('DEBUG PAGE: Score data loaded:', scoreData);
        }

        // Question answer history
        const storedHistory = sessionStorage.getItem('questionAnswerHistory') || localStorage.getItem('questionAnswerHistory');
        if (storedHistory) {
          try {
            const parsedHistory = JSON.parse(storedHistory);
            setQuestionAnswerHistory(parsedHistory);
            setManualInputs(prev => ({ ...prev, questionAnswerHistory: JSON.stringify(parsedHistory, null, 2) }));
            console.log(`DEBUG PAGE: Question history loaded with ${parsedHistory.length} items`);
          } catch (e) {
            console.error('Error parsing question history:', e);
          }
        } else {
          console.log('DEBUG PAGE: No question history found in storage');
        }

        // Report markdown
        const storedReport = sessionStorage.getItem('reportMarkdown') || localStorage.getItem('reportMarkdown');
        if (storedReport) {
          setReportMarkdown(storedReport);
          setManualInputs(prev => ({ ...prev, reportMarkdown: storedReport }));
          
          // Parse report sections
          const sections = extractSections(storedReport);
          setParsedSections(sections);
          console.log(`DEBUG PAGE: Report markdown loaded and parsed into ${Object.keys(sections).length} sections`);
        } else {
          console.log('DEBUG PAGE: No report markdown found in storage');
        }
        
        // Check what data we found
        const dataFound = !!(storedReport || storedHistory || storedUserTier || storedReportId);
        if (dataFound) {
          setNotification('Data loaded from sessionStorage');
          setTimeout(() => setNotification(''), 3000);
        } else {
          setNotification('No Scorecard data found in sessionStorage. Try completing an assessment first.');
          setTimeout(() => setNotification(''), 5000);
        }
      } catch (error) {
        console.error('Error loading data from sessionStorage:', error);
        setNotification('Error loading data from sessionStorage');
        setTimeout(() => setNotification(''), 5000);
      }
    }
  }, []);

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

  // Handle manual input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'industry' || name === 'userName' || name === 'companyName' || name === 'email') {
      setUserData(prev => ({ ...prev, [name]: value }));
    } else if (name === 'userTier' || name === 'finalScore' || name === 'reportId') {
      setScoreData(prev => ({ ...prev, [name]: value }));
    } else {
      setManualInputs(prev => ({ ...prev, [name]: value }));
    }
  };

  // Process and load manual inputs
  const processManualInputs = () => {
    try {
      // Process question answer history
      if (manualInputs.questionAnswerHistory) {
        const parsedHistory = JSON.parse(manualInputs.questionAnswerHistory);
        setQuestionAnswerHistory(parsedHistory);
      }

      // Process report markdown
      if (manualInputs.reportMarkdown) {
        setReportMarkdown(manualInputs.reportMarkdown);
        const sections = extractSections(manualInputs.reportMarkdown);
        setParsedSections(sections);
      }

      setNotification('Manual inputs processed successfully');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error processing manual inputs:', error);
      setNotification('Error processing manual inputs. Check JSON format.');
      setTimeout(() => setNotification(''), 5000);
    }
  };

  // Copy all data to clipboard
  const copyAllToClipboard = () => {
    try {
      const formattedData = `
# SCORECARD DEBUG DATA
## User Information
Industry: ${userData.industry}
User Name: ${userData.userName}
Company Name: ${userData.companyName}
Email: ${userData.email}

## Score Information
AI Tier: ${scoreData.userTier}
Final Score: ${scoreData.finalScore}
Report ID: ${scoreData.reportId}

## Question Answer History
${JSON.stringify(questionAnswerHistory, null, 2)}

## Full Report Markdown
${reportMarkdown}

## Parsed Sections
${Object.entries(parsedSections)
  .map(([key, value]) => `### ${key}\n${value}`)
  .join('\n\n')}
`;

      navigator.clipboard.writeText(formattedData);
      setNotification('All debug info copied to clipboard!');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setNotification('Error copying to clipboard');
      setTimeout(() => setNotification(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">AI Scorecard - Debug Session</h1>
        <p className="text-sm text-gray-300">INTERNAL TESTING ONLY - NOT FOR CLIENT USE</p>
      </header>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
          {notification}
        </div>
      )}

      {/* Data loading controls */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Data Input</h2>
        <p className="text-sm text-gray-500 mb-4">
          Data is automatically loaded from sessionStorage if available. You can also manually paste data below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              value={userData.industry}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., Technology"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <input
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={userData.companyName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., Acme Corp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">AI Tier</label>
            <input
              type="text"
              name="userTier"
              value={scoreData.userTier}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., Dabbler, Enabler, Leader"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Final Score</label>
            <input
              type="text"
              name="finalScore"
              value={scoreData.finalScore}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., 75"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report ID</label>
            <input
              type="text"
              name="reportId"
              value={scoreData.reportId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., abc123"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question Answer History (JSON)</label>
            <textarea
              name="questionAnswerHistory"
              value={manualInputs.questionAnswerHistory}
              onChange={handleInputChange}
              className="w-full p-2 border rounded font-mono text-sm h-40"
              placeholder="Paste question answer history JSON here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Markdown</label>
            <textarea
              name="reportMarkdown"
              value={manualInputs.reportMarkdown}
              onChange={handleInputChange}
              className="w-full p-2 border rounded font-mono text-sm h-40"
              placeholder="Paste report markdown here..."
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={processManualInputs}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Process Manual Inputs
          </button>
          <button
            onClick={copyAllToClipboard}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Copy All Debug Data
          </button>
        </div>
      </div>

      {/* Data display sections */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">User & Session Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded border">
            <h3 className="font-medium text-gray-700 mb-2">User Data</h3>
            <ul className="text-sm">
              <li><span className="font-medium">Industry:</span> {userData.industry || 'N/A'}</li>
              <li><span className="font-medium">User Name:</span> {userData.userName || 'N/A'}</li>
              <li><span className="font-medium">Company Name:</span> {userData.companyName || 'N/A'}</li>
              <li><span className="font-medium">Email:</span> {userData.email || 'N/A'}</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded border">
            <h3 className="font-medium text-gray-700 mb-2">Score Data</h3>
            <ul className="text-sm">
              <li><span className="font-medium">AI Tier:</span> {scoreData.userTier || 'N/A'}</li>
              <li><span className="font-medium">Final Score:</span> {scoreData.finalScore || 'N/A'}</li>
              <li><span className="font-medium">Report ID:</span> {scoreData.reportId || 'N/A'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Q&A History */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Full Q&A History</h2>
        {questionAnswerHistory.length > 0 ? (
          <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q#</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Thinking</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {questionAnswerHistory.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{item.phase || 'N/A'}</td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <div className="max-w-md whitespace-pre-wrap">{item.question || 'N/A'}</div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <div className="max-w-md whitespace-pre-wrap">{item.answer || 'N/A'}</div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <div className="max-w-md whitespace-pre-wrap">{item.thinking || 'N/A'}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 text-center text-gray-500">
            No question/answer history available
          </div>
        )}
      </div>

      {/* Parsed Report Sections */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Parsed Report Sections</h2>
        {Object.keys(parsedSections).length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(parsedSections).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded border">
                <h3 className="font-medium text-gray-700 mb-2">{key}</h3>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm">
                  {value}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 text-center text-gray-500">
            No report sections available
          </div>
        )}
      </div>

      {/* Full Report Markdown */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Full Report Markdown</h2>
        {reportMarkdown ? (
          <div className="bg-gray-50 p-4 rounded border">
            <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto">{reportMarkdown}</pre>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 text-center text-gray-500">
            No report markdown available
          </div>
        )}
      </div>

      {/* Footer with copy button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Internal debug tool for AI Efficiency Scorecard
          </p>
          <button
            onClick={copyAllToClipboard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy All Debug Data
          </button>
        </div>
      </div>
    </div>
  );
} 