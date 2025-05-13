'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Lesson {
  id: string | number;
  title: string;
  completed: boolean;
}

interface MiniCourseNavProps {
  courseName: string;
  lessons: Lesson[];
  currentLessonId: string | number;
  onLessonSelect: (lessonId: string | number) => void;
  userTier: string;
}

export const MiniCourseNav: React.FC<MiniCourseNavProps> = ({
  courseName,
  lessons,
  currentLessonId,
  onLessonSelect,
  userTier
}) => {
  const progress = (lessons.filter(l => l.completed).length / lessons.length) * 100;

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Course Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-brand-dark-teal">{courseName}</h3>
        <div className="flex items-center mt-1">
          <span className="text-xs px-2 py-0.5 rounded-full bg-brand-mint-green/20 text-brand-green font-medium">
            {userTier} Level
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500 font-medium">Your Progress</span>
          <span className="text-xs text-brand-dark-teal font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto">
        <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 tracking-wider">Lessons</h4>
        <div className="space-y-1">
          {lessons.map((lesson) => (
            <button
              key={`lesson-${lesson.id}`}
              onClick={() => onLessonSelect(lesson.id)}
              className={`
                w-full text-left p-3 rounded-lg transition-all flex items-center
                ${currentLessonId === lesson.id
                  ? 'bg-brand-mint-green/20 text-brand-dark-teal'
                  : 'hover:bg-gray-50 text-gray-700'
                }
              `}
            >
              <div className={`
                w-6 h-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0
                ${lesson.completed
                  ? 'bg-brand-green text-white'
                  : currentLessonId === lesson.id
                    ? 'border-2 border-brand-green text-brand-green'
                    : 'border border-gray-300 text-gray-500'
                }
              `}>
                {lesson.completed ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs">{typeof lesson.id === 'string' ? lesson.id.split('-')[1] : lesson.id}</span>
                )}
              </div>
              <span className="text-sm">{lesson.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 