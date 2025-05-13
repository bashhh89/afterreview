"use client";
import React, { useState, useEffect } from 'react';
import ToolCard from '../../../components/learning-hub/ToolCard';
import { masterToolList } from './toolData';

// Simulated user profile
const simulatedUserProfile = {
  aiReadinessTier: 'Dabbler',
  industry: 'Startup Marketing',
  keyChallengesOrOpportunities: ['overcoming_writers_block', 'generating_creative_ideas'],
};

const mainCategories = [
  'All',
  'Content Creation',
  'Video & Audio',
  'Productivity & Automation',
  'Sales & Outreach',
  'Data & Insights',
  'Social Media',
  'AI Assistant',
];

const allCategories = Array.from(new Set(masterToolList.map(t => t.uiCategory)));
const allChallenges = Array.from(new Set(masterToolList.flatMap(t => t.solvesChallenges)));

// Get the top 8 most common challenges
const challengeCounts = allChallenges.map(ch => ({
  name: ch,
  count: masterToolList.filter(t => t.solvesChallenges.includes(ch)).length
}));
const sortedChallenges = challengeCounts.sort((a, b) => b.count - a.count).map(c => c.name);
const topChallenges = sortedChallenges.slice(0, 8);
const moreChallenges = sortedChallenges.slice(8);

export default function RecommendedToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  useEffect(() => {
    setSelectedChallenges(simulatedUserProfile.keyChallengesOrOpportunities);
  }, []);

  // Only show tools for the user's tier
  const tierFiltered = masterToolList.filter(tool => tool.bestForTiers.includes(simulatedUserProfile.aiReadinessTier));

  // Filter by selected challenges (if any)
  const challengeFiltered = selectedChallenges.length === 0
    ? tierFiltered
    : tierFiltered.filter(tool => tool.solvesChallenges.some(ch => selectedChallenges.includes(ch)));

  // Filter by category
  const categoryFiltered = selectedCategory === 'All'
    ? challengeFiltered
    : challengeFiltered.filter(tool => tool.uiCategory === selectedCategory);

  // Filter by search
  const filteredTools = categoryFiltered.filter(tool =>
    tool.toolName.toLowerCase().includes(search.toLowerCase()) ||
    tool.briefDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 md:px-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#004851] mb-3">Recommended AI Tools for You</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          Based on your AI readiness and identified needs, here are some tools that can help you make significant progress. Our pro tips will guide you on how to get the most out of them!
        </p>
      </div>
      {/* Search bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-[#68F6C8] focus:outline-none text-base"
        />
        {/* Key Challenges Multi-select */}
        <div className="flex flex-wrap gap-2 items-center">
          {topChallenges.map(challenge => (
            <button
              key={challenge}
              className={
                'px-3 py-1 rounded-full text-xs font-semibold border transition-all ' +
                (selectedChallenges.includes(challenge)
                  ? 'bg-[#68F6C8] text-[#004851] border-[#68F6C8]'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-[#68F6C8]/20 hover:text-[#004851]')
              }
              onClick={() => setSelectedChallenges(selectedChallenges.includes(challenge)
                ? selectedChallenges.filter(c => c !== challenge)
                : [...selectedChallenges, challenge])}
              type="button"
            >
              {challenge.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
          {moreChallenges.length > 0 && (
            <div className="relative">
              <button
                className="px-3 py-1 rounded-full text-xs font-semibold border bg-gray-100 text-gray-700 border-gray-200 hover:bg-[#68F6C8]/20 hover:text-[#004851] ml-2"
                onClick={() => setShowMoreFilters(v => !v)}
                type="button"
              >
                More Filters
              </button>
              {showMoreFilters && (
                <div className="absolute z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[180px] max-h-60 overflow-y-auto">
                  {moreChallenges.map(challenge => (
                    <button
                      key={challenge}
                      className={
                        'block w-full text-left px-3 py-1 rounded text-xs font-semibold border-b border-gray-100 last:border-b-0 ' +
                        (selectedChallenges.includes(challenge)
                          ? 'bg-[#68F6C8] text-[#004851]'
                          : 'bg-white text-gray-700 hover:bg-[#68F6C8]/20 hover:text-[#004851]')
                      }
                      onClick={() => setSelectedChallenges(selectedChallenges.includes(challenge)
                        ? selectedChallenges.filter(c => c !== challenge)
                        : [...selectedChallenges, challenge])}
                      type="button"
                    >
                      {challenge.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Category Tabs */}
      <div className="sticky top-0 z-10 bg-white mb-8 flex flex-wrap gap-2 border-b border-gray-100 pb-2">
        {mainCategories.map(cat => (
          <button
            key={cat}
            className={
              'px-4 py-2 rounded-full font-semibold text-sm transition-all ' +
              (selectedCategory === cat
                ? 'bg-[#68F6C8] text-[#004851] shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-[#68F6C8]/20 hover:text-[#004851]')
            }
            onClick={() => setSelectedCategory(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Tool Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-16 text-lg">No tools found for your selection.</div>
        ) : (
          filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        )}
      </div>
    </div>
  );
} 