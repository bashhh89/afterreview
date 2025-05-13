'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faVideo, 
  faPencilAlt, 
  faQuestionCircle, 
  faChevronLeft,
  faChevronRight,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

// Import the components from separate files
import { exampleCourseData } from './courseData';

// Lesson type interface
interface Lesson {
  id: string;
  title: string;
  type: 'Video' | 'Reading' | 'Exercise' | 'Quiz' | 'Intro' | 'Completion';
  duration: string;
  icon: string;
  content: (props: { lessonData?: any }) => React.ReactNode;
  videoUrl?: string;
  quizData?: any[];
  completed: boolean;
}

// Props for the course detail page
interface CourseDetailProps {
  courseTitle: string;
  courseSubtitle: string;
  courseTier: 'Dabbler' | 'Enabler' | 'Leader';
  courseIntroduction: React.ReactNode;
  lessons: Lesson[];
}

// Main Course Detail Template component
export default function CourseDetailTemplate() {
  // Use the imported exampleCourseData directly
  const {
    courseTitle,
    courseSubtitle,
    courseTier,
    courseIntroduction,
    lessons
  } = exampleCourseData;

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  // Handle navigation
  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      // Mark current lesson as completed
      if (lessons[currentLessonIndex]) {
        setCompletedLessons(prev => 
          prev.includes(lessons[currentLessonIndex].id) 
            ? prev 
            : [...prev, lessons[currentLessonIndex].id]
        );
      }
      // Go to next lesson
      setCurrentLessonIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  };
  
  const handleLessonSelect = (index: number) => {
    setCurrentLessonIndex(index);
  };
  
  // Current lesson data
  const currentLesson = lessons[currentLessonIndex] || null;
  
  // Calculate progress percentage
  const progressPercentage = (completedLessons.length / lessons.length) * 100;
  
  // Get lesson icon based on type
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'Video': return faVideo;
      case 'Reading': return faBook;
      case 'Exercise': return faPencilAlt;
      case 'Quiz': return faQuestionCircle;
      default: return faBook;
    }
  };
  
  // Get tier badge color
  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'Dabbler': return 'bg-green-500 text-white';
      case 'Enabler': return 'bg-blue-500 text-white';
      case 'Leader': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div className="w-full bg-[#103138] text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          {/* Social Garden logo */}
          <div className="h-8 mr-4">
            <Image
              src="/SocialGarden.svg"
              alt="Social Garden"
              width={180}
              height={22}
              priority
            />
          </div>
          <h1 className="text-xl font-bold">AI Learning Hub</h1>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Sticky Lesson Navigation Sidebar */}
        <div className="w-80 flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col h-screen overflow-y-auto">
          <div className="p-6">
            {/* Back Button */}
            <Link 
              href="/learning-hub" 
              className="inline-flex items-center text-sm font-medium text-[#20E28F] hover:text-[#20E28F]/80 mb-6"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Learning Hub
            </Link>
            
            {/* Course Title & Tier Badge */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-[#20E28F] mb-1">{courseTitle}</h1>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{courseSubtitle}</p>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getTierBadgeColor(courseTier)}`}>
                  {courseTier}
                </span>
              </div>
            </div>
            
            {/* Course Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-gray-600">Your Progress</span>
                <span className="text-sm font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#20E28F]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            {/* Course Lessons List */}
            <div>
              <h2 className="text-sm font-semibold text-[#103138] uppercase tracking-wide mb-4">Course Lessons</h2>
              <div className="space-y-2">
                {lessons.map((lesson, index) => {
                  const isActive = index === currentLessonIndex;
                  const isCompleted = completedLessons.includes(lesson.id);
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonSelect(index)}
                      className={`w-full flex items-center text-left p-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-[#E6FAF3] border-l-4 border-[#20E28F] pl-2'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center mr-3
                        ${isCompleted 
                          ? 'bg-brand-mint-green text-white' 
                          : isActive
                            ? 'bg-brand-mint-green/20 text-brand-dark-teal'
                            : 'bg-gray-200 text-gray-600'
                        }
                      `}>
                        {isCompleted ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <FontAwesomeIcon icon={getLessonIcon(lesson.type)} />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`block text-sm ${
                          isActive ? 'font-semibold text-brand-dark-teal' : 'text-gray-900'
                        }`}>
                          {lesson.title}
                        </span>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs ${
                            isActive ? 'text-brand-dark-teal/80' : 'text-gray-500'
                          }`}>
                            {lesson.duration}
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className={`text-xs ${
                            isActive ? 'text-brand-dark-teal/80' : 'text-gray-500'
                          }`}>
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Main Lesson Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto py-8 px-8">
            {/* Course Introduction (only shown for first lesson) */}
            {currentLessonIndex === 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-[#20E28F] mb-3">{courseTitle}</h1>
                <h2 className="text-xl text-gray-600 mb-4">{courseSubtitle}</h2>
                <div className="prose prose-sm">
                  {courseIntroduction}
                </div>
              </div>
            )}
            
            {/* Current Lesson Content */}
            {currentLesson && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Lesson Header */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon 
                        icon={getLessonIcon(currentLesson.type)} 
                        className="mr-2 text-brand-mint-green"
                      />
                      <span className="text-sm text-gray-500">{currentLesson.duration}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        Lesson {currentLessonIndex + 1} of {lessons.length}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h2>
                  </div>
                  
                  {/* Lesson Content */}
                  <div className="prose prose-lg max-w-none">
                    {/* Render the lesson content */}
                    {currentLesson.content({ lessonData: currentLesson })}
                  </div>
                  
                  {/* Navigation Controls */}
                  <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
                    <button
                      onClick={handlePrevious}
                      disabled={currentLessonIndex === 0}
                      className={`inline-flex items-center px-4 py-2 rounded-lg transition-all ${
                        currentLessonIndex === 0
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-brand-dark-teal hover:bg-brand-mint-green/10'
                      }`}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                      Previous Lesson
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentLessonIndex === lessons.length - 1}
                      className={`inline-flex items-center px-4 py-2 rounded-lg transition-all ${
                        currentLessonIndex === lessons.length - 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'bg-brand-mint-green text-brand-dark-teal hover:bg-brand-mint-green/90'
                      }`}
                    >
                      Next Lesson
                      <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
