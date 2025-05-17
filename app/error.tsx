'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center bg-white">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-[#103138] mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Our team has been notified of this issue.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-[#20E28F] text-[#103138] font-medium rounded-md hover:bg-opacity-90 transition-all"
        >
          Try again
        </button>
        <p className="text-sm text-gray-500 mt-8">
          If the issue persists, please contact support.
        </p>
      </div>
    </div>
  );
} 