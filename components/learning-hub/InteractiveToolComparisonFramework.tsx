"use client";
import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ToolComparisonPDFDocument from './pdf/ToolComparisonPDFDocument';

// Define types for our comparison matrix
interface Tool {
  id: string;
  name: string;
  scores: Record<string, Record<string, {
    score?: number;
    notes: string;
  }>>;
}

interface Criterion {
  id: string;
  name: string;
  weight: number;
  description: string;
  subcriteria: {
    id: string;
    name: string;
  }[];
}

export default function InteractiveToolComparisonFramework() {
  // State to track PDF client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side rendering detection for PDFDownloadLink
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Define the criteria structure based on the markdown
  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      id: 'functionality',
      name: 'Functionality & Features',
      weight: 25,
      description: 'How well does the tool perform its core functions and meet your specific needs?',
      subcriteria: [
        { id: 'core', name: 'Core Capabilities' },
        { id: 'advanced', name: 'Advanced Features' },
        { id: 'scalability', name: 'Scalability & Performance' }
      ]
    },
    {
      id: 'usability',
      name: 'Ease of Use & UX',
      weight: 15,
      description: 'How easily can your target users adopt and effectively utilize the tool?',
      subcriteria: [
        { id: 'interface', name: 'Interface & Design' },
        { id: 'learning', name: 'Learning Curve' },
        { id: 'documentation', name: 'Documentation & Resources' }
      ]
    },
    {
      id: 'integration',
      name: 'Integration Capabilities',
      weight: 15,
      description: 'How easily can the tool connect with your existing technology ecosystem?',
      subcriteria: [
        { id: 'native', name: 'Native Integrations' },
        { id: 'api', name: 'API & Custom Integration' },
        { id: 'data', name: 'Data Import/Export' },
        { id: 'effort', name: 'Implementation Effort' }
      ]
    },
    {
      id: 'vendor',
      name: 'Vendor Support & Reliability',
      weight: 10,
      description: 'How reliable is the vendor and their support infrastructure?',
      subcriteria: [
        { id: 'support', name: 'Technical Support' },
        { id: 'stability', name: 'Vendor Stability' },
        { id: 'roadmap', name: 'Product Roadmap' },
        { id: 'sla', name: 'SLA & Uptime' }
      ]
    },
    {
      id: 'pricing',
      name: 'Pricing & TCO',
      weight: 15,
      description: 'What are the full financial implications of adopting this tool?',
      subcriteria: [
        { id: 'structure', name: 'Pricing Structure' },
        { id: 'license', name: 'License Details' },
        { id: 'tco', name: 'Total Cost Analysis' },
        { id: 'value', name: 'Value Assessment' }
      ]
    },
    {
      id: 'security',
      name: 'Security & Compliance',
      weight: 10,
      description: 'How well does the tool protect your data and meet regulatory requirements?',
      subcriteria: [
        { id: 'infra', name: 'Security Infrastructure' },
        { id: 'compliance', name: 'Compliance' },
        { id: 'governance', name: 'Data Governance' }
      ]
    },
    {
      id: 'ai',
      name: 'AI-Specific Considerations',
      weight: 10,
      description: 'Assess factors unique to AI tools that may impact long-term success.',
      subcriteria: [
        { id: 'transparency', name: 'Model Transparency' },
        { id: 'training', name: 'Training & Customization' },
        { id: 'ethics', name: 'Ethics & Bias' },
        { id: 'oversight', name: 'Human Oversight' }
      ]
    }
  ]);

  // Initialize with two empty tool columns
  const [tools, setTools] = useState<Tool[]>([
    {
      id: 'tool1',
      name: 'Tool A',
      scores: initializeScores(criteria)
    },
    {
      id: 'tool2',
      name: 'Tool B',
      scores: initializeScores(criteria)
    }
  ]);

  // State for showing the definitions panel
  const [expandedDefinitions, setExpandedDefinitions] = useState<string[]>([]);

  // Helper function to initialize empty scores for a new tool
  function initializeScores(criterialist: Criterion[]): Record<string, Record<string, { score?: number; notes: string }>> {
    const scores: Record<string, Record<string, { score?: number; notes: string }>> = {};
    criterialist.forEach(criterion => {
      scores[criterion.id] = {};
      criterion.subcriteria.forEach(sub => {
        scores[criterion.id][sub.id] = { score: undefined, notes: '' };
      });
    });
    return scores;
  }

  // Function to add a new tool column
  const addTool = () => {
    const newId = `tool${tools.length + 1}`;
    setTools([...tools, {
      id: newId,
      name: `Tool ${String.fromCharCode(65 + tools.length)}`, // A, B, C, etc.
      scores: initializeScores(criteria)
    }]);
  };

  // Function to remove a tool column
  const removeTool = (toolId: string) => {
    if (tools.length <= 1) return; // Prevent removing all tools
    setTools(tools.filter(tool => tool.id !== toolId));
  };

  // Function to update tool name
  const updateToolName = (toolId: string, newName: string) => {
    setTools(tools.map(tool =>
      tool.id === toolId ? { ...tool, name: newName } : tool
    ));
  };

  // Function to update a score or note
  const updateScore = (toolId: string, criterionId: string, subcriterionId: string, field: 'score' | 'notes', value: number | string) => {
    setTools(tools.map(tool => {
      if (tool.id === toolId) {
        const newScores = { ...tool.scores };
        if (!newScores[criterionId]) {
          newScores[criterionId] = {};
        }
        if (!newScores[criterionId][subcriterionId]) {
          newScores[criterionId][subcriterionId] = { score: undefined, notes: '' };
        }

        if (field === 'score') {
          newScores[criterionId][subcriterionId].score = value as number;
        } else {
          newScores[criterionId][subcriterionId].notes = value as string;
        }

        return { ...tool, scores: newScores };
      }
      return tool;
    }));
  };

  // Function to calculate the total score for a specific tool and criterion
  const calculateCriterionScore = (tool: Tool, criterionId: string) => {
    const criterion = criteria.find(c => c.id === criterionId);
    if (!criterion) return { score: 0, count: 0 };

    let totalScore = 0;
    let count = 0;

    criterion.subcriteria.forEach(sub => {
      const score = tool.scores[criterionId]?.[sub.id]?.score;
      if (typeof score === 'number') {
        totalScore += score;
        count++;
      }
    });

    return { score: count > 0 ? totalScore / count : 0, count };
  };

  // Function to calculate the overall weighted score for a tool
  const calculateOverallScore = (tool: Tool) => {
    let weightedTotal = 0;
    let weightSum = 0;

    criteria.forEach(criterion => {
      const { score, count } = calculateCriterionScore(tool, criterion.id);
      if (count > 0) {
        weightedTotal += score * criterion.weight;
        weightSum += criterion.weight;
      }
    });

    return weightSum > 0 ? (weightedTotal / weightSum).toFixed(1) : 'N/A';
  };

  // Toggle definitions expanded/collapsed
  const toggleDefinition = (criterionId: string) => {
    setExpandedDefinitions(prev =>
      prev.includes(criterionId)
        ? prev.filter(id => id !== criterionId)
        : [...prev, criterionId]
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-deep-teal mb-4">AI Tool Comparison Framework</h1>
        <p className="text-lg text-gray-700 mb-4">
          Use this interactive framework to systematically evaluate and compare potential AI tools or platforms for a specific use case or business need.
        </p>
        <div className="bg-brand-mint-green/10 border-l-4 border-brand-mint-green p-4 rounded-r-lg">
          <p className="text-brand-deep-teal font-medium">
            Begin by defining your needs, then score each tool against the criteria below. You can add multiple tools to compare side-by-side.
          </p>
        </div>

        {/* PDF Download Button */}
        {/* Temporarily commented out to fix build issues
        {isClient && (
          <PDFDownloadLink
            document={<ToolComparisonPDFDocument tools={tools} />}
            fileName="ai-tool-comparison-framework.pdf"
            className="bg-brand-deep-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center inline-flex"
          >
            {({ loading }) => (
              <>
                <svg 
                  className="w-5 h-5 mr-2" 
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
                {loading ? 'Preparing PDF...' : 'Download PDF Template'}
              </>
            )}
          </PDFDownloadLink>
        )}
        */}
      </div>

      {/* Quick Start Guide */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-brand-deep-teal mb-4">Quick Start Guide</h2>
        <ol className="list-decimal ml-5 space-y-2 text-gray-700">
          <li>First, define your core requirements and use case.</li>
          <li>Add the tools you want to compare (click "Add Tool" button below).</li>
          <li>Score each tool on a scale of 1-5 for each criterion.</li>
          <li>Add notes to capture specific observations.</li>
          <li>Review the calculated scores to identify the best fit.</li>
        </ol>
      </div>

      {/* Criteria Definitions Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-brand-deep-teal">Evaluation Criteria</h2>
          <button
            className="text-sm text-brand-deep-teal hover:text-brand-mint-green transition-colors underline"
            onClick={() => setExpandedDefinitions(expandedDefinitions.length === criteria.length ? [] : criteria.map(c => c.id))}
          >
            {expandedDefinitions.length === criteria.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        <div className="space-y-4">
          {criteria.map(criterion => (
            <div
              key={criterion.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white"
            >
              <button
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleDefinition(criterion.id)}
              >
                <div className="flex items-center">
                  <span className="font-semibold text-brand-deep-teal">{criterion.name}</span>
                  <span className="ml-2 text-sm text-gray-500">({criterion.weight}%)</span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${expandedDefinitions.includes(criterion.id) ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedDefinitions.includes(criterion.id) && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-gray-700 mb-3">{criterion.description}</p>
                  <div className="ml-4">
                    <h4 className="font-semibold text-brand-deep-teal mb-2">Sub-criteria:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {criterion.subcriteria.map(sub => (
                        <li key={sub.id} className="text-gray-700">{sub.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Comparison Matrix */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-brand-deep-teal">Comparison Matrix</h2>
          <button
            onClick={addTool}
            className="bg-brand-mint-green text-brand-deep-teal px-4 py-2 rounded-lg font-semibold hover:bg-brand-mint-green/90 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Tool
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 p-4 text-left w-1/4 text-brand-deep-teal">Criteria</th>
                {tools.map(tool => (
                  <th key={tool.id} className="border border-gray-200 p-4 text-center">
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        value={tool.name}
                        onChange={(e) => updateToolName(tool.id, e.target.value)}
                        className="w-full p-2 text-center font-semibold text-brand-deep-teal bg-transparent border-b border-gray-200 focus:border-brand-mint-green focus:outline-none"
                        placeholder="Tool Name"
                      />
                      <button
                        onClick={() => removeTool(tool.id)}
                        className="mt-2 text-brand-error hover:text-red-700 transition-colors text-sm"
                        title="Remove this tool"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map(criterion => (
                <React.Fragment key={criterion.id}>
                  {/* Main Criterion Row */}
                  <tr className="bg-gray-100">
                    <td className="border border-gray-200 p-4 font-semibold text-brand-deep-teal">
                      {criterion.name} ({criterion.weight}%)
                    </td>
                    {tools.map(tool => {
                      const { score, count } = calculateCriterionScore(tool, criterion.id);
                      return (
                        <td key={`${tool.id}-${criterion.id}`} className="border border-gray-200 p-4 text-center">
                          {count > 0 ? score.toFixed(1) : 'N/A'}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Sub-criteria Rows */}
                  {criterion.subcriteria.map(sub => (
                    <tr key={`${criterion.id}-${sub.id}`}>
                      <td className="border border-gray-200 p-3 pl-8 text-gray-700">
                        {sub.name}
                      </td>
                      {tools.map(tool => (
                        <td key={`${tool.id}-${criterion.id}-${sub.id}`} className="border border-gray-200 p-2">
                          <div className="flex flex-col space-y-2">
                            <div className="flex justify-center">
                              {[1, 2, 3, 4, 5].map(value => (
                                <button
                                  key={value}
                                  className={`w-8 h-8 rounded-full mx-1 border flex items-center justify-center transition-colors ${
                                    tool.scores[criterion.id]?.[sub.id]?.score === value
                                      ? 'bg-brand-mint-green text-white border-brand-mint-green'
                                      : 'bg-white text-gray-600 border-gray-300 hover:border-brand-mint-green'
                                  }`}
                                  onClick={() => updateScore(tool.id, criterion.id, sub.id, 'score', value)}
                                >
                                  {value}
                                </button>
                              ))}
                            </div>
                            <textarea
                              placeholder="Add notes..."
                              value={tool.scores[criterion.id]?.[sub.id]?.notes || ''}
                              onChange={(e) => updateScore(tool.id, criterion.id, sub.id, 'notes', e.target.value)}
                              className="w-full p-2 text-sm border border-gray-200 rounded-md focus:border-brand-mint-green focus:outline-none"
                              rows={2}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* Overall Score Row */}
              <tr className="bg-brand-deep-teal text-white">
                <td className="border border-gray-200 p-4 font-bold">
                  OVERALL SCORE (100%)
                </td>
                {tools.map(tool => (
                  <td key={`${tool.id}-overall`} className="border border-gray-200 p-4 text-center font-bold text-lg">
                    {calculateOverallScore(tool)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary & Recommendation Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-brand-deep-teal mb-4">Summary & Recommendation</h2>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-brand-deep-teal mb-2">Tool Recommendation</h3>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-brand-mint-green focus:outline-none"
              placeholder="Based on the evaluation, which tool appears to be the best fit and why? What are the key differentiators that led to this decision?"
              rows={4}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-brand-deep-teal mb-2">Strengths & Limitations</h3>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-brand-mint-green focus:outline-none"
              placeholder="What are the key strengths of the chosen tool relative to others? What are its limitations or weaknesses that should be monitored?"
              rows={4}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-brand-deep-teal mb-2">Next Steps</h3>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-brand-mint-green focus:outline-none"
              placeholder="What are the immediate next actions? (e.g., detailed demo, pilot project, contract negotiation)"
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Note at the bottom */}
      <div className="p-4 bg-gray-50 rounded-lg text-gray-600 text-sm">
        <p className="font-semibold mb-2">Note:</p>
        <p>
          This framework is adaptable to your specific needs. The weights assigned to different criteria
          should reflect your organization's unique priorities and constraints.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8 mb-16">
        <button
          onClick={addTool}
          className="bg-brand-deep-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Tool
        </button>
      </div>
    </div>
  );
}
