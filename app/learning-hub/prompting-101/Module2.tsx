'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Module2() {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [improvedPrompt, setImprovedPrompt] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="animate-fadeIn">
      <h2>Module 2: The #1 Pitfall for AI Newcomers (And Its Instant Solution) - Escaping the Vagueness Trap</h2>
      
      <p>The most common challenge for those new to AI (and sometimes even for those with more experience) is providing instructions that are <strong>too vague or ambiguous.</strong></p>
      
      <p>In our busy schedules, it's tempting to type a few keywords and expect the AI to intuitively understand our complex needs.</p>
      <ul className="list-disc pl-8 mb-4">
        <li>"Ideas for marketing campaign." (For what product/service? Target audience? Budget? Desired outcome?)</li>
        <li>"Explain AI." (To a technical expert or a complete novice? In brief or in detail?)</li>
        <li>"Draft a follow-up." (To whom? Regarding what previous interaction? What is the goal of this follow-up?)</li>
      </ul>
      
      <p>This approach is akin to asking a team member to "work on the project" without providing any specific brief, goals, or context. You'll receive <em>an</em> output, but it's unlikely to be the precise, high-quality result you need, forcing multiple rounds of clarification and rework. The AI, when faced with vagueness, will default to its broadest, most general knowledge, which often feels bland or unhelpful.</p>
      
      <div className="my-8">
        <div className="p-5 bg-sg-light-mint rounded-lg">
          <h3 className="text-xl text-sg-dark-teal mb-3">The Instant Solution: Embrace "Strategic Specificity." Provide Rich Detail.</h3>
          
          <p className="mb-4">Before submitting your prompt, take a moment to consider the following crucial elements. The more of these you can define for the AI, the better your results will be:</p>
        </div>
      </div>
      
      <div className="my-6">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>TASK (The Core Action)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>What <em>precise action</em> do you want the AI to perform?</p>
            <p className="text-sm text-sg-dark-teal/70 mt-2">e.g., <em>Write</em>, <em>Summarize</em>, <em>Brainstorm a list of</em>, <em>Compare and contrast</em>, <em>Translate</em>, <em>Explain in simple terms</em>, <em>Rephrase this for a different audience</em>, <em>Critique this text based on X criteria</em>, <em>Generate Python code for...</em></p>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>TOPIC (The Subject Matter)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Clearly define the <em>subject</em> of the task.</p>
            <p className="text-sm text-sg-dark-teal/70 mt-2">e.g., the benefits of email marketing for e-commerce, features of our new software update, common customer objections to X</p>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>AUDIENCE (The Recipient)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Who is the intended recipient or reader of this AI-generated content? Their background, expertise, and perspective are critical.</p>
            <p className="text-sm text-sg-dark-teal/70 mt-2">e.g., my CEO who needs a high-level summary, potential customers unfamiliar with our product, technical peers, a 5th-grade student, yourself for personal understanding</p>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>TONE (The Desired Voice & Style)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>What emotional quality or style should the language convey?</p>
            <p className="text-sm text-sg-dark-teal/70 mt-2">e.g., formal and authoritative, informal and friendly, witty and engaging, empathetic and understanding, urgent and persuasive, professional and objective, academic and detailed, enthusiastic and motivational</p>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>FORMAT (The Output Structure)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>How do you want the AI to structure and present the information?</p>
            <p className="text-sm text-sg-dark-teal/70 mt-2">e.g., a concise paragraph, a bulleted list, a numbered list of steps, a professional email format, a table with specific columns, a JSON object, a short story, a dialogue script</p>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>GOAL (The Ultimate Purpose)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>What is the overarching objective of this AI-generated content? What should the reader think, feel, or do after engaging with it?</p>
            <p className="text-sm text-sg-dark-teal/70 mt-2">e.g., to clearly understand a complex topic, to feel inspired to take action, to click a specific link, to make a purchase decision, to approve a strategic proposal</p>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>CONSTRAINTS & ESSENTIAL CONTEXT (The Guardrails & Background Info)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Length/Brevity:</strong>
                <p className="text-sm text-sg-dark-teal/70">e.g., "in under 200 words," "no more than 5 key bullet points," "a brief 3-paragraph summary"</p>
              </li>
              <li>
                <strong>Key Elements to Include or Exclude:</strong>
                <p className="text-sm text-sg-dark-teal/70">e.g., "be sure to mention our upcoming webinar on this topic," "avoid using overly technical jargon," "focus only on the advantages for non-profit organizations," "include at least three real-world examples"</p>
              </li>
              <li>
                <strong>Relevant Background Information:</strong>
                <p className="text-sm text-sg-dark-teal/70">e.g., "This is for a follow-up to a client who expressed concerns about X," "Our company's unique selling proposition is Y, and this should be subtly woven in," "The previous marketing campaign for this product underperformed because..."</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="my-8 p-6 bg-sg-dark-teal/5 border border-sg-dark-teal/20 rounded-lg">
        <h3 className="text-xl mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <path d="M20.4 14.5 16 10 4 20"></path>
          </svg>
          Action Step: The "From Vague to Valuable" Prompt Makeover
        </h3>
        
        <ol className="list-decimal pl-8 space-y-4 mb-6">
          <li>Recall a recent instance where an AI tool gave you a lackluster or "meh" result.</li>
          <li>
            <div>
              <p className="mb-2">Write down your original, likely brief, prompt:</p>
              <textarea 
                className="w-full p-3 border border-sg-dark-teal/30 rounded-md focus:outline-none focus:ring-2 focus:ring-sg-bright-green"
                rows={2}
                placeholder="Enter your original prompt here..."
                value={originalPrompt}
                onChange={(e) => setOriginalPrompt(e.target.value)}
              ></textarea>
            </div>
          </li>
          <li>
            <div>
              <p className="mb-2">Now, meticulously rewrite that prompt, consciously incorporating answers to as many points from the "Strategic Specificity" checklist above as are relevant:</p>
              <textarea 
                className="w-full p-3 border border-sg-dark-teal/30 rounded-md focus:outline-none focus:ring-2 focus:ring-sg-bright-green"
                rows={6}
                placeholder="Enter your improved prompt here..."
                value={improvedPrompt}
                onChange={(e) => setImprovedPrompt(e.target.value)}
              ></textarea>
            </div>
          </li>
          <li>Submit both your original prompt and your new, detailed prompt to your AI tool.</li>
          <li>Critically compare the two outputs. You should observe a significant improvement in the relevance, detail, and overall quality of the response from your more specific prompt.</li>
        </ol>
        
        <div className="text-center mt-4">
          <button 
            onClick={() => setShowComparison(true)}
            className="bg-sg-bright-green hover:bg-sg-bright-green/90 text-white font-semibold py-2 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!originalPrompt || !improvedPrompt}
          >
            Compare with Gemi's Suggestion
          </button>
        </div>
        
        {showComparison && (
          <div className="mt-6 p-4 bg-white border border-sg-bright-green/30 rounded-lg animate-fadeIn">
            <h4 className="font-semibold text-sg-dark-teal mb-3">Gemi's Example Comparison:</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-red-600 mb-1">Original Vague Prompt:</p>
                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                  "Write social media post about our new product."
                </div>
              </div>
              
              <div>
                <p className="font-semibold text-green-600 mb-1">Improved Specific Prompt:</p>
                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                  "Write an engaging Instagram caption for our new eco-friendly water bottle launch. The target audience is health-conscious millennials who care about sustainability. The caption should be around 150 characters, include emojis, highlight that the bottle is made from recycled ocean plastic, and end with a call-to-action to 'Shop now with the link in bio.' Use an upbeat, environmentally conscious tone that feels authentic rather than preachy."
                </div>
              </div>
            </div>
            
            <p className="mt-4 text-sm text-sg-dark-teal/70">Notice how the improved prompt includes Task (write Instagram caption), Topic (new eco-friendly water bottle), Audience (health-conscious millennials), Format (150 chars with emojis), Key Details to include (recycled ocean plastic), Call to Action, and Tone guidance.</p>
          </div>
        )}
      </div>
    </div>
  );
} 