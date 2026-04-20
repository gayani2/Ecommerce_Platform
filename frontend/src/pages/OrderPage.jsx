import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import { CheckCircle2, SearchX } from 'lucide-react';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/orders/${orderId}`, config);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, userInfo]);

  const successPaymentHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        { id: 'simulated-payment-' + Date.now(), status: 'COMPLETED' },
        config
      );
      setOrder(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loader />;
  if (error) return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-center">
      <div className="glass-card p-12 flex flex-col items-center">
        <SearchX className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
        <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
        <Link to="/" className="mt-6 btn-primary">Go Home</Link>
      </div>
    </div>
  );
  if (!order) return null;

  return (
    <div className="max-w-6xl mx-auto py-12 animate-fade-in">
      <h1 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-widest break-all">
        Order #{order._id}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">

          <div className="glass-card p-6 border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Shipping Details</h2>
            <div className="space-y-2 mb-4">
              <p className="text-gray-700"><strong className="text-gray-900 font-semibold">Name: </strong>{order.user?.name}</p>
              <p className="text-gray-700">
                <strong className="text-gray-900 font-semibold">Email: </strong>
                <a href={`mailto:${order.user?.email}`} className="text-primary-600 hover:underline">{order.user?.email}</a>
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900 font-semibold">Address: </strong>
                {order.shippingAddress?.address}, {order.shippingAddress?.city}{' '}
                {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
              </p>
            </div>
            {order.isDelivered ? (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 p-4 rounded-xl border border-green-100">
                <CheckCircle2 className="w-5 h-5" /> Delivered on {order.deliveredAt?.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-100 font-medium tracking-wide">
                Processing for Delivery...
              </div>
            )}
          </div>

          <div className="glass-card p-6 border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Payment Status</h2>
            <p className="text-gray-700 mb-4">
              <strong className="text-gray-900 font-semibold">Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 font-medium">
                <CheckCircle2 className="w-5 h-5" /> Paid on {order.paidAt?.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 font-medium tracking-wide">
                Awaiting Payment
              </div>
            )}
          </div>

          <div className="glass-card p-6 border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Order Items</h2>
            {order.orderItems?.length === 0 ? (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-xl">Order is empty</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {order.orderItems?.map((item, index) => (
                  <li key={index} className="py-4 flex gap-6 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-gray-100" />
                    <div className="flex-1">
                      <Link to={`/product/${item.product}`} className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
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
                <span className="font-medium text-gray-900">${order.itemsPrice}</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">${order.shippingPrice}</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-medium text-gray-900">${order.taxPrice}</span>
              </li>
              <li className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-100 pt-4 mt-2">
                <span>Total</span>
                <span className="text-primary-600">${order.totalPrice}</span>
              </li>
            </ul>

            {!order.isPaid && (
              <div className="pt-2 border-t border-gray-200">
                <div className="space-y-4 pt-4">
                  <button
                    onClick={successPaymentHandler}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {order.paymentMethod === 'PayPal' ? 'Simulate PayPal Payment' : 'Simulate Stripe Payment'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
