import React from 'react';
import CourseDetailTemplate from '../../../components/learning-hub/CourseDetailTemplate';
import { miniCourses } from '../../../lib/learningHubData';
import { getMarkdownContent } from '../../../lib/markdownUtils';

// Make the component a Server Component to use async data fetching
export default async function FirstAIWinsPage() {
  const course = miniCourses.find(c => c.id === 'first-ai-wins');
  
  // Fetch the markdown content
  const markdownContent = await getMarkdownContent('mini-courses', 'first-ai-wins');
  
  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl text-sg-dark-teal mb-4">Course not found</h1>
        <p>The requested course could not be found.</p>
      </div>
    );
  }
  
  return (
    <CourseDetailTemplate 
      course={course} 
      markdownContent={markdownContent || undefined}
    />
  );
}
