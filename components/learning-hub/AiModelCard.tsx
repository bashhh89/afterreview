import React from 'react';

interface AiModelCardProps {
  name: string;
  strength: string;
  useCases: string[];
}

export default function AiModelCard({ name, strength, useCases }: AiModelCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-sg-bright-green/20 p-5 mb-6">
      <h4 className="text-lg font-bold text-sg-dark-teal mb-2">{name}</h4>
      <div className="mb-3">
        <span className="text-sm font-semibold text-sg-bright-green">Key Strength:</span>
        <p className="text-sg-dark-teal mt-1">{strength}</p>
      </div>
      <div>
        <span className="text-sm font-semibold text-sg-bright-green">Primary Use Cases:</span>
        <ul className="mt-1 space-y-1">
          {useCases.map((useCase, index) => (
            <li key={index} className="text-sg-dark-teal/90 text-sm">{useCase}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
