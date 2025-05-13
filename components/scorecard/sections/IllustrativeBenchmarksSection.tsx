'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface IllustrativeBenchmarksSectionProps {
  markdownContent: string;
}

const IllustrativeBenchmarksSection: React.FC<IllustrativeBenchmarksSectionProps> = ({ markdownContent }) => {
  const content = markdownContent.replace(/^##\s*Illustrative Benchmarks\s*\n+/i, '');

  const components: Components = {
    h2: () => null, // Already handled
    h3: ({children}) => (
      <h3 className="text-xl font-semibold text-sg-dark-teal mb-6 mt-8">
        {children}
      </h3>
    ),
    ul: ({children}) => (
      <ul className="space-y-4 mb-8">
        {children}
      </ul>
    ),
    li: ({children}) => (
      <li className="flex items-start gap-2 text-base leading-relaxed">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sg-dark-teal/20 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    table: ({children}) => (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({children}) => (
      <thead className="bg-gray-50 border-b border-gray-200">
        {children}
      </thead>
    ),
    th: ({children}) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-sg-dark-teal whitespace-nowrap">
        {children}
      </th>
    ),
    td: ({children}) => (
      <td className="px-4 py-3 text-sm border-b border-gray-100 text-sg-dark-teal/80">
        {children}
      </td>
    ),
    tr: ({children}) => (
      <tr className="hover:bg-gray-50/50 transition-colors">
        {children}
      </tr>
    ),
    strong: ({children}) => (
      <strong className="font-semibold text-sg-dark-teal">
        {children}
      </strong>
    ),
    p: ({children}) => (
      <p className="mb-4 text-base leading-relaxed text-sg-dark-teal/80">
        {children}
      </p>
    ),
    a: ({children, href}) => (
      <a 
        className="text-sg-dark-teal font-medium underline hover:text-[#68F6C8] transition-colors" 
        target="_blank" 
        rel="noopener noreferrer"
        href={href}
      >
        {children}
      </a>
    ),
  };

  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default IllustrativeBenchmarksSection;
