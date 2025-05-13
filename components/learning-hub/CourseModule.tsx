'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Types for the course module
interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
  type: 'video' | 'reading' | 'quiz' | 'exercise';
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface CourseModuleProps {
  module: Module;
  onComplete?: (lessonId: string) => void;
}

const CourseModule: React.FC<CourseModuleProps> = ({ module, onComplete }) => {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  
  // Calculate progress for this module
  const completedLessons = module.lessons.filter(lesson => lesson.completed).length;
  const progress = module.lessons.length > 0 
    ? Math.round((completedLessons / module.lessons.length) * 100) 
    : 0;
  
  // Get icon for lesson type
  const getLessonTypeIcon = (type: string) => {
    switch(type) {
      case 'video':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'reading':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'quiz':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'exercise':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  const handleLessonClick = (lessonId: string) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const handleComplete = (lessonId: string) => {
    if (onComplete) {
      onComplete(lessonId);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Module header */}
      <div className="bg-gradient-to-r from-[#004851] to-[#003842] p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{module.title}</h3>
        <p className="text-white/80 text-sm mb-4">{module.description}</p>
        
        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/20 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#68F6C8] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-white/80 text-sm font-medium">{progress}%</span>
        </div>
      </div>
      
      {/* Lessons list */}
      <div className="p-4">
        <div className="text-sm text-gray-500 font-medium px-2 py-1">
          {module.lessons.length} lessons • {completedLessons} completed
        </div>
        
        <div className="divide-y divide-gray-100">
          {module.lessons.map((lesson, index) => (
            <div key={lesson.id} className="py-3">
              <button 
                className="w-full flex items-center gap-3 text-left p-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => handleLessonClick(lesson.id)}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  lesson.completed 
                    ? 'bg-[#68F6C8]/20 text-[#004851]' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {lesson.completed ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-[#004851]">{lesson.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      {getLessonTypeIcon(lesson.type)}
                      {lesson.type}
                    </span>
                  </div>
                </div>
                
                <div className="text-gray-400">
                  <svg className={`w-5 h-5 transition-transform ${
                    expandedLesson === lesson.id ? 'transform rotate-180' : ''
                  }`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {/* Expanded lesson content */}
              {expandedLesson === lesson.id && (
                <div className="mt-3 pl-12 pr-4 pb-2 animate-fadeIn">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-gray-700 mb-4">
                      This is a preview of the {lesson.title.toLowerCase()} content.
                      In the full course, this would include interactive {lesson.type} content.
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => handleComplete(lesson.id)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm ${
                          lesson.completed 
                            ? 'bg-[#004851]/10 text-[#004851]' 
                            : 'bg-[#004851] text-white hover:bg-[#004851]/90'
                        }`}
                        disabled={lesson.completed}
                      >
                        {lesson.completed ? 'Completed' : 'Mark as Complete'}
                      </button>
                      
                      <Link 
                        href="#" 
                        className="text-[#004851] hover:text-[#68F6C8] text-sm font-medium flex items-center gap-1"
                      >
                        View Full Lesson
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseModule; 