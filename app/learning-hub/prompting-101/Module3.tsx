'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';

export default function Module3() {
  const [promptDraft, setPromptDraft] = useState('');
  
  return (
    <div className="animate-fadeIn">
      <h2>Module 3: Your Prompting Power Tools (The 5 Golden Keys to Unlock AI Excellence)</h2>
      
      <p>To consistently craft prompts that unlock "Diamond Standard" AI responses, internalize and apply these five "Golden Keys." These are the fundamental principles that will elevate your prompting from basic requests to strategic directives.</p>
      
      <Accordion 
        items={[
          {
            id: "clarity",
            title: "1. Clarity (Crystal-Clear Instructions)",
            content: (
              <div>
                <h4 className="font-semibold mb-2">Principle:</h4>
                <p className="mb-3">Your instructions must be unambiguous, precise, and easy for the AI to interpret. Use straightforward language. If you employ specialized terminology or acronyms, ensure they are either widely understood within the AI's training data or explicitly define them if they are unique to your specific domain or company.</p>
                
                <h4 className="font-semibold mb-2">Example:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-red-300">
                    <CardContent className="p-4">
                      <p className="text-red-600 font-medium mb-1">Instead of (Unclear):</p>
                      <p className="font-mono p-2 bg-gray-100 rounded">"Spice this up."</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-300">
                    <CardContent className="p-4">
                      <p className="text-green-600 font-medium mb-1">Try (Clear):</p>
                      <p className="font-mono p-2 bg-gray-100 rounded">"Rewrite the following marketing copy to be more engaging for a millennial audience. Use a more conversational tone, incorporate a relevant pop culture reference if appropriate, and end with a compelling call to action."</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          },
          {
            id: "context",
            title: "2. Context (The Full Story for a Fuller Response)",
            content: (
              <div>
                <h4 className="font-semibold mb-2">Principle:</h4>
                <p className="mb-3">Provide sufficient background information. The more the AI understands the surrounding circumstances, your underlying objectives, and the intended audience's perspective, the more effectively it can tailor its response to be relevant and impactful.</p>
                
                <h4 className="font-semibold mb-2">Example:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-red-300">
                    <CardContent className="p-4">
                      <p className="text-red-600 font-medium mb-1">Instead of (Lacking Context):</p>
                      <p className="font-mono p-2 bg-gray-100 rounded">"Draft a sales pitch."</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-300">
                    <CardContent className="p-4">
                      <p className="text-green-600 font-medium mb-1">Try (Rich Context):</p>
                      <p className="font-mono p-2 bg-gray-100 rounded">"Draft a 3-paragraph sales pitch for our new SaaS product, 'ConnectSphere,' which helps remote teams improve project collaboration. The target is a small business owner (10-50 employees) who is currently struggling with scattered communication and missed deadlines. Highlight ease of use and a free trial offer. The goal is to get them to sign up for the trial."</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          },
          {
            id: "constraints",
            title: "3. Constraints (Defining the Playing Field)",
            content: (
              <div>
                <h4 className="font-semibold mb-2">Principle:</h4>
                <p className="mb-3">Guide the AI by setting clear boundaries. Specify what the AI <em>should</em> do, and equally important, what it <em>shouldn't</em> do. Define limitations such as length, style, specific points to include or omit, or even perspectives to avoid.</p>
                
                <h4 className="font-semibold mb-2">Example:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-red-300">
                    <CardContent className="p-4">
                      <p className="text-red-600 font-medium mb-1">Instead of (Too Open):</p>
                      <p className="font-mono p-2 bg-gray-100 rounded">"Tell me about AI in healthcare."</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-300">
                    <CardContent className="p-4">
                      <p className="text-green-600 font-medium mb-1">Try (With Constraints):</p>
                      <p className="font-mono p-2 bg-gray-100 rounded">"Provide a summary of 3 key applications of AI in patient diagnostics in healthcare, suitable for a non-technical hospital administrator. Keep the total length under 250 words. Do not discuss AI in surgical robotics for this summary. Output as a bulleted list."</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          },
          {
            id: "completeness",
            title: "4. Completeness (All Necessary Ingredients in One Go)",
            content: (
              <div>
                <h4 className="font-semibold mb-2">Principle:</h4>
                <p className="mb-3">Ensure your prompt contains all the vital information the AI needs to complete the task successfully in a single, coherent pass. Avoid making the AI refer back to scattered details from earlier in a long conversation, as its contextual memory can be limited. Consolidate all critical parameters into the current prompt.</p>
                
                <h4 className="font-semibold mb-2">Example:</h4>
                <p>When asking for a series of social media posts, include the platform, target audience, key message, desired tone, number of posts, and any specific calls to action all within the same prompt, rather than feeding these details piece by piece.</p>
              </div>
            )
          },
          {
            id: "persona",
            title: "5. Persona (Assigning a Role - The \"Expert Actor\" Key)",
            content: (
              <div>
                <h4 className="font-semibold mb-2">Principle:</h4>
                <p className="mb-3">This is a highly effective technique. Instruct the AI on <em>what role or persona it should adopt</em> when generating the response. This dramatically shapes its tone, style, vocabulary, depth of explanation, and the type of information it chooses to emphasize.</p>
                
                <h4 className="font-semibold mb-2">Examples:</h4>
                <ul className="list-disc pl-6 space-y-3">
                  <li>"Act as a seasoned financial advisor with 20 years of experience. Explain the primary risks and benefits of investing in emerging market stocks for a moderately risk-averse investor in their early 40s."</li>
                  <li>"You are a highly enthusiastic and slightly quirky museum tour guide. Describe the Mona Lisa to a group of curious teenagers, focusing on little-known facts and intriguing details."</li>
                  <li>"Explain the concept of 'dark matter' as if you were a patient, encouraging science teacher explaining it to a bright but easily distracted middle school student. Use simple analogies and avoid complex mathematical formulas."</li>
                </ul>
              </div>
            )
          }
        ]}
      />
      
      <div className="my-8 p-6 bg-sg-dark-teal/5 border border-sg-dark-teal/20 rounded-lg">
        <h3 className="text-xl mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <path d="M20.4 14.5 16 10 4 20"></path>
          </svg>
          Action Step: Golden Key Application Drill
        </h3>
        
        <p className="mb-4">Select a routine marketing task you might delegate to an AI (e.g., drafting a product description, brainstorming blog titles, explaining a new marketing trend). Construct a detailed prompt for this task, making a conscious effort to apply all five Golden Keys: Clarity, Context, Constraints, Completeness, and Persona.</p>
        
        <div className="mb-4">
          <textarea 
            className="w-full p-3 border border-sg-dark-teal/30 rounded-md focus:outline-none focus:ring-2 focus:ring-sg-bright-green"
            rows={8}
            placeholder="Enter your detailed prompt using the Golden Keys..."
            value={promptDraft}
            onChange={(e) => setPromptDraft(e.target.value)}
          ></textarea>
        </div>
        
        {promptDraft && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
            <p className="text-green-700">
              <span className="font-bold">Great start!</span> As you craft your prompt, remember to incorporate all 5 Golden Keys to get the best results from AI tools.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 