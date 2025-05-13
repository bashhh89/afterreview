"use client";
import React from 'react';
import CourseDetailTemplate from '../../../components/learning-hub/CourseDetailTemplate';
import { miniCourses } from '../../../lib/learningHubData';

export default function AdvancedPromptingTechniquesPage() {
  const course = miniCourses.find(c => c.id === 'advanced-prompting-techniques');
  
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
      <h2 className="text-2xl font-bold text-sg-dark-teal mb-4">Advanced Prompting Techniques</h2>
      <p className="text-sg-dark-teal mb-6">
        This course will elevate your prompting skills to get consistently high-quality and reliable results from AI systems. Learn frameworks and strategies used by AI experts.
      </p>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-sg-dark-teal mb-3">What You'll Learn</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-sg-bright-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sg-dark-teal">How to structure effective prompts for different AI models</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-sg-bright-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sg-dark-teal">Advanced techniques like Chain-of-Thought, Role Prompting, and Few-Shot Learning</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-sg-bright-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sg-dark-teal">Strategies for troubleshooting and refining prompts</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-sg-bright-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sg-dark-teal">Building reusable prompt templates for your organization</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-sg-bright-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sg-dark-teal">Creating complex, multi-step prompting workflows</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-sg-light-mint rounded-lg p-6 border border-sg-bright-green/20">
        <h3 className="text-xl font-bold text-sg-dark-teal mb-2">Coming Soon</h3>
        <p className="text-sg-dark-teal/80">
          The full course content is being developed. Check back soon for the complete learning experience.
        </p>
      </div>
    </CourseDetailTemplate>
  );
} 