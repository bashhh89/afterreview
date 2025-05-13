"use client";

import React, { useState, ReactNode, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import SidebarNav from './SidebarNav';
import { MiniCourseInfo } from '../../lib/learningHubData';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import ModuleNavigation from './ModuleNavigation';

interface CourseDetailTemplateProps {
  course: MiniCourseInfo;
  markdownContent?: string;
  children?: ReactNode;
}

export default function CourseDetailTemplate({ course, markdownContent, children }: CourseDetailTemplateProps) {
  const [activeSection, setActiveSection] = useState<string>('Mini Courses');
  
  // Parse markdown content into structured sections for modules if available
  const [contentSections, setContentSections] = useState<{id: string; label: string; content: string}[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  
  useEffect(() => {
    if (markdownContent) {
      setIsLoading(true); // Set loading to true when markdownContent is available
      // Try to extract sections based on h2 headings
      const sections: {id: string; label: string; content: string}[] = [];
      const sectionRegex = /##\s+([^\n]+)([^#]*?)(?=##|$)/g;
      
      let match;
      let index = 0;
      
      // If no sections are found, create a single "Overview" section
      let foundSections = false;
      
      while ((match = sectionRegex.exec(markdownContent)) !== null) {
        foundSections = true;
        const title = match[1].trim();
        const content = match[2].trim();
        
        sections.push({
          id: `section-${index}`,
          label: title,
          content: content
        });
        
        index++;
      }
      
      if (!foundSections) {
        sections.push({
          id: 'section-overview',
          label: 'Overview',
          content: markdownContent
        });
      }
      
      setContentSections(sections);
      
      // Set the first section as active by default only if contentSections was previously empty
      if (sections.length > 0 && contentSections.length === 0) {
        setActiveModuleId(sections[0].id);
      } else if (sections.length > 0 && !sections.find(section => section.id === activeModuleId)) {
         // If contentSections changed and the current activeModuleId is no longer valid, reset to the first section
         setActiveModuleId(sections[0].id);
      } else if (sections.length === 0) {
         // If contentSections is empty, clear activeModuleId
         setActiveModuleId('');
      }

      setIsLoading(false); // Set loading to false after processing
    } else {
      setContentSections([]); // Ensure contentSections is empty if no markdownContent
      setActiveModuleId(''); // Clear activeModuleId if no markdownContent
      setIsLoading(false); // Also set loading to false if no markdownContent
    }
  }, [markdownContent, contentSections.length, activeModuleId]); // Add dependencies
  
  // Get current active module index
  const activeModuleIndex = contentSections.findIndex(section => section.id === activeModuleId);
  
  // Setup prev/next module navigation
  const prevModule = activeModuleIndex > 0 
    ? { id: contentSections[activeModuleIndex - 1].id, label: contentSections[activeModuleIndex - 1].label } 
    : undefined;
    
  const nextModule = activeModuleIndex >= 0 && activeModuleIndex < contentSections.length - 1 
    ? { id: contentSections[activeModuleIndex + 1].id, label: contentSections[activeModuleIndex + 1].label } 
    : undefined;
  
  // Handle module change
  const handleModuleChange = (id: string) => {
    setActiveModuleId(id);
    // Scroll to top when changing modules
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <main className="flex min-h-screen font-plus-jakarta">
      {/* Left sidebar with main navigation */}
      <aside className="sidebar w-[300px] bg-sg-dark-teal text-white p-6 h-full min-h-screen relative overflow-auto">
        <SidebarNav
          userName="Guest"
          tier="Dabbler"
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 bg-sg-light-mint p-8 md:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center flex-wrap mb-8 text-sm">
            <a href="/learning-hub" className="text-sg-dark-teal hover:text-sg-bright-green transition-colors">
              Learning Hub
            </a>
            <span className="mx-2 text-sg-dark-teal/50">→</span>
            <a 
              href="/learning-hub" 
              className="text-sg-dark-teal hover:text-sg-bright-green transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('Mini Courses');
                window.location.href = '/learning-hub';
              }}
            >
              Mini Courses
            </a>
            <span className="mx-2 text-sg-dark-teal/50">→</span>
            <span className="text-sg-bright-green font-semibold">{course.title}</span>
          </div>
          
          {/* Course header */}
          <Card variant="divine" className="mb-8 p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="font-title-main">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="font-body-md mb-8">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                {course.tier.map((tierName) => (
                  <span key={tierName} className="bg-sg-dark-teal/10 text-sg-dark-teal text-sm font-semibold px-3 py-1 rounded-full">
                    {tierName} Tier
                  </span>
                ))}
                
                {course.duration && (
                  <span className="flex items-center text-sm text-sg-dark-teal/70">
                    <svg className="w-4 h-4 mr-1 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {course.duration}
                  </span>
                )}
                
                {course.modules && (
                  <span className="flex items-center text-sm text-sg-dark-teal/70">
                    <svg className="w-4 h-4 mr-1 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    {course.modules} modules
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Course content with tab navigation */}
          <div className="w-full">
            {/* Tab navigation for modules */}
            {contentSections.length > 0 && (
              <div className="mb-6 overflow-x-auto">
                <div className="flex space-x-2">
                  {contentSections.map((section, index) => {
                    const isActive = section.id === activeModuleId;
                    const isCompleted = index < activeModuleIndex;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleModuleChange(section.id)}
                        className={`px-4 py-2 rounded-t-lg text-sm whitespace-nowrap transition-all
                          ${isActive 
                            ? 'bg-white font-medium text-sg-dark-teal shadow-sm border-t-2 border-t-sg-bright-green' 
                            : isCompleted
                              ? 'bg-sg-light-mint/50 text-sg-dark-teal hover:bg-sg-light-mint/70' 
                              : 'bg-sg-light-mint/30 text-sg-dark-teal/80 hover:bg-sg-light-mint/50'
                          }`}
                      >
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mr-2
                            ${isActive 
                              ? 'bg-sg-bright-green text-white' 
                              : isCompleted 
                                ? 'bg-sg-bright-green/20 text-sg-bright-green' 
                                : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {isCompleted ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <span>{section.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Content area */}
            <Card variant="divine" className="mb-8 overflow-hidden">
              {isLoading ? (
                <CardContent className="p-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 mb-4 border-4 border-sg-light-mint border-t-sg-bright-green rounded-full animate-spin"></div>
                    <h3 className="text-lg font-semibold text-sg-dark-teal mb-2">Loading Course Content</h3>
                    <p className="text-sm text-sg-dark-teal/70">Please wait while we prepare your learning experience...</p>
                  </div>
                </CardContent>
              ) : children ? (
                <CardContent className="p-8">
                  {children}
                </CardContent>
              ) : markdownContent && contentSections.length > 0 ? (
                <CardContent className="p-8">
                  {/* Find and render only the active module's content */}
                  {contentSections.find(section => section.id === activeModuleId) ? (
                    <div className="prose prose-lg max-w-none prose-headings:font-plus-jakarta prose-headings:font-bold prose-headings:text-sg-dark-teal prose-p:text-sg-dark-teal/90 prose-a:text-sg-bright-green prose-a:no-underline hover:prose-a:underline prose-strong:text-sg-dark-teal prose-li:text-sg-dark-teal/90 prose-ol:text-sg-dark-teal/90 prose-ul:text-sg-dark-teal/90">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {contentSections.find(section => section.id === activeModuleId)?.content || ''}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p>Module content not found.</p>
                  )}
                </CardContent>
              ) : markdownContent && contentSections.length === 0 && !isLoading ? (
                <CardContent className="p-8 text-center">
                  <p>No content sections found for this course.</p>
                </CardContent>
              ) : (
                <CardContent className="p-8">
                  <h2 className="font-title-section mb-4">Course Content</h2>
                  <p className="font-body-md mb-6">
                    Course content for '{course.title}' will go here. This will eventually render Markdown or structured content.
                  </p>
                  
                  <Card variant="divine" className="p-6 bg-sg-light-mint/50 border border-sg-bright-green/10">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="font-title-card">Coming Soon</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="font-body-md">
                        We're currently developing the full course content. Check back soon for the complete learning experience.
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              )}
            </Card>
            
            {/* Navigation buttons */}
            {contentSections.length > 0 && (
              <ModuleNavigation
                prevModule={prevModule}
                nextModule={nextModule}
                onModuleChange={handleModuleChange}
                backToCoursesUrl="/learning-hub"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
