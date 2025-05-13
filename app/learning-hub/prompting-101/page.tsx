import React from 'react';
import CourseDetailTemplate from '../../../components/learning-hub/CourseDetailTemplate';
import { miniCourses } from '../../../lib/learningHubData';
import Prompting101Content from './Prompting101Content';

export default async function Prompting101Page() {
  const course = miniCourses.find(c => c.id === 'prompting-101');
  
  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl text-sg-dark-teal mb-4">Course not found</h1>
        <p>The requested course could not be found.</p>
      </div>
    );
  }
  
  return (
    <CourseDetailTemplate course={course}>
      <Prompting101Content />
    </CourseDetailTemplate>
  );
} 