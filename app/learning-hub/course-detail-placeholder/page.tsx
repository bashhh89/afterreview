'use client';

import React from 'react';
import CourseTemplate from '@/components/learning-hub/course-template';

const lessons = [
  {
    id: 'lesson-1',
    title: 'Coming Soon',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Course Coming Soon</h2>
        <p className="text-lg text-brand-dark-teal">
          This course is currently under development. Check back soon for exciting new content!
        </p>
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">What to Expect</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span><span>Comprehensive lessons on AI implementation</span></li>
            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span><span>Practical examples and exercises</span></li>
            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span><span>Step-by-step guidance</span></li>
          </ul>
        </div>
      </div>
    ),
    completed: false
  }
];

export default function CourseDetailPlaceholder() {
  return (
    <CourseTemplate
      courseName="Coming Soon"
      lessons={lessons}
    />
  );
} 