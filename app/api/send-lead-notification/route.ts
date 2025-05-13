import { NextResponse } from 'next/server';

// Type for Resend module
interface ResendClient {
  emails: {
    send: (options: {
      from: string;
      to: string[];
      subject: string;
      html: string;
    }) => Promise<any>;
  };
}

// Try to import Resend, but handle it gracefully if it's missing
let Resend: any;
let resend: ResendClient | null = null;

try {
  const ResendModule = require('resend');
  Resend = ResendModule.Resend;
  // Only initialize Resend if the API key is available
  const resendApiKey = process.env.RESEND_API_KEY;
  resend = resendApiKey ? new Resend(resendApiKey) : null;
} catch (e: unknown) {
  const error = e instanceof Error ? e : new Error(String(e));
  console.warn('Resend package not available:', error.message);
  // Continue without Resend
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      leadName,
      leadCompany,
      leadEmail,
      leadPhone,
      industry, // Add industry
      consent, // Add consent
      aiTier,
      type,
      reportMarkdown,
      questionAnswerHistory
    } = body;

    // Validate required fields (including consent)
    if (!leadName || !leadCompany || !leadEmail || consent === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields. Name, company, email, and consent are required.' },
        { status: 400 }
      );
    }

    // Use the environment variable with fallback to ahmadbasheerr@gmail.com
    const recipientEmail = process.env.LEAD_NOTIFICATION_EMAIL || 'ahmadbasheerr@gmail.com';
    
    // Determine email subject based on lead type
    const emailSubject = type === 'leadCapture' 
      ? `New AI Scorecard Assessment Started by ${leadName} from ${leadCompany}`
      : `AI Scorecard Assessment Completed by ${leadName} from ${leadCompany}`;

    // Build email content
    let emailHtml = `
      <h1>${emailSubject}</h1>
      <p><strong>Name:</strong> ${leadName}</p>
      <p><strong>Company:</strong> ${leadCompany}</p>
      <p><strong>Email:</strong> ${leadEmail}</p>
      <p><strong>Phone:</strong> ${leadPhone || 'Not provided'}</p>
    `;

    // Add assessment results if completed
    if (type === 'leadCompleted' && aiTier) {
      emailHtml += `
        <p><strong>AI Maturity Tier:</strong> ${aiTier}</p>
        <hr />
        <h2>Assessment Results</h2>
        <p>See the attached report and question history for full details.</p>
      `;
    }

    // Check if resend is available
    if (resend) {
      try {
        const data = await resend.emails.send({
          from: 'AI Scorecard <ahmadbasheerr@gmail.com>',
          to: [recipientEmail],
          subject: emailSubject,
          html: emailHtml,
        });
        
        console.log('Email sent successfully', data);
        return NextResponse.json({ message: 'Lead notification sent successfully' });
      } catch (emailError) {
        console.error('Error sending email via Resend:', emailError);
        // Still return success to prevent blocking the user flow
        return NextResponse.json({ 
          message: 'Lead captured successfully but email notification failed',
          error: 'Email sending failed'
        });
      }
    } else {
      // Log the lead information since we can't send an email
      console.log('Resend API key or module not available. Lead information:', {
        subject: emailSubject,
        recipient: recipientEmail,
        leadName,
        leadCompany,
        leadEmail,
        leadPhone,
        industry, // Include industry in log
        consent, // Include consent in log
        aiTier,
        type
      });

      return NextResponse.json({
        message: 'Lead captured successfully (email notification disabled)',
        mock: true
      });
    }
  } catch (error) {
    console.error('Error processing lead notification:', error);
    // Return a success response anyway to not block the user flow
    return NextResponse.json({
      message: 'Lead information processed with errors',
      error: 'See server logs for details'
    });
  }
}
