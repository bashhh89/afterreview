"use client";
import React, { useState } from 'react';
// Comment out the problematic import
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import PlanningTemplatePDFDocument from './PlanningTemplatePDFDocument';

// Define the structure of a phase in the planning template
interface PlanningPhase {
  id: string;
  title: string;
  description: string;
  sections: {
    title: string;
    items: string[];
  }[];
}

export default function InteractivePlanningTemplate() {
  // State to track which accordion sections are expanded
  const [expandedPhases, setExpandedPhases] = useState<string[]>([]);
  // State to track PDF download
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side rendering detection for PDFDownloadLink
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to toggle expansion of a phase
  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId) 
        : [...prev, phaseId]
    );
  };

  // Planning phases data structured from the markdown content
  const planningPhases: PlanningPhase[] = [
    {
      id: 'phase1',
      title: 'Phase 1: Strategy & Goal Definition',
      description: 'Clearly defining the purpose, goals, and scope of your AI project is the first step towards success.',
      sections: [
        {
          title: 'Problem Statement',
          items: [
            'What specific business problem, challenge, or opportunity will this AI initiative address?',
            'Describe the current state, how this problem is currently handled, and the limitations of the current approach.'
          ]
        },
        {
          title: 'Desired Outcome',
          items: [
            'What does success look like for this initiative?',
            'How will things be demonstrably different or better after the AI solution is implemented?'
          ]
        },
        {
          title: 'SMART Objectives',
          items: [
            'Define clear, measurable, achievable, relevant, and time-bound (SMART) goals.',
            '(e.g., Increase lead score accuracy by 20% in Q3; Reduce report generation time by 5 hours/week within 60 days).'
          ]
        },
        {
          title: 'Success Metrics (KPIs)',
          items: [
            'What specific Key Performance Indicators (KPIs) will be used to track progress towards the objectives?',
            'What are the current baseline values for these KPIs, if available? What are the target values?'
          ]
        },
        {
          title: 'Stakeholders',
          items: [
            'Identify key sponsors, champions, end-users, technical contacts, and subject matter experts.',
            'What are their respective roles, responsibilities, and expectations for this project?'
          ]
        },
        {
          title: 'Scope Definition',
          items: [
            'Clearly define what is IN scope for this specific project, phase, or iteration.',
            'Clearly define what is OUT of scope to manage expectations and prevent scope creep.',
            'Are there any known constraints (e.g., budget, timeline, resources)?'
          ]
        }
      ]
    },
    {
      id: 'phase2',
      title: 'Phase 2: Data Assessment & Readiness',
      description: 'Data is the lifeblood of AI. This phase ensures you have the right quality and quantity of data.',
      sections: [
        {
          title: 'Data Requirements',
          items: [
            'What specific data sources (internal and/or external) are needed for this AI initiative?',
            'How will this data be accessed, collected, and ingested?'
          ]
        },
        {
          title: 'Data Quality & Availability',
          items: [
            'Evaluate the accuracy, completeness, consistency, timeliness, and overall quality of the required data.',
            'Is there sufficient volume of data available for training, validation, and testing the AI model?',
            'Identify any gaps in data availability or quality and outline steps to address them.'
          ]
        },
        {
          title: 'Data Representativeness & Bias',
          items: [
            'Does the available data accurately reflect the real-world scenarios the AI will encounter?',
            'Are there potential biases (e.g., demographic, historical) present in the data that could lead to unfair or unintended outcomes? How will these be mitigated?'
          ]
        },
        {
          title: 'Compliance & Ethics',
          items: [
            'Outline all relevant data privacy regulations (e.g., GDPR, CCPA, HIPAA), security protocols, and ethical considerations.',
            'Reference any internal data governance policies or industry-specific compliance requirements.',
            'Consider referencing a detailed "Data Privacy & Compliance Checklist" if applicable.'
          ]
        }
      ]
    },
    {
      id: 'phase3',
      title: 'Phase 3: Technology & Solution Design',
      description: 'Selecting the appropriate technology and designing the solution architecture are critical.',
      sections: [
        {
          title: 'Technical Requirements',
          items: [
            'List essential technical requirements for the AI solution, including integration points with existing systems, performance benchmarks, scalability needs, and security standards.'
          ]
        },
        {
          title: 'Build vs. Buy Consideration',
          items: [
            'Analyze the feasibility, pros, cons, and trade-offs of building a custom AI solution in-house versus leveraging existing vendor solutions or platforms.',
            'Consider factors such as cost, time-to-market, required expertise, customization needs, and long-term maintenance.'
          ]
        },
        {
          title: 'Tool/Platform Selection',
          items: [
            'If buying or using existing platforms, define clear criteria for evaluating and selecting the right AI tools, libraries, or platforms.',
            '(Consider linking to the future \'AI Tool Comparison Framework\' template here).'
          ]
        },
        {
          title: 'Infrastructure Needs',
          items: [
            'Specify the computational resources (e.g., CPU, GPU, memory) and infrastructure (e.g., cloud, on-premise, hybrid) needed for development, training, deployment, and ongoing operation.'
          ]
        },
        {
          title: 'Team Skills & Expertise',
          items: [
            'Assess the required technical skills and domain expertise (e.g., data science, machine learning engineering, software development, DevOps) against the current team\'s capabilities.',
            'Identify any skill gaps and outline plans for training, upskilling, or hiring.'
          ]
        },
        {
          title: 'Solution Architecture',
          items: [
            'Provide a high-level overview of the proposed solution architecture, including key components and how they interact.'
          ]
        }
      ]
    },
    {
      id: 'phase4',
      title: 'Phase 4: Pilot Program & Implementation',
      description: 'A pilot program allows for testing the solution on a smaller scale before full rollout.',
      sections: [
        {
          title: 'Pilot Scope & Goals',
          items: [
            'Define a limited, manageable scope for an initial pilot program.',
            'What specific hypotheses are being tested? What are the clear success criteria for the pilot?'
          ]
        },
        {
          title: 'Pilot Users & Use Cases',
          items: [
            'Identify the target users and specific use cases for the pilot program.',
            'How will these users be selected, recruited, and onboarded?'
          ]
        },
        {
          title: 'Implementation Plan',
          items: [
            'Outline the key milestones, tasks, deliverables, roles, responsibilities, and timelines for developing and deploying the pilot solution.'
          ]
        },
        {
          title: 'Training & Onboarding',
          items: [
            'Detail the plan for training pilot users and relevant stakeholders on using the AI solution and interpreting its outputs.',
            'What training materials or resources will be provided?'
          ]
        },
        {
          title: 'Risk Management',
          items: [
            'Identify potential risks during the pilot phase (e.g., technical, operational, data-related, user adoption).',
            'Develop mitigation strategies and contingency plans for these identified risks.'
          ]
        }
      ]
    },
    {
      id: 'phase5',
      title: 'Phase 5: Monitoring, Evaluation & Feedback',
      description: 'Continuous monitoring and evaluation are key to understanding performance and gathering insights.',
      sections: [
        {
          title: 'Baseline Comparison',
          items: [
            'Document the pre-pilot baseline metrics (established in Phase 1 KPIs) to measure the impact of the AI solution accurately.'
          ]
        },
        {
          title: 'Monitoring Strategy',
          items: [
            'How will the defined KPIs, system performance, and model behavior be tracked during and after the pilot?',
            'What tools, dashboards, or processes will be used for monitoring? How frequently will performance be reviewed?'
          ]
        },
        {
          title: 'Feedback Loop',
          items: [
            'Define a structured process for collecting, analyzing, and acting upon feedback from pilot users and other stakeholders.',
            'What channels will be used (e.g., surveys, interviews, feedback forms, user testing sessions)?'
          ]
        },
        {
          title: 'Evaluation Criteria',
          items: [
            'How will the overall success and effectiveness of the pilot be evaluated against its goals and KPIs?'
          ]
        }
      ]
    },
    {
      id: 'phase6',
      title: 'Phase 6: Iteration, Scaling & Governance',
      description: 'Based on pilot outcomes, the solution is refined, scaled, and put under long-term governance.',
      sections: [
        {
          title: 'Pilot Analysis & ROI',
          items: [
            'Comprehensively analyze the pilot results against the defined KPIs and objectives.',
            'Calculate the initial Return on Investment (ROI) or value delivered by the pilot.',
            'Document key learnings, insights, and any unexpected outcomes.'
          ]
        },
        {
          title: 'Refinement Plan',
          items: [
            'Based on pilot analysis and feedback, outline how learnings will be used to iterate, refine, and improve the solution (e.g., model adjustments, UI/UX changes, workflow optimizations).'
          ]
        },
        {
          title: 'Scaling Strategy',
          items: [
            'If the pilot is successful, define the criteria, strategy, and steps for a wider rollout or scaling the solution (e.g., to more users, departments, or use cases).',
            'Consider infrastructure scalability, resource allocation, and potential challenges.'
          ]
        },
        {
          title: 'Change Management',
          items: [
            'Develop a plan for managing the organizational change associated with broader adoption.',
            'This includes communication strategies, stakeholder engagement, and support for users transitioning to the new solution.'
          ]
        },
        {
          title: 'Long-Term Governance',
          items: [
            'Outline a plan for the ongoing maintenance, monitoring, performance management, and ethical oversight of the AI solution in production.',
            'How will the model be retrained or updated over time? Who is responsible for its long-term success and integrity?'
          ]
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#004851] mb-4">AI Project Planning Template</h1>
          <p className="text-lg text-gray-700">
            A comprehensive framework to guide you through planning and implementing AI initiatives within your organization.
          </p>
        </div>
        
        {/* PDF Download Button */}
        {/* Commented out to avoid build issues
        {isClient && (
          <PDFDownloadLink 
            document={<PlanningTemplatePDFDocument />} 
            fileName="ai-project-planning-template.pdf"
            className="inline-flex items-center gap-2 bg-[#004851] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#004851]/90 focus:outline-none focus:ring-2 focus:ring-[#68F6C8] transition-colors"
          >
            {({ loading }) => (
              <>
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m-3-3V4" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 16v2a2 2 0 002 2h10a2 2 0 002-2v-2" 
                  />
                </svg>
                {loading ? 'Preparing PDF...' : 'Download PDF'}
              </>
            )}
          </PDFDownloadLink>
        )}
        */}
      </div>

      <div className="mb-8">
        <p className="text-lg text-gray-700">
          This interactive template provides a framework for planning your AI initiatives. 
          Click on each phase to expand and view the detailed considerations and guiding questions.
        </p>
        <div className="bg-[#68F6C8]/10 border-l-4 border-[#68F6C8] p-4 rounded-r-lg mt-4">
          <p className="text-[#004851] font-medium">
            Tip: Consider addressing these questions in a collaborative session with key stakeholders from business, 
            technical, and operational teams to ensure alignment.
          </p>
        </div>
      </div>

      {/* Accordion sections for each phase */}
      <div className="space-y-6">
        {planningPhases.map((phase) => (
          <div 
            key={phase.id} 
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Accordion header */}
            <button
              className={`w-full text-left p-5 rounded-t-lg flex justify-between items-center ${
                expandedPhases.includes(phase.id) ? 'bg-[#004851] text-white' : 'bg-white text-[#004851]'
              }`}
              onClick={() => togglePhase(phase.id)}
              aria-expanded={expandedPhases.includes(phase.id)}
            >
              <h2 className="text-xl font-bold">{phase.title}</h2>
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${
                  expandedPhases.includes(phase.id) ? 'transform rotate-180' : ''
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Accordion content */}
            {expandedPhases.includes(phase.id) && (
              <div className="p-5 bg-white border-t border-gray-200 rounded-b-lg animate-fade-in">
                <p className="text-gray-700 italic mb-6">{phase.description}</p>
                
                <div className="space-y-6">
                  {phase.sections.map((section, idx) => (
                    <div key={idx} className="border-l-4 border-[#68F6C8] pl-4">
                      <h3 className="font-semibold text-[#004851] text-lg mb-2">{section.title}:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Note at the bottom */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-gray-600 text-sm">
        <p className="font-semibold mb-2">Note:</p>
        <p>
          This template is a comprehensive guide. Adapt its sections and depth to suit the specific context, 
          complexity, and scale of your AI project.
        </p>
      </div>
    </div>
  );
} 