import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DynamicCourseWrapper from '../../../../components/learning-hub/DynamicCourseWrapper'; // Use the client wrapper
import QuickWinsDisplay from '../../../../components/learning-hub/QuickWinsDisplay'; // Import the new component
import { miniCourses } from '../../../../lib/learningHubData';
import { getMarkdownContent } from '../../../../lib/markdownUtils'; // Async function

// Define the props for the dynamic page according to Next.js App Router standards
interface CoursePageProps {
  params: {
    id: string;
  };
}

// Define the structure for the quick wins data
interface QuickWin {
  title: string;
  description: string;
  actions: string[];
}

// Function to parse markdown content into QuickWin structure
function parseQuickWinsMarkdown(markdown: string): QuickWin[] {
  const wins: QuickWin[] = [];
  const sections = markdown.split(/^##\s*Win \d+:\s*/m).filter(section => section.trim() !== '');

  sections.forEach(section => {
    const lines = section.trim().split('\n');
    const title = lines[0].trim();
    const descriptionLines: string[] = [];
    const actionLines: string[] = [];
    let currentSection: 'description' | 'actions' | null = null;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('**Action:**')) {
        currentSection = 'actions';
        continue;
      }
      if (line.startsWith('##')) { // Stop if we hit another section (like "Congratulations")
        break;
      }

      // Capture lines as description until the "**Action:**" marker is found
      if (currentSection === null && line !== '' && !line.startsWith('**Action:**')) {
         descriptionLines.push(line);
      } else if (currentSection === 'actions' && (line.startsWith('1.') || line.startsWith('-') || line.startsWith('*'))) {
         // Capture numbered or bulleted list items as actions
         actionLines.push(line.replace(/^\d+\.\s*|^[-*]\s*/, '').trim());
      } else if (currentSection === 'actions' && line !== '' && !line.startsWith('1.') && !line.startsWith('-') && !line.startsWith('*')) {
         // Handle multi-line actions if necessary, or just include non-list items
         actionLines.push(line.trim());
      }
    }

    wins.push({
      title: title,
      description: descriptionLines.join(' ').trim(),
      actions: actionLines.filter(action => action !== '') // Filter out any empty strings
    });
  });

   // Filter out any wins that didn't parse correctly or are just headings
   return wins.filter(win => win.title !== '' && win.actions.length > 0);
}



// Generate static params for all courses at build time
export function generateStaticParams() {
  // Ensure you return the correct structure { id: string }[]
  return miniCourses.map((course) => ({
    id: course.id,
  }));
}

// Generate metadata for SEO (must be async if data fetching is needed)
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = params;
  // Fetch course data if needed for metadata, or use imported data
  const course = miniCourses.find(c => c.id === id);

  if (!course) {
    return {
      title: 'Course Not Found | Learning Hub',
      description: 'The requested course could not be found'
    };
  }

  return {
    title: `${course.title} | Learning Hub`,
    description: course.description
  };
}

// Page component (must be async because it calls async getMarkdownContent)
export default async function Page({ params }: CoursePageProps) {
  const { id } = params;
  const course = miniCourses.find(c => c.id === id);

  if (!course) {
    notFound(); // Use Next.js notFound utility
  }

  // Fetch the markdown content asynchronously
  const markdownContent = await getMarkdownContent('mini-courses', id);

  // Check if this is the "AI Superpowers" course
  if (id === 'ai-superpowers-5-wins' && markdownContent) {
    // Parse the markdown content into the structured format for QuickWinsDisplay
    const quickWinsData = parseQuickWinsMarkdown(markdownContent);

    // Render the DynamicCourseWrapper with QuickWinsDisplay as children
    return (
      <DynamicCourseWrapper course={course}>
        <QuickWinsDisplay wins={quickWinsData} />
      </DynamicCourseWrapper>
    );
  }

  // For all other courses, pass data to the client wrapper component for standard markdown rendering
  return (
    <DynamicCourseWrapper
      course={course}
      markdownContent={markdownContent} // Pass the fetched content
    />
  );
}
