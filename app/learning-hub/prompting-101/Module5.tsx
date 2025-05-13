'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Module5() {
  const [showExamples, setShowExamples] = useState(false);
  
  const iterationExamples = [
    {
      category: "Refining Tone & Style",
      original: "The program will begin on June 15th and registrations must be completed by June 10th.",
      iterations: [
        "The program kicks off on June 15th! Make sure to secure your spot by registering no later than June 10th.",
        "URGENT: Our exclusive program launches June 15th. Registration CLOSES June 10th — don't miss this limited opportunity!",
        "We're delighted to announce our program commences on June 15th. To ensure your participation, kindly complete your registration by June 10th."
      ]
    },
    {
      category: "Adjusting Detail & Depth",
      original: "Our new feature helps you save time.",
      iterations: [
        "Our new AI-powered Smart Scheduler feature helps you save up to 5 hours per week by automatically detecting meeting patterns, suggesting optimal time slots based on your productivity rhythms, and handling all the back-and-forth scheduling emails with contacts.",
        "Our new feature helps you save time by automating repetitive tasks, streamlining workflows, and eliminating unnecessary steps.",
        "Think of our new feature as your personal time wizard. Just like a skilled assistant who knows exactly how you work, it handles the tedious parts of your day so you can focus on what truly matters."
      ]
    }
  ];

  return (
    <div className="animate-fadeIn">
      <h2>Module 5: Level Up - Iteration is Your Secret Weapon (From "Good" to "Truly Diamond")</h2>
      
      <p>Even with the most meticulously crafted prompts using all the Golden Keys and our "Diamond Standard" recipes, the AI's initial response might be 85-95% perfect, but not quite hit that 100% mark you're aiming for. It might be good, even very good, but is it <em>your</em> voice? Is it <em>exactly</em> what you envisioned?</p>
      
      <p>This is where the real artistry of AI collaboration comes in. What separates AI Dabblers from AI Directors is the mastery of <strong>iteration and refinement.</strong> Don't settle for "good enough."</p>
      
      <div className="bg-sg-light-mint p-6 rounded-lg my-6 border-l-4 border-sg-bright-green">
        <p className="text-lg font-semibold">Think of the AI as an exceptionally talented but very junior team member. Its first draft is often a strong starting point, but it needs your expert guidance to polish it into a masterpiece.</p>
      </div>
      
      <h3 className="text-xl mb-4">Effective Iteration Techniques & Examples:</h3>
      
      <div className="space-y-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Refining Tone & Style</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>"This is a solid informational draft. Now, rewrite it with a more persuasive and urgent tone, as if we're trying to motivate immediate action."</li>
              <li>"Make the language more accessible. Assume the reader is a complete beginner to this topic. Remove any industry jargon or explain it very simply."</li>
              <li>"Inject more personality. Let's make this sound more [Brand Adjective - e.g., 'playful,' 'authoritative,' 'empathetic']."</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Adjusting Detail & Depth</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>"Expand significantly on the second key point. Provide at least two concrete examples and a brief case study if possible."</li>
              <li>"Condense this section by about 30% while retaining all critical information. Focus on brevity and impact."</li>
              <li>"Can you simplify the explanation of [Complex Concept X]? Use a clear analogy that a non-expert would understand."</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Requesting Alternatives & Variations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>"Generate three alternative opening hooks for this blog post, each with a different angle (e.g., one statistical, one question-based, one story-based)."</li>
              <li>"Provide two more versions of that call to action: one emphasizing scarcity, and another highlighting a unique benefit."</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Targeting Specific Elements for Change</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>"In the third paragraph, replace the phrase '[Overused Phrase]' with three more dynamic alternatives."</li>
              <li>"Add a concluding sentence that powerfully reiterates the main takeaway message."</li>
              <li>"Remove all mentions of [Outdated Feature/Product] and ensure the focus is solely on [New Feature/Product]."</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Shifting Perspective or Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>"That's a good explanation from a technical perspective. Now, rewrite it focusing entirely on the end-user benefits."</li>
              <li>"Let's restructure this. Can you present these arguments as a 'Problem/Agitate/Solve' sequence?"</li>
              <li>"Consider an alternative viewpoint. What would be the main counter-arguments to this proposal, and how could we proactively address them?"</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl mb-4">The Iterative Conversation:</h3>
        <p>View your interaction with the AI as a dynamic conversation, not a one-shot command.</p>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden my-4">
          <div className="bg-sg-dark-teal/5 p-4 border-b border-gray-200">
            <p className="font-semibold">You:</p>
            <p className="text-gray-700">Initial Prompt (Detailed Directive)</p>
          </div>
          <div className="bg-white p-4 border-b border-gray-200">
            <p className="font-semibold text-sg-bright-green">AI:</p>
            <p className="text-gray-700">Version 1 Output</p>
          </div>
          <div className="bg-sg-dark-teal/5 p-4 border-b border-gray-200">
            <p className="font-semibold">You:</p>
            <p className="text-gray-700">Feedback & Refinement Prompt 1 (e.g., "Great start. Now, make the tone more X, and expand on Y...")</p>
          </div>
          <div className="bg-white p-4 border-b border-gray-200">
            <p className="font-semibold text-sg-bright-green">AI:</p>
            <p className="text-gray-700">Version 2 Output</p>
          </div>
          <div className="bg-sg-dark-teal/5 p-4 border-b border-gray-200">
            <p className="font-semibold">You:</p>
            <p className="text-gray-700">Feedback & Refinement Prompt 2 (e.g., "Better. Let's rephrase Z and add an example for A...")</p>
          </div>
          <div className="bg-white p-4">
            <p className="font-semibold text-sg-bright-green">AI:</p>
            <p className="text-gray-700">Version 3 Output</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 italic text-center">...and so on, until you reach that "Diamond Standard."</p>
      </div>
      
      <div className="text-center my-8">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="bg-sg-bright-green hover:bg-sg-bright-green/90 text-white font-semibold py-2 px-6 rounded-full transition-colors"
        >
          {showExamples ? 'Hide Examples' : 'See Iteration Examples'}
        </button>
      </div>
      
      {showExamples && (
        <div className="animate-fadeIn space-y-6 mb-8">
          <h3 className="text-xl text-center mb-4">Before & After: The Power of Iteration</h3>
          
          {iterationExamples.map((example, idx) => (
            <Card key={idx} className="overflow-hidden">
              <CardHeader className="bg-sg-light-mint/50">
                <CardTitle>{example.category}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-medium mb-2">Original Content:</h4>
                  <p className="bg-gray-50 p-3 rounded border border-gray-200">{example.original}</p>
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-2">After Iteration Prompts:</h4>
                  <div className="space-y-3">
                    {example.iterations.map((iteration, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded border border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Version {i+1}:</p>
                        <p>{iteration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <div className="my-8 p-6 bg-sg-bright-green/10 border-l-4 border-sg-bright-green rounded-r-lg">
        <h3 className="text-lg font-bold text-sg-dark-teal mb-2">Key Takeaway:</h3>
        <p className="text-sg-dark-teal/90">The initial output from your AI is a canvas, not the finished painting. Your iterative feedback and precise refinement prompts are the brushstrokes that transform a good start into a truly exceptional result. Embrace the process, and don't be afraid to push the AI through several rounds of improvement.</p>
      </div>
      
      <div className="mt-10 bg-sg-dark-teal/5 rounded-lg p-6">
        <h2 className="text-2xl mb-4">Conclusion: You're the Boss Now - Go Forth and Command AI Excellence!</h2>
        
        <p>Congratulations! You've journeyed through the essentials of "Prompting 101" and are now equipped with the mindset and tools to move from getting "meh" AI responses to commanding "magic."</p>
        
        <h3 className="text-xl mt-6 mb-4">Recap of Your New "Diamond Standard" Prompting Abilities:</h3>
        
        <ul className="list-disc pl-8 space-y-2 mb-6">
          <li><strong>Specificity is Your Superpower:</strong> You understand that vague prompts yield vague results. Detail is your pathway to precision.</li>
          <li><strong>The 5 Golden Keys are Mastered:</strong> Clarity, Context, Constraints, Completeness, and Persona are now integral to your prompting toolkit.</li>
          <li><strong>Prompt Recipes are Your Accelerators:</strong> You have structured starting points for common marketing tasks, ready to be customized.</li>
          <li><strong>Iteration is Your Path to Perfection:</strong> You know that the first AI output is rarely the final one. You're ready to refine, guide, and demand excellence through iterative feedback.</li>
        </ul>
        
        <p>You are no longer simply <em>using</em> AI; you are <em>directing</em> it. You have the foundational knowledge to make AI a powerful extension of your own marketing capabilities, a tool to save you time, amplify your creativity, and elevate the quality of your work.</p>
        
        <p className="mb-6">The world of AI is constantly evolving, but these fundamental principles of clear, specific, and iterative communication will always be your bedrock for success.</p>
        
        <div className="bg-sg-bright-green/10 p-4 rounded-lg border border-sg-bright-green/30 mb-6">
          <h4 className="font-semibold mb-2">Your Next Mission:</h4>
          <p>Practice. Experiment. Apply these techniques daily. The more you engage with AI in this "boss-level" way, the more intuitive it will become, and the more incredible results you will achieve.</p>
        </div>
        
        <p className="text-center text-xl font-semibold text-sg-bright-green">Go forth and command AI excellence. You've got this.</p>
      </div>
    </div>
  );
} 