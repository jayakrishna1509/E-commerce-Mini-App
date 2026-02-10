import { ShoppingCart, Moon, Sun, LogOut, LogIn, Menu, X, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

export const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} shadow-lg sticky top-0 z-50 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-2xl text-blue-600" onClick={() => setMobileMenuOpen(false)}>
            <ShoppingCart className="w-6 h-6" />
            <span className="hidden sm:inline">E-commerce Store</span>
          </Link>

          {/* Center Links - Desktop */}
          <div className="hidden md:flex gap-4 lg:gap-6">
            <Link to="/" className="text-sm lg:text-base hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/cart" className="text-sm lg:text-base hover:text-blue-600 transition flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              Cart
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 sm:p-2 rounded transition ${isDarkMode ? 'bg-gray-900 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 sm:w-5 sm:h-5" /> : <Moon className="w-5 h-5 sm:w-5 sm:h-5" />}
            </button>

            {/* Mobile Cart Badge */}
            <Link to="/cart" className="md:hidden relative text-sm lg:text-base hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth - Desktop */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              {isLoggedIn ? (
                <>
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">{user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded flex items-center gap-1 sm:gap-2 transition text-xs sm:text-sm"
                  >
                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded flex items-center gap-1 sm:gap-2 transition text-xs sm:text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded flex items-center gap-1 sm:gap-2 transition text-xs sm:text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Register</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'} py-4 space-y-3`}>
            {/* Mobile Navigation Links */}
            <Link
              to="/"
              className="block px-4 py-2 text-sm rounded hover:bg-blue-600 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="block px-4 py-2 text-sm rounded hover:bg-blue-600 hover:text-white transition flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Auth */}
            <div className="border-t border-gray-300 dark:border-gray-700 pt-3 space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-2 text-sm font-medium">
                    {user?.username}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm rounded bg-red-500 hover:bg-red-600 text-white transition flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white transition text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white transition text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
