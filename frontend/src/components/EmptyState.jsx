import { Box } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({ title = "No Items Found", message = "We couldn't find anything matching your request.", showAction = true, actionText = "Browse Products", actionLink = "/" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm col-span-full">
      <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-6">
         <Box className="w-10 h-10 text-primary-500" />
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md text-center mb-8">{message}</p>
      
      {showAction && (
        <Link 
          to={actionLink} 
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
