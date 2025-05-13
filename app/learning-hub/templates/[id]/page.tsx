import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DynamicTemplateWrapper from '../../../../components/learning-hub/DynamicTemplateWrapper';
import { templates } from '../../../../lib/learningHubData';
import { getMarkdownContent } from '../../../../lib/markdownUtils';

// Define the props for the dynamic page according to Next.js App Router standards
interface TemplatePageProps {
  params: {
    id: string;
  };
}

// Generate static params for all templates at build time
export function generateStaticParams() {
  return templates.map((template) => ({
    id: template.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { id } = params;
  const template = templates.find(t => t.id === id);
  
  if (!template) {
    return {
      title: 'Template Not Found | Learning Hub',
      description: 'The requested template could not be found'
    };
  }
  
  return {
    title: `${template.title} | Learning Hub`,
    description: template.description
  };
}

// Page component (using async/await since we're fetching markdown content)
export default async function Page({ params }: TemplatePageProps) {
  const { id } = params;
  const template = templates.find(t => t.id === id);
  
  if (!template) {
    notFound();
  }
  
  // Fetch the markdown content asynchronously
  const markdownContent = await getMarkdownContent('templates', id);
  
  return (
    <DynamicTemplateWrapper 
      template={template}
      markdownContent={markdownContent}
    />
  );
} 