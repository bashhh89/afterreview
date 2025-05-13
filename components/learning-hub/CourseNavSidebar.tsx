import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Lesson {
  id: string | number;
  title: string;
  completed: boolean;
}

interface CourseNavSidebarProps {
  user: {
    name: string;
    avatar: string;
    tier: string;
  };
  courseName: string;
  lessons: Lesson[];
  currentLesson: string | number;
  onLessonSelect: (lessonId: string | number) => void;
}

const socialLinks = [
  { href: 'https://www.linkedin.com/company/social-garden/', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg> },
  { href: 'https://twitter.com/socialgardenau', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .386.044.762.127 1.124-4.09-.205-7.719-2.166-10.148-5.144-.424.729-.666 1.577-.666 2.476 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.23-.616v.062c0 2.386 1.697 4.374 3.95 4.827-.413.112-.849.172-1.298.172-.318 0-.626-.031-.927-.088.627 1.956 2.444 3.377 4.6 3.417-1.68 1.317-3.797 2.102-6.102 2.102-.396 0-.787-.023-1.175-.069 2.179 1.397 4.768 2.213 7.548 2.213 9.057 0 14.015-7.506 14.015-14.015 0-.213-.005-.425-.014-.636.962-.695 1.797-1.562 2.457-2.549z" /></svg> },
];

export default function CourseNavSidebar({
  user,
  courseName,
  lessons,
  currentLesson,
  onLessonSelect,
}: CourseNavSidebarProps) {
  const progress = (lessons.filter(l => l.completed).length / lessons.length) * 100;

  return (
    <>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none" style={{background: 'radial-gradient(circle at 30% 20%, brand-mint-green 0%, transparent 60%)'}} />

      {/* Top: Back button and course name */}
      <div className="z-10 relative">
        <Link
          href="/learning-hub"
          className="inline-flex items-center gap-2 text-brand-mint-green hover:text-white transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Learning Hub
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-brand-mint-green flex items-center justify-center text-brand-deep-teal font-extrabold text-2xl shadow-lg border-4 border-white">
            {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" /> : user.name[0]}
          </div>
          <div>
            <div className="text-white text-lg font-bold leading-tight">{courseName}</div>
            <div className="text-brand-mint-green text-xs font-semibold">{user.name} • {user.tier}</div>
          </div>
        </div>

        {/* Course Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-brand-mint-green font-semibold">Course Progress</span>
            <span className="text-sm text-white font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-brand-mint-green/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-mint-green rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Course Sections */}
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <button
              key={`lesson-${lesson.id}`}
              onClick={() => onLessonSelect(lesson.id)}
              className={`
                w-full text-left p-4 rounded-lg transition-all
                ${currentLesson === lesson.id
                  ? 'bg-brand-mint-green text-brand-deep-teal shadow-md'
                  : 'text-white hover:bg-brand-mint-green/20'
                }
                ${lesson.completed ? 'font-medium' : ''}
              `}
            >
              <div className="flex items-center">
                <div className={`
                  w-6 h-6 rounded-full mr-3 flex items-center justify-center
                  ${lesson.completed
                    ? 'bg-white text-brand-deep-teal'
                    : currentLesson === lesson.id
                      ? 'bg-brand-deep-teal text-white'
                      : 'border-2 border-brand-mint-green/50'
                  }
                `}>
                  {lesson.completed ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs">{typeof lesson.id === 'string' ? lesson.id.split('-')[1] : lesson.id}</span>
                  )}
                </div>
                <span className="text-sm">{lesson.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="z-10 relative mt-auto pt-8 border-t border-white/20 flex flex-col items-center gap-3">
        <div className="mb-1">
          <div className="w-12 h-12 rounded-full bg-brand-mint-green flex items-center justify-center shadow-md">
            <span className="text-brand-deep-teal font-extrabold text-2xl">SG</span>
          </div>
        </div>
        <div className="flex gap-3 mb-1">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-brand-mint-green hover:text-white transition-colors">{s.icon}</a>
          ))}
        </div>
        <a
          href="https://www.socialgarden.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-mint-green text-xs font-semibold hover:underline mb-1"
        >
          © {new Date().getFullYear()} Social Garden
        </a>
        <a href="mailto:support@socialgarden.com.au" className="text-white text-xs hover:underline">Need help? Contact support</a>
      </div>
    </>
  );
}
