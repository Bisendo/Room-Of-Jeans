import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { useState } from 'react';

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold z-10">
            -{product.discount}% OFF
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-10 group-hover:translate-x-0">
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-all duration-300 hover:scale-110"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`} />
          </button>
          <button 
            onClick={() => onQuickView && onQuickView(product)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-roj-blue hover:text-white transition-all duration-300 hover:scale-110"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={() => onAddToCart && onAddToCart(product, selectedColor)}
            className="w-full flex items-center justify-center gap-2 font-semibold hover:text-roj-gold transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Quick Add
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-roj-blue font-semibold uppercase tracking-wide">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>
        
        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 hover:text-roj-blue transition cursor-pointer">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-roj-blue">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
              <span className="text-green-600 text-sm font-semibold">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
            </>
          )}
        </div>
        
        {/* Color Options */}
        <div className="flex gap-2 mb-4">
          {product.colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColor(color)}
              className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color 
                  ? 'border-roj-blue ring-2 ring-roj-blue ring-offset-2' 
                  : 'border-gray-300 hover:border-roj-blue'
              }`}
              style={{ 
                backgroundColor: color.toLowerCase(),
                boxShadow: selectedColor === color ? '0 0 0 2px #D4AF37' : 'none'
              }}
              title={color}
            />
          ))}
        </div>
        
        {/* Add to Cart Button */}
        <button 
          onClick={() => onAddToCart && onAddToCart(product, selectedColor)}
          className="w-full bg-gradient-to-r from-roj-blue to-roj-indigo text-white py-2.5 rounded-lg font-semibold hover:from-roj-indigo hover:to-roj-blue transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;