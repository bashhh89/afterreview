'use client';

import React from 'react';
import CourseTemplate from '@/components/learning-hub/course-template';

const lessons = [
  {
    id: 'lesson-1',
    title: 'Drafting Simple Emails & Replies with AI',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Welcome Back, AI Explorer!</h2>
        <p className="text-lg text-brand-dark-teal">
          You've met ChatGPT (or a similar AI tool) and understand the basics. Now, let's put it to work on those small, everyday tasks that eat up valuable time! This course focuses on quick, practical ways AI can boost your productivity with minimal effort.
        </p>
        <p className="text-lg text-brand-dark-teal">
          Think of this as your AI "quick wins" playbook for common administrative and communication tasks. We'll cover using AI for drafting emails, summarizing information, brainstorming simple lists, and basic proofreading.
        </p>
        
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">By the end of this course, you will be able to:</h3>
          <ul className="list-disc list-inside text-brand-dark-teal space-y-1">
            <li>Use AI to draft simple emails and replies faster</li>
            <li>Leverage AI to quickly summarize short texts or articles</li>
            <li>Employ AI for brainstorming basic lists like meeting agendas or to-do items</li>
            <li>Understand how AI can assist with proofreading and grammar checks</li>
            <li>Apply simple prompts to get useful results for these everyday tasks</li>
          </ul>
        </div>
        
        <hr className="my-8 border-gray-300" />

        <h3 className="text-2xl font-bold text-brand-dark-teal">Lesson 1: Drafting Simple Emails & Replies with AI</h3>
        <p className="text-brand-dark-teal/60 italic">(Approx. 10 minutes)</p>
        <p className="text-lg text-brand-dark-teal">
          How much time do you spend staring at a blank email draft? AI can be a fantastic co-writer, especially for routine communications.
        </p>
        
        <div className="bg-brand-mint-green/20 p-6 rounded-xl mt-6">
          <h4 className="text-xl font-semibold text-brand-dark-teal mb-3">Scenario 1: Writing a Reminder Email</h4>
          <p className="text-brand-dark-teal mb-2"><span className="font-semibold">Your Goal:</span> Remind a colleague about a meeting tomorrow.</p>
          <p className="text-brand-dark-teal mb-2"><span className="font-semibold">Simple Prompt:</span> Write a short, friendly email reminding [Colleague's Name] about our meeting tomorrow at [Time] to discuss [Topic].</p>
          <div className="bg-white/50 p-3 my-2 rounded-md text-sm text-brand-dark-teal">
            <span className="font-semibold">AI Output (Example):</span> "Hi [Colleague's Name], Just a friendly reminder about our meeting scheduled for tomorrow at [Time] to go over [Topic]. Looking forward to chatting! Best, [Your Name]"
          </div>
          <p className="text-brand-dark-teal"><span className="font-semibold">Your Action:</span> Quickly review, maybe tweak a word or two, and send!</p>
        </div>
        
        <div className="bg-brand-mint-green/20 p-6 rounded-xl mt-6">
          <h4 className="text-xl font-semibold text-brand-dark-teal mb-3">Scenario 2: Drafting a Simple Follow-Up</h4>
          <p className="text-brand-dark-teal mb-2"><span className="font-semibold">Your Goal:</span> Follow up with a client who hasn't responded.</p>
          <p className="text-brand-dark-teal mb-2"><span className="font-semibold">Simple Prompt:</span> Write a polite follow-up email to [Client's Name] about my previous message regarding [Topic].</p>
          <div className="bg-white/50 p-3 my-2 rounded-md text-sm text-brand-dark-teal">
            <span className="font-semibold">AI Output (Example):</span> "Hi [Client's Name], I wanted to follow up on my previous email regarding [Topic]. Please let me know if you have any questions or need more information. Looking forward to your response! Best, [Your Name]"
          </div>
          <p className="text-brand-dark-teal"><span className="font-semibold">Your Action:</span> Send a quick, friendly nudge without rewriting from scratch!</p>
        </div>
      </div>
    ),
    completed: false
  },
  {
    id: 'lesson-2',
    title: 'Quick Text Summarization',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">Quick Text Summarization</h2>
        <p className="text-lg text-brand-dark-teal">
          Learn how to use AI to quickly summarize articles, reports, and other text content.
        </p>
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">Effective Summarization Prompts</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">1.</span>
              <div>
                <strong>Basic Summary</strong>
                <p className="text-brand-dark-teal/80">Summarize this text in 3-4 key points.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">2.</span>
              <div>
                <strong>Executive Summary</strong>
                <p className="text-brand-dark-teal/80">Create a brief executive summary highlighting the main findings and recommendations.</p>
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
    title: 'AI-Assisted List Creation',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-brand-dark-teal mb-4">AI-Assisted List Creation</h2>
        <p className="text-lg text-brand-dark-teal">
          Use AI to quickly generate and organize lists for various purposes.
        </p>
        <div className="bg-brand-mint-green/20 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-brand-green mb-3">Common List Types</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">1.</span>
              <div>
                <strong>Meeting Agendas</strong>
                <p className="text-brand-dark-teal/80">Generate structured meeting agendas based on topics and goals.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-green mt-1">2.</span>
              <div>
                <strong>Project Tasks</strong>
                <p className="text-brand-dark-teal/80">Break down projects into actionable task lists.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    ),
    completed: false
  }
];

export default function QuickProductivityBoosts() {
  return (
    <CourseTemplate
      courseName="Quick Productivity Boosts"
      lessons={lessons}
    />
  );
}
