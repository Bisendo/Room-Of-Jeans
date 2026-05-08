import { useState } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-roj-blue">
              ROJ
              <span className="text-roj-gold text-sm block -mt-1">Room of Jeans</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-roj-blue font-medium transition">Home</a>
            <a href="/shop" className="text-gray-700 hover:text-roj-blue font-medium transition">Shop</a>
            <a href="/men" className="text-gray-700 hover:text-roj-blue font-medium transition">Men</a>
            <a href="/women" className="text-gray-700 hover:text-roj-blue font-medium transition">Women</a>
            <a href="/sale" className="text-red-600 hover:text-red-700 font-medium transition">Sale</a>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-roj-blue" />
            <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-roj-blue" />
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-gray-600 cursor-pointer hover:text-roj-blue" />
              <span className="absolute -top-2 -right-2 bg-roj-gold text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <a href="/" className="text-gray-700 hover:text-roj-blue">Home</a>
              <a href="/shop" className="text-gray-700 hover:text-roj-blue">Shop</a>
              <a href="/men" className="text-gray-700 hover:text-roj-blue">Men</a>
              <a href="/women" className="text-gray-700 hover:text-roj-blue">Women</a>
              <a href="/sale" className="text-red-600">Sale</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;