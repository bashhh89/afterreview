'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/Card';
import MiniFloatingSidebar from '@/components/learning-hub/MiniFloatingSidebar';
import ModuleNavigation from '@/components/learning-hub/ModuleNavigation';

// Define module structure with descriptive titles
const modules = [
  {
    id: 'overview',
    label: 'Overview: The CRM Evolution',
    content: () => (
      <div className="animate-fadeIn">
        <h2>The CRM Evolution: From Data Repository to Strategic Growth Engine</h2>
        
        <p className="lead text-lg text-sg-dark-teal mb-6">
          Customer Relationship Management platforms have transformed from simple contact databases to sophisticated ecosystems. Now, AI is triggering the next evolutionary leap.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-sg-dark-teal">Yesterday's CRM</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1 text-sg-dark-teal/80">
                <li>Static data storage</li>
                <li>Basic tracking functions</li>
                <li>Requires manual data entry</li>
                <li>Passive information systems</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-sg-dark-teal">Today's CRM</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1 text-sg-dark-teal/80">
                <li>Customer journey mapping</li>
                <li>Automation of routine tasks</li>
                <li>Cross-platform integration</li>
                <li>Basic analytics capabilities</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-sg-bright-green">AI-Powered CRM (2025+)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1 text-sg-dark-teal/80">
                <li>Predictive customer insights</li>
                <li>Autonomous relationship management</li>
                <li>Personalization at massive scale</li>
                <li>Strategic decision support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <p>
          This insight brief explores how AI integration is transforming CRM systems from passive data repositories into proactive strategic assets that drive growth through deeper customer understanding and engagement.
        </p>
      </div>
    )
  },
  {
    id: 'why-matters',
    label: 'Why This Matters NOW',
    content: () => (
      <div className="animate-fadeIn">
        <h2>Why This Matters NOW: The Urgency of AI-Enhanced CRM</h2>
        
        <div className="bg-gradient-to-r from-sg-bright-green/10 to-sg-light-mint/20 border-l-4 border-sg-bright-green p-6 rounded-r-lg mb-8">
          <h3 className="text-lg font-semibold text-sg-dark-teal mb-2">The Customer Experience Revolution</h3>
          <p className="text-sg-dark-teal/90">
            Today's customers expect personalized, intuitive, and immediate experiences. Companies using AI-enhanced CRM systems gain a critical competitive advantage by meeting these expectations at scale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-sg-dark-teal">Market Realities</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-sg-dark-teal/80">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>79%</strong> of customers say the experience a company provides is as important as its products or services.</li>
                <li>Companies with AI-enhanced CRM report <strong>40-60%</strong> higher customer retention rates.</li>
                <li>Early adopters are seeing <strong>3-5x ROI</strong> on their AI-CRM investments within 18 months.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-sg-dark-teal">The Cost of Inaction</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-sg-dark-teal/80">
              <ul className="list-disc pl-5 space-y-2">
                <li>Companies without AI capabilities will face a growing <strong>personalization gap</strong> against competitors.</li>
                <li>Operational inefficiencies from manual processes will increasingly impact <strong>profitability</strong>.</li>
                <li>Valuable relationship insights remain <strong>locked in unstructured data</strong>, unavailable for strategic decision-making.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 'key-applications',
    label: 'Key Applications & Opportunities',
    content: () => (
      <div className="animate-fadeIn">
        <h2>Key Applications & Transformation Opportunities</h2>
        
        <p className="mb-6">
          AI integration with CRM systems enables capabilities that were previously impossible, creating new opportunities for deeper customer relationships and operational excellence.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-sg-dark-teal">Predictive Customer Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-sg-dark-teal/80">
              <p className="mb-3">AI analyzes patterns across customer interactions, transactions, and external factors to predict:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Purchase likelihood and timing</li>
                <li>Churn risk factors and prevention opportunities</li>
                <li>Product/service recommendations with highest conversion potential</li>
                <li>Optimal communication timing and channel preferences</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-sg-dark-teal">Intelligent Automation</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-sg-dark-teal/80">
              <p className="mb-3">Beyond basic workflow automation, AI enables judgment-based automation:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Autonomous lead qualification and prioritization</li>
                <li>Smart scheduling that optimizes for conversion probability</li>
                <li>Personalized content generation for each customer</li>
                <li>Intelligent escalation based on sentiment and urgency detection</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-sg-dark-teal">Conversational Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-sg-dark-teal/80">
              <p className="mb-3">AI transforms how companies engage with customers:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Natural language interfaces for database queries and actions</li>
                <li>AI-powered conversation summaries with action items and sentiment</li>
                <li>Real-time coaching for sales and support conversations</li>
                <li>Multilingual capabilities without additional overhead</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-sg-dark-teal">Enhanced Decision Support</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-sg-dark-teal/80">
              <p className="mb-3">AI elevates CRM from operational tool to strategic asset:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Market trend identification from aggregated customer signals</li>
                <li>Dynamic pricing optimization based on customer value and behavior</li>
                <li>Strategic resource allocation recommendations</li>
                <li>Competitive intelligence synthesis from customer interactions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 'strategic-considerations',
    label: 'Strategic Implementation Considerations',
    content: () => (
      <div className="animate-fadeIn">
        <h2>Strategic Implementation Considerations</h2>
        
        <p className="mb-6">
          The transition to AI-enhanced CRM requires thoughtful planning and a strategic approach. Consider these critical factors:
        </p>
        
        <div className="bg-sg-light-mint/30 p-6 rounded-lg mb-8 border border-sg-bright-green/20">
          <h3 className="text-lg font-semibold text-sg-dark-teal mb-4">Implementation Framework</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-base font-medium text-sg-dark-teal mb-2">1. Assessment & Readiness</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-sg-dark-teal/80">
                <li>Evaluate current CRM utilization and data quality</li>
                <li>Identify high-value processes for initial AI enhancement</li>
                <li>Assess integration capabilities of existing systems</li>
                <li>Define clear success metrics for your AI implementation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-medium text-sg-dark-teal mb-2">2. Strategic Phasing</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-sg-dark-teal/80">
                <li>Start with lightweight augmentation of existing workflows</li>
                <li>Progress to predictive capabilities for specific use cases</li>
                <li>Expand to autonomous operation in well-defined areas</li>
                <li>Finally integrate strategic decision support capabilities</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-medium text-sg-dark-teal mb-2">3. Organizational Alignment</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-sg-dark-teal/80">
                <li>Focus on augmentation, not replacement of human roles</li>
                <li>Develop transparent AI policies for customer interactions</li>
                <li>Create training programs for employees to work effectively with AI</li>
                <li>Establish clear ownership of AI-enhanced processes</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-medium text-sg-dark-teal mb-2">4. Technical Architecture</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-sg-dark-teal/80">
                <li>Prefer API-first solutions for flexibility and future-proofing</li>
                <li>Implement robust data governance and privacy controls</li>
                <li>Design for model monitoring and performance evaluation</li>
                <li>Build feedback loops to continuously improve AI capabilities</li>
              </ul>
            </div>
          </div>
        </div>
        
        <Card className="bg-white/80 border-sg-bright-green/10 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-sg-dark-teal">Common Implementation Pitfalls</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-sg-dark-teal/80">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Ignoring data quality:</strong> AI capabilities are limited by the quality of your CRM data.</li>
              <li><strong>Technology-first approach:</strong> Focus on business outcomes, not AI for its own sake.</li>
              <li><strong>Insufficient change management:</strong> Without proper adoption, even the best AI will underperform.</li>
              <li><strong>Neglecting ethical considerations:</strong> Build transparent, fair systems that maintain customer trust.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: 'action-steps',
    label: 'Immediate Action Steps',
    content: () => (
      <div className="animate-fadeIn">
        <h2>Immediate Action Steps</h2>
        
        <p className="mb-6">
          Whether you're just beginning to explore AI integration with your CRM or looking to expand your capabilities, these next steps will help you move forward strategically:
        </p>
        
        <div className="space-y-4 mb-8">
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base font-medium text-sg-dark-teal flex items-center">
                <span className="flex items-center justify-center bg-sg-bright-green text-white rounded-full w-6 h-6 mr-3 text-sm">1</span>
                Conduct a CRM Health Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4 text-sm text-sg-dark-teal/80">
              <p>Evaluate your current CRM implementation for data completeness, quality, and process compliance. Identify gaps that could limit AI effectiveness.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base font-medium text-sg-dark-teal flex items-center">
                <span className="flex items-center justify-center bg-sg-bright-green text-white rounded-full w-6 h-6 mr-3 text-sm">2</span>
                Identify High-Value AI Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4 text-sm text-sg-dark-teal/80">
              <p>Map your customer journey and identify pain points or inefficiencies that AI could address. Prioritize based on business impact and implementation feasibility.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base font-medium text-sg-dark-teal flex items-center">
                <span className="flex items-center justify-center bg-sg-bright-green text-white rounded-full w-6 h-6 mr-3 text-sm">3</span>
                Explore Your CRM's AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4 text-sm text-sg-dark-teal/80">
              <p>Most major CRM platforms now offer built-in AI features or integrations. Research what's available within your current system before considering additional solutions.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base font-medium text-sg-dark-teal flex items-center">
                <span className="flex items-center justify-center bg-sg-bright-green text-white rounded-full w-6 h-6 mr-3 text-sm">4</span>
                Develop an AI-CRM Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4 text-sm text-sg-dark-teal/80">
              <p>Create a phased implementation plan with clear milestones and success metrics. Start with quick wins to build momentum and demonstrate value.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 border-sg-bright-green/10">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base font-medium text-sg-dark-teal flex items-center">
                <span className="flex items-center justify-center bg-sg-bright-green text-white rounded-full w-6 h-6 mr-3 text-sm">5</span>
                Pilot and Iterate
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4 text-sm text-sg-dark-teal/80">
              <p>Begin with a focused pilot of your highest-priority AI enhancement. Measure results, gather feedback, and refine before expanding to broader implementation.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gradient-to-r from-sg-dark-teal to-sg-dark-teal/90 p-6 rounded-lg text-white">
          <h3 className="text-xl font-semibold mb-4">Coming Soon: AI-Powered CRM Masterclass</h3>
          <p className="mb-4">
            Join us for an in-depth exploration of AI-CRM integration strategies, practical implementation techniques, and real-world case studies from companies that have successfully transformed their customer relationships with AI.
          </p>
          <div className="text-sm bg-white/20 p-3 rounded">
            <p className="font-medium">Course release: Q3 2025</p>
            <p>Register interest for early access and exclusive resources.</p>
          </div>
        </div>
      </div>
    )
  }
];

export default function CRMSuperchargedContent() {
  const [activeModuleId, setActiveModuleId] = useState('overview');
  
  // Get current module index
  const activeModuleIndex = modules.findIndex(module => module.id === activeModuleId);
  
  // Set up prev/next navigation
  const prevModule = activeModuleIndex > 0 
    ? { id: modules[activeModuleIndex - 1].id, label: modules[activeModuleIndex - 1].label } 
    : undefined;
    
  const nextModule = activeModuleIndex < modules.length - 1 
    ? { id: modules[activeModuleIndex + 1].id, label: modules[activeModuleIndex + 1].label } 
    : undefined;
  
  // Handle module change
  const handleModuleChange = (id: string) => {
    setActiveModuleId(id);
    // Scroll to top when changing modules
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-plus-jakarta prose-headings:font-bold prose-headings:text-sg-dark-teal prose-p:text-sg-dark-teal/90 prose-a:text-sg-bright-green prose-a:no-underline hover:prose-a:underline prose-strong:text-sg-dark-teal prose-li:text-sg-dark-teal/90 prose-ol:text-sg-dark-teal/90 prose-ul:text-sg-dark-teal/90">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl mb-4">CRM Supercharged: Your AI Playbook for Smarter Customer Relationships</h1>
        <p className="text-xl text-sg-dark-teal/70 mb-6">Discover how AI integration can transform your CRM from a passive database into an intelligent, proactive engine for growth.</p>
      </div>
      
      {/* Content display with floating sidebar */}
      <div className="relative">
        {/* Display active module content */}
        <div className="pr-0 md:pr-72">
          {modules.map(module => (
            <div 
              key={module.id}
              className={`transition-opacity duration-300 ${module.id === activeModuleId ? 'block' : 'hidden'}`}
            >
              {module.content()}
            </div>
          ))}
          
          {/* Navigation buttons */}
          <div className="mt-12">
            <ModuleNavigation
              prevModule={prevModule}
              nextModule={nextModule}
              onModuleChange={handleModuleChange}
              backToCoursesUrl="/learning-hub/templates"
            />
          </div>
        </div>
        
        {/* Floating sidebar for module navigation (visible on medium and larger screens) */}
        <div className="hidden md:block absolute top-0 right-0 w-64">
          <MiniFloatingSidebar
            modules={modules.map(module => ({
              id: module.id,
              label: module.label,
              completed: modules.findIndex(m => m.id === module.id) < activeModuleIndex
            }))}
            activeModuleId={activeModuleId}
            onModuleChange={handleModuleChange}
          />
        </div>
      </div>
    </div>
  );
} 