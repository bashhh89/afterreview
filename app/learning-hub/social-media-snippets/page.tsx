'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CourseNavSidebar from '@/components/learning-hub/CourseNavSidebar';

const lessons = [
  {
    id: 'lesson-1',
    title: 'Brainstorming Social Media Post Ideas with AI',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">Brainstorming Social Media Post Ideas with AI</h2>
        <p className="text-gray-600 mb-6">(Approx. 15 minutes)</p>

        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">Stuck on what to post today?</h3>
          <p className="text-gray-700 leading-relaxed">
            AI can be your instant idea generator for social media.
          </p>
        </div>

        {/* Scenario 1 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Scenario 1: Generating Topic Ideas</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-emerald-700">Your Goal:</h4>
              <p className="text-gray-700 leading-relaxed">
                Get ideas for relevant posts for your audience.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Simple Prompt:</h4>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                Give me 5 ideas for short LinkedIn posts for a [Your Role/Business, e.g., 'small business consultant'] targeting [Your Audience, e.g., 'startup founders']. Focus on topics like productivity, funding, and marketing.
              </div>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">AI Output (Example):</h4>
              <p className="text-gray-700 leading-relaxed">
                Might suggest: "Share a quick productivity hack," "Ask about common startup funding challenges," "Post a surprising marketing statistic," "Offer a tip for better time management," "Comment on a recent industry news item."
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Your Action:</h4>
              <p className="text-gray-700 leading-relaxed">
                Choose an idea that resonates and start drafting the actual post (AI can help with that too!).
              </p>
            </div>
          </div>
        </div>

        {/* Scenario 2 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Scenario 2: Creating "Tip of the Week" Posts</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-emerald-700">Your Goal:</h4>
              <p className="text-gray-700 leading-relaxed">
                Share valuable, bite-sized advice regularly.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Simple Prompt:</h4>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                Generate 3 short, actionable tips related to [Your Area of Expertise, e.g., 'improving website conversions'] that I can share on Twitter.
              </div>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">AI Output (Example):</h4>
              <p className="text-gray-700 leading-relaxed">
                Might provide concise tips like "Tip: Ensure your primary call-to-action is above the fold. #WebsiteTips," "Tip: Reduce form fields to increase lead capture. #CRO," etc.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Your Action:</h4>
              <p className="text-gray-700 leading-relaxed">
                Verify the tips, add your own context or hashtags, and schedule them.
              </p>
            </div>
          </div>
        </div>

        {/* Scenario 3 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Scenario 3: Repurposing Existing Content</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-emerald-700">Your Goal:</h4>
              <p className="text-gray-700 leading-relaxed">
                Turn a blog post into several social media snippets.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Simple Prompt:</h4>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                Take the key points from this blog post section and turn them into 3 separate, short Twitter posts: [Paste a paragraph or key points from your blog post]
              </div>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">AI Output (Example):</h4>
              <p className="text-gray-700 leading-relaxed">
                Creates short, tweetable summaries or highlights.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Your Action:</h4>
              <p className="text-gray-700 leading-relaxed">
                Edit for clarity and conciseness, add relevant links or visuals.
              </p>
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600 text-lg">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-amber-700">SocialGarden Pro Tip</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Be specific about the platform! A good prompt for LinkedIn (more professional, longer text) will be different from a good prompt for Twitter (concise, hashtags) or Instagram (visual focus, engaging captions). Tell the AI where you plan to post!
          </p>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-2',
    title: 'Crafting Engaging Questions for Your Audience',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">Crafting Engaging Questions for Your Audience</h2>
        <p className="text-gray-600 mb-6">(Approx. 10 minutes)</p>

        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">Ask the right questions to boost engagement</h3>
          <p className="text-gray-700 leading-relaxed">
            Asking questions is one of the best ways to boost engagement on social media. AI can help you brainstorm questions that spark conversation.
          </p>
        </div>

        {/* Scenario 1 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Scenario 1: Open-Ended Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-emerald-700">Your Goal:</h4>
              <p className="text-gray-700 leading-relaxed">
                Start a discussion on a relevant topic.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Simple Prompt:</h4>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                Write 5 open-ended questions I can ask my audience of [Your Audience, e.g., 'marketing managers'] on LinkedIn about [Topic, e.g., 'the challenges of content marketing'].
              </div>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">AI Output (Example):</h4>
              <p className="text-gray-700 leading-relaxed">
                Might suggest: "What's your biggest struggle when creating a content calendar?", "How do you measure the ROI of your content marketing efforts?", "What's one content marketing tool you can't live without, and why?", etc.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Your Action:</h4>
              <p className="text-gray-700 leading-relaxed">
                Choose the most relevant question and post it, being ready to engage with the responses.
              </p>
            </div>
          </div>
        </div>

        {/* Scenario 2 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Scenario 2: Poll Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-emerald-700">Your Goal:</h4>
              <p className="text-gray-700 leading-relaxed">
                Get quick engagement and gather simple opinions.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Simple Prompt:</h4>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                Generate 3 ideas for simple poll questions for [Platform, e.g., 'Instagram Stories'] related to [Topic, e.g., 'remote work preferences']. Include 2-3 answer options for each.
              </div>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">AI Output (Example):</h4>
              <p className="text-gray-700 leading-relaxed">
                Might suggest: "Work from Home vs. Office? (Options: WFH, Office, Hybrid)", "Biggest remote work challenge? (Options: Communication, Staying Focused, Work-life Balance)", etc.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Your Action:</h4>
              <p className="text-gray-700 leading-relaxed">
                Set up the poll using the AI-generated ideas.
              </p>
            </div>
          </div>
        </div>

        {/* Key Tip */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">Key Tip</h3>
          <p className="text-gray-700 leading-relaxed">
            Prompt the AI to make the questions "engaging," "thought-provoking," or "conversation-starting" to get better results than just factual questions.
          </p>
        </div>

        {/* Want More Section */}
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <h3 className="text-xl font-semibold text-amber-700 mb-4">Want More Engagement Strategies?</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Generating questions is just one piece of the puzzle. SocialGarden helps businesses develop comprehensive social media strategies that drive meaningful engagement and results, integrating AI where it makes sense.
          </p>
          <p className="italic text-sm text-gray-600">
            [Conceptual Link: Contact SocialGarden for Social Media Strategy Help]
          </p>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-3',
    title: 'Generating Catchy Headline Variations',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">Generating Catchy Headline Variations</h2>
        <p className="text-gray-600 mb-6">(Approx. 15 minutes)</p>

        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">Create headlines that grab attention</h3>
          <p className="text-gray-700 leading-relaxed">
            The headline is often the most crucial part of your content – it determines if someone clicks or keeps scrolling. AI can rapidly generate multiple options for you to choose from.
          </p>
        </div>

        {/* Scenario 1 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Scenario 1: Headlines for a Blog Post</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-emerald-700">Your Goal:</h4>
              <p className="text-gray-700 leading-relaxed">
                Find a compelling title for your new article.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Simple Prompt:</h4>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                Generate 10 catchy headline variations for a blog post titled "[Your Draft Title, e.g., 'Using AI for Email Marketing']". Make them benefit-driven and intriguing.
              </div>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">AI Output (Example):</h4>
              <p className="text-gray-700 leading-relaxed">
                Provides a list of diverse headlines like "Unlock Your Inbox: AI Secrets for Email Marketing Success," "Stop Writing Boring Emails: Let AI Boost Your Open Rates," "The Future is Here: Integrating AI into Your Email Strategy," "5 AI Email Marketing Tactics You Can Implement Today," etc.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Your Action:</h4>
              <p className="text-gray-700 leading-relaxed">
                Pick the strongest headline, or combine elements from different suggestions.
              </p>
            </div>
          </div>
        </div>

        {/* Scenario 2 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Scenario 2: Subject Lines for an Email Campaign</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-emerald-700">Your Goal:</h4>
              <p className="text-gray-700 leading-relaxed">
                Improve email open rates with better subject lines.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Simple Prompt:</h4>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                Write 5 short, attention-grabbing email subject lines for a newsletter promoting [Content of newsletter, e.g., 'a new case study about AI results']. Include urgency or curiosity where appropriate.
              </div>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">AI Output (Example):</h4>
              <p className="text-gray-700 leading-relaxed">
                Might suggest: "🔥 New Case Study: How AI Boosted [Metric]," "Don't Miss These AI Results...", "Inside: Your Competitors Using AI?", "Quick Question about Your AI Strategy...", "Unlock AI Insights (Case Study Inside)".
              </p>
            </div>
            <div>
              <h4 className="font-medium text-emerald-700">Your Action:</h4>
              <p className="text-gray-700 leading-relaxed">
                Choose the best fit for your audience and email content. Consider A/B testing different subject lines!
              </p>
            </div>
          </div>
        </div>

        {/* Techniques for Better Headlines */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">Techniques for Better Headline Prompts</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">•</span>
              <span><strong>Specify the Target Audience:</strong> "Write headlines for busy CEOs..."</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">•</span>
              <span><strong>Mention the Key Benefit:</strong> "...that promise to save time."</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">•</span>
              <span><strong>Ask for a Specific Tone:</strong> "Make them sound exciting," "Use a question format."</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">•</span>
              <span><strong>Request a Number:</strong> "Generate 10 options."</span>
            </li>
          </ul>
        </div>

        {/* Optimizing Headlines & Content */}
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <h3 className="text-xl font-semibold text-amber-700 mb-4">Optimizing Headlines & Content</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Great headlines get clicks, but the content needs to deliver! Ensure your content strategy aligns with your headlines. Need help refining your overall content approach? SocialGarden provides content marketing services that integrate AI effectively.
          </p>
          <p className="italic text-sm text-gray-600">
            [Conceptual Link: Explore SocialGarden's Content Marketing Services]
          </p>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-4',
    title: 'Congratulations! You\'re an AI-Assisted Wordsmith!',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-100">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">Congratulations! You're an AI-Assisted Wordsmith!</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            You've learned how to use AI as a quick and effective assistant for generating social media ideas, engaging questions, and compelling headlines. No more staring at that blinking cursor for these short-form content needs!
          </p>

          <div className="bg-white p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Key Takeaways from This Course</h3>
            <ul className="space-y-3">
              {[
                "AI can rapidly brainstorm relevant ideas for social media posts.",
                "Prompting AI to generate questions is great for boosting audience engagement.",
                "AI excels at creating multiple headline variations quickly.",
                "Specific prompts about platform, audience, tone, and desired outcome lead to better results."
              ].map((takeaway, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">✓</span>
                  <span className="text-gray-700">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 'next-1',
                  title: "Put it to Use",
                  desc: "Try generating ideas for your next social media post or email subject line using AI."
                },
                {
                  id: 'next-2',
                  title: "Refine Your Snippets",
                  desc: "Remember to edit and add your brand voice to AI suggestions (refer back to the \"Using AI Content Wisely\" course!)."
                },
                {
                  id: 'next-3',
                  title: "Explore Deeper Content",
                  desc: "Ready to use AI for more than just snippets? Revisit the \"Content Ideas with AI\" course for blog/article brainstorming."
                },
                {
                  id: 'next-4',
                  title: "Master Your Prompts",
                  desc: "Become even more effective with the \"AI Prompt Engineering Fundamentals\" course."
                }
              ].map((next) => (
                <div key={next.id} className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-emerald-700 mb-2">{next.title}</h4>
                  <p className="text-gray-600 text-sm">{next.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg font-medium text-emerald-700 mt-8 text-center">
            Keep using these AI quick wins to save time and boost your content creativity!
          </p>
        </div>
      </div>
    ),
    completed: false,
  }
];

export default function SocialMediaSnippets() {
  const [currentLesson, setCurrentLesson] = useState('lesson-1');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleNext = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson);
    if (currentIndex < lessons.length - 1) {
      setCompletedLessons([...completedLessons, currentLesson]);
      setCurrentLesson(lessons[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1].id);
    }
  };

  const handleLessonSelect = (lessonId: string | number) => {
    setCurrentLesson(lessonId.toString());
  };

  const currentLessonData = lessons.find(l => l.id === currentLesson);

  // Mock user data for CourseNavSidebar
  const mockUser = { name: 'Alex', avatar: '', tier: 'Dabbler' };
  const courseName = "Social Media Snippets & Headlines";


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 pt-8 flex flex-row">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${((lessons.findIndex(l => l.id === currentLesson) + 1) / lessons.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Course Navigation Sidebar */}
      <div className="w-64 bg-[#004851] text-white p-6 flex flex-col">
         <CourseNavSidebar
           user={mockUser}
           courseName={courseName}
           lessons={lessons.map(l => ({
             ...l,
             completed: completedLessons.includes(l.id),
           }))}
           currentLesson={currentLesson}
           onLessonSelect={handleLessonSelect}
         />
      </div>


      <div className="flex-1 max-w-4xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {currentLessonData?.content}

            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentLesson === lessons[0].id}
                className={`px-6 py-3 rounded-lg transition-all ${
                  currentLesson === lessons[0].id
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg'
                }`}
              >
                ← Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentLesson === lessons[lessons.length - 1].id}
                className={`px-6 py-3 rounded-lg transition-all ${
                  currentLesson === lessons[lessons.length - 1].id
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg'
                }`}
              >
                Next →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 