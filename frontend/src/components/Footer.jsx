import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                E
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                ElectroShop
              </span>
            </Link>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              Premium electronics and gadgets for the modern world. Quality guaranteed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">All Products</Link></li>
              <li><Link to="/category/electronics" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">Electronics</Link></li>
              <li><Link to="/category/cameras" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">Cameras</Link></li>
              <li><Link to="/category/accessories" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Newsletter</h3>
            <p className="text-gray-500 text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm transition-all"
              />
              <button className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ElectroShop. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            Powered with <Zap className="w-4 h-4 text-yellow-400 fill-current" /> by ElectroTeam
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
