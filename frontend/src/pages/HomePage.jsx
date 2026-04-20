import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { ArrowRight, Zap, Target, Shield, Smartphone, Camera, Headphones, Laptop } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { keyword, category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '/api/products';
        if (keyword) {
           url += `?keyword=${keyword}`;
        } else if (category) {
           url += `?category=${category}`;
        }
        const { data } = await axios.get(url);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, category]);

  return (
    <div className="space-y-16 pb-12">
      {/* Show Hero and Categories only on the main page */}
      {!keyword && !category && (
        <>
          {/* Hero Section */}
          <section className="relative rounded-3xl overflow-hidden glass-card border border-gray-100/50 shadow-2xl animate-fade-in group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-800 to-gray-900 z-0">
               <img src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Tech Background" className="w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
            </div>
            
            <div className="relative z-10 px-8 py-20 lg:px-16 lg:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-white max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 font-medium text-sm">
                  <Zap className="w-4 h-4 text-yellow-400 fill-current" /> Next-Gen Electronics
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                  The Future of Tech is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">Here.</span>
                </h1>
                <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                  Discover our exclusive collection of premium electronics, meticulously curated for the modern lifestyle.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#featured" className="btn-primary py-4 hover:scale-105 active:scale-95 transition-transform text-lg shadow-lg shadow-primary-500/30">
                    Explore Collection
                  </a>
                  <Link to="/category/electronics" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold transition-all text-white flex items-center gap-2 hover:border-white/40">
                    View Categories <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Shop by Category</h2>
              <Link to="/category/all" className="text-primary-600 font-bold hover:text-primary-700 flex items-center gap-1 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { name: 'Electronics', icon: <Smartphone className="w-8 h-8 mb-4 text-primary-500" />, link: '/category/Electronics' },
                 { name: 'Cameras', icon: <Camera className="w-8 h-8 mb-4 text-primary-500" />, link: '/category/Cameras' },
                 { name: 'Audio', icon: <Headphones className="w-8 h-8 mb-4 text-primary-500" />, link: '/category/Audio' },
                 { name: 'Computers', icon: <Laptop className="w-8 h-8 mb-4 text-primary-500" />, link: '/category/Computers' }
               ].map((cat) => (
                 <Link to={cat.link} key={cat.name} className="glass-card p-8 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-500/10">
                   <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                     {cat.icon}
                   </div>
                   <h3 className="font-bold text-gray-900 mt-4 group-hover:text-primary-600 transition-colors">{cat.name}</h3>
                 </Link>
               ))}
            </div>
          </section>
        </>
      )}

      {/* Product List Section */}
      <section id="featured" className="animate-fade-in" style={{animationDelay: '0.2s'}}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              {keyword ? `Search Results for "${keyword}"` : category ? `Category: ${category}` : 'Featured Products'}
            </h2>
            <p className="text-gray-500">
              {keyword || category ? `Showing results matching your criteria` : 'Handpicked gadgets for your everyday needs'}
            </p>
            {(keyword || category) && (
              <Link to="/" className="inline-block mt-4 text-sm font-bold text-primary-600 bg-primary-50 px-4 py-2 rounded-full hover:bg-primary-100 transition-colors">
                &larr; Clear Filters
              </Link>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center font-medium shadow-sm border border-red-100">{error}</div>
        ) : products.length === 0 ? (
          <EmptyState 
            title="No Products Found"
            message="We couldn't find anything matching your search criteria. Try browsing our categories."
            actionText="Browse Categories"
            actionLink="/category/all"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
