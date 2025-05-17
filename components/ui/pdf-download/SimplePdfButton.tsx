'use client';

import { useState } from 'react';
import { Button } from '../Button';
import { toast } from 'sonner';

interface SimplePdfButtonProps {
  reportId?: string;
  className?: string;
}

export default function SimplePdfButton({ reportId, className }: SimplePdfButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const generatePdf = async () => {
    if (!reportId) {
      toast.error('No report ID available for PDF generation');
      return;
    }

    setIsLoading(true);
    // Show an immediate toast to inform the user
    toast('Generating your PDF, please wait...');
    
    try {
      // Call the server-side PDF generation endpoint
      const response = await fetch(`/api/generate-pdf?reportId=${reportId}`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`PDF generation failed: ${response.statusText}`);
      }
      
      // Get the PDF as a blob
      const pdfBlob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(pdfBlob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-scorecard-report-${reportId}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      // Show success toast
      toast.success('Your PDF download has started!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={generatePdf} 
      disabled={isLoading || !reportId}
      className={className}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Generating your PDF...</span>
        </span>
      ) : (
        'Download PDF Report'
      )}
    </Button>
  );
} 