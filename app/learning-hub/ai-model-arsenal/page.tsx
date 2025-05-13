import CourseDetailTemplate from '@/components/learning-hub/CourseDetailTemplate';
import { aiModelArsenalCourseData, aiModelArsenalMarkdownContent } from './aiModelArsenalCourseData';

const AiModelArsenalCoursePage = () => {
  return (
    <CourseDetailTemplate course={aiModelArsenalCourseData} markdownContent={aiModelArsenalMarkdownContent} />
  );
};

export default AiModelArsenalCoursePage;
