import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const { shippingAddress, saveShippingAddress } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=shipping');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 animate-fade-in">
      <CheckoutSteps step1 step2 />
      <div className="glass-card p-8 sm:p-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b border-gray-100 pb-4">
          Shipping Address
        </h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              placeholder="Enter street address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-gray-50/50"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-gray-50/50"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-gray-50/50"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-gray-50/50"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-4 text-lg shadow-lg shadow-primary-500/30 mt-8"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
