import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TemplateInfo } from '../../lib/learningHubData';

interface TemplateCardProps {
  template: TemplateInfo;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  // Generate background color based on category
  const getBgColor = () => {
    const category = template.category?.toLowerCase() || '';
    
    if (category.includes('strategy')) {
      return 'from-blue-200 to-blue-100';
    } else if (category.includes('marketing') || category.includes('campaign')) {
      return 'from-purple-200 to-pink-100';
    } else if (category.includes('checklist')) {
      return 'from-green-200 to-teal-100';
    } else if (category.includes('plan') || category.includes('project')) {
      return 'from-orange-200 to-yellow-100';
    }
    
    // Default gradient
    return 'from-sg-dark-teal/20 to-sg-bright-green/20';
  };
  
  return (
    <Link 
      href={template.slug}
      className="block group"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-sg-bright-green transition-all duration-300 font-plus-jakarta">
        {/* Template Image - replaced with gradient and icon */}
        <div className={`relative w-full h-48 overflow-hidden bg-gradient-to-r ${getBgColor()}`}>
          {/* Template icon/initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-sg-bright-green bg-white/20 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">
              {template.title.charAt(0)}
            </span>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-sg-dark-teal/30 to-transparent"></div>
          
          {/* Template Category Overlay */}
          {template.category && (
            <div className="absolute top-4 left-4 flex items-center gap-1 text-xs text-white font-medium bg-sg-dark-teal/70 px-3 py-1 rounded-full">
              <svg className="w-3 h-3 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              {template.category}
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col gap-4">
          {/* Template Tier Tags */}
          <div className="flex flex-wrap gap-2 mb-1">
            {template.tier.map((tierName) => (
              <span key={tierName} className="bg-sg-dark-teal/10 text-sg-dark-teal text-xs font-semibold px-3 py-1 rounded-full">
                {tierName}
              </span>
            ))}
          </div>
          
          {/* Template Title */}
          <h3 className="text-2xl font-extrabold text-sg-dark-teal group-hover:text-sg-bright-green transition-colors">
            {template.title}
          </h3>
          
          {/* Template Description */}
          <p className="text-sg-dark-teal/80 text-base flex-grow">
            {template.description}
          </p>
          
          {/* Template Downloadable Badge */}
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            {template.downloadable && (
              <div className="flex items-center text-sm text-sg-dark-teal/70">
                <svg className="w-4 h-4 mr-1 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Downloadable
              </div>
            )}
          </div>
          
          {/* View Button */}
          <div className="bg-sg-bright-green/10 text-sg-dark-teal rounded-lg py-2 px-4 text-center font-semibold text-sm group-hover:bg-sg-bright-green group-hover:text-white transition-colors">
            View Template
          </div>
        </div>
      </div>
    </Link>
  );
} 