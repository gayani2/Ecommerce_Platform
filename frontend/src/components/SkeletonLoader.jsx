import { Star } from 'lucide-react';

const SkeletonLoader = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full opacity-60">
      <div className="relative w-full aspect-square bg-gray-200 animate-pulse">
        {/* Placeholder for the image */}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-4/5 mb-4 animate-pulse"></div>
        
        <div className="flex items-center mb-4 mt-auto">
          <div className="flex items-center space-x-1">
             {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-4 h-4 text-gray-200" 
              />
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-8 ml-2 animate-pulse"></div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
           <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
           <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
