// AI Provider Interface
export interface AIProvider {
  name: string;
  generateReport: (systemPrompt: string, userPrompt: string) => Promise<string>;
  generateNextQuestion: (systemPrompt: string, userPrompt: string) => Promise<any>;
  isAvailable: () => Promise<boolean>;
}

// OpenAI Provider
export class OpenAIProvider implements AIProvider {
  name = 'OpenAI';
  apiKey: string;
  model: string;
  
  constructor(apiKey?: string, model?: string) {
    // Enhanced key handling with detailed logging
    const envKey = process.env.OPENAI_API_KEY;
    console.log('OpenAI Provider Constructor:');
    console.log('- Passed API Key exists:', !!apiKey);
    console.log('- Env OPENAI_API_KEY exists:', !!envKey);
    console.log('- Key being used (first 8 chars):', (apiKey || envKey || '').substring(0, 8));
    
    this.apiKey = apiKey || envKey || '';
    this.model = model || process.env.OPENAI_MODEL || 'gpt-4o';
    console.log(`Initializing OpenAI provider with model: ${this.model}`);
    
    if (!this.apiKey) {
      console.error('CRITICAL: OpenAI provider initialized without API key!');
      console.error('- USE_GEORGE_KEY:', process.env.USE_GEORGE_KEY);
      console.error('- OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
      throw new Error('OpenAI provider requires an API key');
    }
  }
  
  async isAvailable(): Promise<boolean> {
    if (!this.apiKey) {
      console.error('OpenAI availability check failed: No API key provided');
      console.error('Current state:');
      console.error('- API Key exists:', !!this.apiKey);
      console.error('- Env OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
      console.error('- USE_GEORGE_KEY:', process.env.USE_GEORGE_KEY);
      return false;
    }
    
    try {
      console.log('Attempting to use OpenAI provider...');
      console.log('- Using API key (first 8 chars):', this.apiKey.substring(0, 8));
      
      // Simple test call to check if API key is valid
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      if (response.status !== 200) {
        const errorData = await response.text();
        console.error(`OpenAI provider failed. Status Code: ${response.status}. Response Snippet: ${errorData.substring(0, 300)}...`);
        return false;
      }
      
      console.log('OpenAI provider is available and working correctly');
      return true;
    } catch (error) {
      console.error('OpenAI availability check failed with exception:', error);
      return false;
    }
  }
  
  async generateReport(systemPrompt: string, userPrompt: string): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error(`OpenAI API error: ${response.status}. Response Snippet: ${errorData.substring(0, 300)}...`);
        throw new Error(`OpenAI API error: ${response.status} ${errorData}`);
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating report with OpenAI:', error);
      throw error;
    }
  }
  
  async generateNextQuestion(systemPrompt: string, userPrompt: string): Promise<any> {
    try {
      console.log('OpenAI: Generating next question with system prompt:', systemPrompt.substring(0, 100) + '...');
      console.log('OpenAI: User prompt:', userPrompt.substring(0, 100) + '...');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500,
          response_format: { type: "json_object" }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error(`OpenAI API error: ${response.status}. Response Snippet: ${errorData.substring(0, 300)}...`);
        throw new Error(`OpenAI API error: ${response.status} ${errorData}`);
      }
      
      const data = await response.json();
      console.log('OpenAI: Received response data structure:', JSON.stringify(data).substring(0, 100) + '...');
      
      try {
        // Check if the response is already in the expected format
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          const content = data.choices[0].message.content;
          
          // If content is already parsed JSON (not a string), return it directly
          if (typeof content !== 'string') {
            return content;
          }
          
          // Check if content looks like HTML (common error case)
          if (content.startsWith('<!DOCTYPE') || content.startsWith('<html')) {
            console.error('OpenAI returned HTML instead of JSON:', content.substring(0, 100));
            throw new Error('Invalid response format: received HTML instead of JSON');
          }
          
          // If it's a string, try to parse it as JSON
          try {
            const parsedContent = JSON.parse(content);
            return parsedContent;
          } catch (parseError: any) {
            console.error('Error parsing JSON response from OpenAI:', parseError);
            console.error('Response content:', content);
            throw new Error(`Invalid JSON response from OpenAI API: ${parseError.message}`);
          }
        } else {
          console.error('Unexpected response structure from OpenAI:', data);
          throw new Error('Unexpected response structure from OpenAI API');
        }
      } catch (parseError: any) {
        console.error('Error processing response from OpenAI:', parseError);
        throw parseError;
      }
    } catch (error) {
      console.error('Error generating next question with OpenAI:', error);
      throw error;
    }
  }
}

// Pollinations Provider
export class PollinationsProvider implements AIProvider {
  name = 'Pollinations';
  apiUrl: string;
  
  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || 'https://text.pollinations.ai/openai';
  }
  
  async isAvailable(): Promise<boolean> {
    try {
      // Simple ping to check if the service is available
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "openai-large",
          messages: [
            { role: "user", content: "ping" }
          ],
          max_tokens: 5
        })
      });
      
      return response.status === 200;
    } catch (error) {
      console.error('Pollinations availability check failed:', error);
      return false;
    }
  }
  
  async generateReport(systemPrompt: string, userPrompt: string): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "openai-large",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000,
          response_format: { type: "json_object" }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Pollinations API error: ${response.status} ${errorData}`);
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating report with Pollinations:', error);
      throw error;
    }
  }
  
  async generateNextQuestion(systemPrompt: string, userPrompt: string): Promise<any> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "openai-large",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500,
          response_format: { type: "json_object" }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Pollinations API error: ${response.status} ${errorData}`);
      }
      
      try {
        const data = await response.json();
        
        // First check if the response is in the expected format
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          const content = data.choices[0].message.content;
          
          // Check if content is already an object (not a string)
          if (typeof content !== 'string') {
            return content;
          }
          
          // Check if content looks like HTML (common error case)
          if (content.startsWith('<!DOCTYPE') || content.startsWith('<html')) {
            console.error('Pollinations returned HTML instead of JSON:', content.substring(0, 100));
            throw new Error('Invalid response format: received HTML instead of JSON');
          }
          
          // If it's a string, try to parse it as JSON
          try {
            return JSON.parse(content);
          } catch (parseError: any) {
            console.error('Error parsing JSON response from Pollinations:', parseError);
            console.error('Response content:', content);
            throw new Error(`Invalid JSON response from Pollinations API: ${parseError.message}`);
          }
        } else {
          console.error('Unexpected response structure from Pollinations:', data);
          throw new Error('Unexpected response structure from Pollinations API');
        }
      } catch (parseError: any) {
        console.error('Error processing response from Pollinations:', parseError);
        throw parseError;
      }
    } catch (error) {
      console.error('Error generating next question with Pollinations:', error);
      throw error;
    }
  }
}

// Groq Provider
export class GroqProvider implements AIProvider {
  name = 'Groq';
  apiKey: string;
  model: string;
  
  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GROQ_API_KEY || '';
    this.model = process.env.DEV_AI_MODEL || 'llama3-70b-8192';
    console.log(`Initializing Groq provider with model: ${this.model}`);
  }
  
  async isAvailable(): Promise<boolean> {
    if (!this.apiKey) return false;
    
    try {
      // Simple test call to check if API key is valid
      const response = await fetch('https://api.groq.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      return response.status === 200;
    } catch (error) {
      console.error('Groq availability check failed:', error);
      return false;
    }
  }
  
  async generateReport(systemPrompt: string, userPrompt: string): Promise<string> {
    try {
      const response = await fetch('https://api.groq.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000,
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Groq API error: ${response.status} ${errorData}`);
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating report with Groq:', error);
      throw error;
    }
  }
  
  async generateNextQuestion(systemPrompt: string, userPrompt: string): Promise<any> {
    try {
      console.log('Groq: Generating next question with system prompt:', systemPrompt.substring(0, 100) + '...');
      console.log('Groq: User prompt:', userPrompt.substring(0, 100) + '...');
      
      const response = await fetch('https://api.groq.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500,
          response_format: { type: "json_object" }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Groq API error: ${response.status} ${errorData}`);
      }
      
      const data = await response.json();
      console.log('Groq: Received response data structure:', JSON.stringify(data).substring(0, 100) + '...');
      
      try {
        // Check if the response is already in the expected format
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          const content = data.choices[0].message.content;
          
          // If content is already parsed JSON (not a string), return it directly
          if (typeof content !== 'string') {
            return content;
          }
          
          // Check if content looks like HTML (common error case)
          if (content.startsWith('<!DOCTYPE') || content.startsWith('<html')) {
            console.error('Groq returned HTML instead of JSON:', content.substring(0, 100));
            throw new Error('Invalid response format: received HTML instead of JSON');
          }
          
          // If it's a string, try to parse it as JSON
          try {
            const parsedContent = JSON.parse(content);
            return parsedContent;
          } catch (parseError: any) {
            console.error('Error parsing JSON response from Groq:', parseError);
            console.error('Response content:', content);
            throw new Error(`Invalid JSON response from Groq API: ${parseError.message}`);
          }
        } else {
          console.error('Unexpected response structure from Groq:', data);
          throw new Error('Unexpected response structure from Groq API');
        }
      } catch (parseError: any) {
        console.error('Error processing response from Groq:', parseError);
        throw parseError;
      }
    } catch (error) {
      console.error('Error generating next question with Groq:', error);
      throw error;
    }
  }
}

// AI Provider Manager
export class AIProviderManager {
  providers: AIProvider[];
  currentProviderIndex: number = 0;
  
  constructor(providers: AIProvider[] = []) {
    this.providers = providers;
    
    // If no providers specified, initialize with defaults based on environment variables
    if (providers.length === 0) {
      console.log('Initializing AI providers based on environment configuration...');
      
      // Always use George's key in production
      const useGeorgeKey = process.env.USE_GEORGE_KEY !== 'false'; // Default to true unless explicitly set to false
      console.log(`Using ${useGeorgeKey ? 'PRODUCTION' : 'DEVELOPMENT'} configuration`);
      console.log('Environment Variables Check:');
      console.log('- USE_GEORGE_KEY:', process.env.USE_GEORGE_KEY);
      console.log('- OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
      console.log('- OPENAI_API_KEY prefix:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 8) : 'NOT_FOUND');
      
      if (useGeorgeKey) {
        // Production setup - Use OpenAI as primary with fallbacks
        console.log('Setting up PRODUCTION providers: OpenAI primary with Groq and Pollinations fallbacks');
        
        // Log OpenAI configuration
        const openaiKey = process.env.OPENAI_API_KEY;
        const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o';
        
        if (!openaiKey) {
          console.error('CRITICAL ERROR: OpenAI API key not found in environment variables!');
          console.error('Current environment state:');
          console.error('- USE_GEORGE_KEY:', process.env.USE_GEORGE_KEY);
          console.error('- NODE_ENV:', process.env.NODE_ENV);
          throw new Error('OpenAI API key not found when USE_GEORGE_KEY is true');
        }
        
        // Initialize OpenAI as primary provider
        try {
          console.log('Attempting to initialize OpenAI provider...');
          const openaiProvider = new OpenAIProvider(openaiKey, openaiModel);
          this.providers.push(openaiProvider);
          console.log('Successfully initialized OpenAI provider');
        } catch (error) {
          console.error('Failed to initialize OpenAI provider:', error);
          throw error; // Re-throw to prevent partial initialization
        }
        
        // Add Groq as first fallback if available
        if (process.env.GROQ_API_KEY) {
          console.log('Adding Groq as fallback');
          this.providers.push(new GroqProvider(process.env.GROQ_API_KEY));
        }
        
        // Add Pollinations as final fallback
        console.log('Adding Pollinations as final fallback');
        this.providers.push(new PollinationsProvider());
      } else {
        // Development setup - Use Groq as primary with fallbacks
        console.log('Setting up DEVELOPMENT providers: Groq primary with OpenAI and Pollinations fallbacks');
        
        // Add Groq as primary provider
        if (process.env.DEV_AI_KEY) {
          console.log('Adding Groq as primary provider');
          this.providers.push(new GroqProvider(process.env.DEV_AI_KEY));
        }
        
        // Add OpenAI as fallback if key is available
        if (process.env.OPENAI_API_KEY) {
          console.log('Adding OpenAI as fallback');
          this.providers.push(new OpenAIProvider(process.env.OPENAI_API_KEY, process.env.OPENAI_MODEL));
        }
        
        // Add Pollinations as final fallback
        console.log('Adding Pollinations as final fallback');
        this.providers.push(new PollinationsProvider());
      }
      
      // Log the provider setup
      console.log(`Initialized ${this.providers.length} providers: ${this.providers.map(p => p.name).join(', ')}`);
    }
  }
  
  async initialize(): Promise<void> {
    console.log('Initializing AI providers...');
    
    // Check availability of all providers one by one, in order
    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      console.log(`Testing provider ${provider.name}...`);
      
      try {
        const isAvailable = await provider.isAvailable();
        if (isAvailable) {
          this.currentProviderIndex = i;
          console.log(`Selected provider: ${provider.name}`);
          return; // Successfully found a working provider
        } else {
          console.log(`Provider ${provider.name} is unavailable, trying next provider...`);
        }
      } catch (error) {
        console.error(`Error checking availability of provider ${provider.name}:`, error);
        console.log(`Provider ${provider.name} check failed with error, trying next provider...`);
      }
    }
    
    // If we get here, no providers are available
    console.error('No AI providers are available! This is a critical error.');
    throw new Error('No AI providers available');
  }
  
  getCurrentProvider(): AIProvider {
    return this.providers[this.currentProviderIndex];
  }
  
  setProvider(providerName: string): boolean {
    const index = this.providers.findIndex(p => p.name.toLowerCase() === providerName.toLowerCase());
    if (index !== -1) {
      this.currentProviderIndex = index;
      console.log(`Switched to provider: ${this.providers[index].name}`);
      return true;
    }
    return false;
  }
  
  async generateReport(systemPrompt: string, userPrompt: string): Promise<string> {
    const currentProvider = this.getCurrentProvider();
    try {
      console.log(`Generating report using ${currentProvider.name}...`);
      return await currentProvider.generateReport(systemPrompt, userPrompt);
    } catch (error) {
      console.error(`Error with ${currentProvider.name}, trying fallback providers...`);
      
      // Try other providers in order
      for (let i = 0; i < this.providers.length; i++) {
        if (i === this.currentProviderIndex) continue; // Skip current provider
        
        try {
          console.log(`Trying fallback provider ${this.providers[i].name}...`);
          return await this.providers[i].generateReport(systemPrompt, userPrompt);
        } catch (fallbackError) {
          console.error(`Fallback provider ${this.providers[i].name} failed:`, fallbackError);
        }
      }
      
      throw new Error('All providers failed to generate report');
    }
  }
  
  async generateNextQuestion(systemPrompt: string, userPrompt: string): Promise<any> {
    const currentProvider = this.getCurrentProvider();
    try {
      console.log(`Generating next question using ${currentProvider.name}...`);
      return await currentProvider.generateNextQuestion(systemPrompt, userPrompt);
    } catch (error) {
      console.error(`Error with ${currentProvider.name}, trying fallback providers...`);
      
      // Try other providers in order
      for (let i = 0; i < this.providers.length; i++) {
        if (i === this.currentProviderIndex) continue; // Skip current provider
        
        try {
          console.log(`Trying fallback provider ${this.providers[i].name}...`);
          return await this.providers[i].generateNextQuestion(systemPrompt, userPrompt);
        } catch (fallbackError) {
          console.error(`Fallback provider ${this.providers[i].name} failed:`, fallbackError);
        }
      }
      
      throw new Error('All providers failed to generate next question');
    }
  }
}

// Create and export a singleton instance
const aiManager = new AIProviderManager();
export default aiManager; 