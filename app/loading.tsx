export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#F3FDF5]">
      <div className="text-center">
        <div className="w-[60px] h-[60px] border-4 border-[rgba(32,226,143,0.2)] border-t-[#20E28F] rounded-full mx-auto mb-5 animate-spin"></div>
        <div className="font-sans text-[#103138] font-semibold">
          Loading...
        </div>
      </div>
    </div>
  );
} 