'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';

interface StrategicActionPlanSectionProps {
  reportMarkdown: string | null;
}

// Parse the strategic action plan content into structured data
const parseActionPlan = (content: string) => {
  // Remove the main heading
  const cleanContent = content.replace(/^##\s*Strategic Action Plan\s*\n+/i, '');
  
  // First, try to extract an action plan that's formatted with numbered steps (1., 2., etc.)
  const sectionRegex = /(\d+\.?\s+[^\n]+)/g;
  const sections = cleanContent.split(sectionRegex).filter(Boolean);
  
  const actionItems = [];
  for (let i = 0; i < sections.length; i += 2) {
    if (i + 1 < sections.length) {
      const title = sections[i].trim();
      const content = sections[i + 1].trim();
      
      // Extract any potential sub-sections (e.g., bullet points)
      const subPoints = content
        .split(/[-•*]\s+/g)  // Improved to catch more bullet point formats
        .filter(text => text.trim().length > 0)
        .map(text => text.trim());
      
      actionItems.push({ 
        title, 
        content,
        subPoints: subPoints.length > 1 ? subPoints : [], // Only use sub-points if there are multiple
      });
    }
  }
  
  // If no numbered sections were found, look for bullet points that might be action items
  if (actionItems.length === 0) {
    const bulletPoints = cleanContent
      .split(/[-•*]\s+/g)
      .filter(text => text.trim().length > 0)
      .map(text => text.trim());
    
    if (bulletPoints.length > 0) {
      // Remove the first item if it appears to be a header/introduction
      if (bulletPoints[0].length < 50 && !bulletPoints[0].includes('.')) {
        bulletPoints.shift();
      }
      
      bulletPoints.forEach((point, index) => {
        actionItems.push({
          title: `Action ${index + 1}: ${point.split('.')[0]}`,
          content: point,
          subPoints: []
        });
      });
    }
  }
  
  return actionItems;
};

export const StrategicActionPlanSection: React.FC<StrategicActionPlanSectionProps> = ({ 
  reportMarkdown 
}) => {
  // Extract the Strategic Action Plan section from the markdown and combine with Recommendations if present
  const extractStrategicActionPlan = (markdown: string): string => {
    let actionPlanContent = "";
    let recommendationsContent = "";
    
    // Extract Strategic Action Plan content
    const planMatch = markdown.match(/##\s*(Strategic Action Plan|Action Plan)[:\s]*([\s\S]*?)(?=##|$)/i);
    if (planMatch && planMatch[2]) {
      actionPlanContent = planMatch[2].trim();
    }
    
    // Extract Recommendations content if it exists as a separate section
    const recommendationsMatch = markdown.match(/##\s*(Recommendations|Strategic Recommendations)[:\s]*([\s\S]*?)(?=##|$)/i);
    if (recommendationsMatch && recommendationsMatch[2]) {
      recommendationsContent = recommendationsMatch[2].trim();
    }
    
    // Combine both sections if they exist
    if (actionPlanContent && recommendationsContent) {
      return actionPlanContent + "\n\n**Additional Strategic Actions:**\n\n" + recommendationsContent;
    } else if (actionPlanContent) {
      return actionPlanContent;
    } else if (recommendationsContent) {
      return recommendationsContent;
    }
    
    // If still not found, try other common action-related headings
    const altMatch = markdown.match(/##\s*(Action Items|Next Steps)[:\s]*([\s\S]*?)(?=##|$)/i);
    if (altMatch && altMatch[2]) {
      return altMatch[2].trim();
    }
    
    // Fallback: Look for numbered lists that might indicate actions
    const numberedListMatch = markdown.match(/(?:\d+\.?\s+[^\n]+\n*){3,}/);
    if (numberedListMatch) {
      return numberedListMatch[0].trim();
    }
    
    // Last resort: Return a default message
    return "No strategic action plan found in the report. Please contact support for assistance.";
  };

  const actionPlanContent = reportMarkdown ? extractStrategicActionPlan(reportMarkdown) : "";
  
  console.log('FRONTEND: Extracted action plan content:', actionPlanContent.substring(0, 100) + '...');
  
  const actionItems = parseActionPlan(actionPlanContent);
  console.log('FRONTEND: Parsed action items:', actionItems.length);

  // Helper function to get an icon based on action item title/content
  const getActionIcon = (title: string) => {
    const lowercaseTitle = title.toLowerCase();
    if (lowercaseTitle.includes('strategy') || lowercaseTitle.includes('plan')) {
      return (
        <div className="p-2 rounded-full bg-[#F3FDF5] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#103138" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        </div>
      );
    } else if (lowercaseTitle.includes('team') || lowercaseTitle.includes('train')) {
      return (
        <div className="p-2 rounded-full bg-[#F3FDF5] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#103138" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        </div>
      );
    } else if (lowercaseTitle.includes('tool') || lowercaseTitle.includes('software') || lowercaseTitle.includes('tech')) {
      return (
        <div className="p-2 rounded-full bg-[#F3FDF5] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#103138" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>
        </div>
      );
    } else if (lowercaseTitle.includes('process') || lowercaseTitle.includes('workflow')) {
      return (
        <div className="p-2 rounded-full bg-[#F3FDF5] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#103138" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
          </svg>
        </div>
      );
    } else if (lowercaseTitle.includes('data') || lowercaseTitle.includes('insight')) {
      return (
        <div className="p-2 rounded-full bg-[#F3FDF5] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#103138" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        </div>
      );
    } else if (lowercaseTitle.includes('governance') || lowercaseTitle.includes('compliance')) {
      return (
        <div className="p-2 rounded-full bg-[#F3FDF5] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#103138" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
      );
    } else {
      // Default icon
      return (
        <div className="p-2 rounded-full bg-[#F3FDF5] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#103138" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        </div>
      );
    }
  };

  // State for managing the currently open accordion item
  const [openItem, setOpenItem] = useState<string | null>('action-0');

  // Function to toggle open/close state of accordion items
  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Introduction/Header */}
      <Card variant="divine" className="p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="icon-wrapper-sg-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#20E28F" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </span>
            Strategic Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none text-sg-dark-teal/80">
            <p>
              Based on your assessment, we've developed this tailored action plan to help advance your organization's AI maturity. 
              Each action represents a specific, concrete step you can take to enhance your capabilities and generate business value.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Action Plan with Shadcn-like Accordion */}
      {actionItems.length > 0 ? (
        <div className="space-y-4">
          {actionItems.map((item, index) => {
            const itemId = `action-${index}`;
            const isOpen = openItem === itemId;
            
            return (
              <div key={itemId} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleItem(itemId)}
                  className={`flex w-full items-center justify-between px-6 py-5 text-left transition-colors ${
                    isOpen ? 'bg-sg-light-mint/40' : 'hover:bg-sg-light-mint/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getActionIcon(item.title)}
                    </div>
                    <h3 className="text-lg font-semibold text-sg-dark-teal">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-sg-dark-teal/60 bg-sg-light-mint/60 py-1 px-2 rounded-full">
                      Priority {index + 1}
                    </span>
                    <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full border border-sg-dark-teal/10">
                      {isOpen ? (
                        <ChevronUpIcon className="h-4 w-4 text-sg-dark-teal" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 text-sg-dark-teal" />
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="bg-gradient-to-b from-sg-light-mint/10 to-white p-6">
                    {item.subPoints.length > 0 ? (
                      <div className="space-y-5">
                        {item.subPoints.map((point, pointIndex) => (
                          <div key={pointIndex} className="flex items-start">
                            <div className="h-7 w-7 flex-shrink-0 rounded-full bg-sg-light-mint flex items-center justify-center mr-4 mt-0.5 border border-sg-bright-green/20">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13L9 17L19 7" stroke="#20E28F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="prose prose-lg max-w-none text-sg-dark-teal/90 leading-relaxed">{point}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="prose prose-lg max-w-none text-sg-dark-teal/80 leading-relaxed">
                        <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                          {item.content}
                        </ReactMarkdown>
                      </div>
                    )}
                    
                    {/* Action Footer with Implementation Tip */}
                    <div className="mt-6 flex items-start gap-3 rounded-lg bg-sg-light-mint/30 p-4">
                      <div className="flex-shrink-0 rounded-full bg-sg-light-mint p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#20E28F" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-sg-dark-teal">Implementation Tip</p>
                        <p className="text-sm text-sg-dark-teal/70">
                          {index === 0 ? 
                            "Start with a small, focused pilot project to demonstrate value before scaling this action across your organization." :
                            index === 1 ?
                            "Assign a dedicated owner to this initiative and set clear success metrics to track progress." :
                            index === 2 ?
                            "Consider involving stakeholders from multiple departments to ensure broad adoption and alignment." :
                            "Document your approach and learnings as you implement this action to build organizational knowledge."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card variant="divine" className="p-6">
          <CardContent className="text-center">
            <p className="text-sg-dark-teal">No action items were found in the report. Please contact support for assistance.</p>
          </CardContent>
        </Card>
      )}
      
      {/* Call to Action */}
      <Card variant="divine" className="p-6 bg-gradient-to-br from-sg-light-mint/80 to-white border-l-4 border-l-sg-bright-green">
        <CardContent className="flex items-center gap-6">
          <div className="rounded-full bg-white p-3 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#20E28F" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-title-section text-xl text-sg-dark-teal mb-2">Ready to Implement Your Action Plan?</h3>
            <p className="text-sg-dark-teal/80">
              Visit the Learning Hub for step-by-step resources and templates to help you execute each part of your strategic action plan.
            </p>
          </div>
          <a href="/learning-hub" className="btn-primary-divine whitespace-nowrap">
            Visit Learning Hub
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategicActionPlanSection;
