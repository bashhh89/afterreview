import { readFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    // For static site generation, we'll handle errors for specific templates in the component
    // that consumes this API. This will allow the build to proceed without dynamic URL usage.
    
    // Define a list of template names to pre-generate
    const templateNames = [
      'content-strategy-prompt.md',
      'email-campaign.md',
      // Add more template names as needed
    ];
    
    // Get the cached template contents
    const templates = await Promise.all(
      templateNames.map(async (templateName) => {
        try {
          const templatePath = path.join(
            process.cwd(),
            'app',
            'learning-hub',
            'templates',
            templateName
          );
          
          const content = await readFile(templatePath, 'utf-8');
          return { name: templateName, content };
        } catch (error) {
          console.error(`Error loading template ${templateName}:`, error);
          return { name: templateName, content: '# Template not found' };
        }
      })
    );
    
    // Return all templates (this will be used during build)
    return NextResponse.json(templates, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Error fetching templates' },
      { status: 500 }
    );
  }
} 