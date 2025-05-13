import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BenchmarksSectionProps {
  reportMarkdown: string | null;
  tier: string | null;
}

export const BenchmarksSection: React.FC<BenchmarksSectionProps> = ({ 
  reportMarkdown,
  tier
}) => {
  // Extract the Benchmarks section from the markdown
  const extractBenchmarks = (markdown: string): string => {
    // Try to find benchmarks section with various possible headings
    const benchmarkMatch = markdown.match(/## (Benchmarks|Industry Benchmarks|Illustrative Benchmarks|Comparative Analysis|Industry Comparison)[:\s]*([\s\S]*?)(?=##|$)/i);
    if (benchmarkMatch && benchmarkMatch[2]) {
      return benchmarkMatch[2].trim();
    }
    
    // If not found, generate a default benchmark content based on the tier
    return generateDefaultBenchmarks(tier);
  };
  
  // Generate default benchmark content if none found in the report
  const generateDefaultBenchmarks = (tier: string | null): string => {
    const tierLower = tier?.toLowerCase() || 'unknown';
    
    const benchmarks = {
      leader: `
### Your Organization vs Industry Average

Organizations at the Leader tier typically outperform industry averages in the following areas:

- **AI Investment**: Leaders invest 2-3x more of their IT budget in AI initiatives compared to industry average
- **AI Adoption**: 70-80% of business units actively use AI solutions (vs. 30-40% industry average)
- **ROI from AI**: Leaders report 20-30% higher ROI from AI initiatives
- **Time to Value**: 40% faster deployment of AI solutions from concept to production
- **AI Talent**: 3-4x more AI specialists per 1000 employees than industry average

### Benchmark Comparison by Function

| Function | Leader Tier (You) | Industry Average | Laggard |
|----------|------------------|------------------|---------|
| Strategy | Comprehensive AI strategy with clear goals | Partial strategy, limited scope | Ad hoc or no formal strategy |
| Data | Enterprise data platform with governance | Departmental data silos | Minimal data infrastructure |
| Talent | Dedicated AI team with specialized roles | Limited AI expertise | No dedicated AI resources |
| Technology | Scalable AI infrastructure | Point solutions | Experimental only |
| Governance | Formal AI ethics framework | Basic policies | No governance |
`,
      enabler: `
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
`,
      dabbler: `
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
`,
      unknown: `
### Industry AI Maturity Benchmarks

Organizations across different AI maturity levels typically demonstrate these characteristics:

- **Leader Tier**: Comprehensive AI strategy, enterprise data platforms, dedicated AI teams, scalable infrastructure, and formal governance
- **Enabler Tier**: Emerging AI strategy, improving data capabilities, growing AI expertise, mixed infrastructure, and developing governance
- **Dabbler Tier**: Ad hoc approach, minimal data infrastructure, limited AI resources, experimental technology, and minimal governance

To determine where your organization stands, review the assessment results and recommendations.
`
    };
    
    return benchmarks[tierLower as keyof typeof benchmarks] || benchmarks.unknown;
  };

  const benchmarksContent = reportMarkdown ? extractBenchmarks(reportMarkdown) : generateDefaultBenchmarks(tier);

  // Check if the content includes a table section for customized rendering
  const hasTable = benchmarksContent.includes('| Function |');
  
  // Split content into sections for better formatting
  const sections = {
    comparison: '',
    table: ''
  };
  
  if (hasTable) {
    const parts = benchmarksContent.split(/### Benchmark Comparison by Function/i);
    sections.comparison = parts[0].trim();
    sections.table = parts.length > 1 ? parts[1].trim() : '';
  } else {
    sections.comparison = benchmarksContent;
  }
  
  // Extract table data for custom rendering
  const parseTable = (tableMarkdown: string) => {
    const rows = tableMarkdown.split('\n').filter(line => line.trim().startsWith('|'));
    if (rows.length < 3) return null; // Need at least header row, separator, and one data row
    
    const headers = rows[0].split('|').filter(Boolean).map(h => h.trim());
    const data = rows.slice(2).map(row => 
      row.split('|').filter(Boolean).map(cell => cell.trim())
    );
    
    return { headers, data };
  };
  
  const tableData = sections.table ? parseTable(sections.table) : null;
  
  // Determine if the current tier is in the header (for highlighting)
  const findTierColumn = (headers: string[]) => {
    if (!tier) return -1;
    
    return headers.findIndex(header => 
      header.toLowerCase().includes(tier.toLowerCase()) && 
      header.toLowerCase().includes('you')
    );
  };
  
  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-3 text-2xl font-semibold text-sg-dark-teal mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 16V14M11.5 16V12M16 16V10M14 21V7L18 3H21V21H14Z" 
            stroke="#20E28F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Illustrative Benchmarks
      </h2>
      
      {/* Introduction Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-sg-dark-teal flex items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#20E28F]">
            <path d="M7 10.5H5M7 10.5C7 11.8807 8.11929 13 9.5 13M7 10.5C7 9.11929 8.11929 8 9.5 8M19 10.5H17M19 10.5C19 11.8807 17.8807 13 16.5 13M19 10.5C19 9.11929 17.8807 8 16.5 8M13 10.5H11M13 10.5C13 11.8807 14.1193 13 15.5 13M13 10.5C13 9.11929 14.1193 8 15.5 8M5 16H19M9 20L12 16L15 20" 
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          How Your Organization Compares
        </h3>
        <p className="text-sg-dark-teal/80 leading-relaxed">
          This section provides benchmarks to help you understand how your organization compares to others 
          at different AI maturity levels. These comparisons can help guide your improvement strategy and set realistic goals.
        </p>
      </div>
      
      {/* Comparison Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-sg-dark-teal mb-5">
            Your Organization vs Industry Average
          </h3>
          
          <div className="prose prose-sm max-w-none text-sg-dark-teal/90">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h3: () => null, // Skip the heading as we've already rendered it
                ul: ({children}) => (
                  <ul className="space-y-4">
                    {children}
                  </ul>
                ),
                li: ({children}) => (
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#20E28F] flex-shrink-0"></span>
                    <span className="text-base leading-relaxed">{children}</span>
                  </li>
                ),
                strong: ({children}) => (
                  <strong className="font-semibold text-sg-dark-teal">
                    {children}
                  </strong>
                ),
              }}
            >
              {sections.comparison}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      
      {/* Table Section - Custom Rendered */}
      {tableData && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-sg-dark-teal mb-5">
              Benchmark Comparison by Function
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {tableData.headers.map((header, index) => {
                      const isTierColumn = findTierColumn(tableData.headers) === index;
                      return (
                        <th 
                          key={index} 
                          className={`px-4 py-3 text-left text-sm font-semibold ${isTierColumn ? 'text-[#20E28F] bg-[#F3FDF5]' : 'text-sg-dark-teal'}`}
                        >
                          {header}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {tableData.data.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex} 
                      className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      {row.map((cell, cellIndex) => {
                        const isTierColumn = findTierColumn(tableData.headers) === cellIndex;
                        const isFirstColumn = cellIndex === 0;
                        
                        return (
                          <td 
                            key={cellIndex} 
                            className={`px-4 py-4 text-sm ${isFirstColumn ? 'font-medium' : ''} ${isTierColumn ? 'text-[#20E28F]/90 bg-[#F3FDF5]/50' : 'text-sg-dark-teal/80'}`}
                          >
                            {cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="border-t border-gray-100 bg-gray-50/50 p-4">
            <div className="flex items-center gap-2 text-sm text-sg-dark-teal/70">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Benchmarks are illustrative and based on research across multiple industries. Your specific industry may vary.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 