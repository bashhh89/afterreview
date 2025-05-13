import React from 'react';
import CourseDetailTemplate from '@/components/learning-hub/CourseDetailTemplate';
import { miniCourses } from '@/lib/learningHubData';
import AIToolChecklistContent from './AIToolChecklistContent';

export default async function AIToolChecklistPage() {
  // Find an appropriate course to display the template with
  const course = miniCourses.find(c => c.id === 'ai-jargon-buster') || miniCourses[0];
  
  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl text-sg-dark-teal mb-4">Course not found</h1>
        <p>The requested course could not be found.</p>
      </div>
    );
  }
  
  return (
    <CourseDetailTemplate course={{
      ...course,
      title: "AI Tool Test Drive Checklist",
      description: "A simple, interactive checklist to evaluate if a new AI tool is worth your time and effort.",
      tier: ["Dabbler"],
      duration: "15-30 minutes",
    }}>
      <AIToolChecklistContent />
    </CourseDetailTemplate>
  );
} 