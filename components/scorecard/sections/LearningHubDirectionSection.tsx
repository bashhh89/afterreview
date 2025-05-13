'use client';

import React from 'react';

interface LearningHubDirectionSectionProps {
  tierLevel?: string;
}

const LearningHubDirectionSection: React.FC<LearningHubDirectionSectionProps> = ({ 
  tierLevel = 'Explorer' // Default tier if none provided
}) => {
  // Define learning path recommendations based on tier
  const getLearningPathsForTier = (tier: string) => {
    const allPaths = [
      {
        title: "AI Fundamentals",
        description: "Master the basic concepts and terminology of AI to build a solid foundation.",
        link: "/learning-hub/ai-fundamentals",
        icon: "📘",
        recommended: ["Explorer", "Enabler"]
      },
      {
        title: "Data Strategy",
        description: "Learn how to build and implement a robust data strategy for AI initiatives.",
        link: "/learning-hub/data-strategy",
        icon: "📊",
        recommended: ["Enabler", "Practitioner", "Leader"]
      },
      {
        title: "AI Integration",
        description: "Discover practical approaches to integrating AI into existing business processes.",
        link: "/learning-hub/ai-integration",
        icon: "🔄",
        recommended: ["Practitioner", "Leader"]
      },
      {
        title: "Advanced AI Applications",
        description: "Explore cutting-edge AI applications and how to implement them in your organization.",
        link: "/learning-hub/advanced-ai",
        icon: "🚀",
        recommended: ["Leader"]
      },
      {
        title: "AI Governance & Ethics",
        description: "Build frameworks for responsible AI usage and ethical considerations.",
        link: "/learning-hub/ai-governance",
        icon: "⚖️",
        recommended: ["Enabler", "Practitioner", "Leader"]
      },
    ];
    
    return allPaths.filter(path => path.recommended.includes(tier));
  };
  
  const recommendedPaths = getLearningPathsForTier(tierLevel);
  const allPaths = getLearningPathsForTier("All");
  
  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#004851] mb-4">Continue Your AI Journey</h3>
        <p className="text-gray-600">
          Explore our Learning Hub for personalized resources, tools, and guides to help you advance 
          your AI maturity based on your assessment results.
        </p>
      </div>
      
      {/* Featured call to action */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#004851] to-[#006970] text-white p-8 shadow-lg mb-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#68F6C8]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#68F6C8]/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Learning Hub Access</h3>
            <p className="text-white/90 mb-4">
              Gain exclusive access to our AI Learning Hub with tailored resources for your {tierLevel} tier. 
              Accelerate your organization's AI journey with expert guidance and practical tools.
            </p>
            <a 
              href={`/learning-hub?tier=${tierLevel.toLowerCase()}`} 
              className="inline-flex items-center gap-2 bg-[#68F6C8] text-[#004851] px-6 py-3 rounded-lg hover:bg-white transition-all font-semibold text-base shadow-md hover:shadow-lg"
            >
              Access Learning Hub
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="flex-shrink-0 bg-white/10 rounded-xl p-4">
            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <svg className="w-full h-full text-[#68F6C8]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M4.75 14L12 18.25L19.25 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommended learning paths */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-[#004851] mb-4">Recommended Learning Paths</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendedPaths.length > 0 ? (
            recommendedPaths.map((path, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="mb-4 text-3xl">{path.icon}</div>
                <h5 className="text-lg font-bold text-[#004851] mb-2">{path.title}</h5>
                <p className="text-gray-600 mb-4 text-sm">{path.description}</p>
                <a 
                  href={path.link} 
                  className="text-[#004851] font-medium hover:text-[#68F6C8] transition-colors flex items-center gap-1"
                >
                  Explore path
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500">No specific learning paths available for your tier level.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Additional resources */}
      <div className="bg-gradient-to-br from-[#f8faf9] to-[#e6fbf1] p-6 rounded-xl shadow-sm border border-[#e6fbf1]">
        <h4 className="text-lg font-bold text-[#004851] mb-3">Additional Resources</h4>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#68F6C8] rounded-full"></div>
            <a href="/learning-hub/recommended-tools" className="text-[#004851] hover:text-[#68F6C8] transition-colors">
              AI Tools Directory
            </a>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#68F6C8] rounded-full"></div>
            <a href="/learning-hub/case-studies" className="text-[#004851] hover:text-[#68F6C8] transition-colors">
              Industry Case Studies
            </a>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#68F6C8] rounded-full"></div>
            <a href="/learning-hub/webinars" className="text-[#004851] hover:text-[#68F6C8] transition-colors">
              Upcoming Webinars
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LearningHubDirectionSection; 