export interface MiniCourseInfo {
  id: string;
  title: string;
  description: string;
  tier: string[];
  image?: string; // Optional thumbnail image path
  slug: string; // Full path from /learning-hub
  duration?: string; // Optional course duration (e.g., "30 min")
  modules?: number; // Optional number of modules/lessons
}

export const miniCourses: MiniCourseInfo[] = [
  {
    id: "prompting-101",
    title: "Prompting 101: From \"Meh\" to \"Magic\" with Simple Instructions",
    description: "Master the art of effective AI prompting to transform vague results into powerful, targeted outputs for your marketing tasks.",
    tier: ["Dabbler"],
    slug: "/learning-hub/prompting-101",
    duration: "30 min",
    modules: 5
  },
  {
    id: "ai-superpowers-5-wins",
    title: "AI Superpowers: Your First 5 Wins (in 30 Minutes)",
    description: "Unlock immediate, tangible results with AI through 5 quick, impactful wins you can achieve in under 30 minutes.",
    tier: ["Dabbler"],
    slug: "/learning-hub/course/ai-superpowers-5-wins",
    duration: "30 min",
    modules: 5
  },
  {
    id: "first-ai-wins",
    title: "Your First AI Wins",
    description: "Get quick, impactful results with AI in your business. Learn practical applications that deliver immediate value.",
    tier: ["Dabbler"],
    slug: "/learning-hub/first-ai-wins",
    duration: "45 min",
    modules: 4
  },
  { 
    id: "advanced-prompting-techniques", 
    title: "Advanced Prompting Techniques", 
    description: "Master the art of crafting effective AI prompts. Learn frameworks and strategies to get consistently useful outputs.", 
    tier: ["Enabler", "Leader"], 
    slug: "/learning-hub/advanced-prompting-techniques",
    duration: "60 min",
    modules: 5
  },
  { 
    id: "ai-driven-organization", 
    title: "Building an AI-Driven Organization", 
    description: "Strategic steps to integrate AI across your business. Transform your company culture and processes for the AI era.", 
    tier: ["Leader"], 
    slug: "/learning-hub/ai-driven-organization",
    duration: "90 min",
    modules: 6
  },
  { 
    id: "ai-content-strategy", 
    title: "AI Content Strategy Blueprint", 
    description: "Develop a comprehensive content strategy powered by AI. Create, optimize, and scale your content production.", 
    tier: ["Dabbler", "Enabler"], 
    slug: "/learning-hub/ai-content-strategy",
    duration: "50 min",
    modules: 4
  },
  { 
    id: "quick-productivity-boosts", 
    title: "Quick Productivity Boosts with AI", 
    description: "Simple, effective ways to save time and enhance your daily workflow with AI tools.", 
    tier: ["Dabbler"], 
    slug: "/learning-hub/quick-productivity-boosts",
    duration: "30 min",
    modules: 3
  },
  { 
    id: "ai-project-management", 
    title: "AI in Project Management", 
    description: "Learn how to integrate AI into your project workflows for better planning, tracking, and execution.", 
    tier: ["Enabler"], 
    slug: "/learning-hub/ai-project-management",
    duration: "60 min",
    modules: 5
  },
  { 
    id: "ai-jargon-buster", 
    title: "AI Jargon Buster", 
    description: "Demystifying AI terminology for business professionals. Get up to speed with essential AI concepts.", 
    tier: ["Dabbler"], 
    slug: "/learning-hub/ai-jargon-buster",
    duration: "25 min",
    modules: 3
  },
  { 
    id: "my-first-ai-tool", 
    title: "Building My First AI Tool", 
    description: "Step-by-step guide to creating and deploying your first custom AI application with no coding required.", 
    tier: ["Dabbler", "Enabler"], 
    slug: "/learning-hub/my-first-ai-tool",
    duration: "70 min",
    modules: 6
  },
  { 
    id: "ai-model-arsenal", 
    title: "AI Model Arsenal: Understanding the Major AI Models and Their Capabilities", 
    description: "Learn about the most powerful AI models available, when to use each one, and how to maximize their potential.", 
    tier: ["Enabler"], 
    slug: "/learning-hub/ai-model-arsenal",
    duration: "45 min",
    modules: 4
  },
  { 
    id: "brand-ai-digital-twin", 
    title: "Brand AI: Training Your Digital Twin", 
    description: "Master the techniques to create and train an AI that authentically represents your brand voice and values.", 
    tier: ["Enabler"], 
    slug: "/learning-hub/brand-ai-digital-twin",
    duration: "60 min",
    modules: 5
  }
];

// Template Data Structure
export interface TemplateInfo {
  id: string;
  title: string;
  description: string;
  tier: string[];
  slug: string; // Full path from /learning-hub
  category?: string; // Optional category for filtering
  downloadable?: boolean; // Whether template can be downloaded
}

export const templates: TemplateInfo[] = [
  { 
    id: "t1", 
    title: "Content Strategy Prompt Template", 
    description: "A template to help you generate comprehensive content strategies with AI assistance.", 
    tier: ["Enabler"], 
    slug: "/learning-hub/templates/content-strategy-prompt",
    category: "Content Creation",
    downloadable: true
  },
  { 
    id: "t2", 
    title: "Email Marketing Campaign Template", 
    description: "Structure your AI-powered email campaigns effectively with this ready-to-use template.", 
    tier: ["Dabbler", "Enabler"], 
    slug: "/learning-hub/templates/email-campaign",
    category: "Marketing",
    downloadable: true
  },
  { 
    id: "t3", 
    title: "AI Project Scoping Template", 
    description: "A framework for defining the scope and requirements of your AI implementation projects.", 
    tier: ["Leader"], 
    slug: "/learning-hub/templates/ai-project-scoping",
    category: "Project Management",
    downloadable: true
  },
  { 
    id: "t4", 
    title: "Social Media Post Generator Template", 
    description: "Generate engaging social media posts across platforms with this structured prompt template.", 
    tier: ["Dabbler"], 
    slug: "/learning-hub/templates/social-media-generator",
    category: "Content Creation",
    downloadable: true
  },
  { 
    id: "t5", 
    title: "AI ROI Calculator Template", 
    description: "Calculate the potential return on investment for your AI initiatives with this spreadsheet template.", 
    tier: ["Leader", "Enabler"], 
    slug: "/learning-hub/templates/ai-roi-calculator",
    category: "Business Planning",
    downloadable: true
  },
  { 
    id: "t6", 
    title: "AI Tool Test Drive Checklist", 
    description: "Evaluate if a new AI tool is worth your time with this interactive checklist for quick tool assessment.", 
    tier: ["Dabbler"], 
    slug: "/learning-hub/templates/ai-tool-checklist",
    category: "Tool Evaluation",
    downloadable: false
  },
  { 
    id: "t7", 
    title: "Beyond Google – AI Answer Engine Revolution", 
    description: "Essential insight brief on how AI-powered answer engines are reshaping SEO and what it means for your marketing strategy.", 
    tier: ["Enabler", "Leader"], 
    slug: "/learning-hub/templates/ai-answer-engine-revolution",
    category: "Insight Brief",
    downloadable: false
  },
  { 
    id: "t8", 
    title: "CRM Supercharged", 
    description: "Insight brief on supercharging your CRM with AI capabilities for better customer engagement and sales performance.", 
    tier: ["Enabler", "Leader"], 
    slug: "/learning-hub/templates/crm-supercharged",
    category: "Insight Brief",
    downloadable: false
  }
];
