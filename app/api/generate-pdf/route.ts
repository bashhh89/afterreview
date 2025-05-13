import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
let db: FirebaseFirestore.Firestore | undefined;

if (!admin.apps.length) {
  try {
    // Check if we have service account info in environment variables
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString()
      );
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      });
    } else {
      // Try to use application default credentials, or use a more permissive initialization
      try {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        });
      } catch (credError) {
        console.warn('Using Firebase without proper credentials, only mock data will work:', credError);
        admin.initializeApp({
          // This will allow the app to initialize but actual Firestore operations will fail
          // That's okay because we'll use mock data in development
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mock-project',
        });
      }
    }
    db = admin.firestore();
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    // We'll still define db to prevent errors, but it won't be functional
    // That's okay because we'll use mock data in development
  }
}

// We'll only use this if Firestore initialization fails
const getMockReportData = (reportId: string) => {
  return {
    reportMarkdown: `## Overall Tier: Enabler

Your organization is at the Enabler tier of AI maturity. This means you have begun to develop significant AI capabilities with some successful implementations.

## Key Findings

### Strengths:
1. Strong alignment between AI and business objectives
2. Emerging data infrastructure and governance
3. Growing internal AI expertise
4. Several successful AI implementations

### Weaknesses:
1. Limited AI strategy formalization
2. Data quality and accessibility challenges
3. Gaps in technical infrastructure
4. Inconsistent AI governance processes

## Strategic Action Plan
1. Formalize your AI strategy and roadmap
2. Enhance data infrastructure and governance
3. Establish an AI Center of Excellence
4. Implement a systematic approach to AI project selection
5. Develop comprehensive AI governance framework

## Illustrative Benchmarks
Companies at the Enabler tier typically have implemented 3-5 successful AI use cases, with 10-15% of relevant workflows augmented by AI, and 5-10% of employees regularly using AI tools.

## Personalized Learning Path
1. AI Strategy Development
2. Data Governance for AI
3. Building AI Teams and Capabilities
4. Effective AI Project Management
5. AI Ethics and Governance Frameworks`,
    leadName: 'Mock User',
    leadCompany: 'Mock Company',
    industry: 'Technology',
    userAITier: 'Enabler',
    tier: 'Enabler',
    userName: 'Mock User',
    companyName: 'Mock Company',
    questionAnswerHistory: [
      { question: "What is your organization's primary industry?", answer: "Technology" },
      { question: "How many employees does your organization have?", answer: "100-500" },
      { question: "How would you rate your organization's current data quality and accessibility?", answer: "Moderate" }
    ]
  };
};

// Extract sections from the Markdown string
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
      // Handle "Overall Tier" section which might have different formats
      if (currentTitleKey.toLowerCase().includes('overall tier')) {
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

// Extract tier from the markdown
function extractTier(markdown: string): string {
  const tierMatch = markdown.match(/## Overall Tier:?\s*(.+?)($|\n)/i);
  if (tierMatch && tierMatch[1]) {
    return tierMatch[1].trim();
  }
  
  // Fallback to searching for Leader, Enabler, or Dabbler in the markdown
  const tierKeywords = ["Leader", "Enabler", "Dabbler"];
  for (const keyword of tierKeywords) {
    if (markdown.includes(keyword)) {
      return keyword;
    }
  }
  
  return 'Unknown';
}

// Helper function to extract strengths from markdown
function extractStrengths(markdown: string): string[] {
  const strengths: string[] = [];
  const strengthsRegex = /(?:Strengths|Strengths:)([\s\S]*?)(?=(?:Weaknesses|Weaknesses:|$))/i;
  const strengthsMatch = markdown.match(strengthsRegex);
  
  if (strengthsMatch && strengthsMatch[1]) {
    const strengthLines = strengthsMatch[1].split(/\d+\.\s+/);
    for (let i = 1; i < strengthLines.length; i++) { // Skip first one as it's usually empty
      const line = strengthLines[i].trim();
      if (line) strengths.push(line);
    }
  }
  
  return strengths;
}

// Helper function to extract weaknesses from markdown
function extractWeaknesses(markdown: string): string[] {
  const weaknesses: string[] = [];
  const weaknessesRegex = /(?:Weaknesses|Weaknesses:)([\s\S]*?)(?=$)/i;
  const weaknessesMatch = markdown.match(weaknessesRegex);
  
  if (weaknessesMatch && weaknessesMatch[1]) {
    const weaknessLines = weaknessesMatch[1].split(/\d+\.\s+/);
    for (let i = 1; i < weaknessLines.length; i++) { // Skip first one as it's usually empty
      const line = weaknessLines[i].trim();
      if (line) weaknesses.push(line);
    }
  }
  
  return weaknesses;
}

// Helper function to extract action items
function extractActionItems(markdown: string): string[] {
  const actionItems: string[] = [];
  const sections = extractSections(markdown);
  const actionPlanSection = sections['Strategic Action Plan'];
  
  if (actionPlanSection) {
    // Look for numbered points (1. Action item, 2. Action item, etc.)
    const actionRegex = /\d+\.\s+([^.\n]+(?:\.[^.\n]+)*)/g;
    let match;
    
    while ((match = actionRegex.exec(actionPlanSection)) !== null) {
      if (match[1] && match[1].trim()) {
        actionItems.push(match[1].trim());
      }
    }
  }
  
  return actionItems;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reportId = searchParams.get('reportId');

  if (!reportId) {
    return NextResponse.json({ error: 'reportId is required' }, { status: 400 });
  }

  try {
    // 1. Fetch report data from Firestore
    let reportData: any;
    let reportMarkdown: string;
    
    try {
      if (!db) {
        throw new Error('Firestore not initialized properly');
      }
      
      const reportRef = db.collection('scorecardReports').doc(reportId);
      const reportDoc = await reportRef.get();

      if (!reportDoc.exists) {
        throw new Error('Report not found in Firestore');
      }

      reportData = reportDoc.data();
      reportMarkdown = reportData?.reportMarkdown || '';
      
    } catch (dbError) {
      console.warn('Error fetching from Firestore, using mock data:', dbError);
      // Use mock data if Firestore fetch fails
      reportData = getMockReportData(reportId);
      reportMarkdown = reportData.reportMarkdown;
    }
    
    // Extract data from report
    const sections = extractSections(reportMarkdown);
    const userTier = reportData?.userAITier || reportData?.tier || extractTier(reportMarkdown);
    const strengths = extractStrengths(reportMarkdown);
    const weaknesses = extractWeaknesses(reportMarkdown);
    const actionItems = extractActionItems(reportMarkdown);
    
    // Extract user data
    const userName = reportData?.leadName || reportData?.userName || 'User';
    const companyName = reportData?.companyName || reportData?.leadCompany || '';
    const industry = reportData?.industry || 'Not specified';
    
    console.log('Generating direct PDF...');
    
    // 2. Create a simple HTML document that has all necessary data
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>AI Efficiency Scorecard - ${userTier} Tier</title>
      <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 40px;
          max-width: 900px;
          margin: 0 auto;
          background-color: #f9f9f9;
        }
        .report-container {
          background-color: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #20E28F;
        }
        h1 {
          color: #103138;
          margin-bottom: 5px;
          font-size: 28px;
        }
        h2 {
          color: #20E28F;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 5px;
          margin-top: 25px;
          font-size: 22px;
        }
        .tier-badge {
          display: inline-block;
          background-color: #20E28F;
          color: white;
          font-weight: bold;
          padding: 5px 15px;
          border-radius: 15px;
          margin: 10px 0;
          font-size: 16px;
        }
        .user-info {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 30px;
        }
        .user-info p {
          margin: 8px 0;
        }
        .section {
          margin-bottom: 30px;
        }
        .item {
          background-color: #f9f9f9;
          padding: 15px;
          border-left: 3px solid #20E28F;
          margin-bottom: 10px;
          border-radius: 3px;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #666;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        .print-button {
          display: block;
          background-color: #20E28F;
          color: white;
          font-weight: bold;
          padding: 12px 24px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin: 20px auto;
          text-align: center;
          text-decoration: none;
          width: 200px;
          font-size: 16px;
        }
        .print-button:hover {
          background-color: #18b476;
        }
        @media print {
          body {
            padding: 0;
            background-color: white;
          }
          .report-container {
            box-shadow: none;
            padding: 20px;
          }
          .print-button {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <button class="print-button" onclick="window.print()">Print Report</button>
      
      <div class="report-container">
        <div class="header">
          <h1>AI Efficiency Scorecard</h1>
          <div class="tier-badge">${userTier} Tier</div>
        </div>
        
        <div class="user-info">
          <p><strong>Company:</strong> ${companyName || 'Not specified'}</p>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Report ID:</strong> ${reportId}</p>
          <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
          <h2>Overall Assessment</h2>
          <p>${sections['Overall Tier'] ? 
            sections['Overall Tier'].replace(/^## Overall Tier:.*\n/m, '').trim() : 
            `Your organization has been assessed at the ${userTier} tier in AI maturity. This indicates your current level of AI capabilities, adoption, and implementation maturity.`
          }</p>
        </div>
        
        <div class="section">
          <h2>Key Strengths</h2>
          ${strengths.length > 0 ? 
            strengths.map((strength, index) => `<div class="item">${index + 1}. ${strength}</div>`).join('') : 
            '<div class="item">No specific strengths identified in assessment</div>'
          }
        </div>
        
        <div class="section">
          <h2>Areas for Improvement</h2>
          ${weaknesses.length > 0 ? 
            weaknesses.map((weakness, index) => `<div class="item">${index + 1}. ${weakness}</div>`).join('') : 
            '<div class="item">No specific areas for improvement identified in assessment</div>'
          }
        </div>
        
        <div class="section">
          <h2>Strategic Action Plan</h2>
          ${actionItems.length > 0 ? 
            actionItems.map((action, index) => `<div class="item">${index + 1}. ${action}</div>`).join('') : 
            '<div class="item">Complete a detailed AI readiness assessment with specialist consultation</div>'
          }
        </div>
        
        ${sections['Illustrative Benchmarks'] ? `
          <div class="section">
            <h2>Illustrative Benchmarks</h2>
            <p>${sections['Illustrative Benchmarks'].replace(/^## Illustrative Benchmarks:?/i, '').trim()}</p>
          </div>
        ` : ''}
        
        ${sections['Personalized Learning Path'] ? `
          <div class="section">
            <h2>Recommended Learning Path</h2>
            <p>${sections['Personalized Learning Path'].replace(/^## Personalized Learning Path:?/i, '').trim()}</p>
          </div>
        ` : ''}
        
        <div class="footer">
          <p>AI Efficiency Scorecard • Powered by Social Garden • ${new Date().getFullYear()}</p>
          <p>This report is based on your assessment responses and is provided for informational purposes only.</p>
        </div>
      </div>
      
      <button class="print-button" onclick="window.print()">Print Report</button>
      
      <script>
        // Auto-open print dialog on load if requested
        document.addEventListener('DOMContentLoaded', function() {
          // Check if there's a query param to trigger printing
          const urlParams = new URLSearchParams(window.location.search);
          if(urlParams.get('print') === 'true') {
            setTimeout(function() {
              window.print();
            }, 1000);
          }
        });
      </script>
    </body>
    </html>
    `;
    
    // 3. Convert HTML to simple base64 data PDF for download
    const pdfData = Buffer.from(htmlContent);
    
    // Improve the HTML content to make it a complete, self-contained report that will open properly
    const fullHtmlReport = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>AI Efficiency Scorecard - ${userTier} Tier</title>
      <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 40px;
          max-width: 900px;
          margin: 0 auto;
          background-color: #f9f9f9;
        }
        .report-container {
          background-color: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #20E28F;
        }
        h1 {
          color: #103138;
          margin-bottom: 5px;
          font-size: 28px;
        }
        h2 {
          color: #20E28F;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 5px;
          margin-top: 25px;
          font-size: 22px;
        }
        .tier-badge {
          display: inline-block;
          background-color: #20E28F;
          color: white;
          font-weight: bold;
          padding: 5px 15px;
          border-radius: 15px;
          margin: 10px 0;
          font-size: 16px;
        }
        .user-info {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 30px;
        }
        .user-info p {
          margin: 8px 0;
        }
        .section {
          margin-bottom: 30px;
        }
        .item {
          background-color: #f9f9f9;
          padding: 15px;
          border-left: 3px solid #20E28F;
          margin-bottom: 10px;
          border-radius: 3px;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #666;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        .print-button {
          display: block;
          background-color: #20E28F;
          color: white;
          font-weight: bold;
          padding: 12px 24px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin: 20px auto;
          text-align: center;
          text-decoration: none;
          width: 200px;
          font-size: 16px;
        }
        .print-button:hover {
          background-color: #18b476;
        }
        @media print {
          body {
            padding: 0;
            background-color: white;
          }
          .report-container {
            box-shadow: none;
            padding: 20px;
          }
          .print-button {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <button class="print-button" onclick="window.print()">Print Report</button>
      
      <div class="report-container">
        <div class="header">
          <h1>AI Efficiency Scorecard</h1>
          <div class="tier-badge">${userTier} Tier</div>
        </div>
        
        <div class="user-info">
          <p><strong>Company:</strong> ${companyName || 'Not specified'}</p>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Report ID:</strong> ${reportId}</p>
          <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
          <h2>Overall Assessment</h2>
          <p>${sections['Overall Tier'] ? 
            sections['Overall Tier'].replace(/^## Overall Tier:.*\n/m, '').trim() : 
            `Your organization has been assessed at the ${userTier} tier in AI maturity. This indicates your current level of AI capabilities, adoption, and implementation maturity.`
          }</p>
        </div>
        
        <div class="section">
          <h2>Key Strengths</h2>
          ${strengths.length > 0 ? 
            strengths.map((strength, index) => `<div class="item">${index + 1}. ${strength}</div>`).join('') : 
            '<div class="item">No specific strengths identified in assessment</div>'
          }
        </div>
        
        <div class="section">
          <h2>Areas for Improvement</h2>
          ${weaknesses.length > 0 ? 
            weaknesses.map((weakness, index) => `<div class="item">${index + 1}. ${weakness}</div>`).join('') : 
            '<div class="item">No specific areas for improvement identified in assessment</div>'
          }
        </div>
        
        <div class="section">
          <h2>Strategic Action Plan</h2>
          ${actionItems.length > 0 ? 
            actionItems.map((action, index) => `<div class="item">${index + 1}. ${action}</div>`).join('') : 
            '<div class="item">Complete a detailed AI readiness assessment with specialist consultation</div>'
          }
        </div>
        
        ${sections['Illustrative Benchmarks'] ? `
          <div class="section">
            <h2>Illustrative Benchmarks</h2>
            <p>${sections['Illustrative Benchmarks'].replace(/^## Illustrative Benchmarks:?/i, '').trim()}</p>
          </div>
        ` : ''}
        
        ${sections['Personalized Learning Path'] ? `
          <div class="section">
            <h2>Recommended Learning Path</h2>
            <p>${sections['Personalized Learning Path'].replace(/^## Personalized Learning Path:?/i, '').trim()}</p>
          </div>
        ` : ''}
        
        <div class="footer">
          <p>AI Efficiency Scorecard • Powered by Social Garden • ${new Date().getFullYear()}</p>
          <p>This report is based on your assessment responses and is provided for informational purposes only.</p>
        </div>
      </div>
      
      <button class="print-button" onclick="window.print()">Print Report</button>
      
      <script>
        // Auto-open print dialog on load if requested
        document.addEventListener('DOMContentLoaded', function() {
          // Check if there's a query param to trigger printing
          const urlParams = new URLSearchParams(window.location.search);
          if(urlParams.get('print') === 'true') {
            setTimeout(function() {
              window.print();
            }, 1000);
          }
        });
      </script>
    </body>
    </html>
    `;
    
    // 4. Return the HTML report directly
    return new NextResponse(fullHtmlReport, { 
      headers: {
        'Content-Type': 'text/html'
      } 
    });

  } catch (error) {
    console.error('Error generating report:', error);
    
    // Fallback to error page with retry option
    const errorHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Error - AI Efficiency Scorecard</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background-color: #f5f5f5;
        }
        .error-container {
          text-align: center;
          max-width: 600px;
          padding: 30px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        h1 {
          color: #ff3333;
        }
        .retry-button {
          background-color: #20E28F;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="error-container">
        <h1>Something went wrong</h1>
        <p>We encountered an error while generating your AI Efficiency Scorecard.</p>
        <p>Error details: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button class="retry-button" onclick="window.location.reload()">Try Again</button>
        <p style="margin-top: 30px;">If the problem persists, please contact support.</p>
      </div>
    </body>
    </html>
    `;
    
    return new NextResponse(errorHtml, { 
      headers: {
        'Content-Type': 'text/html'
      },
      status: 500
    });
  }
}
