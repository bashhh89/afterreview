'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function Module1() {
  return (
    <div className="animate-fadeIn">
      <h2>Module 1: The Absolute Basics - What is a Prompt (And Why is it Your Most Powerful Tool)?</h2>
      
      <p>Think of any AI language model as an incredibly skilled, lightning-fast, but exceptionally <em>literal</em> assistant. It has access to a vast universe of information and can perform an impressive range of tasks, but it operates solely on the instructions you provide. It cannot infer your intentions or read your mind.</p>
      
      <p><strong>A prompt is simply your instruction to the AI.</strong> It's the text you input to initiate a task or conversation. It's your way of telling the AI:</p>
      <ul className="list-disc pl-8 mb-6">
        <li>What you want it to <strong>DO</strong>.</li>
        <li>What <strong>CONTEXT</strong> it needs to consider.</li>
        <li>What kind of <strong>OUTPUT</strong> you expect.</li>
      </ul>
      
      <div className="my-8">
        <h3 className="text-xl mb-4">Let's look at the difference:</h3>
        
        <Card className="mb-4 border-red-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              Basic Prompt (Leads to "Meh")
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono p-2 bg-gray-100 rounded">"Write about social media marketing."</p>
            <p className="mt-2 text-red-600"><strong>Problem:</strong> Too broad. What aspect of social media? For whom? What's the goal? The AI has to guess, usually resulting in a generic, unhelpful overview.</p>
          </CardContent>
        </Card>
        
        <Card className="mb-4 border-yellow-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
              </svg>
              Better Prompt (Getting Warmer)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono p-2 bg-gray-100 rounded">"Write a short paragraph explaining social media marketing to a small business owner."</p>
            <p className="mt-2 text-yellow-600"><strong>Improvement:</strong> Specifies the topic, audience, and format.</p>
          </CardContent>
        </Card>
        
        <Card className="mb-4 border-green-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              "Diamond Standard" Boss Prompt (Clear, Contextual, Constrained - Leads to "Magic")
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono p-2 bg-gray-100 rounded">"Act as a friendly marketing advisor. Draft a 150-word introductory paragraph for a blog post titled 'Unlocking Local Buzz: A Small Cafe's Guide to Social Media Marketing.' The paragraph should highlight the primary benefit of social media for a local coffee shop owner who is new to online marketing and unsure of its value. Use an encouraging and practical tone. Focus on how it can build community and increase local visibility."</p>
            <p className="mt-2 text-green-600"><strong>Why it works:</strong> The AI now understands its role (persona), the target audience, the specific topic, the desired length, the tone, and the key messages to emphasize.</p>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl mb-4">Why This Matters Profoundly:</h3>
      <p>The <strong>quality and specificity of your prompt directly determine the quality and relevance of the AI's output.</strong> A poorly defined prompt will almost invariably lead to a generic, off-target, or incomplete response. A well-crafted prompt is your key to unlocking the AI's true capabilities, saving you valuable time, sparking genuine creativity, and helping you achieve your specific objectives with precision.</p>
      
      <div className="my-8 p-6 bg-sg-bright-green/10 border-l-4 border-sg-bright-green rounded-r-lg">
        <h3 className="text-lg font-bold text-sg-dark-teal mb-2">Key Takeaway:</h3>
        <p className="text-sg-dark-teal/90">Your prompt is your steering wheel for the AI. The more skillfully you use it, the more effectively you'll navigate to your desired destination.</p>
      </div>
    </div>
  );
} 