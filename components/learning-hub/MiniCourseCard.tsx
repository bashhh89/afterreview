import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MiniCourseInfo } from '../../lib/learningHubData';

interface MiniCourseCardProps {
  course: MiniCourseInfo;
}

export default function MiniCourseCard({ course }: MiniCourseCardProps) {
  // Generate placeholder image path based on course type
  const getImagePath = () => {
    // Map different course types to different placeholder images
    if (course.id.includes('prompt')) {
      return '/images/placeholders/ai-prompt.jpg';
    } else if (course.id.includes('project')) {
      return '/images/placeholders/project-management.jpg';
    } else if (course.id.includes('tool')) {
      return '/images/placeholders/digital-tools.jpg';
    } else if (course.id.includes('content')) {
      return '/images/placeholders/content-creation.jpg';
    } else if (course.id.includes('organization')) {
      return '/images/placeholders/business-organization.jpg';
    } else if (course.id.includes('jargon')) {
      return '/images/placeholders/terminology.jpg';
    }
    
    // Default placeholder
    return '/images/placeholders/artificial-intelligence.jpg';
  };
  
  return (
    <Link 
      href={course.slug}
      className="block group"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-sg-bright-green transition-all duration-300 font-plus-jakarta">
        {/* Course Image */}
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-r from-sg-dark-teal/20 to-sg-bright-green/20">
          {/* Fallback colored background with course initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-sg-bright-green bg-sg-dark-teal/10 w-16 h-16 rounded-full flex items-center justify-center">
              {course.title.charAt(0)}
            </span>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-sg-dark-teal/30 to-transparent"></div>
        </div>
        
        <div className="p-6 flex flex-col gap-4">
          {/* Course Tier Tags */}
          <div className="flex flex-wrap gap-2 mb-1">
            {course.tier.map((tierName) => (
              <span key={tierName} className="bg-sg-dark-teal/10 text-sg-dark-teal text-xs font-semibold px-3 py-1 rounded-full">
                {tierName}
              </span>
            ))}
          </div>
          
          {/* Course Title */}
          <h3 className="text-2xl font-extrabold text-sg-dark-teal group-hover:text-sg-bright-green transition-colors">
            {course.title}
          </h3>
          
          {/* Course Description */}
          <p className="text-sg-dark-teal/80 text-base flex-grow">
            {course.description}
          </p>
          
          {/* Course Meta: Duration & Modules */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            {course.duration && (
              <div className="flex items-center text-sm text-sg-dark-teal/70">
                <svg className="w-4 h-4 mr-1 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {course.duration}
              </div>
            )}
            
            {course.modules && (
              <div className="flex items-center text-sm text-sg-dark-teal/70">
                <svg className="w-4 h-4 mr-1 text-sg-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                {course.modules} modules
              </div>
            )}
          </div>
          
          {/* Start Button */}
          <div className="bg-sg-bright-green/10 text-sg-dark-teal rounded-lg py-2 px-4 text-center font-semibold text-sm group-hover:bg-sg-bright-green group-hover:text-white transition-colors">
            Start Course
          </div>
        </div>
      </div>
    </Link>
  );
} 