"use client";

import React, { ReactNode } from 'react';
import CourseDetailTemplate from './CourseDetailTemplate';
import { MiniCourseInfo } from '../../lib/learningHubData';

interface DynamicCourseWrapperProps {
  course: MiniCourseInfo;
  markdownContent?: string | null; // Make markdownContent optional
  children?: ReactNode; // Add children prop
}

export default function DynamicCourseWrapper({
  course,
  markdownContent,
  children // Accept children prop
}: DynamicCourseWrapperProps) {
  // This wrapper component handles the client-side component rendering
  // while keeping the page component as a simple server component
  return (
    <CourseDetailTemplate
      course={course}
      markdownContent={markdownContent || undefined}
      children={children} // Pass children down to CourseDetailTemplate
    />
  );
}
