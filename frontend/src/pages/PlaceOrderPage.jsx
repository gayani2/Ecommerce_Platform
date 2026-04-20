import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import axios from '../utils/axiosConfig';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { cartItems, shippingAddress, paymentMethod, clearCartItems } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems.map(item => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id,
          })),
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        config
      );

      clearCartItems();
      navigate(`/order/${data._id}`);
    } catch (error) {
      alert(error.response && error.response.data.message
        ? error.response.data.message
        : error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 animate-fade-in">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="glass-card p-6 border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Shipping</h2>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Address: </span>
              {shippingAddress.address}, {shippingAddress.city}{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          <div className="glass-card p-6 border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Payment Method</h2>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Method: </span>
              {paymentMethod}
            </p>
          </div>

          <div className="glass-card p-6 border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Order Items</h2>
            {cartItems.length === 0 ? (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-xl">Your cart is empty</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item, index) => (
                  <li key={index} className="py-4 flex gap-6 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                    />
                    <div className="flex-1">
                      <Link to={`/product/${item._id}`} className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        {item.name}
                      </Link>
                    </div>
                    <div className="font-medium text-gray-700 whitespace-nowrap">
                      {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
           </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-card p-6 border border-gray-100 rounded-2xl shadow-lg shadow-gray-200/50 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Order Summary</h2>
             <ul className="space-y-4 mb-8">
               <li className="flex justify-between text-gray-600">
                 <span>Items</span>
                 <span className="font-medium text-gray-900">${itemsPrice}</span>
               </li>
               <li className="flex justify-between text-gray-600">
                 <span>Shipping</span>
                 <span className="font-medium text-gray-900">${shippingPrice}</span>
               </li>
               <li className="flex justify-between text-gray-600">
                 <span>Tax</span>
                 <span className="font-medium text-gray-900">${taxPrice}</span>
               </li>
               <li className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-100 pt-4 mt-2">
                 <span>Total</span>
                 <span className="text-primary-600">${totalPrice}</span>
               </li>
             </ul>

             <button
               type="button"
               disabled={cartItems.length === 0}
               className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                 cartItems.length === 0
                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                   : 'btn-primary'
               }`}
               onClick={placeOrderHandler}
             >
               Place Order
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
