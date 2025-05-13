'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CourseNavSidebar from '@/components/learning-hub/CourseNavSidebar';

const lessons = [
  {
    id: 'lesson-1',
    title: 'What is ChatGPT and Why Use It?',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">Welcome to Your AI Playground!</h2>
        <p className="text-gray-700 leading-relaxed">
          You've identified some potential "first wins" where AI can help – fantastic! Now, let's get you comfortable actually using one of the most popular and accessible AI tools out there: ChatGPT (specifically, the free version).
        </p>
        <p className="text-gray-700 leading-relaxed">
          Think of this course as your friendly, guided tour. We'll walk through getting started, understanding the basic interface, trying out your very first prompts, and learning a crucial safety tip. No complex features, just the essentials to get you started confidently.
        </p>
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">By the end of this course, you will be able to:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Understand the basic purpose of ChatGPT.</li>
            <li>Navigate the core ChatGPT interface (input box, output area).</li>
            <li>Write and submit your first simple prompts.</li>
            <li>Understand how conversations work within the tool.</li>
            <li>Know a key safety principle for using public AI tools.</li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed font-semibold">Ready to start chatting with AI? Let's go!</p>
        
        <hr className="my-8 border-gray-300" />

        <h3 className="text-2xl font-bold text-emerald-700">Lesson 1: What is ChatGPT and Why Use It?</h3>
        <p className="text-gray-500 italic">(Approx. 10 minutes)</p>
        <p className="text-gray-700 leading-relaxed">
          So, what exactly is ChatGPT?
        </p>
        <p className="text-gray-700 leading-relaxed">
          Imagine a highly knowledgeable assistant you can chat with online. You type a question or instruction (that's your prompt), and it types back an answer or completes the task based on the vast amount of text data it was trained on.
        </p>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">What can the free version of ChatGPT help Dabblers with?</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Answering Questions: Getting quick explanations on many topics.</li>
            <li>Brainstorming Ideas: Generating lists for content, marketing angles, meeting topics, etc. (Like we saw in the "First Wins" course!).</li>
            <li>Drafting Simple Text: Creating first drafts of emails, social media posts, or basic descriptions.</li>
            <li>Summarizing: Condensing short pieces of text.</li>
            <li>Proofreading: Catching basic grammar and spelling errors.</li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          <span className="font-semibold">Important Note:</span> ChatGPT is a language model. It's great with words, but it doesn't "know" things in the human sense, browse the live internet (in the free version), or perform complex calculations perfectly. It generates text based on patterns it learned.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Think of it as a versatile starting point for many text-based tasks.
        </p>
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600 text-lg">💡</span>
            </div>
            <h4 className="text-lg font-semibold text-amber-700">SocialGarden Insight</h4>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Many businesses start their AI journey using accessible tools like ChatGPT for initial brainstorming and drafting. It's a fantastic way to quickly explore AI's capabilities for content and communication tasks without needing specialized software.
          </p>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-2',
    title: 'Accessing ChatGPT & Your First Look',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">Lesson 2: Accessing ChatGPT & Your First Look</h2>
        <p className="text-gray-500 italic">(Approx. 10 minutes)</p>
        <p className="text-gray-700 leading-relaxed">
          Getting started is easy.
        </p>
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">Steps:</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Go to the Website:</span> Open your web browser and navigate to the official OpenAI ChatGPT website. You can easily search for "ChatGPT OpenAI" to find it. (Note: Ensure you're on the official site, usually chat.openai.com).
            </li>
            <li>
              <span className="font-semibold">Sign Up/Log In:</span> You'll likely need to create a free account using an email address or logging in via Google/Microsoft/Apple. Follow the on-screen instructions.
            </li>
            <li>
              <span className="font-semibold">The Main Interface:</span> Once logged in, you'll see a relatively simple screen:
              <ul className="list-disc list-inside ml-6 mt-1 text-gray-600 space-y-1">
                <li><span className="font-semibold">Input Box:</span> Usually at the bottom – this is where you type your prompt!</li>
                <li><span className="font-semibold">Output Area:</span> The main part of the screen where ChatGPT's responses will appear.</li>
                <li><span className="font-semibold">Chat History (Often on the Left):</span> ChatGPT usually saves your conversations, allowing you to revisit them later.</li>
              </ul>
            </li>
          </ol>
        </div>
        <p className="text-gray-700 leading-relaxed">
          <span className="font-semibold">Take a moment:</span> Just look around the screen. Notice the input box. That's your main interaction point. It might seem simple, but that box is your gateway to interacting with the AI.
        </p>
        <div className="bg-white p-4 rounded-xl border border-gray-200 my-4 flex justify-center items-center flex-col">
          {/* Replace with an actual image or a more descriptive placeholder if Image component isn't set up for external URLs easily */}
          <div className="w-full max-w-md h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-2">
            <p className="text-gray-500 text-center">[Conceptual Visual: Simple, annotated screenshot of the basic ChatGPT interface, highlighting Input Box, Output Area, and Chat History panel]</p>
          </div>
          {/* <Image src="/path-to-chatgpt-interface-image.png" alt="ChatGPT Interface" width={600} height={400} className="rounded-lg shadow-md" /> */}
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-3',
    title: 'Your First Conversation: Saying Hello to AI',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">Lesson 3: Your First Conversation: Saying Hello to AI</h2>
        <p className="text-gray-500 italic">(Approx. 15 minutes)</p>
        <p className="text-gray-700 leading-relaxed">
          Time for the fun part – writing your first prompts! Let's start super simple.
        </p>
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">Your First Prompt:</h3>
          <p className="text-gray-700 leading-relaxed">
            Go to the input box at the bottom of the ChatGPT screen and type something simple, like:
          </p>
          <code className="block bg-gray-100 p-3 my-2 rounded-md text-sm text-gray-800">
            Hello! Can you tell me a fun fact about penguins?
          </code>
          <p className="text-gray-700 leading-relaxed">
            Then, press Enter or click the send button (often looks like a paper airplane).
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Watch the Response:</h3>
          <p className="text-gray-700 leading-relaxed">
            You'll see ChatGPT start "typing" back a response. Read what it says! Did it give you a fun fact?
          </p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">Follow-Up Prompt:</h3>
          <p className="text-gray-700 leading-relaxed">
            Now, try asking a follow-up question in the same chat. You don't need to repeat the context. For example, you could type:
          </p>
          <code className="block bg-gray-100 p-3 my-2 rounded-md text-sm text-gray-800">
            Where do most penguins live?
          </code>
          <p className="text-gray-700 leading-relaxed">
            Press Enter again. Notice how ChatGPT understands you're still talking about penguins from the previous turn. This is a key feature – conversations have context!
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Experiment! Try these simple prompts:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
            <li>Explain what a 'lead magnet' is in simple terms.</li>
            <li>Give me 3 ideas for a team-building activity.</li>
            <li>Write a short, friendly email reminding a colleague about a meeting tomorrow.</li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed font-semibold">
          Key Learning: Don't overthink your first prompts. Just ask questions or give simple instructions naturally, like you're talking to a helpful assistant.
        </p>
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <h3 className="text-xl font-semibold text-amber-700 mb-3">Stuck for Prompt Ideas Relevant to Your Business?</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            Sometimes the hardest part is figuring out what to ask the AI that will actually help your specific goals. The SocialGarden Learning Hub has a growing Prompt Library with examples tailored for marketing, sales, and business productivity that you can adapt!
          </p>
          <Link href="/learning-hub?section=Prompt%20Library" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors">
            Explore the Prompt Library
          </Link>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-4',
    title: 'Important Safety Tip: What NOT to Share',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-red-700">Lesson 4: Important Safety Tip: What NOT to Share</h2>
        <p className="text-gray-500 italic">(Approx. 10 minutes)</p>
        <p className="text-gray-700 leading-relaxed font-semibold">
          This is crucial, especially when using free, public AI tools like ChatGPT.
        </p>
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
          <h3 className="text-xl font-semibold text-red-700 mb-3">Treat Public AI Tools Like a Public Forum:</h3>
          <p className="text-gray-700 leading-relaxed">
            The conversations you have with free versions of tools like ChatGPT might be used by the AI company to improve their models. This means you should NEVER input sensitive or confidential information.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">What NOT to Share:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><span className="font-semibold">Personal Data:</span> Your own or anyone else's private phone numbers, addresses, social security numbers, passwords, financial details, health information, etc.</li>
            <li><span className="font-semibold">Confidential Business Information:</span> Secret company strategies, unreleased product details, sensitive client data, internal financial figures, private employee information.</li>
            <li><span className="font-semibold">Proprietary Information:</span> Trade secrets, unique algorithms, or any internal data you wouldn't share publicly.</li>
          </ul>
        </div>
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
          <h3 className="text-xl font-semibold text-red-700 mb-3">Why is this important?</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><span className="font-semibold">Privacy:</span> Protects you, your clients, and your employees.</li>
            <li><span className="font-semibold">Security:</span> Avoids accidentally leaking sensitive data.</li>
            <li><span className="font-semibold">Compliance:</span> Helps adhere to data protection regulations (like GDPR).</li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed font-semibold bg-yellow-100 p-3 rounded-md border border-yellow-300">
          Rule of Thumb: If you wouldn't comfortably post the information on a public website or forum, don't put it into a free public AI tool.
        </p>
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600 text-lg">🛡️</span>
            </div>
            <h4 className="text-lg font-semibold text-amber-700">SocialGarden Security Note</h4>
          </div>
          <p className="text-gray-700 leading-relaxed">
            While AI tools offer amazing potential, data security and privacy must always be a priority. For handling sensitive business data with AI, specialized enterprise solutions or private AI deployments are often required. SocialGarden can advise on secure AI implementation strategies.
          </p>
           <Link href="/contact?subject=Secure%20AI%20Solutions" className="mt-3 inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors">
            Learn about SocialGarden's Secure AI Solutions
          </Link>
        </div>
      </div>
    ),
    completed: false,
  },
  {
    id: 'lesson-5',
    title: 'Congratulations & Next Steps',
    content: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-emerald-800">Congratulations! You've Taken Your First Steps with AI!</h2>
        <p className="text-gray-700 leading-relaxed">
          You've now successfully navigated a popular AI tool, written your first prompts, and learned a vital safety principle. You're officially interacting with AI!
        </p>
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-700 mb-3">Key Takeaways from This Course:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>ChatGPT is a versatile tool for text-based tasks like brainstorming, drafting, and summarizing.</li>
            <li>The interface is simple: type in the input box, read the output area.</li>
            <li>Conversations have context – you can ask follow-up questions naturally.</li>
            <li>Crucially: Never share sensitive personal or confidential business data with free, public AI tools.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">What's Next?</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Keep Practicing:</span> The best way to get better is to use the tool! Try prompts related to the "First Wins" you identified.
            </li>
            <li>
              <span className="font-semibold">Refine Your Prompts:</span> Ready to make your instructions even better? 
              <Link href="/learning-hub/course_prompt_engineering_detail_page.html" className="text-emerald-600 hover:text-emerald-700 underline font-medium ml-1">
                 Check out our "AI Prompt Engineering Fundamentals" course.
              </Link>
            </li>
            <li>
              <span className="font-semibold">Explore Other Tools:</span> Curious about AI for images or other tasks? 
              <Link href="/learning-hub?section=Recommended%20Tools" className="text-emerald-600 hover:text-emerald-700 underline font-medium ml-1">
                Browse the Recommended Tools section in the Learning Hub.
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed font-semibold text-center text-lg">
          You're building valuable skills. Keep experimenting, stay curious, and have fun exploring the world of AI!
        </p>
      </div>
    ),
    completed: false,
  }
];

export default function MyFirstAIToolPage() {
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
  const courseName = "My First AI Tool: ChatGPT Basics";


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