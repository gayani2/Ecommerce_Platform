import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { Trash2, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  // If already logged in go straight to shipping, otherwise go to login first
  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=shipping');
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any premium electronics to your cart yet.</p>
          <Link to="/" className="btn-primary inline-flex">Go Back to Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden p-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <Link to={`/product/${item._id}`} className="text-lg font-bold text-gray-900 hover:text-primary-600 line-clamp-2 mb-2 transition-colors">
                    {item.name}
                  </Link>
                  <div className="text-xl font-black text-gray-900">${item.price}</div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-1">
                    <button
                      onClick={() => addToCart(item, Math.max(1, item.qty - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-gray-600 transition-all font-medium"
                    >−</button>
                    <div className="w-8 text-center font-bold text-gray-900">{item.qty}</div>
                    <button
                      onClick={() => addToCart(item, Math.min(item.countInStock, item.qty + 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-gray-600 transition-all font-medium"
                    >+</button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-fit sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span className="font-medium text-gray-900">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-gray-900 font-bold">Subtotal</span>
                <span className="text-3xl font-black text-gray-900">
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">Taxes & shipping calculated at checkout</p>
            </div>

            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className="w-full btn-primary py-4 text-lg shadow-lg flex justify-center items-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
