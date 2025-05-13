'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ReportLoadingIndicatorProps {
  isLoading?: boolean;
}

const loadingMessages = [
  "Analyzing your AI readiness...",
  "Evaluating your organization's AI maturity...",
  "Crafting personalized insights...",
  "Identifying key opportunities for growth...",
  "Preparing your strategic action plan...",
  "Assembling your AI efficiency scorecard...",
  "Generating tailored recommendations...",
  "Finalizing your personalized report..."
];

const ReportLoadingIndicator: React.FC<ReportLoadingIndicatorProps> = ({ isLoading = true }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Cycle through loading messages
  useEffect(() => {
    if (!isLoading) return;
    
    const messageInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);
    
    return () => clearInterval(messageInterval);
  }, [isLoading]);

  // Animate progress bar
  useEffect(() => {
    if (!isLoading) return;
    
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        // Slow down progress as it gets closer to 100%
        const increment = Math.max(0.5, (100 - prevProgress) / 50);
        const newProgress = prevProgress + increment;
        return newProgress >= 95 ? 95 : newProgress; // Cap at 95% until actually complete
      });
    }, 300);
    
    return () => clearInterval(progressInterval);
  }, [isLoading]);

  // Complete the progress when done loading
  useEffect(() => {
    if (!isLoading && progress < 100) {
      setProgress(100);
    }
  }, [isLoading, progress]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-sg-dark-teal z-50 flex flex-col items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 25px 25px, #ffffff 2%, transparent 0%), radial-gradient(circle at 75px 75px, #ffffff 2%, transparent 0%)',
          backgroundSize: '100px 100px' 
        }}></div>
      </div>
      
      {/* Logo */}
      <div className="mb-12 relative">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-sg-bright-green/30 blur-xl rounded-full transform scale-150"></div>
        
        {/* Logo container */}
        <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-sg-bright-green">
          <div className="text-center">
            <div className="text-sg-bright-green text-4xl font-black tracking-tighter">SG</div>
            <div className="text-sg-dark-teal text-xs font-semibold tracking-wider mt-1">AI SCORECARD</div>
          </div>
        </div>
        
        {/* Animated ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-sg-bright-green rounded-full animate-spin"></div>
      </div>
      
      {/* Loading message */}
      <div className="text-white text-xl font-semibold mb-8 min-h-[2rem] text-center px-8 animate-pulse">
        {loadingMessages[messageIndex]}
      </div>
      
      {/* Progress bar */}
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-3">
        <div 
          className="h-full bg-sg-bright-green rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Progress percentage */}
      <div className="text-sg-bright-green text-sm font-medium">
        {Math.round(progress)}%
      </div>
      
      {/* Animated dots */}
      <div className="flex gap-2 mt-8">
        <span className="w-2 h-2 bg-sg-bright-green rounded-full animate-pulse"></span>
        <span className="w-2 h-2 bg-sg-bright-green rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
        <span className="w-2 h-2 bg-sg-bright-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
      </div>
    </div>
  );
};

export default ReportLoadingIndicator; 