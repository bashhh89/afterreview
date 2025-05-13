import React from 'react';
import CourseDetailTemplate from '@/components/learning-hub/CourseDetailTemplate';
import { miniCourses } from '@/lib/learningHubData';
import CRMSuperchargedContent from './CRMSuperchargedContent';

export default async function CRMSuperchargedPage() {
  // Find an appropriate course to display the template with
  const course = miniCourses.find(c => c.id === 'ai-driven-organization') || miniCourses[0];
  
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
      title: "CRM Supercharged: Your AI Playbook for Smarter Customer Relationships (2025)",
      description: "Discover how AI integration can transform your CRM from a passive database into an intelligent, proactive engine for growth and deeper customer relationships.",
      tier: ["Enabler", "Leader"],
      duration: "8 minutes",
    }}>
      <CRMSuperchargedContent />
    </CourseDetailTemplate>
  );
} 