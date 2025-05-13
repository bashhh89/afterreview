// Test script to verify the KeyFindingsSection component parsing logic
// Use dynamic import for ESM compatibility
const fs = require('fs');
const path = require('path');

// Read the mock data file directly
const mockDataPath = path.join(__dirname, 'lib', 'mockData.ts');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

// Extract the mock reports using regex
function extractMockReport(content, reportName) {
  const regex = new RegExp(`export const ${reportName} = ({[\\s\\S]*?});`);
  const match = content.match(regex);
  if (!match) return null;
  
  // Extract the reportMarkdown string
  const reportObj = match[1];
  const markdownRegex = /reportMarkdown: `([\s\S]*?)`\s*(?:,|\})/;
  const markdownMatch = reportObj.match(markdownRegex);
  return markdownMatch ? markdownMatch[1] : null;
}

// Extract the mock reports
const leaderReportMarkdown = extractMockReport(mockDataContent, 'mockLeaderReport');
const enablerReportMarkdown = extractMockReport(mockDataContent, 'mockEnablerReport');
const dabblerReportMarkdown = extractMockReport(mockDataContent, 'mockDabblerReport');

// Function to extract strengths and weaknesses/improvement areas
function extractStrengthsAndWeaknesses(markdown) {
  // First, try to find the strengths section
  const strengthsRegex = /(?:###\s*Strengths:|\*\*Strengths:\*\*)([\s\S]*?)(?:###\s*(?:Weaknesses|Areas for Improvement):|(?:\*\*Weaknesses:\*\*|\*\*Areas for Improvement:\*\*)|\n## |$)/i;
  const strengthsMatch = markdown.match(strengthsRegex);
  const strengthsMarkdown = strengthsMatch ? strengthsMatch[1].trim() : '';
  
  // Then try to find the weaknesses/improvement areas section
  // Look for both "Weaknesses" and "Areas for Improvement" patterns
  const weaknessesRegex = /(?:###\s*(?:Weaknesses|Areas for Improvement):|\*\*(?:Weaknesses|Areas for Improvement):\*\*)([\s\S]*?)(?:\n## |$)/i;
  const weaknessesMatch = markdown.match(weaknessesRegex);
  const weaknessesMarkdown = weaknessesMatch ? weaknessesMatch[1].trim() : '';
  
  return { strengthsMarkdown, weaknessesMarkdown };
}

// Function to extract bullet points
function extractBulletPoints(markdown) {
  return markdown
    .split('\n')
    .filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '))
    .map(line => line.trim().replace(/^[*-]\s+/, ''));
}

// Test with Leader report
console.log('===== TESTING LEADER REPORT =====');
const leaderResult = extractStrengthsAndWeaknesses(leaderReportMarkdown);
console.log('Strengths found:', extractBulletPoints(leaderResult.strengthsMarkdown).length);
console.log('Weaknesses found:', extractBulletPoints(leaderResult.weaknessesMarkdown).length);
console.log('\nStrengths:');
console.log(extractBulletPoints(leaderResult.strengthsMarkdown));
console.log('\nWeaknesses/Improvement Areas:');
console.log(extractBulletPoints(leaderResult.weaknessesMarkdown));

// Test with Enabler report
console.log('\n\n===== TESTING ENABLER REPORT =====');
const enablerResult = extractStrengthsAndWeaknesses(enablerReportMarkdown);
console.log('Strengths found:', extractBulletPoints(enablerResult.strengthsMarkdown).length);
console.log('Weaknesses found:', extractBulletPoints(enablerResult.weaknessesMarkdown).length);
console.log('\nStrengths:');
console.log(extractBulletPoints(enablerResult.strengthsMarkdown));
console.log('\nWeaknesses/Improvement Areas:');
console.log(extractBulletPoints(enablerResult.weaknessesMarkdown));

// Test with Dabbler report
console.log('\n\n===== TESTING DABBLER REPORT =====');
const dabblerResult = extractStrengthsAndWeaknesses(dabblerReportMarkdown);
console.log('Strengths found:', extractBulletPoints(dabblerResult.strengthsMarkdown).length);
console.log('Weaknesses found:', extractBulletPoints(dabblerResult.weaknessesMarkdown).length);
console.log('\nStrengths:');
console.log(extractBulletPoints(dabblerResult.strengthsMarkdown));
console.log('\nWeaknesses/Improvement Areas:');
console.log(extractBulletPoints(dabblerResult.weaknessesMarkdown)); 