import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import AuthContext from '../../context/AuthContext';
import Loader from '../../components/Loader';
import { CheckCircle2, XCircle, ClipboardList } from 'lucide-react';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate('/');
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/orders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userInfo, navigate]);

  return (
    <div className="max-w-6xl mx-auto py-12 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <ClipboardList className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-black text-gray-900">Order Management</h1>
      </div>

      {loading ? <Loader /> : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>
      ) : (
        <div className="glass-card rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {['Order ID', 'User', 'Date', 'Total', 'Paid', 'Delivered', 'Details'].map(h => (
                  <th key={h} className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-sm font-mono text-gray-500 truncate max-w-[100px]">{order._id}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">{order.user?.name || 'N/A'}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.createdAt?.substring(0, 10)}</td>
                  <td className="px-4 py-4 text-sm font-bold text-primary-600">${order.totalPrice}</td>
                  <td className="px-4 py-4">
                    {order.isPaid ? (
                      <span className="flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {order.paidAt?.substring(0, 10)}
                      </span>
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {order.isDelivered ? (
                      <span className="flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {order.deliveredAt?.substring(0, 10)}
                      </span>
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <Link to={`/order/${order._id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListPage;
