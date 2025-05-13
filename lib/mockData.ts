// Mock data for development of Results Page
// This file contains realistic mock data that mimics the structure and content
// of actual AI Scorecard reports from the API

// Leader tier mock report 
export const mockLeaderReport = {
  reportId: "mock-leader-report-123",
  leadName: "Jane Roberts",
  companyName: "Apex Technologies",
  email: "jane.roberts@apextechnologies.com",
  tier: "Leader",
  userAITier: "Leader", // Alternative field names for redundancy
  aiTier: "Leader",
  industry: "Technology",
  createdAt: new Date().toISOString(),
  questionAnswerHistory: [
    {
      question: "How does your organization currently use AI?",
      answer: "We use AI across multiple departments including customer service, product development, and operations."
    },
    {
      question: "Do you have a dedicated AI team or specialists?",
      answer: "Yes, we have a dedicated AI team with specialists in machine learning, data science, and AI ethics."
    },
    {
      question: "How are AI projects funded in your organization?",
      answer: "We have a dedicated budget for AI initiatives and innovation projects."
    }
  ],
  reportMarkdown: `# AI Maturity Scorecard Analysis

## Overall Tier: Leader

Your organization is operating at the **Leader** tier of AI maturity. You demonstrate a strategic, integrated approach to AI adoption that is yielding significant business value.

## Key Findings

### Strengths:

- Strong executive sponsorship and strategic vision for AI adoption
- Established AI governance framework with clear ethical guidelines
- Cross-functional AI teams with specialized expertise
- Robust data infrastructure and management practices
- Continuous measurement of AI impact on business outcomes

### Areas for Improvement:

- Further scaling AI solutions across all business units
- Enhancing knowledge sharing between technical and business teams
- Developing more comprehensive AI risk assessment methodologies
- Building stronger external partnerships with AI research communities
- Increasing diversity in AI teams to mitigate algorithmic bias

## Strategic Action Plan

1. Implement an AI Center of Excellence to coordinate AI initiatives across all departments
2. Develop a formal AI skills development program for all employees
3. Establish an AI ethics review board with diverse representation
4. Create an AI innovation fund to support experimental projects
5. Build a comprehensive data quality monitoring system

## Detailed Analysis

### AI Strategy & Vision

Your organization has a clear, documented AI strategy that aligns with your overall business objectives. Leadership demonstrates strong understanding of AI capabilities and limitations, setting realistic expectations. There is a formal process for prioritizing AI initiatives based on business impact.

### AI Talent & Skills

You have successfully built a strong team of AI specialists, including data scientists, ML engineers, and AI ethicists. Your organization has implemented structured training programs to upskill existing employees across different functions. Knowledge sharing mechanisms are in place but could be further enhanced to bridge the gap between technical and business teams.

### Data Readiness

Your data infrastructure is well-developed, with established practices for data governance, quality control, and accessibility. Data is treated as a strategic asset with formal ownership and stewardship. There are opportunities to further improve data integration across legacy systems.

### Technical Infrastructure

You have invested in scalable, enterprise-grade AI infrastructure with appropriate tools for development, deployment, and monitoring. Security and compliance considerations are integrated into your technical architecture. Your model deployment processes follow industry best practices.

### AI Ethics & Governance

Your organization has established a comprehensive AI governance framework with clear ethical guidelines. There are formal processes for assessing AI risks and addressing ethical concerns. You have mechanisms in place to ensure transparency in AI systems but could benefit from more diverse representation in ethics discussions.

### AI Integration & Implementation

AI is successfully integrated into core business processes and products, delivering measurable value. There are established methodologies for AI project management and implementation. Your organization effectively manages the change associated with AI adoption across different stakeholders.

### Innovation Culture

You have fostered a culture that encourages experimentation and learning from failure. There are formal mechanisms to support innovation, including dedicated time and resources for exploration. Your organization actively collaborates with external partners but could deepen engagement with research communities.

### Measurement & Value Realization

Your organization consistently measures the impact of AI on business outcomes using well-defined metrics. There are processes in place to monitor and evaluate AI performance over time. You effectively communicate AI value to stakeholders through structured reporting.

## Illustrative Benchmarks

### Your Organization vs Industry Average

Organizations at the Leader tier typically outperform industry averages in the following areas:

- **AI Investment**: Leaders invest 2-3x more of their IT budget in AI initiatives compared to industry average
- **AI Adoption**: 70-80% of business units actively use AI solutions (vs. 30-40% industry average)
- **ROI from AI**: Leaders report 20-30% higher ROI from AI initiatives
- **Time to Value**: 40% faster deployment of AI solutions from concept to production
- **AI Talent**: 3-4x more AI specialists per 1000 employees than industry average

### Benchmark Comparison by Function

| Function | Leader Tier | Enabler Tier (You) | Laggard |
|----------|-------------|-----------------|---------|
| Strategy | Comprehensive AI strategy with clear goals | Emerging AI strategy | Ad hoc or no formal strategy |
| Data | Enterprise data platform with governance | Improving data capabilities | Minimal data infrastructure |
| Talent | Dedicated AI team with specialized roles | Growing AI expertise | No dedicated AI resources |
| Technology | Scalable AI infrastructure | Mixed AI infrastructure | Experimental only |
| Governance | Formal AI ethics framework | Developing governance | No governance |

## Your Learning Path

Based on your Leader tier assessment, we recommend focusing on these advanced AI topics:

1. **AI Ethics and Responsible AI Governance**
   - Learn how to establish comprehensive AI ethics frameworks
   - Develop robust processes for AI risk assessment and mitigation

2. **Enterprise-wide AI Integration**
   - Strategies for scaling AI adoption across all business functions
   - Advanced organizational change management for AI transformation

3. **AI Innovation and Future-proofing**
   - Stay ahead of emerging AI technologies and applications
   - Develop an innovation roadmap for continued AI leadership

## Conclusion

As a Leader in AI maturity, your organization has established a strong foundation for sustained AI innovation and value creation. By addressing the identified areas for improvement and implementing the recommended actions, you can further strengthen your position and maximize the benefits of AI across your enterprise.

Continue building on your existing strengths while working to scale AI adoption, enhance knowledge sharing, develop comprehensive risk assessment methodologies, strengthen external partnerships, and increase diversity in AI teams.`
};

// Enabler tier mock report
export const mockEnablerReport = {
  reportId: "mock-enabler-report-456",
  leadName: "Michael Chen",
  companyName: "Meridian Solutions",
  email: "michael.chen@meridiansolutions.com",
  tier: "Enabler",
  userAITier: "Enabler",
  aiTier: "Enabler",
  industry: "Professional Services",
  createdAt: new Date().toISOString(),
  questionAnswerHistory: [
    {
      question: "How does your organization currently use AI?",
      answer: "We use AI in a few departments, primarily for automation and customer insights."
    },
    {
      question: "Do you have a dedicated AI team or specialists?",
      answer: "We have a few data scientists who work on AI projects, but not a dedicated team."
    },
    {
      question: "How are AI projects funded in your organization?",
      answer: "AI projects are funded on a case-by-case basis, usually from departmental budgets."
    }
  ],
  reportMarkdown: `# AI Maturity Scorecard Analysis

## Overall Tier: Enabler

Your organization is operating at the **Enabler** tier of AI maturity. You have made significant progress in adopting AI with some structured approaches, but there are opportunities to develop more strategic and integrated capabilities.

## Key Findings

### Strengths:

- Successful implementation of AI in specific business functions
- Growing awareness of AI's strategic potential across leadership
- Developing data management practices to support AI initiatives
- Emerging governance frameworks for AI deployment
- Active experimentation with new AI use cases

### Areas for Improvement:

- Limited coordination of AI initiatives across the organization
- Inconsistent approaches to measuring AI business impact
- Skills gaps in specialized AI roles and general AI literacy
- Data silos limiting full potential of AI applications
- Reactive approach to AI ethics and risk management

## Strategic Action Plan

1. Develop a formal AI strategy aligned with business objectives
2. Establish cross-functional AI steering committee with executive sponsorship
3. Implement structured AI skills development program for technical and non-technical staff
4. Create a unified data architecture plan to address data silos
5. Develop proactive AI ethics and governance frameworks

## Detailed Analysis

### AI Strategy & Vision

Your organization recognizes the importance of AI and has started to incorporate it into business planning. While there is growing executive interest, a comprehensive AI strategy with clear goals and investment priorities is still emerging. Individual departments have varying levels of AI adoption, with limited coordination across the enterprise.

### AI Talent & Skills

You have pockets of AI expertise but face challenges in recruiting and retaining specialized talent. There are inconsistent approaches to AI skills development across teams. Non-technical staff would benefit from increased AI literacy to better collaborate on AI initiatives and identify new use cases.

### Data Readiness

Your organization has made progress in establishing data management practices, but data quality and accessibility remain inconsistent across different systems. There are emerging data governance structures, though they are not yet fully mature. Data silos continue to limit the potential of AI applications.

### Technical Infrastructure

You have implemented AI tools and platforms in specific areas but lack a cohesive enterprise architecture for AI. There are varying approaches to model development and deployment across teams. Security and compliance considerations are addressed but not consistently integrated into AI development processes.

### AI Ethics & Governance

Your organization is developing awareness of AI ethics and governance issues. There are some policies in place, but they tend to be reactive rather than proactive. More structured approaches to identifying and mitigating AI risks would strengthen your governance framework.

### AI Integration & Implementation

AI has been successfully integrated into specific business functions with positive results. Project implementation methodologies are evolving but not yet standardized. Change management approaches for AI adoption would benefit from more structure and consistency.

### Innovation Culture

There is growing openness to experimentation and innovation with AI. You have examples of successful AI pilots that demonstrate value. Collaboration mechanisms within the organization are developing, though external partnerships could be further leveraged.

### Measurement & Value Realization

You have begun to measure the impact of AI in specific areas but lack consistent approaches across the organization. Business case development for AI initiatives varies in rigor and comprehensiveness. More structured value tracking would help demonstrate and communicate AI's contribution to business outcomes.

## Illustrative Benchmarks

### Your Organization vs Industry Average

Organizations at the Enabler tier typically show the following comparison to industry averages:

- **AI Investment**: Enablers invest about 1.5x the industry average in AI initiatives
- **AI Adoption**: 40-60% of business units actively use AI solutions (vs. 30-40% industry average)
- **ROI from AI**: Enablers report ROI consistent with or slightly above industry average
- **Time to Value**: 10-20% faster deployment of AI solutions from concept to production
- **AI Talent**: 1-2x more AI specialists per 1000 employees than industry average

### Benchmark Comparison by Function

| Function | Leader Tier | Enabler Tier (You) | Laggard |
|----------|-------------|-----------------|---------|
| Strategy | Comprehensive AI strategy with clear goals | Emerging AI strategy | Ad hoc or no formal strategy |
| Data | Enterprise data platform with governance | Improving data capabilities | Minimal data infrastructure |
| Talent | Dedicated AI team with specialized roles | Growing AI expertise | No dedicated AI resources |
| Technology | Scalable AI infrastructure | Mixed AI infrastructure | Experimental only |
| Governance | Formal AI ethics framework | Developing governance | No governance |

## Your Learning Path

Based on your Enabler tier assessment, we recommend focusing on these key AI topics:

1. **Strategic AI Planning and Governance**
   - Develop a comprehensive AI strategy aligned with business objectives
   - Establish AI governance structures and policies

2. **Data Strategy and Management**
   - Build robust data infrastructure and governance practices
   - Implement data quality management processes

3. **AI Talent Development**
   - Strategies for upskilling existing staff and recruiting specialized talent
   - Creating cross-functional AI teams for maximum impact

## Conclusion

As an Enabler in AI maturity, your organization has built important foundations for AI adoption and demonstrated value in specific areas. By addressing the identified areas for improvement and implementing the recommended actions, you can move toward a more strategic, coordinated approach to AI that generates greater business impact.

Focus on developing a formal AI strategy, establishing cross-functional governance, building broader AI skills, addressing data silos, and creating proactive ethics frameworks to accelerate your AI maturity journey.`
};

// Dabbler tier mock report
export const mockDabblerReport = {
  reportId: "mock-dabbler-report-789",
  leadName: "Sarah Thompson",
  companyName: "Horizon Consultants",
  email: "sarah.thompson@horizonconsultants.com",
  tier: "Dabbler",
  userAITier: "Dabbler",
  aiTier: "Dabbler",
  industry: "Consulting",
  createdAt: new Date().toISOString(),
  questionAnswerHistory: [
    {
      question: "How does your organization currently use AI?",
      answer: "We have a few experimental projects but no formal implementation."
    },
    {
      question: "Do you have a dedicated AI team or specialists?",
      answer: "No, we don't have dedicated AI specialists. Some team members experiment with AI tools."
    },
    {
      question: "How are AI projects funded in your organization?",
      answer: "There's no formal funding process for AI specifically."
    }
  ],
  reportMarkdown: `# AI Maturity Scorecard Analysis

## Overall Tier: Dabbler

Your organization is operating at the **Dabbler** tier of AI maturity. You are in the early stages of AI adoption with primarily experimental and ad hoc approaches.

## Key Findings

### Strengths:

- Emerging interest in AI potential across parts of the organization
- Initial experimentation with AI tools and applications
- Individual champions driving awareness and early adoption
- Openness to learning about AI capabilities and use cases
- Some successful small-scale AI implementations

### Areas for Improvement:

- Lack of formal AI strategy or executive sponsorship
- Limited AI expertise and insufficient skills development
- Inconsistent data quality and accessibility issues
- Absence of AI governance and risk management frameworks
- Ad hoc approach to AI project selection and implementation

## Strategic Action Plan

1. Secure executive sponsorship and develop initial AI vision
2. Conduct an AI readiness assessment across the organization
3. Identify and prioritize 2-3 high-value AI use cases for pilot projects
4. Develop a basic data quality and management framework
5. Invest in foundational AI skills development for key staff

## Detailed Analysis

### AI Strategy & Vision

Your organization shows emerging interest in AI but lacks a formal strategy or vision. AI initiatives are primarily driven by individual champions rather than executive leadership. There is limited alignment between AI activities and broader business objectives, with AI projects happening in isolation.

### AI Talent & Skills

You have limited internal AI expertise with heavy reliance on external vendors or consultants. There is no structured approach to AI skills development, and awareness of AI capabilities varies significantly across teams. Basic AI literacy is needed for both technical and business stakeholders.

### Data Readiness

Your organization faces significant challenges with data quality, accessibility, and governance. Data tends to exist in silos with limited integration. There is minimal structured data management, making it difficult to leverage data effectively for AI applications.

### Technical Infrastructure

Your AI infrastructure is largely experimental with limited production deployments. There is heavy reliance on third-party tools without integration into broader technology architecture. Security and compliance considerations for AI are not systematically addressed.

### AI Ethics & Governance

Your organization has minimal awareness of AI ethics issues and lacks formal governance structures. There are no established processes for identifying or managing AI risks. Ethical considerations tend to be reactive rather than proactive when implementing AI solutions.

### AI Integration & Implementation

AI projects tend to be standalone initiatives without integration into core business processes. Implementation approaches are ad hoc with limited methodology or best practices. Change management for AI adoption is minimal, leading to adoption challenges.

### Innovation Culture

While there is some openness to new technologies, innovation processes around AI are underdeveloped. Experimentation tends to happen in isolation without structured learning. Internal collaboration on AI initiatives is limited, with minimal external partnerships.

### Measurement & Value Realization

Your organization lacks consistent approaches to measuring AI value or impact. Business cases for AI initiatives are often informal or incomplete. There is limited visibility into the actual return on AI investments across different projects.

## Illustrative Benchmarks

### Your Organization vs Industry Average

Organizations at the Dabbler tier typically compare to industry averages as follows:

- **AI Investment**: Dabblers invest about 0.5x the industry average in AI initiatives
- **AI Adoption**: 10-20% of business units actively use AI solutions (vs. 30-40% industry average)
- **ROI from AI**: Dabblers often report inconsistent or unmeasured ROI from AI initiatives
- **Time to Value**: 30-50% slower deployment of AI solutions from concept to production
- **AI Talent**: Significantly fewer AI specialists than industry average

### Benchmark Comparison by Function

| Function | Leader Tier | Industry Average | Dabbler Tier (You) |
|----------|-------------|------------------|-----------------|
| Strategy | Comprehensive AI strategy with clear goals | Partial strategy, limited scope | Ad hoc or no formal strategy |
| Data | Enterprise data platform with governance | Departmental data silos | Minimal data infrastructure |
| Talent | Dedicated AI team with specialized roles | Limited AI expertise | No dedicated AI resources |
| Technology | Scalable AI infrastructure | Point solutions | Experimental only |
| Governance | Formal AI ethics framework | Basic policies | No governance |

## Your Learning Path

Based on your Dabbler tier assessment, we recommend focusing on these foundational AI topics:

1. **AI Fundamentals and Use Cases**
   - Understand key AI concepts, capabilities, and limitations
   - Identify high-value AI opportunities for your organization

2. **Building Your First AI Projects**
   - Practical approaches to starting small with AI implementation
   - Quick wins and proof-of-concept strategies

3. **Data Readiness Fundamentals**
   - Assessing your current data capabilities
   - Essential steps for improving data quality and accessibility

## Conclusion

As a Dabbler in AI maturity, your organization is taking its first steps on the AI journey. By addressing the identified areas for improvement and implementing the recommended actions, you can build stronger foundations for successful AI adoption and begin to realize more significant business value.

Focus on securing executive sponsorship, conducting a thorough readiness assessment, identifying targeted use cases, developing data capabilities, and investing in skills development to accelerate your AI maturity journey.`
};

// Helper function to get the appropriate mock report by tier
export function getMockReportByTier(tier: string) {
  const normalizedTier = tier.toLowerCase().trim();
  
  if (normalizedTier === "leader") {
    return mockLeaderReport;
  } else if (normalizedTier === "enabler") {
    return mockEnablerReport;
  } else if (normalizedTier === "dabbler") {
    return mockDabblerReport;
  }
  
  // Default to enabler if tier not recognized
  console.warn(`Unrecognized tier "${tier}" - defaulting to "enabler"`);
  return mockEnablerReport;
} 