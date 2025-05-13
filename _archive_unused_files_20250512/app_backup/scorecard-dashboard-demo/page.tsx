'use client';
import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

// --- SAMPLE DATA (same as main app) ---
const sampleMarkdownReport = `
## Overall Tier: Enabler

As a Property/Real Estate organization at the Enabler tier, you have established some foundational elements for AI adoption but still face challenges in fully integrating AI into your operations. Your organization recognizes the potential of AI technologies and has taken initial steps toward implementation, positioning you ahead of industry peers who are just beginning their AI journey.

## Key Findings

**Strengths:**
- Your organization has established a solid data infrastructure with centralized property and client databases, providing a foundation for AI applications specific to the Property/Real Estate sector.
- Executive leadership has demonstrated strong interest in AI adoption, which is critical for securing resources and driving organizational change in a traditionally conservative industry.
- Your team shows high receptivity to new technologies, with several members already experimenting with basic AI tools for market analysis and reporting.
- Recent investments in data quality improvements and standardization efforts across your property management software systems have created more reliable datasets for AI training.
- You've successfully implemented basic automation for routine administrative tasks, demonstrating practical application of workflow enhancement technologies.

**Weaknesses:**
- Your organization lacks a clearly documented AI strategy with specific objectives aligned to business goals, limiting coordinated progress and proper resource allocation for Property/Real Estate AI initiatives.
- There is limited internal AI expertise, with no dedicated roles focused on AI implementation or data science within your property operations or marketing teams.
- Most property management and client engagement processes remain largely manual, missing opportunities for AI-driven efficiency gains in tenant communications and property evaluations.
- Persistent data silos exist between your sales, property management, and marketing departments, hindering a unified view of client interactions and property performance metrics.
- Current security protocols require updating to address specific risks associated with AI systems handling sensitive property and client financial information.
- Customer data from multiple property management systems remains fragmented, limiting the effectiveness of potential predictive analytics for tenant retention strategies.

## Strategic Action Plan

1. **Develop a Comprehensive AI Strategy for Your Property/Real Estate Business**
   - Document clear, measurable objectives for AI implementation tied directly to KPIs such as lead conversion rates, property valuation accuracy, and tenant satisfaction scores.
   - Map out a 12-month roadmap with quarterly milestones, prioritizing high-impact, low-risk applications like automated property comparison reports and lead qualification.
   - Conduct a cost-benefit analysis for each proposed AI initiative, emphasizing ROI metrics specific to property management operations.
   - Assign executive sponsorship and establish a cross-functional steering committee including representatives from property management, sales, and marketing departments.

2. **Launch Targeted AI Pilot Projects in Property Marketing and Management**
   - For a Property/Real Estate organization at the 'Enabler' tier struggling with lead qualification, implement an AI-powered lead scoring system. Specific steps include: 1) Audit existing lead data quality across all properties, 2) Define scoring criteria based on historical conversion patterns, 3) Select and configure an appropriate CRM AI extension, 4) Run a 60-day pilot with A/B testing against traditional methods.
   - Develop an AI-enhanced property recommendation engine that matches prospective buyers/tenants with suitable properties. Implementation timeline: 90 days from requirements to initial deployment, with weekly review cycles.
   - Create automated competitive market analysis reports using AI to gather and analyze comparable property data, reducing analysis time by 60% and improving accuracy of property valuations.

3. **Build Internal AI Capabilities Within Your Real Estate Teams**
   - Develop a tailored AI literacy program for different departments, with specific tracks for property managers, real estate agents, and administrative staff.
   - Identify and train AI champions within each department who can serve as liaisons between technical teams and business users.
   - Partner with a specialized PropTech consultant for quarterly workshop sessions focusing on practical AI applications in real estate.
   - Establish a skills development roadmap for each team member, with basic, intermediate, and advanced AI competency milestones.

4. **Consolidate Data Assets Across Property Management Systems**
   - Create a unified data architecture that connects property listings, client interactions, transaction history, and market analytics.
   - Implement data quality standards and governance policies specifically designed for real estate datasets.
   - Develop automated data cleaning and standardization processes to prepare property and client data for AI applications.
   - Establish a data governance committee with representatives from all departments managing property information.

5. **Implement Enhanced Security Protocols for AI Systems**
   - Conduct a comprehensive risk assessment focused on AI systems handling sensitive property and client financial information.
   - Develop data anonymization procedures for using client data in AI training scenarios.
   - Implement multi-tiered access controls for AI systems based on data sensitivity levels.
   - Create clear policies for client data usage in AI applications, ensuring compliance with relevant real estate regulations.

## Getting Started & Resources

To help you jumpstart your AI journey, here are customized resources:

### Sample AI Goal-Setting Meeting Agenda for Property/Real Estate
1. Current State Assessment: Review existing property management processes and identify high-friction areas that could benefit from AI automation (focus on property valuation, lead management, and tenant communication systems).
2. Opportunity Prioritization: Evaluate and rank potential AI initiatives based on implementation effort, expected ROI, and alignment with organizational goals in the competitive real estate market.
3. Resource Allocation Planning: Determine necessary budget, personnel, and timeline requirements for priority AI initiatives, with special consideration for integration with existing property management software.
4. Success Metrics Definition: Establish clear KPIs to measure AI implementation success, including lead conversion improvements, tenant retention rates, and operational cost reductions.

### Example Prompts for Property/Real Estate Marketing Managers
- **PROMPT:** "Analyze the attached set of 20 property listings and identify the key features that correlate most strongly with quick sales in our market. Then create a template for highlighting these elements in future property descriptions."
  **USE CASE:** Streamline property marketing copy creation while emphasizing the most effective selling points based on historical performance data.

- **PROMPT:** "Based on our property transaction data from the past 12 months, generate 5 distinct buyer personas for our luxury apartment segment, including demographic information, key motivations, common objections, and recommended messaging approaches for each persona."
  **USE CASE:** Develop more targeted marketing campaigns for specific property types and improve lead qualification process.

- **PROMPT:** "Review these 10 property inquiry emails and create a framework for classifying leads by urgency, budget alignment, and likelihood to convert. Then draft template responses for each category that our agents can personalize."
  **USE CASE:** Improve lead response efficiency and consistency while ensuring proper prioritization of high-value prospects.

### Basic AI Data Audit Process Outline for Real Estate Organizations
1. **Inventory Data Sources**: Catalog all property data repositories including CRM systems, property management software, transaction databases, and market research tools. Document data formats, update frequencies, and ownership for each system.
2. **Assess Data Quality**: Evaluate completeness, accuracy, and consistency of critical data fields such as property specifications, historical pricing, client interactions, and transaction outcomes. Focus particularly on standardizing property feature descriptions across listings.
3. **Identify Integration Requirements**: Map necessary data flows between systems to support AI use cases like predictive maintenance, automated valuation models, and personalized client communication.
4. **Document Compliance Concerns**: Review data handling practices against real estate regulatory requirements, particularly regarding client financial information and property disclosure rules.
5. **Create Data Enhancement Plan**: Develop specific action items to address identified gaps, including data cleaning protocols, field standardization rules, and integration priorities.

## Illustrative Benchmarks

For the Property/Real Estate industry:

### Leader Tier Organizations
- **AI-Powered Property Valuation Engines**: Leading real estate firms deploy sophisticated machine learning models that incorporate hundreds of variables beyond traditional comparables, including neighborhood development patterns, school rating trends, and even social media sentiment about specific areas. These systems achieve valuation accuracy within 3.5% of final sale price compared to 7-10% with traditional methods and reduce appraisal time from days to minutes.

- **Predictive Maintenance Systems**: Top property management companies utilize IoT sensors throughout their buildings connected to AI systems that predict maintenance needs before failures occur. These systems analyze patterns in equipment performance data, environmental conditions, and historical maintenance records to forecast issues 2-4 weeks before traditional inspection methods would detect problems, reducing emergency maintenance costs by 35% and extending equipment lifecycle by 15-20%.

- **Dynamic Pricing Optimization**: Leader organizations employ real-time pricing algorithms for rental properties that consider over 50 market variables updated daily, including competitive listings, seasonal demand patterns, and even local events. These systems automatically adjust listing prices to maximize occupancy rates while optimizing revenue per square foot, resulting in 12-18% revenue increases compared to static pricing models.

### Enabler Tier Organizations
- **Semi-Automated Lead Qualification**: Enabler-level real estate companies implement basic AI tools that score incoming leads based on engagement patterns, property viewing history, and form-fill information. These systems typically route higher-scoring leads to agents more quickly and suggest appropriate properties based on expressed preferences, improving conversion rates by 15-25% compared to manual processes.

- **Chatbot-Enhanced Client Communication**: Many mid-tier property management firms deploy AI chatbots to handle routine tenant inquiries (maintenance requests, lease information, amenity details) and property showings scheduling. These systems typically handle 60-70% of basic inquiries without human intervention and are available 24/7, significantly improving response times and tenant satisfaction scores.

- **Augmented Market Analysis**: Enabler organizations leverage AI tools to enhance competitive market analyses by automatically gathering and processing comparable property data from multiple sources. These systems can generate standardized reports in minutes instead of hours, allowing agents to produce more comprehensive analyses for clients while reducing preparation time by 40-60%.

Include diverse examples across marketing, sales, and operations. While precise statistical benchmarks may not be available, these illustrative examples provide a clear picture of what's possible at different maturity levels.

## Your Personalized AI Learning Path

Based on your scorecard results, here are some recommended resources to help you advance your AI skills:

### Dabbler Quick Start: Content Ideation Prompts
_Why this is relevant for you:_ Your assessment revealed that your marketing team is spending significant time creating property descriptions and advertising materials manually. The Content Ideation Prompts library will provide immediate efficiency gains by showing you how to generate compelling property descriptions and marketing materials using AI templates.
[Learn More: Dabbler Quick Start: Content Ideation Prompts](/learning-hub/prompt-library?category=Content+Ideation+%26+Creation&tier=Dabbler)

### Explore Recommended AI Tools
_Why this is relevant for you:_ As an Enabler-tier organization looking to implement your first AI pilot projects, the Recommended Tools section will help you identify and compare specialized PropTech AI solutions that integrate with your existing property management systems without requiring extensive technical expertise.
[Learn More: Explore Recommended AI Tools](/learning-hub/recommended-tools)

### View AI Readiness Checklists
_Why this is relevant for you:_ Your assessment highlighted the lack of a documented AI strategy as a key weakness. The AI Readiness Checklists provide step-by-step guidance for developing a comprehensive AI roadmap specifically tailored for real estate operations and marketing.
[Learn More: View AI Readiness Checklists](/learning-hub/checklists)
`;

// --- Helper to extract sections from the Markdown string ---
function extractSections(markdown: string) {
  const sectionRegex = /(^##\s+.*$)/gim;
  const parts = markdown.split(sectionRegex).filter(Boolean);
  const sections: Record<string, string> = {};
  let current = '';
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('##')) {
      current = part.replace(/^##\s*/, '').trim();
      if (current.toLowerCase().startsWith('overall tier:')) {
        sections['Overall Tier'] = part + (parts[i + 1] || '');
        i++;
      } else {
        sections[current] = part + (parts[i + 1] || '');
        i++;
      }
    }
  }
  return sections;
}

const cardOrder = [
  'Overall Tier',
  'Key Findings',
  'Strategic Action Plan',
  'Getting Started & Resources',
  'Illustrative Benchmarks',
  'Your Personalized AI Learning Path',
];
const cardTitles: Record<string, string> = {
  'Overall Tier': 'Your AI Tier',
  'Key Findings': 'Key Findings',
  'Strategic Action Plan': 'Strategic Action Plan',
  'Getting Started & Resources': 'Getting Started & Resources',
  'Illustrative Benchmarks': 'Illustrative Benchmarks',
  'Your Personalized AI Learning Path': 'Personalized Learning Path',
};

export default function ScorecardDashboardDemo() {
  const reportMarkdown = sampleMarkdownReport;
  const sections = useMemo(() => extractSections(reportMarkdown), [reportMarkdown]);
  const extractedTier = useMemo(() => {
    if (!sections['Overall Tier']) return null;
    const tierRegex = /^##\s*Overall Tier:\s*(.*)$/im;
    const match = sections['Overall Tier'].match(tierRegex);
    return match ? match[1].trim() : null;
  }, [sections]);

  // Tab state
  const [activeTab, setActiveTab] = useState(cardOrder[0]);
  const [linkGenerated, setLinkGenerated] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#004851] font-sans">
      {/* Background subtle patterns */}
      <div className="absolute inset-0 bg-[#f8faf9] opacity-90 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-bl from-[#68F6C8]/10 via-transparent to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-[#68F6C8]/5 via-transparent to-transparent z-0"></div>
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#68F6C8]/5 blur-3xl z-0"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#004851]/5 blur-3xl z-0"></div>
      
      <div className="relative z-10 flex min-h-screen">
        {/* Left sidebar with tabs */}
        <div className="w-80 bg-white shadow-xl border-r border-gray-100 p-8 flex flex-col">
          <div className="mb-12">
            <h1 className="text-2xl font-bold text-[#68F6C8] tracking-tight">AI Efficiency</h1>
            <h2 className="text-3xl font-extrabold text-[#004851] tracking-tighter">SCORECARD</h2>
            <div className="mt-2 text-gray-600 font-light">Executive Dashboard Demo</div>
          </div>
          
          <div className="flex flex-col gap-2 flex-1">
            {cardOrder.map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                  activeTab === key 
                    ? 'bg-gradient-to-r from-[#68F6C8] to-[#68F6C8]/70 text-[#004851]' 
                    : 'hover:bg-[#68F6C8]/10 text-gray-600 hover:text-[#004851]'
                }`}
              >
                <div className={`w-2 h-12 rounded-full transition-all duration-300 ${
                  activeTab === key ? 'bg-[#004851]' : 'bg-gray-300 group-hover:bg-[#68F6C8]'
                }`}></div>
                <span className="text-lg font-medium">{cardTitles[key]}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-auto pt-8 border-t border-gray-200 flex justify-between items-center">
            <button className="text-gray-500 hover:text-[#004851] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
            <button className="bg-[#68F6C8] hover:bg-[#68F6C8]/90 text-[#004851] px-4 py-2 rounded-lg transition-all font-medium shadow-sm hover:shadow-md">
              New Assessment
            </button>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 p-12 overflow-y-auto">
          {/* Header and Action Bar */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-5xl font-black text-[#004851] mb-2 tracking-tight">
                {cardTitles[activeTab]}
                <span className="ml-2 text-[#68F6C8]">.</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#68F6C8] to-[#004851] rounded-full"></div>
            </div>
            
            <div className="flex gap-3">
              <button className="bg-white hover:bg-gray-50 text-[#004851] px-5 py-3 rounded-xl transition-all border border-gray-200 flex items-center gap-2 shadow-sm hover:shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
              <button 
                className={`bg-white hover:bg-gray-50 text-[#004851] px-5 py-3 rounded-xl transition-all border border-gray-200 flex items-center gap-2 shadow-sm hover:shadow-md ${linkGenerated ? 'border-[#68F6C8]' : ''}`}
                onClick={() => setLinkGenerated(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {linkGenerated ? 'Link Copied!' : 'Generate Link'}
              </button>
              <button className="bg-[#68F6C8] text-[#004851] px-5 py-3 rounded-xl transition-all hover:bg-[#68F6C8]/90 flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                Copy JSON
              </button>
            </div>
          </div>
          
          {/* Content card with subtle shadow */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#68F6C8]/20 to-[#004851]/10 blur-xl rounded-3xl transform translate-y-4 scale-95 z-0"></div>
            <div className="relative bg-white border border-gray-100 rounded-3xl p-10 shadow-xl z-10">
              {/* Special layout for Overall Tier */}
              {activeTab === 'Overall Tier' && (
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#68F6C8] to-[#004851]/60 blur-lg rounded-full transform scale-110 z-0"></div>
                    <div className="relative flex flex-col items-center justify-center w-48 h-48 bg-white rounded-full border-4 border-[#68F6C8] z-10">
                      <span className="text-[#004851] text-6xl font-black mb-1">{extractedTier || '?'}</span>
                      <span className="text-gray-600 text-base font-medium uppercase tracking-widest">AI Tier</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        h2: () => null,
                        p: ({node, ...props}) => <p className="text-2xl text-gray-700 font-light leading-relaxed" {...props} />,
                      }}
                    >
                      {sections['Overall Tier']}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
              
              {/* Special layout for Key Findings: split Strengths/Weaknesses */}
              {activeTab === 'Key Findings' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Strengths */}
                  <div className="bg-gradient-to-br from-[#68F6C8]/20 to-transparent border border-[#68F6C8]/30 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-[#68F6C8] rounded-full"></div>
                      <span className="text-[#004851] font-bold text-xl">Strengths</span>
                    </div>
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        h2: () => null,
                        strong: ({node, ...props}) => <strong className="font-semibold text-[#004851]" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-none space-y-3 text-gray-700" {...props} />,
                        li: ({node, ...props}) => (
                          <li className="flex items-start gap-3" {...props}>
                            <div className="mt-1.5 w-2 h-2 bg-[#68F6C8] rounded-full flex-shrink-0"></div>
                            <span>{props.children}</span>
                          </li>
                        ),
                        p: ({node, ...props}) => <p className="mb-4 text-gray-700" {...props} />,
                      }}
                    >
                      {sections['Key Findings'].split('**Weaknesses:**')[0].replace(/^##\s*Key Findings\s*/i, '').replace('**Strengths:**', '').trim()}
                    </ReactMarkdown>
                  </div>
                  
                  {/* Weaknesses */}
                  <div className="bg-gradient-to-br from-red-500/20 to-transparent border border-red-500/30 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-red-400 rounded-full"></div>
                      <span className="text-red-600 font-bold text-xl">Weaknesses</span>
                    </div>
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        h2: () => null,
                        strong: ({node, ...props}) => <strong className="font-semibold text-red-600" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-none space-y-3 text-gray-700" {...props} />,
                        li: ({node, ...props}) => (
                          <li className="flex items-start gap-3" {...props}>
                            <div className="mt-1.5 w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                            <span>{props.children}</span>
                          </li>
                        ),
                        p: ({node, ...props}) => <p className="mb-4 text-gray-700" {...props} />,
                      }}
                    >
                      {sections['Key Findings'].split('**Weaknesses:**')[1]?.trim() || ''}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
              
              {/* Strategic Action Plan */}
              {activeTab === 'Strategic Action Plan' && (
                <div className="space-y-8">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      h2: () => null,
                      a: ({node, ...props}) => <a className="text-[#68F6C8] underline underline-offset-4 hover:text-[#004851] transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-[#004851]" {...props} />,
                      em: ({node, ...props}) => <em className="italic text-gray-600" {...props} />,
                      ol: ({node, ...props}) => <ol className="space-y-8 mt-6 counter-reset-item" {...props} />,
                      li: ({node, children, ...props}) => {
                        // Extract the number and content from the list item
                        const text = String(children).replace(/^\s*\d+\.\s*/, '');
                        const match = String(children).match(/^\s*(\d+)\.\s*/);
                        const number = match ? match[1] : '';
                        
                        // Check if this contains a strong tag at the beginning (for the title)
                        let title = '';
                        let content = text;
                        
                        if (text.startsWith('**')) {
                          const strongMatch = text.match(/^\*\*(.*?)\*\*:\s*(.*)/);
                          if (strongMatch) {
                            title = strongMatch[1];
                            content = strongMatch[2];
                          } else {
                            const simpleMatch = text.match(/^\*\*(.*?)\*\*\s*(.*)/);
                            if (simpleMatch) {
                              title = simpleMatch[1];
                              content = simpleMatch[2];
                            }
                          }
                        }
                        
                        // Find and format any sub-steps in the content
                        // Look for patterns like "1) Step one", "2) Step two" or "1. Step one", "2. Step two"
                        const subStepRegex = /(\d+[\).]\s+.*?)(?=\s*\d+[\).]\s+|$)/g;
                        const subSteps = content.match(subStepRegex);
                        
                        let mainContent = content;
                        if (subSteps) {
                          // Remove the sub-steps from the main content
                          mainContent = content.split(subStepRegex)[0];
                        }
                        
                        return (
                          <li className="flex items-start gap-6 group" {...props}>
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#68F6C8] to-[#004851] flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform shadow-md">
                              {number}
                            </div>
                            <div className="flex-1">
                              {title && (
                                <div className="text-xl font-bold text-[#004851] mb-2">{title}</div>
                              )}
                              <div className="text-gray-700 text-lg">
                                {mainContent}
                              </div>
                            </div>
                          </li>
                        );
                      },
                      p: ({node, ...props}) => <p className="text-gray-700 text-lg" {...props} />,
                    }}
                  >
                    {sections[activeTab]}
                  </ReactMarkdown>
                </div>
              )}
              
              {/* Getting Started & Resources */}
              {activeTab === 'Getting Started & Resources' && (
                <div className="space-y-10">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      h2: () => null,
                      h3: ({node, children, ...props}) => (
                        <div className="mb-4 mt-8">
                          <h3 className="text-2xl font-bold text-[#004851] border-b border-[#68F6C8]/30 pb-2" {...props}>
                            {children}
                          </h3>
                        </div>
                      ),
                      a: ({node, children, ...props}) => (
                        <a 
                          className="text-[#68F6C8] hover:text-[#004851] underline underline-offset-4 font-medium transition-colors"
                          target="_blank" 
                          rel="noopener noreferrer" 
                          {...props}
                        >
                          {children}
                        </a>
                      ),
                      ol: ({node, ...props}) => <ol className="space-y-4 list-decimal pl-5" {...props} />,
                      ul: ({node, ...props}) => <ul className="space-y-4 list-disc pl-5" {...props} />,
                      li: ({node, children, ...props}) => {
                        // Check if this is a list item with a PROMPT/USE CASE pattern
                        const text = String(children);
                        if (text.includes('**PROMPT:**')) {
                          const [prompt, useCase] = text.split('**USE CASE:**');
                          
                          return (
                            <li className="bg-white border border-gray-200 rounded-xl p-6 my-4 hover:border-[#68F6C8] hover:shadow-lg transition-all" {...props}>
                              <div className="font-medium text-[#004851] mb-2">{prompt.replace('**PROMPT:**', '').trim()}</div>
                              <div className="text-gray-700 text-sm border-t border-gray-100 pt-3 mt-2">
                                <span className="font-medium text-[#004851]">USE CASE: </span>
                                {useCase?.trim()}
                              </div>
                            </li>
                          );
                        }
                        
                        return (
                          <li className="text-gray-700" {...props}>
                            {children}
                          </li>
                        );
                      },
                      p: ({node, ...props}) => <p className="text-gray-700 mb-4" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-[#004851]" {...props} />,
                    }}
                  >
                    {sections[activeTab]}
                  </ReactMarkdown>
                </div>
              )}
              
              {/* Illustrative Benchmarks */}
              {activeTab === 'Illustrative Benchmarks' && (
                <div className="space-y-8">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      h2: () => null,
                      h3: ({node, children, ...props}) => (
                        <div className="mb-6 mt-8">
                          <h3 className={`text-2xl font-bold ${
                            String(children).includes('Leader') 
                              ? 'text-[#004851]' 
                              : 'text-[#68F6C8]'
                          } pb-2`} {...props}>
                            {children}
                          </h3>
                        </div>
                      ),
                      ul: ({node, ...props}) => <ul className="space-y-6" {...props} />,
                      li: ({node, children, ...props}) => {
                        const text = String(children);
                        // Check if this is a list item with a bold title pattern
                        if (text.startsWith('**') && text.includes('**:')) {
                          const [title, content] = text.split('**:', 2);
                          return (
                            <li className="bg-white border-l-4 border-[#68F6C8] rounded-r-xl p-6 shadow-sm" {...props}>
                              <div className="font-bold text-[#004851] text-lg mb-2">
                                {title.replace(/^\*\*/, '')}:
                              </div>
                              <div className="text-gray-700">
                                {content}
                              </div>
                            </li>
                          );
                        }
                        
                        return (
                          <li className="bg-white border-l-4 border-[#68F6C8] rounded-r-xl p-6 shadow-sm" {...props}>
                            {children}
                          </li>
                        );
                      },
                      p: ({node, ...props}) => <p className="text-gray-700 text-lg mb-4" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-[#004851]" {...props} />,
                    }}
                  >
                    {sections[activeTab]}
                  </ReactMarkdown>
                </div>
              )}
              
              {/* Your Personalized AI Learning Path */}
              {activeTab === 'Your Personalized AI Learning Path' && (
                <div className="space-y-8">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      h2: () => null,
                      h3: ({node, children, ...props}) => {
                        const title = String(children);
                        return (
                          <div className="mb-2" {...props}>
                            <h3 className="text-xl font-bold text-[#004851]">
                              {title}
                            </h3>
                          </div>
                        );
                      },
                      p: ({node, children, ...props}) => {
                        const text = String(children);
                        // Check if this is the "Why this is relevant for you:" paragraph
                        if (text.startsWith('_Why this is relevant for you:_')) {
                          return (
                            <p className="text-gray-700 italic mb-3" {...props}>
                              {text.replace('_Why this is relevant for you:_', '')}
                            </p>
                          );
                        }
                        return <p className="text-gray-700 mb-4" {...props} />;
                      },
                      a: ({node, children, ...props}) => {
                        // Extract the URL from the href
                        const href = props.href || '';
                        // Check if it's a learning hub link
                        if (href.startsWith('/learning-hub')) {
                          return (
                            <div className="mt-4 mb-8">
                              <a 
                                className="inline-flex items-center gap-2 bg-[#68F6C8] text-[#004851] px-5 py-3 rounded-lg hover:bg-[#68F6C8]/90 transition-all font-medium"
                                {...props}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                                {children}
                              </a>
                            </div>
                          );
                        }
                        
                        return (
                          <a 
                            className="text-[#68F6C8] underline underline-offset-4 hover:text-[#004851] transition-colors"
                            {...props}
                          >
                            {children}
                          </a>
                        );
                      },
                      strong: ({node, ...props}) => <strong className="font-semibold text-[#004851]" {...props} />,
                    }}
                  >
                    {sections[activeTab]}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}