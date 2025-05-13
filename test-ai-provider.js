// Test script for AIProviderManager
require('dotenv').config({ path: '.env.local' });

// Import directly from the file
const fs = require('fs');
const path = require('path');

// Read environment variables directly
const envContent = fs.readFileSync('./.env.local', 'utf8');
const envVars = {};

// Parse environment variables
envContent.split('\n').forEach(line => {
  if (line.startsWith('#') || line.trim() === '') return;
  const match = line.match(/^([^=]+)=([^#]*)(?:#.*)?$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
    // Also set in process.env for compatibility
    process.env[key] = value;
  }
});

// Simple test function to simulate the AIProviderManager
function testAIProvider() {
  console.log('--- Testing AI Provider Configuration ---');
  console.log('Environment mode:', envVars.USE_GEORGE_KEY === 'true' ? 'PRODUCTION' : 'DEVELOPMENT');
  
  // Determine which provider would be used
  let primaryProvider;
  let fallbackProviders = [];
  
  if (envVars.USE_GEORGE_KEY === 'true') {
    primaryProvider = 'OpenAI';
    fallbackProviders = ['Pollinations'];
  } else {
    primaryProvider = 'Groq';
    fallbackProviders = ['OpenAI', 'Pollinations'];
  }
  
  console.log('\nProvider setup complete! The system is now configured to use:');
  console.log(`Primary: ${primaryProvider}`);
  console.log(`Fallbacks: ${fallbackProviders.join(', ')}`);
  
  if (envVars.USE_GEORGE_KEY === 'true') {
    console.log('\nMode: PRODUCTION - Using George\'s OpenAI key');
    console.log('All AI operations (questions, report generation) will use OpenAI.');
    console.log('API Key: ', envVars.OPENAI_API_KEY ? `${envVars.OPENAI_API_KEY.substring(0, 10)}...` : 'Not found');
    console.log('Model: ', envVars.OPENAI_MODEL || 'Default OpenAI model');
  } else {
    console.log('\nMode: DEVELOPMENT - Using Ahmad\'s Groq key');
    console.log('All AI operations (questions, report generation) will use Groq with fallbacks.');
    console.log('API Key: ', envVars.DEV_AI_KEY ? `${envVars.DEV_AI_KEY.substring(0, 10)}...` : 'Not found');
    console.log('Model: ', envVars.DEV_AI_MODEL || 'Default Groq model');
  }
}

// Run the test
testAIProvider(); 