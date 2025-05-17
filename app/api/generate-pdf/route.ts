import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
// Note: If you get type declaration errors for markdown-it, consider installing @types/markdown-it
import MarkdownIt from 'markdown-it';
import htmlPdfNode from 'html-pdf-node';
import fs from 'fs';
import path from 'path';

// Ensure this route is always dynamically rendered
export const dynamic = 'force-dynamic';

// Social Garden SVG Logo (Base64 Encoded)
// Using a simple SVG for reliability, replace with actual SVG if available and test
const socialGardenLogoBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTUwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjQwIiByeD0iNSIgZmlsbD0iIzEwMzEzOCIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSI+U29jaWFsIEdhcmRlbjwvdGV4dD4KPC9zdmc+Cg==';
// A more complex logo example (ensure it's properly encoded and not too large)
// const socialGardenDarkLogoBase64 = `data:image/svg+xml;base64,${Buffer.from('<svg xmlns=...complex svg data...></svg>').toString('base64')}`;


// Initialize Firebase Admin if not already initialized
let db: admin.firestore.Firestore;
if (!admin.apps.length) {
  try {
    // Path to the service account JSON file
    const serviceAccountPath = path.join(process.cwd(), 'social-garden-94046-firebase-adminsdk-fbsvc-25fbe39712.json');
    
    // Check if service account file exists
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      
      db = admin.firestore();
      console.log('[PDF API] Firebase Admin initialized successfully with service account file.');
    } else {
      // Fallback to environment variables if file doesn't exist
      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\\\n/g, '\\n');

      if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Firebase Admin SDK configuration is missing or incomplete. Service account file not found and environment variables are missing.');
      }

      admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      });
      db = admin.firestore();
      console.log('[PDF API] Firebase Admin initialized successfully with environment variables.');
    }
  } catch (error: any) {
    console.error('[PDF API] CRITICAL: Firebase Admin initialization error:', error.message);
    // db will remain undefined, and subsequent checks will handle this
  }
} else {
  db = admin.firestore();
}

const md = new MarkdownIt({
  html: true, // Allow HTML tags in Markdown
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
});


function formatQuestionAnswerHistoryAsHtml(qaHistory: any[]): string {
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


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reportId = searchParams.get('reportId');

  if (!reportId) {
    return new NextResponse('Error: reportId is required', { status: 400 });
  }

  if (!db) {
    console.error('[PDF API] Firestore not initialized. Cannot process request.');
    return new NextResponse('Internal Server Error: Database connection not available.', { status: 500 });
  }

  try {
    console.log(`[PDF API] Attempting to generate PDF for reportId: ${reportId}`);

    const reportRef = db.collection('scorecardReports').doc(reportId);
    const reportDoc = await reportRef.get();

    if (!reportDoc.exists) {
      console.error(`[PDF API] Report ${reportId} not found in Firestore.`);
      return new NextResponse(`Error: Report with ID ${reportId} not found.`, { status: 404 });
    }

    const reportData = reportDoc.data();
    if (!reportData) {
      console.error(`[PDF API] Report data is empty for ${reportId}.`);
      return new NextResponse(`Error: Report data is empty for ID ${reportId}.`, { status: 404 });
    }

    const reportMarkdown = reportData.reportMarkdown || '# Report Content Not Available\n\nCould not find report content.';
    const questionAnswerHistory = reportData.questionAnswerHistory || [];
    
    const userName = reportData.leadName || reportData.userName || 'Valued User';
    const companyName = reportData.leadCompany || reportData.companyName || 'Your Company';
    const industry = reportData.industry || 'N/A';
    const userTier = reportData.userAITier || reportData.tier || 'N/A';
    const finalScore = reportData.finalScore !== undefined ? reportData.finalScore : 'N/A';


    const renderedMarkdownAsHtml = md.render(reportMarkdown);
    const qnaHtml = formatQuestionAnswerHistoryAsHtml(questionAnswerHistory);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>AI Efficiency Scorecard Report - ${reportId}</title>
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
            <img src="${socialGardenLogoBase64}" alt="Social Garden Logo" class="logo" />
            <h1>AI Efficiency Scorecard</h1>
            <div class="user-info">
              Report for: <strong>${userName}</strong> (${companyName})<br/>
              Industry: ${industry}
            </div>
            <div class="report-details">
              AI Maturity Tier: ${userTier} | Final Score: ${finalScore} | Report ID: ${reportId} | Generated: ${new Date().toLocaleDateString()}
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

    console.log('[PDF API] HTML content prepared. Generating PDF...');
    
    const file = { content: htmlContent };
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
    
    const pdfBuffer = await htmlPdfNode.generatePdf(file, options);
    
    console.log('[PDF API] PDF generated successfully. Sending response.');

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'application/pdf');
    responseHeaders.set('Content-Disposition', `attachment; filename="AI_Efficiency_Scorecard_Report_${reportId}_${userName.replace(/[^a-z0-9]/gi, '_')}.pdf"`);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error: any) {
    console.error(`[PDF API] Error generating PDF for report ${reportId}:`, error);
    // Check for specific Puppeteer/html-pdf-node errors if possible
    let errorMessage = 'Internal Server Error: Could not generate PDF.';
    if (error.message && error.message.includes('Failed to launch browser')) {
        errorMessage = 'Internal Server Error: PDF generation environment issue. Failed to launch browser process.';
        console.error('[PDF API] Specific error: Failed to launch browser. This might be a Puppeteer setup issue in the server environment (e.g. missing dependencies or sandbox issues).');
    }
    return new NextResponse(errorMessage, { status: 500 });
  }
} 