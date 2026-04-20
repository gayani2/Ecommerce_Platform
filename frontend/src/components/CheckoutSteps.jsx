import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex items-center justify-center w-full mb-12" aria-label="Progress">
      <ol className="flex items-center w-full max-w-2xl px-4">
        {[
          { id: '1', name: 'Sign In', link: '/login', current: step1 },
          { id: '2', name: 'Shipping', link: '/shipping', current: step2 },
          { id: '3', name: 'Payment', link: '/payment', current: step3 },
          { id: '4', name: 'Place Order', link: '/placeorder', current: step4 },
        ].map((step, stepIdx) => (
          <li key={step.name} className={`relative sm:flex-1 ${stepIdx !== 0 ? 'pl-4' : ''}`}>
             <div className="absolute inset-0 flex items-center" aria-hidden="true">
               {stepIdx !== 0 && (
                  <div className={`h-1 w-full rounded-full transition-colors duration-300 ${step.current ? 'bg-primary-500' : 'bg-gray-200'}`} />
               )}
            </div>
            
            <Link
              to={step.current || stepIdx === 0 ? step.link : '#'}
              className={`relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                step.current
                  ? 'bg-white border-primary-600 ring-4 ring-primary-100'
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`}
            >
              <span className={`text-sm sm:text-base font-bold ${step.current ? 'text-primary-600' : 'text-gray-500'}`}>
                {step.id}
              </span>
            </Link>
            
            <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${
                step.current ? 'text-primary-700' : 'text-gray-400'
              }`}>
              {step.name}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutSteps;
