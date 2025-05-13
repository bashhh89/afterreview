import React from 'react';
import { motion } from 'framer-motion';

interface Lesson {
  id: string | number;
  title: string;
  completed: boolean;
}

interface CourseProgressProps {
  lessons: Lesson[];
  currentLesson: string | number;
  onLessonSelect: (lessonId: string | number) => void;
}

const CourseProgress: React.FC<CourseProgressProps> = ({
  lessons,
  currentLesson,
  onLessonSelect,
}) => {
  const progress = (lessons.filter(l => l.completed).length / lessons.length) * 100;

  return (
    <div className="fixed right-4 top-24 w-72 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-emerald-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-emerald-800">Course Progress</h3>
        <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-emerald-700 mt-2 font-medium">{Math.round(progress)}% Complete</p>
      </div>
      
      <div className="space-y-2.5">
        {lessons.map((lesson) => (
          <button
            key={`lesson-${lesson.id}`}
            onClick={() => onLessonSelect(lesson.id)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              currentLesson === lesson.id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'hover:bg-emerald-50'
            } ${lesson.completed ? 'font-medium' : ''}`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center
                ${lesson.completed 
                  ? 'bg-white text-emerald-500' 
                  : currentLesson === lesson.id 
                    ? 'bg-white/20 border-2 border-white' 
                    : 'border-2 border-emerald-200'
                }`}>
                {lesson.completed && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${
                currentLesson === lesson.id 
                  ? 'text-white' 
                  : lesson.completed 
                    ? 'text-emerald-700' 
                    : 'text-gray-600'
              }`}>
                {lesson.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseProgress; 