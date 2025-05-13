'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LearningHubLayout from '@/app/learning-hub/LearningHubLayout';
import { MiniCourseNav } from '@/components/learning-hub/MiniCourseNav';

interface Lesson {
  id: string;
  title: string;
  content: React.ReactNode;
  completed: boolean;
}

// Standard sidebar links - to be used across all courses
export const standardSidebarLinks = [
  { title: 'Mini Courses', href: '/learning-hub' },
  { title: 'Checklists', href: '/learning-hub' },
  { title: 'Prompt Library', href: '/learning-hub' },
  { title: 'Templates', href: '/learning-hub' },
  { title: 'Recommended Tools', href: '/learning-hub/recommended-tools' },
];

interface CoursePageProps {
  courseName: string;
  lessons: Lesson[];
}

// Main Course Detail Template component
export default function CourseTemplate({
  courseName,
  lessons
}: {
  courseName: string;
  lessons: Lesson[];
}) {
  const [currentLesson, setCurrentLesson] = useState(lessons[0]?.id || '');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleNext = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson);
    if (currentIndex < lessons.length - 1) {
      setCompletedLessons(prev => [...new Set([...prev, currentLesson])]);
      setCurrentLesson(lessons[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1].id);
    }
  };

  const handleLessonSelect = (lessonId: string | number) => {
    setCurrentLesson(lessonId.toString());
  };

  const currentLessonData = lessons.find(l => l.id === currentLesson);
  const user = { name: 'Alex', avatar: '', tier: 'Dabbler' };

  const courseViewLessons = lessons.map(lesson => ({
    ...lesson,
    id: lesson.id.toString(),
    completed: completedLessons.includes(lesson.id)
  }));

  return (
    <LearningHubLayout
      activeSection="Mini Courses"
      onSectionChange={() => {}}
      links={standardSidebarLinks}
    >
      <div className="flex flex-1" style={{ minHeight: '0' }}>
        {/* Main Lesson Content Area + Progress Bar */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Sticky Progress Bar */}
          <div className="sticky top-0 w-full h-1 bg-gray-200 z-20">
            <motion.div
              className="h-full bg-brand-green"
              initial={{ width: 0 }}
              animate={{ width: `${((lessons.findIndex(l => l.id === currentLesson) + 1) / lessons.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Scrollable Lesson Content */}
          <div className="flex-grow overflow-y-auto p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLesson}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                {currentLessonData?.content || <p>Lesson content not found.</p>}
                <div className="mt-8 flex justify-between items-center">
                  <button
                    onClick={handlePrevious}
                    disabled={currentLesson === lessons[0].id}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      currentLesson === lessons[0].id
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-brand-green to-brand-dark-teal text-white hover:from-brand-green/90 hover:to-brand-dark-teal/90 shadow-md hover:shadow-lg'
                    }`}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentLesson === lessons[lessons.length - 1].id}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      currentLesson === lessons[lessons.length - 1].id
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-brand-green to-brand-dark-teal text-white hover:from-brand-green/90 hover:to-brand-dark-teal/90 shadow-md hover:shadow-lg'
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mini Course Navigation Sidebar */}
        <div className="w-60 flex-shrink-0 h-full overflow-y-auto border-l border-slate-200">
          <MiniCourseNav
            courseName={courseName}
            lessons={courseViewLessons}
            currentLessonId={currentLesson}
            onLessonSelect={handleLessonSelect}
            userTier={user.tier}
          />
        </div>
      </div>
    </LearningHubLayout>
  );
} 