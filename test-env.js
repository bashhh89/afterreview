// Simple script to test environment variables
const fs = require('fs');

// Read temp.env file directly
const envContent = fs.readFileSync('./temp.env', 'utf8');
const envVars = {};

// Parse the environment variables
envContent.split('\n').forEach(line => {
  // Skip comments and empty lines
  if (line.startsWith('#') || line.trim() === '') return;
  
  // Extract key and value, handling inline comments
  const match = line.match(/^([^=]+)=([^#]*)(?:#.*)?$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

console.log('--- AI Provider Configuration Test ---');
console.log('USE_GEORGE_KEY:', envVars.USE_GEORGE_KEY);
console.log('Using:', envVars.USE_GEORGE_KEY === 'true' ? 'PRODUCTION (George)' : 'DEVELOPMENT (Ahmad)');

// Show which API keys are available
console.log('\n--- Available API Keys ---');
console.log('OpenAI API Key:', envVars.OPENAI_API_KEY ? '✓ Available' : '✗ Not available');
console.log('OpenAI Model:', envVars.OPENAI_MODEL);
console.log('DEV AI Key:', envVars.DEV_AI_KEY ? '✓ Available' : '✗ Not available');
console.log('DEV AI Model:', envVars.DEV_AI_MODEL);

// Show which provider would be selected
console.log('\n--- Provider Selection ---');
if (envVars.USE_GEORGE_KEY === 'true') {
  console.log('Primary Provider: OpenAI');
  console.log('Fallback Provider: Pollinations');
} else {
  console.log('Primary Provider: Groq');
  console.log('Secondary Fallback: OpenAI (if available)');
  console.log('Final Fallback: Pollinations');
} 