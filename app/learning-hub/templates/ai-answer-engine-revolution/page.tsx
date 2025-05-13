import React from 'react';
import CourseDetailTemplate from '@/components/learning-hub/CourseDetailTemplate';
import { miniCourses } from '@/lib/learningHubData';
import AIAnswerEngineRevolutionContent from './AIAnswerEngineRevolutionContent';

export default async function AIAnswerEngineRevolutionPage() {
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
      title: "Beyond Google – Are You Ready for the AI Answer Engine Revolution?",
      description: "Discover how AI-powered answer engines are reshaping search, and what it means for your marketing strategy in 2025 and beyond.",
      tier: ["Enabler", "Leader", "Dabbler"],
      duration: "8 minutes",
    }}>
      <AIAnswerEngineRevolutionContent />
    </CourseDetailTemplate>
  );
} 