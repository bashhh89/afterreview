'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface GettingStartedResourcesSectionProps {
  markdownContent: string;
}

const GettingStartedResourcesSection: React.FC<GettingStartedResourcesSectionProps> = ({ 
  markdownContent 
}) => {
  const content = markdownContent.replace(/^##\s*Getting Started & Resources\s*\n+/i, '');

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            h2: () => null, // Already handled
            h3: ({node, children, ...props}) => (
              <h3 className="text-xl font-bold text-[#004851] mb-4" {...props}>
                {children}
              </h3>
            ),
            strong: ({node, ...props}) => <strong className="font-semibold text-[#004851]" {...props} />,
            ul: ({node, ...props}) => <ul className="list-none space-y-4 text-gray-700" {...props} />,
            li: ({node, children, ...props}) => (
              <li className="flex items-start gap-3" {...props}>
                <div className="mt-1.5 w-2 h-2 bg-[#68F6C8] rounded-full flex-shrink-0"></div>
                <span>{children}</span>
              </li>
            ),
            p: ({node, ...props}) => <p className="mb-4 text-gray-700" {...props} />,
            a: ({node, href, children, ...props}) => (
              <a 
                href={href} 
                className="text-[#004851] font-medium underline hover:text-[#68F6C8] transition-colors" 
                target="_blank" 
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            ),
            // Custom rendering for resource cards
            ol: ({node, ...props}) => {
              // Check if this is a resources section
              return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6" {...props as React.HTMLAttributes<HTMLDivElement>} />;
            },
            blockquote: ({node, ...props}) => (
              <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow" {...props as React.HTMLAttributes<HTMLDivElement>} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default GettingStartedResourcesSection; 