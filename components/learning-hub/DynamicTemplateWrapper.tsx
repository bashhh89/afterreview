"use client";

import React from 'react';
import TemplateDetailTemplate from './TemplateDetailTemplate';
import { TemplateInfo } from '../../lib/learningHubData';

interface DynamicTemplateWrapperProps {
  template: TemplateInfo;
  markdownContent: string | null;
}

export default function DynamicTemplateWrapper({ 
  template, 
  markdownContent 
}: DynamicTemplateWrapperProps) {
  // This wrapper component handles the client-side component rendering
  // while keeping the page component as a simple server component
  return (
    <TemplateDetailTemplate
      template={template}
      markdownContent={markdownContent || undefined}
    />
  );
} 