import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const socialLinks = {
    facebook: "https://www.facebook.com/p/Room-Of-jeans-61550354143991/",
    instagram: "https://www.instagram.com/room_of_jeans/",
    twitter: "https://twitter.com/rojroomofjeans"
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-roj-blue">
              ROJ
              <span className="text-roj-gold text-sm block -mt-1">Room of Jeans</span>
            </h1>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-roj-blue font-medium transition">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-roj-blue font-medium transition">Shop</Link>
            <Link to="/women" className="text-gray-700 hover:text-roj-blue font-medium transition">Women</Link>
            <Link to="/sale" className="text-red-600 hover:text-red-700 font-medium transition">Sale</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3 border-r border-gray-300 pr-4">
              <button onClick={() => handleSocialClick(socialLinks.instagram)} className="text-gray-600 hover:text-roj-blue transition">
                <FaInstagram className="w-4 h-4" />
              </button>
              <button onClick={() => handleSocialClick(socialLinks.facebook)} className="text-gray-600 hover:text-roj-blue transition">
                <FaFacebook className="w-4 h-4" />
              </button>
              <button onClick={() => handleSocialClick(socialLinks.twitter)} className="text-gray-600 hover:text-roj-blue transition">
                <FaTwitter className="w-4 h-4" />
              </button>
            </div>
            <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-roj-blue transition" />
            <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-roj-blue transition" />
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-5 h-5 text-gray-600 cursor-pointer hover:text-roj-blue transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-roj-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-roj-blue">Home</Link>
              <Link to="/shop" className="text-gray-700 hover:text-roj-blue">Shop</Link>
              <Link to="/women" className="text-gray-700 hover:text-roj-blue">Women</Link>
              <Link to="/sale" className="text-red-600">Sale</Link>
              <Link to="/cart" className="text-gray-700 hover:text-roj-blue">Cart ({cartCount})</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;