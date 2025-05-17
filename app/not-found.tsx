import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center bg-white">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-[#103138] mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-[#20E28F] text-[#103138] font-medium rounded-md hover:bg-opacity-90 transition-all inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
} 