import React from 'react';

interface Tool {
  id: string;
  toolName: string;
  websiteLink: string;
  briefDescription: string;
  bestForTiers: string[];
  primaryCategories: string[];
  solvesChallenges: string[];
  ahmadGeminiProTip: string;
  uiCategory: string;
}

export default function ToolCard({ tool }: { tool: Tool }) {
  // Generate a consistent placeholder image using Unsplash based on the tool category
  const imageKeyword = tool.uiCategory.toLowerCase().replace(' ', '-');
  const placeholderImage = `https://source.unsplash.com/featured/600x320?${imageKeyword}`;
  
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300 font-plus-jakarta">
      {/* Tool Image */}
      <div className="relative w-full h-40 overflow-hidden">
        <img 
          src={placeholderImage} 
          alt={tool.toolName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sg-dark-teal/30 to-transparent"></div>
      </div>
      
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-1">
          <a
            href={tool.websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-extrabold text-sg-dark-teal hover:text-sg-bright-green transition-colors underline"
          >
            {tool.toolName}
          </a>
        </div>
        <div className="text-sg-dark-teal text-base mb-2">{tool.briefDescription}</div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-sg-bright-green/20 text-sg-dark-teal text-xs font-semibold px-3 py-1 rounded-full">
            {tool.uiCategory}
          </span>
          {tool.bestForTiers.map((tier) => (
            <span key={tier} className="bg-sg-dark-teal/10 text-sg-dark-teal text-xs font-semibold px-3 py-1 rounded-full">
              {tier}
            </span>
          ))}
        </div>
        <div className="bg-sg-bright-green/10 border-l-4 border-sg-bright-green p-3 rounded-lg flex items-start gap-2 mt-auto">
          <svg className="w-5 h-5 text-sg-bright-green mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
          <span className="text-sm text-sg-dark-teal font-medium">{tool.ahmadGeminiProTip}</span>
        </div>
      </div>
    </div>
  );
} 