"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import SidebarNav from './SidebarNav';
import { TemplateInfo } from '../../lib/learningHubData';

interface TemplateDetailTemplateProps {
  template: TemplateInfo;
  markdownContent?: string;
}

export default function TemplateDetailTemplate({ template, markdownContent }: TemplateDetailTemplateProps) {
  const [activeSection, setActiveSection] = useState<string>('Templates');
  const [isCopied, setIsCopied] = useState(false);
  
  // Extract the template text from the markdown content for copying
  const extractTemplateText = (markdown: string) => {
    const templateRegex = /```\n([\s\S]*?)```/m;
    const match = markdown?.match(templateRegex);
    return match ? match[1].trim() : '';
  };
  
  const templateText = markdownContent ? extractTemplateText(markdownContent) : '';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(templateText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  return (
    <main className="flex min-h-screen font-plus-jakarta">
      {/* Left sidebar with main navigation */}
      <aside className="sidebar w-[300px] bg-sg-dark-teal text-white p-6 h-full min-h-screen relative overflow-auto">
        <SidebarNav
          userName="User"
          tier="Dabbler"
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          links={[
            { title: 'Checklists', href: '/learning-hub' },
            { title: 'Prompt Library', href: '/learning-hub' },
            { title: 'Templates', href: '/learning-hub' },
            { title: 'Recommended Tools', href: '/learning-hub/recommended-tools' },
            { title: 'Mini Courses', href: '/learning-hub' },
          ]}
        />
      </aside>

      {/* Main Content Area */}
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
                setActiveSection('Templates');
                window.location.href = '/learning-hub';
              }}
            >
              Templates
            </a>
            <span className="mx-2 text-sg-dark-teal/50">→</span>
            <span className="text-sg-bright-green font-semibold">{template.title}</span>
          </div>

          {/* Template Header */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-lg mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-sg-dark-teal mb-3">{template?.title}</h1>
            
            {template?.tier && (
              <div className="flex flex-wrap gap-2 mb-3">
                {template.tier.map((tierName) => (
                  <span key={tierName} className="bg-sg-dark-teal/10 text-sg-dark-teal text-xs font-semibold px-3 py-1 rounded-full">
                    {tierName} Tier
                  </span>
                ))}
              </div>
            )}
            
            {template?.category && (
              <div className="flex items-center gap-2 text-sm text-sg-dark-teal/70 mb-4 font-medium">
                <svg className="w-4 h-4 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {template.category}
              </div>
            )}
            
            <p className="text-lg text-sg-dark-teal/80 mb-0">
              {template?.description}
            </p>
          </div>

          {/* Template Content */}
          {markdownContent ? (
            <div className="mb-8">
              {/* Template text for copying (the first code block in the markdown) */}
              {templateText && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-lg mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-sg-dark-teal">Template Content</h2>
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center gap-2 bg-sg-bright-green text-sg-dark-teal font-semibold py-2 px-4 rounded-lg transition-all hover:shadow-md"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {isCopied ? 'Copied!' : 'Copy Template'}
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 whitespace-pre-wrap font-mono text-sm text-gray-800">
                    {templateText}
                  </div>
                </div>
              )}
              
              {/* The rest of the markdown content as documentation */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-lg prose prose-lg max-w-none prose-headings:font-plus-jakarta prose-headings:font-bold prose-headings:text-sg-dark-teal prose-p:text-sg-dark-teal/90 prose-a:text-sg-bright-green prose-a:no-underline hover:prose-a:underline prose-strong:text-sg-dark-teal prose-code:text-sg-dark-teal/90 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-li:text-sg-dark-teal/90 prose-ol:text-sg-dark-teal/90 prose-ul:text-sg-dark-teal/90 prose-table:text-sm prose-th:bg-sg-light-mint prose-th:text-sg-dark-teal prose-td:border prose-td:border-gray-200 prose-img:rounded-lg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-sg-dark-teal mb-4">Template Content</h2>
              <p className="text-sg-dark-teal mb-4">
                No template content available. Please check back later.
              </p>
            </div>
          )}

          {/* Download Button */}
          {template?.downloadable && templateText && (
            <div className="flex justify-center mt-8">
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 bg-sg-bright-green text-sg-dark-teal font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {isCopied ? 'Template Copied!' : 'Download Template'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 