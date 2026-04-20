import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col h-full"
    >
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden bg-gray-50 aspect-square">
        <div className="absolute inset-0 bg-primary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-t-2xl mix-blend-overlay"></div>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Badge Example */}
        {product.countInStock === 0 && (
          <div className="absolute top-3 right-3 z-20 bg-red-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Out of Stock
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-primary-600 font-semibold uppercase tracking-wider mb-2">
          {product.category}
        </div>
        
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-4 mt-auto">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2 font-medium">({product.numReviews})</span>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="text-xl font-black text-gray-900">
            ${product.price}
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
              navigate('/cart');
            }}
            disabled={product.countInStock === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md group-hover:shadow-lg
              ${product.countInStock === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-110 active:scale-95'}`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
