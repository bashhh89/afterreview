'use client';

import React from 'react';
import CourseTemplate from '@/components/learning-hub/course-template';

const lessons = [
  {
    id: 'lesson-1',
    title: 'Introduction to AI Content Ideation',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Introduction to AI Content Ideation</h2>
        <p className="text-lg text-brand-dark-teal">
          Welcome to the "Content Ideas with AI" mini-course! Learn how to leverage AI to generate endless content ideas and never face writer's block again.
        </p>
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">What You'll Learn</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span><span>How to use AI for brainstorming content topics</span></li>
            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span><span>Creating content calendars with AI assistance</span></li>
            <li className="flex items-center gap-2"><span className="text-brand-green">✓</span><span>Generating engaging headlines and hooks</span></li>
          </ul>
        </div>
      </div>
    ),
    completed: false
  },
  {
    id: 'lesson-2',
    title: 'Brainstorming with AI',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Brainstorming with AI</h2>
        <p className="text-lg text-brand-dark-teal">
          Learn effective prompting techniques to generate diverse content ideas that resonate with your audience.
        </p>
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">Key Prompting Strategies</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">1.</span>
              <div>
                <strong>Topic Expansion:</strong>
                <p className="text-brand-dark-teal/80">Start with a core topic and ask AI to generate related subtopics and angles.</p>
          </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">2.</span>
              <div>
                <strong>Audience Perspective:</strong>
                <p className="text-brand-dark-teal/80">Frame prompts from your target audience's viewpoint to generate relevant ideas.</p>
        </div>
            </li>
          </ul>
        </div>
      </div>
    ),
    completed: false
  },
  {
    id: 'lesson-3',
    title: 'Creating Content Calendars',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Creating Content Calendars</h2>
        <p className="text-lg text-brand-dark-teal">
          Transform your content ideas into an organized, strategic content calendar with AI assistance.
        </p>
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">AI-Powered Planning</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">1.</span>
              <div>
                <strong>Content Mapping:</strong>
                <p className="text-brand-dark-teal/80">Use AI to map content ideas to your marketing calendar and business goals.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">2.</span>
              <div>
                <strong>Topic Clustering:</strong>
                <p className="text-brand-dark-teal/80">Group related content ideas into themes for cohesive content series.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    ),
    completed: false
  }
];

export default function ContentIdeasWithAI() {
  return (
    <CourseTemplate
      courseName="Content Ideas with AI"
      lessons={lessons}
    />
  );
} 