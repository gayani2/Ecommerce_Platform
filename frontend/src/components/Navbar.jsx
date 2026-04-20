import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogIn, Search, User, Menu, LogOut, ChevronDown, X } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logoutHandler = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (searchKeyword.trim()) {
      navigate(`/search/${searchKeyword}`);
      setSearchKeyword('');
    } else {
      navigate('/');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 glass-card rounded-none border-t-0 border-x-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                E
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                ElectroShop
              </span>
            </Link>
          </div>

          {/* Desktop search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={submitSearch} className="relative group">
              <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors hover:text-primary-600" />
              </button>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 sm:text-sm transition-all duration-300"
                placeholder="Search premium products..."
              />
            </form>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/cart" className="relative text-gray-600 hover:text-primary-600 transition-colors group">
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-primary-600 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium bg-gray-100/80 hover:bg-gray-200/80 px-4 py-2 rounded-full"
                >
                  <User className="h-4 w-4" />
                  <span>{userInfo.name.split(' ')[0]}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg py-1 border border-gray-100 z-50 animate-fade-in">
                    {userInfo.isAdmin && (
                      <>
                        <p className="px-4 py-1 text-xs font-bold text-primary-600 uppercase tracking-wider">Admin Panel</p>
                        <Link to="/admin/userlist" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Manage Users</Link>
                        <Link to="/admin/productlist" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Manage Products</Link>
                        <Link to="/admin/orderlist" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Manage Orders</Link>
                        <div className="border-t border-gray-100 my-1" />
                      </>
                    )}
                    <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex flex-row items-center gap-2">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors font-medium">
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile right side */}
          <div className="flex items-center md:hidden gap-4">
            <Link to="/cart" className="relative text-gray-600">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-1"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-4 space-y-4">
          <form onSubmit={submitSearch} className="relative">
            <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </button>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              placeholder="Search products..."
            />
          </form>

          <div className="space-y-1">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Home</Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Cart ({cartCount})</Link>

            {userInfo ? (
              <>
                {userInfo.isAdmin && (
                  <>
                    <p className="px-3 pt-2 text-xs font-bold text-primary-600 uppercase tracking-wider">Admin</p>
                    <Link to="/admin/userlist" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Manage Users</Link>
                    <Link to="/admin/productlist" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Manage Products</Link>
                    <Link to="/admin/orderlist" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Manage Orders</Link>
                  </>
                )}
                <button onClick={logoutHandler} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
