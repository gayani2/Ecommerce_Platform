import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
        <p className="text-gray-500 font-medium tracking-wide animate-pulse">Loading amazing products...</p>
      </div>
    </div>
  );
};

export default Loader;
