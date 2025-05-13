import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { StyledCheckList } from '@/components/learning-hub/StyledCheckList';
import { ProTip } from '@/components/learning-hub/ProTip';
import { PromptExampleCard } from '@/components/learning-hub/PromptExampleCard';
import { ExerciseSection } from '@/components/learning-hub/ExerciseSection';
import { CongratulationsMessage } from '@/components/learning-hub/CongratulationsMessage';

export type CourseData = {
  id: string;
  title: string;
  description: string;
  modules: {
    id: string;
    title: string;
    content: string;
  }[];
};

// Example Course Data - for demonstration/test purposes
export const exampleCourseData = {
  courseTitle: "Interactive AI Showcase",
  courseSubtitle: "Experience the full power of our learning elements!",
  courseTier: "Enabler" as const,
  courseIntroduction: (
    <p>This course demonstrates all the new interactive components in action...</p>
  ),
  lessons: [
    {
      id: 'lesson-reading-1',
      title: "Introduction to the Course",
      type: 'Reading' as const,
      duration: '5 min',
      icon: 'fas fa-book',
      completed: false,
      content: ({ lessonData }: { lessonData?: any }) => (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Course</h2>
          <p className="mb-4">This is an introduction to the course content...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      )
    },
    {
      id: 'lesson-reading-interactive',
      title: "Reading with Interactive Elements",
      type: 'Reading' as const,
      duration: '15 min',
      icon: 'fas fa-book-open',
      completed: false,
      content: ({ lessonData }: { lessonData?: any }) => (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Advanced Reading Comprehension</h2>
          <p>This lesson uses various styled elements for better understanding.</p>
          
          <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">Key Objectives (Styled List)</h3>
          <StyledCheckList items={[
            "Understand advanced topic A.",
            "Apply concept B to real-world scenarios."
          ]} />
          
          <ProTip title="Pro Tip!">
            <p>Always iterate on your AI prompts for optimal results.</p>
          </ProTip>
          
          <PromptExampleCard 
            title="Prompt Example: Summarization"
            promptText="Summarize the following text into three key bullet points, focusing on actionable insights for marketing managers: [Paste text here]"
          />
          
          <ExerciseSection
            title="Exercise: Summarization"
            description="Apply the summarization prompt to a new text"
          />
        </div>
      )
    },
    {
      id: 'lesson-quiz',
      title: "Knowledge Check Quiz",
      type: 'Quiz' as const,
      duration: '10 min',
      icon: 'fas fa-question-circle',
      completed: false,
      content: ({ lessonData }: { lessonData?: any }) => (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Test Your Knowledge</h2>
          <p className="mb-6">Let's see how much you've learned about effective AI prompt writing techniques.</p>
          
          <div className="my-8 bg-purple-50 rounded-xl border border-purple-200 overflow-hidden">
            <div className="bg-purple-100 p-5 border-b border-purple-200">
              <h3 className="text-xl font-semibold text-purple-900 flex items-center">
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-3 text-purple-700" />
                AI Prompting Quiz
              </h3>
              <p className="mt-2 text-purple-800">Select the best answer for each question.</p>
            </div>
            
            <div className="p-5 space-y-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-purple-100">
                <p className="font-medium text-gray-900 mb-4">1. Which of the following is a best practice for writing effective AI prompts?</p>
                
                <div className="space-y-2 mb-4">
                  <div className="p-3 rounded-md cursor-pointer transition-all border border-gray-300 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm bg-gray-200 text-gray-700">
                        A
                      </div>
                      <span>Keep prompts as vague as possible to allow for creativity</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-md cursor-pointer transition-all border-purple-500 bg-purple-50 text-purple-900">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm bg-purple-500 text-white">
                        B
                      </div>
                      <span>Be specific about your desired output format and content</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-md cursor-pointer transition-all border border-gray-300 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm bg-gray-200 text-gray-700">
                        C
                      </div>
                      <span>Always write prompts in all caps for emphasis</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-md cursor-pointer transition-all border border-gray-300 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm bg-gray-200 text-gray-700">
                        D
                      </div>
                      <span>Limit prompts to 10 words maximum</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-5 bg-purple-100 border-t border-purple-200 flex justify-center items-center">
              <button
                className="w-full px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Submit Answers
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'lesson-completion',
      title: "Course Completion",
      type: 'Reading' as const,
      duration: '5 min',
      icon: 'fas fa-book',
      completed: false,
      content: ({ lessonData }: { lessonData?: any }) => (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Course Completion</h2>
          <p className="mb-6">You've successfully completed all the lessons in this course. Here's a quick summary of what you've learned:</p>
          
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>How to create effective AI prompts for different purposes</li>
            <li>Using interactive learning elements that enhance the learning experience</li>
            <li>Best practices for AI-assisted content creation</li>
          </ul>
          
          <CongratulationsMessage 
            message="Congratulations on completing the course!" 
            subtext="You're now equipped with the knowledge to leverage AI effectively in your workflow."
          />
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">Next Steps</h3>
            <p className="mb-4">To continue your learning journey, consider exploring these related courses:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Advanced AI Prompt Engineering</li>
              <li>AI for Content Creation</li>
              <li>Building Custom AI Workflows</li>
            </ul>
          </div>
        </div>
      )
    }
  ]
};
