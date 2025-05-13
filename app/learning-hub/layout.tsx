import React from 'react';

export default function LearningHubLayout({ children }: { children: React.ReactNode }) {
  // Demo user data (replace with real user info if available)
  // const user = { name: 'Alex', avatar: '', tier: 'Dabbler' };

  return (
    <div className="min-h-screen bg-[#f8faf9] font-sans flex flex-col">
      {/* Main Title */}
      <header className="w-full px-8 py-10 bg-white border-b border-gray-100 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#004851] tracking-tight text-center">
          Social Garden AI Learning Hub
        </h1>
      </header>
      {/* Main Content Area (no sidebar here) */}
      <div className="flex flex-1 max-w-7xl mx-auto mt-10 rounded-3xl shadow-2xl overflow-hidden bg-white min-h-[700px]">
        <main className="flex-1 bg-gray-50 px-8 md:px-12 py-12 md:py-16 flex flex-col justify-start items-center min-h-[700px]">
          {children}
        </main>
      </div>
    </div>
  );
} 