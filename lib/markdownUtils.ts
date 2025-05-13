import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { miniCourses, templates } from './learningHubData';

/**
 * Content types supported by the application
 */
export type ContentType = 'mini-courses' | 'templates';

/**
 * Reads markdown content from a file in the content directory
 * @param contentType - The type of content (mini-courses or templates)
 * @param idOrSlug - The ID or slug of the content
 * @returns Promise resolving to the markdown content as a string or null if not found
 */
export async function getMarkdownContent(contentType: ContentType, idOrSlug: string): Promise<string | null> {
  try {
    // Ensure the content type and idOrSlug are valid
    if (!contentType || !idOrSlug) {
      console.error('Invalid content type or identifier');
      return null;
    }
    
    // Handle ID-based lookup for templates (t1, t2, etc.)
    let fileId = idOrSlug;
    
    // If this is a template ID (like t1, t2), map it to the correct filename
    if (contentType === 'templates' && idOrSlug.match(/^t\d+$/)) {
      const template = templates.find(t => t.id === idOrSlug);
      if (template) {
        // Extract the slug part after the last slash
        const slugParts = template.slug.split('/');
        fileId = slugParts[slugParts.length - 1];
      }
    }
    
    // If this is a mini-course ID from the dynamic route, map it to the correct filename
    if (contentType === 'mini-courses' && idOrSlug.match(/^[a-z0-9-]+$/)) {
      // First try direct match with the ID
      let contentPath = path.join(process.cwd(), 'content', contentType, `${fileId}.md`);
      
      // If file doesn't exist with direct ID, try to find the course and use its ID
      if (!existsSync(contentPath)) {
        const course = miniCourses.find(c => c.id === idOrSlug);
        if (course) {
          // Extract the slug part after the last slash
          const slugParts = course.slug.split('/');
          fileId = slugParts[slugParts.length - 1];
        }
      }
    }
    
    const contentPath = path.join(process.cwd(), 'content', contentType, `${fileId}.md`);
    
    // Check if file exists synchronously
    if (!existsSync(contentPath)) {
      console.error(`Markdown file not found: ${contentPath}`);
      return null;
    }
    
    // Read file content asynchronously
    const markdownContent = await fs.readFile(contentPath, 'utf8');
    
    if (!markdownContent || markdownContent.trim() === '') {
      console.warn(`Empty markdown content found for: ${contentPath}`);
      return null;
    }
    
    return markdownContent;
  } catch (error) {
    console.error(`Error reading markdown file:`, error);
    return null;
  }
} 