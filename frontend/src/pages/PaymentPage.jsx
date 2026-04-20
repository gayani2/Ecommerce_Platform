import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import CheckoutSteps from '../components/CheckoutSteps';
import { CreditCard, Wallet } from 'lucide-react';

const PaymentPage = () => {
  const { shippingAddress, paymentMethod, savePaymentMethod } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=shipping');
    } else if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [userInfo, shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 animate-fade-in">
      <CheckoutSteps step1 step2 step3 />
      <div className="glass-card p-8 sm:p-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b border-gray-100 pb-4">
          Payment Method
        </h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-4">
             <label 
               className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                 paymentMethodName === 'PayPal' 
                   ? 'border-primary-500 bg-primary-50 shadow-sm' 
                   : 'border-gray-200 hover:border-gray-300'
               }`}
             >
               <input
                 type="radio"
                 className="form-radio h-5 w-5 text-primary-600 focus:ring-primary-500"
                 id="PayPal"
                 name="paymentMethod"
                 value="PayPal"
                 checked={paymentMethodName === 'PayPal'}
                 onChange={(e) => setPaymentMethodName(e.target.value)}
               />
               <div className="ml-4 flex items-center gap-3">
                 <Wallet className={`h-6 w-6 ${paymentMethodName === 'PayPal' ? 'text-primary-600' : 'text-gray-400'}`} />
                 <span className={`text-lg font-medium ${paymentMethodName === 'PayPal' ? 'text-primary-900' : 'text-gray-700'}`}>
                   PayPal or Credit Card
                 </span>
               </div>
             </label>

             <label 
               className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                 paymentMethodName === 'Stripe' 
                   ? 'border-primary-500 bg-primary-50 shadow-sm' 
                   : 'border-gray-200 hover:border-gray-300'
               }`}
             >
               <input
                 type="radio"
                 className="form-radio h-5 w-5 text-primary-600 focus:ring-primary-500"
                 id="Stripe"
                 name="paymentMethod"
                 value="Stripe"
                 checked={paymentMethodName === 'Stripe'}
                 onChange={(e) => setPaymentMethodName(e.target.value)}
               />
               <div className="ml-4 flex items-center gap-3">
                 <CreditCard className={`h-6 w-6 ${paymentMethodName === 'Stripe' ? 'text-primary-600' : 'text-gray-400'}`} />
                 <span className={`text-lg font-medium ${paymentMethodName === 'Stripe' ? 'text-primary-900' : 'text-gray-700'}`}>
                   Stripe
                 </span>
               </div>
             </label>
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-4 text-lg shadow-lg shadow-primary-500/30 mt-8"
          >
            Continue to Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
