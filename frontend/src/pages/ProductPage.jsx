import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import axios from '../utils/axiosConfig';
import Loader from '../components/Loader';
import CartContext from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  
  if (error) return (
    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium mt-10">
      <Link to="/" className="text-primary-600 hover:underline mb-4 block">&larr; Go Back</Link>
      {error}
    </div>
  );

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-8 group">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary-600 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Results
        </Link>
        <div className="text-sm text-gray-400 hidden sm:block">
          Home / {product.category} / <span className="text-gray-900">{product.brand}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image Panel */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/10 to-transparent z-10 pointer-events-none"></div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {product.countInStock === 0 && (
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-20 flex items-center justify-center">
                <span className="bg-red-600 text-white font-bold px-6 py-2 rounded-full text-lg shadow-xl shadow-red-500/20">Sold Out</span>
              </div>
            )}
          </div>
          {/* Thumbnail Gallery (Mock) */}
           <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
               <div key={i} className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${i === 1 ? 'border-primary-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'}`}>
                 <img src={product.image} className="w-full h-full object-cover" alt="thumbnail" />
               </div>
            ))}
           </div>
        </div>

        {/* Product Details Panel */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3 py-1 rounded-full">
              {product.brand}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current drop-shadow-sm' : 'text-gray-200'}`} 
                />
              ))}
              <span className="ml-2 text-gray-600 font-medium">{product.rating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-primary-600 hover:text-primary-700 cursor-pointer font-medium underline decoration-primary-200 underline-offset-4">
              {product.numReviews} Student Reviews
            </span>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl font-black text-gray-900 tracking-tighter">${product.price}</span>
              <span className="text-xl text-gray-400 line-through font-medium">${(product.price * 1.2).toFixed(2)}</span>
            </div>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.countInStock > 0 ? 'In Stock & Ready to Ship' : 'Currently Unavailable'}
            </div>
          </div>

          {/* Quantity and Actions */}
          {product.countInStock > 0 && (
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-32 flex rounded-xl border border-gray-200 p-1 bg-white">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex-1 flex justify-center items-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors h-12 w-10 text-xl">−</button>
                  <div className="flex-1 flex justify-center items-center font-bold text-gray-900 text-lg w-10">{qty}</div>
                  <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="flex-1 flex justify-center items-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors h-12 w-10 text-xl">+</button>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {product.countInStock} items available
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => {
                addToCart(product, qty);
                navigate('/cart');
              }}
              className={`flex-1 btn-primary py-4 text-lg shadow-lg flex justify-center items-center gap-2 ${product.countInStock === 0 ? 'opacity-50 cursor-not-allowed bg-gray-400' : ''}`}
              disabled={product.countInStock === 0}
            >
              Configure & Add to Cart
            </button>
            <button className="w-14 h-14 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-300">
              <Heart className="w-6 h-6" />
            </button>
            <button className="w-14 h-14 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-400 hover:text-primary-500 hover:border-primary-200 hover:bg-primary-50 transition-all duration-300">
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 mb-8">
            <div className="flex flex-col items-center text-center gap-2">
               <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                 <ShieldCheck className="w-5 h-5"/>
               </div>
               <span className="text-xs font-medium text-gray-700">2 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
               <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                 <Truck className="w-5 h-5"/>
               </div>
               <span className="text-xs font-medium text-gray-700">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
               <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                 <RotateCcw className="w-5 h-5"/>
               </div>
               <span className="text-xs font-medium text-gray-700">30-Day Returns</span>
            </div>
          </div>

          {/* Product Information Accordion/Tabs */}
          <div className="mt-auto border-t border-gray-100 pt-8">
            <div className="flex gap-8 border-b border-gray-200 mb-6">
              <button onClick={() => setActiveTab('description')} className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'description' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-800'}`}>
                Description
                {activeTab === 'description' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>}
              </button>
              <button onClick={() => setActiveTab('specs')} className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'specs' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-800'}`}>
                Specifications
                {activeTab === 'specs' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>}
              </button>
            </div>
            
            <div className="prose prose-sm text-gray-600 leading-relaxed max-w-none">
              {activeTab === 'description' ? (
                <p>{product.description}</p>
              ) : (
                <ul className="space-y-2">
                  <li className="flex justify-between py-2 border-b border-gray-100"><span className="font-medium text-gray-900">Brand</span> <span>{product.brand}</span></li>
                  <li className="flex justify-between py-2 border-b border-gray-100"><span className="font-medium text-gray-900">Category</span> <span>{product.category}</span></li>
                  <li className="flex justify-between py-2 border-b border-gray-100"><span className="font-medium text-gray-900">Item Weight</span> <span>1.2 lbs</span></li>
                  <li className="flex justify-between py-2 border-b border-gray-100"><span className="font-medium text-gray-900">Dimensions</span> <span>10 x 8 x 2 inches</span></li>
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;
