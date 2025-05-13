import React, { useState } from 'react';

interface MatchResult {
  modelName: string;
  score: number;
  rationale: string;
}

interface UseCaseMatcherProps {
  tasks: { id: string; label: string }[];
}

export default function UseCaseMatcher({ tasks }: UseCaseMatcherProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [results, setResults] = useState<MatchResult[]>([]);

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId);
    
    // This would be replaced with actual logic in a real implementation
    // For now, just showing mock results based on the selected task
    const mockResults: Record<string, MatchResult[]> = {
      'long-form-content': [
        { modelName: 'GPT-4 Turbo', score: 9.2, rationale: 'Excellent at generating coherent, nuanced long-form content with logical flow.' },
        { modelName: 'Claude 3 Opus', score: 9.1, rationale: 'Great for long-form with exceptional context window and document understanding.' },
        { modelName: 'Llama 3', score: 8.5, rationale: 'Strong performer that balances quality and cost-effectiveness.' }
      ],
      'marketing-copy': [
        { modelName: 'GPT-4 Turbo', score: 9.3, rationale: 'Excels at generating persuasive, on-brand marketing copy with good tone control.' },
        { modelName: 'Claude 3 Sonnet', score: 8.9, rationale: 'Good balance of quality and cost for marketing copy needs.' },
        { modelName: 'Gemini Pro', score: 8.7, rationale: 'Strong marketing capabilities with good understanding of audience targeting.' }
      ],
      'image-generation': [
        { modelName: 'Midjourney', score: 9.4, rationale: 'Best for artistic, distinctive marketing visuals with strong aesthetic appeal.' },
        { modelName: 'DALL-E 3', score: 9.0, rationale: 'Excellent for illustrations and conceptual images with good prompt understanding.' },
        { modelName: 'Stable Diffusion XL', score: 8.8, rationale: 'Great flexibility and control over image generation, strong for branding work.' }
      ],
      'video-creation': [
        { modelName: 'Sora', score: 8.8, rationale: 'Best for realistic, coherent short video clips for marketing purposes.' },
        { modelName: 'Runway Gen-2', score: 8.5, rationale: 'Good for short product demonstrations and visual effects.' },
        { modelName: 'Pika Labs', score: 8.3, rationale: 'Excellent for quick, attention-grabbing social media video content.' }
      ],
      'data-analysis': [
        { modelName: 'Specialized Analytics Tools', score: 9.5, rationale: 'Purpose-built analytics platforms outperform general AI for marketing data.' },
        { modelName: 'GPT-4 Turbo with Data Analysis', score: 8.0, rationale: 'Can perform basic analysis when given structured data and clear instructions.' },
        { modelName: 'Claude 3 Opus', score: 7.8, rationale: 'Good for extracting insights from marketing reports and unstructured data.' }
      ]
    };
    
    setResults(mockResults[taskId] || []);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-sg-bright-green/20 p-6 mb-8">
      <h3 className="text-xl font-bold text-sg-dark-teal mb-4">AI Model Matcher</h3>
      <p className="text-sg-dark-teal/80 mb-4">Select your marketing task to see which AI models are best suited:</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {tasks.map(task => (
          <button
            key={task.id}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTask === task.id 
                ? 'bg-sg-bright-green text-white' 
                : 'bg-sg-light-mint text-sg-dark-teal hover:bg-sg-bright-green/30'
            }`}
            onClick={() => handleTaskSelect(task.id)}
          >
            {task.label}
          </button>
        ))}
      </div>
      
      {selectedTask && results.length > 0 && (
        <div className="space-y-4 mt-6">
          <h4 className="font-semibold text-sg-dark-teal">Recommended Models:</h4>
          {results.map((result, index) => (
            <div key={index} className="border-l-4 border-sg-bright-green pl-4 py-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sg-dark-teal">{result.modelName}</span>
                <span className="bg-sg-bright-green/10 text-sg-dark-teal px-2 py-1 rounded text-sm font-medium">
                  Score: {result.score}/10
                </span>
              </div>
              <p className="text-sm text-sg-dark-teal/70 mt-1">{result.rationale}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
