// Test script for PDF generation
// Run with: node test-pdf-generation.js

const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const htmlPdfNode = require('html-pdf-node');

const reportId = process.argv[2] || 'test-report-id'; // Use command line arg or default
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://ai-scorecard.socialgarden.com.au'
  : 'http://localhost:3000';

console.log(`Testing PDF generation for reportId: ${reportId}`);
console.log(`Using base URL: ${baseUrl}`);

const apiUrl = `${baseUrl}/api/generate-pdf?reportId=${reportId}&test=true`;

// Function to make HTTP request and save response
function fetchAndSaveHTML(url, outputPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    console.log(`Fetching from: ${url}`);
    
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirects
        console.log(`Redirected to: ${res.headers.location}`);
        return fetchAndSaveHTML(res.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP Status Code: ${res.statusCode}`));
      }
      
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          console.log(`Response length: ${data.length} bytes`);
          fs.writeFileSync(outputPath, data);
          console.log(`Output saved to: ${outputPath}`);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Main function
async function main() {
  try {
    const outputPath = path.join(__dirname, 'test-pdf-output.html');
    await fetchAndSaveHTML(apiUrl, outputPath);
    console.log('PDF generation test completed successfully!');
    console.log(`Check the generated HTML at: ${outputPath}`);
    console.log('To view in browser, open the HTML file with your browser');
  } catch (error) {
    console.error('Error testing PDF generation:', error);
    process.exit(1);
  }
}

// Basic PDF generation test
function testBasicPdfGeneration() {
  try {
    console.log('Testing basic PDF generation...');
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    const pdfOutput = doc.output();
    
    // Save the PDF to a file
    const outputPath = path.join(__dirname, 'test-basic.pdf');
    fs.writeFileSync(outputPath, Buffer.from(pdfOutput));
    
    console.log('Basic PDF generated successfully at:', outputPath);
    return true;
  } catch (error) {
    console.error('Error generating basic PDF:', error);
    return false;
  }
}

// Test that will run in Node.js environment
function runTests() {
  console.log('Starting PDF generation tests...');
  
  const basicPdfSuccess = testBasicPdfGeneration();
  
  console.log('\nTest Results:');
  console.log('-------------');
  console.log('Basic PDF Generation:', basicPdfSuccess ? 'SUCCESS' : 'FAILED');
  
  if (basicPdfSuccess) {
    console.log('\nAll tests passed! PDF generation should work in the browser.');
    console.log('If you are still having issues, check for browser-specific problems or CORS issues with images.');
  } else {
    console.log('\nSome tests failed. PDF generation might not work properly.');
  }
}

// Run tests
runTests();

// Mock data for testing
const mockQuestionAnswerHistory = [
  { 
    question: "How would you describe your organization's current approach to AI?", 
    answer: "We're exploring some AI tools but haven't integrated them into our workflow yet." 
  },
  { 
    question: "Rate your team's comfort level with AI tools and technologies:", 
    answer: "3" 
  },
  { 
    question: "Which AI capabilities are you currently using?", 
    answer: ["Basic content suggestions", "Customer service automation"]
  },
  { 
    question: "Which AI capabilities are you currently using?", 
    answer: ["Basic content suggestions", "Customer service automation"]
  },
  { 
    question: "How do you measure the ROI of your AI initiatives?", 
    answer: "We track efficiency metrics and time saved." 
  }
];

function formatQuestionAnswerHistoryAsHtml(qaHistory) {
  if (!qaHistory || qaHistory.length === 0) {
    return '<p>No question and answer history available.</p>';
  }
  let html = '<div class="qna-section">';
  html += '<h2>Full Assessment Q&A History</h2>';
  
  // Add deduplication logic to prevent consecutive identical entries
  const deduplicatedHistory = [];
  for (let i = 0; i < qaHistory.length; i++) {
    // Skip if this entry is identical to the previous one
    if (i > 0 && 
        qaHistory[i].question === qaHistory[i-1].question && 
        JSON.stringify(qaHistory[i].answer) === JSON.stringify(qaHistory[i-1].answer)) {
      console.log(`[PDF API] Skipping duplicate Q&A entry at index ${i}: ${qaHistory[i].question.substring(0, 30)}...`);
      continue;
    }
    deduplicatedHistory.push(qaHistory[i]);
  }
  
  deduplicatedHistory.forEach((item, index) => {
    const question = item.question || 'N/A';
    let answer = item.answer || 'Not answered';
    if (Array.isArray(answer)) {
      answer = answer.join(', ');
    } else if (typeof answer === 'object' && answer !== null) {
      answer = JSON.stringify(answer, null, 2);
      answer = `<pre>${answer}</pre>`; // Format JSON nicely
    }
    const reasoning = item.reasoning || item.thinking || '';
    const questionType = item.type || '';

    html += `
      <div class="qna-item">
        <p class="question"><strong>Q${index + 1}: ${question}</strong> ${questionType ? `<em class="question-type">(${questionType})</em>` : ''}</p>
        <div class="answer"><strong>A:</strong> ${answer}</div>
        ${reasoning ? `<div class="reasoning"><strong>Context/Reasoning:</strong> ${reasoning}</div>` : ''}
      </div>
    `;
  });
  html += '</div>';
  return html;
}

async function generateTestPdf() {
  // Mock report content
  const mockMarkdown = `
  # AI Efficiency Scorecard Report
  
  ## Overall Tier: Enabler
  
  Your organization is at the Enabler tier of AI maturity. This indicates that you have begun to develop significant AI capabilities with some successful implementations.
  
  ## Key Findings
  
  ### Strengths:
  - Growing alignment of AI initiatives with business goals
  - Developing data infrastructure and practices
  - Building internal AI capabilities and expertise
  
  ### Areas for Improvement:
  - Formalizing AI strategy and governance
  - Expanding data infrastructure and capabilities
  - Systematizing AI development processes
  
  ## Strategic Action Plan
  
  1. Develop a formal AI strategy aligned with business objectives
  2. Implement structured data governance policies
  3. Establish an AI Center of Excellence
  4. Create an AI skills development program
  5. Define clear ROI metrics for AI initiatives
  `;
  
  // Generate HTML for the Q&A section
  const qnaHtml = formatQuestionAnswerHistoryAsHtml(mockQuestionAnswerHistory);
  
  // Basic HTML rendering of markdown (simplified for test)
  const renderedMarkdownAsHtml = mockMarkdown
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/- (.*)/g, '<li>$1</li>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/# (.*)/g, '<h1>$1</h1>');
  
  // Base64 encoded logo placeholder
  const logoBase64 = 'data:image/png;base64,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';
  
  // Create HTML content with page numbers
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>AI Efficiency Scorecard Report Test</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; color: #333; line-height: 1.6; font-size: 11pt; }
        .page-container { width: 100%; max-width: 800px; margin: 0 auto; padding: 25mm 20mm; } /* A4-ish padding */
        
        .report-header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #103138; }
        .report-header img.logo { max-height: 50px; margin-bottom: 15px; }
        .report-header h1 { font-size: 24pt; color: #103138; margin-bottom: 5px; }
        .report-header .user-info { font-size: 12pt; color: #555; }
        .report-header .report-details { font-size: 10pt; color: #777; }

        .markdown-content { margin-bottom: 30px; }
        .markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4 { color: #103138; margin-top: 1.5em; margin-bottom: 0.5em; line-height: 1.3; }
        .markdown-content h1 { font-size: 20pt; border-bottom: 1px solid #eee; padding-bottom: 0.3em;}
        .markdown-content h2 { font-size: 16pt; }
        .markdown-content h3 { font-size: 14pt; }
        .markdown-content h4 { font-size: 12pt; }
        .markdown-content p { margin-bottom: 1em; }
        .markdown-content ul, .markdown-content ol { margin-bottom: 1em; padding-left: 1.5em; }
        .markdown-content li { margin-bottom: 0.5em; }
        .markdown-content strong { font-weight: bold; }
        .markdown-content em { font-style: italic; }
        .markdown-content blockquote { border-left: 3px solid #eee; padding-left: 1em; margin-left: 0; font-style: italic; color: #555; }
        .markdown-content pre { background-color: #f5f5f5; padding: 1em; border-radius: 4px; overflow-x: auto; font-family: 'Courier New', Courier, monospace; font-size: 10pt;}
        .markdown-content table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
        .markdown-content th, .markdown-content td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .markdown-content th { background-color: #f0f0f0; font-weight: bold; }

        .qna-section { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
        .qna-section h2 { font-size: 16pt; color: #103138; margin-bottom: 15px; }
        .qna-item { margin-bottom: 20px; padding-bottom:15px; border-bottom: 1px dotted #ccc; }
        .qna-item:last-child { border-bottom: none; }
        .qna-item .question { font-weight: bold; margin-bottom: 5px; }
        .qna-item .question-type { font-weight: normal; font-style: italic; color: #555; font-size: 0.9em;}
        .qna-item .answer { margin-bottom: 5px; padding-left: 10px;}
        .qna-item .answer pre { white-space: pre-wrap; word-wrap: break-word; background-color: #f9f9f9; padding: 10px; border-radius: 3px; font-size: 0.95em; }
        .qna-item .reasoning { font-size: 0.9em; color: #444; background-color: #f9f9f9; padding: 8px; border-radius: 3px; margin-top: 5px; }
        
        .report-footer { text-align: center; margin-top: 40px; padding-top: 15px; border-top: 1px solid #103138; font-size: 9pt; color: #555; }
        .report-footer img.logo { max-height: 30px; margin-bottom: 5px; opacity: 0.7; }
        
        /* Page numbering styles */
        .page-number {
          position: fixed;
          bottom: 10mm;
          width: 100%;
          text-align: center;
          font-size: 9pt;
          color: #777;
          font-style: italic;
        }
        
        /* Make sure page numbering shows in print */
        @page {
          margin-bottom: 20mm;
        }
      </style>
    </head>
    <body>
      <div class="page-container">
        <header class="report-header">
          <img src="${logoBase64}" alt="Social Garden Logo" class="logo" />
          <h1>AI Efficiency Scorecard</h1>
          <div class="user-info">
            Report for: <strong>Test User</strong> (Test Company)<br/>
            Industry: Technology
          </div>
          <div class="report-details">
            AI Maturity Tier: Enabler | Final Score: 65 | Report ID: TEST-123 | Generated: ${new Date().toLocaleDateString()}
          </div>
        </header>

        <main>
          <div class="markdown-content">
            ${renderedMarkdownAsHtml}
          </div>
          ${qnaHtml}
        </main>

        <footer class="report-footer">
          <p>AI Efficiency Scorecard &copy; ${new Date().getFullYear()} Social Garden. All rights reserved.</p>
          <p>This report is confidential and intended for the recipient only.</p>
        </footer>
        
        <!-- Page numbering -->
        <div class="page-number">
          Page <span class="page"></span> of <span class="topage"></span>
        </div>
      </div>
    </body>
    </html>
  `;

  console.log('Generating test PDF...');
  
  const options = { 
    format: 'A4',
    margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    // Add footer template for page numbering
    displayHeaderFooter: true,
    footerTemplate: `
      <div style="width: 100%; text-align: center; font-size: 10px; color: #555; padding: 10px 20px;">
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
  };
  
  const file = { content: htmlContent };
  
  try {
    const pdfBuffer = await htmlPdfNode.generatePdf(file, options);
    
    // Save the PDF to disk
    fs.writeFileSync(path.join(__dirname, 'test-pdf-output.pdf'), pdfBuffer);
    console.log('PDF generated successfully and saved to test-pdf-output.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

// Run the test
generateTestPdf().catch(err => console.error('Test failed:', err));

main(); 