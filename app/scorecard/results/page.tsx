'use client';
import React, { Suspense, useEffect } from 'react';
import NewResultsPage from './NewResultsPage';

// Loading fallback component
const ResultsLoading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#F3FDF5'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid rgba(32, 226, 143, 0.2)',
        borderTop: '4px solid #20E28F',
        borderRadius: '50%',
        animation: 'spin 1.5s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <div style={{ fontFamily: 'Arial, sans-serif', color: '#103138', fontWeight: 600 }}>
        Loading Scorecard...
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

export default function ResultsPage() {
  useEffect(() => {
    // Debug any issues with accessing the results
    console.log('RESULTS PAGE WRAPPER: Component mounted');
    
    if (typeof window !== 'undefined') {
      // Log storage state to debug
      const sessionReportId = sessionStorage.getItem('currentReportID') || sessionStorage.getItem('reportId');
      const localReportId = localStorage.getItem('currentReportID') || localStorage.getItem('reportId');
      
      console.log('RESULTS PAGE WRAPPER: Session report ID:', sessionReportId);
      console.log('RESULTS PAGE WRAPPER: Local report ID:', localReportId);
      
      // Log session/local markdown
      const sessionMarkdown = sessionStorage.getItem('reportMarkdown');
      const localMarkdown = localStorage.getItem('reportMarkdown');
      
      console.log('RESULTS PAGE WRAPPER: Session markdown exists:', !!sessionMarkdown);
      console.log('RESULTS PAGE WRAPPER: Local markdown exists:', !!localMarkdown);
      
      if (sessionMarkdown) {
        console.log('RESULTS PAGE WRAPPER: Session markdown preview:', 
          sessionMarkdown.substring(0, 100) + '...');
      }
      
      // Check for user tier
      const tier = sessionStorage.getItem('tier') || 
                  sessionStorage.getItem('userAITier') || 
                  sessionStorage.getItem('aiTier') ||
                  localStorage.getItem('tier') || 
                  localStorage.getItem('userAITier') || 
                  localStorage.getItem('aiTier');
                  
      console.log('RESULTS PAGE WRAPPER: Stored tier value:', tier);
    }
  }, []);
  
  return (
    <Suspense fallback={<ResultsLoading />}>
      <NewResultsPage />
    </Suspense>
  );
}
