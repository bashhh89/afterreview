import React, { useState, useEffect } from 'react';
// Comment out the problematic import
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import PrioritizationMatrixPDFDocument from './pdf/PrioritizationMatrixPDFDocument';

// Define interface for a use case row
interface UseCase {
  id: string;
  description: string;
  impact: number;
  effort: number;
  confidence: number;
  strategy: number;
  priorityScore: number;
  rank: number;
  notes: string;
}

const InteractivePrioritizationMatrix: React.FC = () => {
  // Initial example rows
  const initialUseCases: UseCase[] = [
    {
      id: '1',
      description: 'AI-Powered Lead Scoring',
      impact: 4,
      effort: 3,
      confidence: 4,
      strategy: 5,
      priorityScore: 10, // (4+4+5)-3=10
      rank: 1,
      notes: 'Requires clean CRM data; Integrate with Sales P.',
    },
    {
      id: '2',
      description: 'Customer Support Chatbot',
      impact: 3,
      effort: 4,
      confidence: 3,
      strategy: 3,
      priorityScore: 5, // (3+3+3)-4=5
      rank: 2,
      notes: 'Needs comprehensive knowledge base; Pilot with FAQ.',
    },
  ];

  // State for use cases
  const [useCases, setUseCases] = useState<UseCase[]>(initialUseCases);
  // State for collapsible sections
  const [showCriteria, setShowCriteria] = useState(true);
  // State for client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side rendering detection for PDFDownloadLink
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate priority scores and ranks whenever use cases change
  useEffect(() => {
    if (!useCases.length) return;

    const updatedUseCases = useCases.map((useCase) => {
      // Calculate priority score
      const priorityScore = (useCase.impact + useCase.confidence + useCase.strategy) - useCase.effort;
      return { ...useCase, priorityScore };
    });

    // Sort by priority score descending
    const sortedUseCases = [...updatedUseCases].sort((a, b) => b.priorityScore - a.priorityScore);

    // Assign ranks
    const rankedUseCases = sortedUseCases.map((useCase, index) => ({
      ...useCase,
      rank: index + 1,
    }));

    // Update state with new ranks and priority scores (maintain original order)
    setUseCases(
      useCases.map((useCase) => {
        const updated = rankedUseCases.find((u) => u.id === useCase.id);
        return updated || useCase;
      })
    );
  }, [useCases]);

  // Handle input change for any field
  const handleInputChange = (id: string, field: keyof UseCase, value: string | number) => {
    setUseCases((prevUseCases) =>
      prevUseCases.map((useCase) => {
        if (useCase.id === id) {
          // For score fields, ensure value is between 1-5
          if (['impact', 'effort', 'confidence', 'strategy'].includes(field) && typeof value === 'string') {
            const numValue = Number(value);
            const clampedValue = Math.min(Math.max(isNaN(numValue) ? 1 : numValue, 1), 5);
            return { ...useCase, [field]: clampedValue };
          }
          return { ...useCase, [field]: value };
        }
        return useCase;
      })
    );
  };

  // Add new empty row
  const addRow = () => {
    const newId = String(useCases.length + 1);
    setUseCases([
      ...useCases,
      {
        id: newId,
        description: '',
        impact: 3, // Default middle values for scoring
        effort: 3,
        confidence: 3,
        strategy: 3,
        priorityScore: 6, // Will be recalculated on render
        rank: useCases.length + 1,
        notes: '',
      },
    ]);
  };

  // Delete row
  const deleteRow = (id: string) => {
    setUseCases(useCases.filter((useCase) => useCase.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-deep-teal mb-6">
        AI Use Case Prioritization Matrix
      </h1>

      <div className="mb-6">
        <blockquote className="border-l-4 border-brand-mint-green pl-4 italic text-gray-600 my-4">
          Use this framework to evaluate and prioritize potential AI initiatives based on key business and technical factors.
          This helps focus resources on the most impactful opportunities first.
        </blockquote>

        {/* PDF Download Link */}
        <div className="mt-4">
          {/* Comment out PDF download functionality 
          {isClient && (
            <PDFDownloadLink
              document={<PrioritizationMatrixPDFDocument useCases={useCases} />}
              fileName="ai-use-case-prioritization-matrix.pdf"
              className="bg-brand-deep-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all inline-flex items-center"
            >
              {({ blob, url, loading, error }) =>
                loading ?
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </> :
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </>
              }
            </PDFDownloadLink>
          )}
          */}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-deep-teal mb-4">Instructions:</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li className="text-gray-700">List your potential AI initiatives or use cases in the table below.</li>
          <li className="text-gray-700">Score each use case against the defined criteria (1-5 scale).</li>
          <li className="text-gray-700">The priority score will be automatically calculated using the formula: (Impact + Confidence + Strategic Alignment) - Effort.</li>
          <li className="text-gray-700">Rankings will be automatically assigned based on priority scores.</li>
        </ol>
      </div>

      {/* Criteria Definitions (Collapsible) */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <button
          onClick={() => setShowCriteria(!showCriteria)}
          className="w-full flex items-center justify-between p-4 text-left font-semibold text-brand-deep-teal hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-xl font-bold">Prioritization Criteria Definitions</h2>
          <span>
            {showCriteria ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </span>
        </button>

        {showCriteria && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-brand-deep-teal">(A) Potential Business Impact (Score 1-5):</h3>
                <p className="text-gray-700 mb-2">How significantly could this initiative impact key business goals (e.g., revenue, cost savings, efficiency, customer experience)?</p>
                <ul className="ml-6 space-y-1 text-sm text-gray-600">
                  <li>5 = Transformational Impact</li>
                  <li>4 = High Impact</li>
                  <li>3 = Moderate Impact</li>
                  <li>2 = Low Impact</li>
                  <li>1 = Minor Impact</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-brand-deep-teal">(B) Implementation Effort/Cost (Score 1-5):</h3>
                <p className="text-gray-700 mb-2">How much time, budget, technical resources, and organizational change are required?</p>
                <ul className="ml-6 space-y-1 text-sm text-gray-600">
                  <li>5 = Very High Effort/Cost (Least Favorable)</li>
                  <li>4 = High Effort/Cost</li>
                  <li>3 = Moderate Effort/Cost</li>
                  <li>2 = Low Effort/Cost</li>
                  <li>1 = Very Low Effort/Cost (Most Favorable)</li>
                </ul>
                <p className="text-gray-700 italic mt-2">Note: A higher score for Effort/Cost is less favorable in the priority calculation.</p>
              </div>

              <div>
                <h3 className="font-semibold text-brand-deep-teal">(C) Confidence / Data Availability (Score 1-5):</h3>
                <p className="text-gray-700 mb-2">How confident are we in the technical feasibility, and what is the availability and quality of the required data?</p>
                <ul className="ml-6 space-y-1 text-sm text-gray-600">
                  <li>5 = Very High Confidence / Data Ready & High Quality</li>
                  <li>4 = High Confidence / Data Mostly Available</li>
                  <li>3 = Moderate Confidence / Some Data Gaps or Quality Concerns</li>
                  <li>2 = Low Confidence / Significant Data Gaps or Poor Quality</li>
                  <li>1 = Very Low Confidence / Critical Data Missing or Unusable</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-brand-deep-teal">(D) Strategic Alignment (Score 1-5):</h3>
                <p className="text-gray-700 mb-2">How well does this initiative align with current, key business priorities and strategic objectives?</p>
                <ul className="ml-6 space-y-1 text-sm text-gray-600">
                  <li>5 = Perfectly Aligned / Core to Strategy</li>
                  <li>4 = Strongly Aligned</li>
                  <li>3 = Moderately Aligned</li>
                  <li>2 = Loosely Aligned</li>
                  <li>1 = Poorly Aligned / Not a Strategic Fit</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Matrix */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-deep-teal mb-4">Use Case Evaluation Matrix:</h2>

        <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Use Case Description
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  (A)<br />Impact
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  (B)<br />Effort
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  (C)<br />Confidence
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  (D)<br />Strategy
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Priority<br />Score
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes / Next Steps
                </th>
                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {useCases.map((useCase) => (
                <tr key={useCase.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={useCase.description}
                      onChange={(e) => handleInputChange(useCase.id, 'description', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-mint-green"
                      placeholder="Enter use case description"
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <select
                      value={useCase.impact}
                      onChange={(e) => handleInputChange(useCase.id, 'impact', Number(e.target.value))}
                      className="w-12 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-mint-green bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={`impact-${value}`} value={value}>{value}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <select
                      value={useCase.effort}
                      onChange={(e) => handleInputChange(useCase.id, 'effort', Number(e.target.value))}
                      className="w-12 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-mint-green bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={`effort-${value}`} value={value}>{value}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <select
                      value={useCase.confidence}
                      onChange={(e) => handleInputChange(useCase.id, 'confidence', Number(e.target.value))}
                      className="w-12 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-mint-green bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={`confidence-${value}`} value={value}>{value}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <select
                      value={useCase.strategy}
                      onChange={(e) => handleInputChange(useCase.id, 'strategy', Number(e.target.value))}
                      className="w-12 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-mint-green bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={`strategy-${value}`} value={value}>{value}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4 text-center font-semibold bg-gray-50">
                    <div className="text-center">
                      <span className="py-1 px-2 bg-brand-mint-green/10 rounded font-semibold text-brand-deep-teal">
                        {useCase.priorityScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center font-semibold bg-gray-50">
                    <div className="text-center">
                      <span className="py-1 px-2 bg-gray-100 rounded">
                        {useCase.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={useCase.notes}
                      onChange={(e) => handleInputChange(useCase.id, 'notes', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-mint-green"
                      placeholder="Enter notes or next steps"
                    />
                  </td>
                  <td className="px-2 py-4 text-center">
                    <button
                      onClick={() => deleteRow(useCase.id)}
                      className="text-brand-error hover:text-red-700 focus:outline-none"
                      title="Delete row"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <button
            onClick={addRow}
            className="inline-flex items-center gap-2 bg-brand-deep-teal text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-mint-green transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Use Case
          </button>
        </div>
      </div>

      {/* Note on Priority Score */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-8">
        <h3 className="font-semibold text-brand-deep-teal mb-2">Note on Priority Score:</h3>
        <p className="text-gray-700">
          The formula <code className="bg-gray-100 text-brand-deep-teal px-1 py-0.5 rounded text-sm">(Impact + Confidence + Strategic Alignment) - Effort/Cost</code> is a common starting point.
          You can adjust the weighting of criteria (e.g., <code className="bg-gray-100 text-brand-deep-teal px-1 py-0.5 rounded text-sm">(2*A + C + D) - B</code>)
          or the formula itself to better reflect your organization's specific priorities and risk appetite.
        </p>
      </div>
    </div>
  );
};

export default InteractivePrioritizationMatrix;
