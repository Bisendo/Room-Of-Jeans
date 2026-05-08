import { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onQuickView, viewMode = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 h-48 relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                -{product.discount}% OFF
              </div>
            )}
          </div>
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-roj-blue font-semibold uppercase">{product.category}</span>
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-roj-blue">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500">
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => onAddToCart && onAddToCart(product, selectedColor)}
                className="flex-1 bg-roj-blue text-white py-2 rounded-lg font-semibold hover:bg-roj-indigo transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button 
                onClick={() => onQuickView && onQuickView(product)}
                className="px-4 border border-roj-blue text-roj-blue rounded-lg hover:bg-roj-blue hover:text-white transition"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (original)
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
        />
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold z-10">
            -{product.discount}% OFF
          </div>
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <button 
            onClick={() => onQuickView && onQuickView(product)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-roj-blue hover:text-white transition"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-roj-blue font-semibold uppercase">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-roj-blue">Tsh{product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">Tsh{product.originalPrice}</span>
          )}
        </div>
        <div className="flex gap-2 mb-4">
          {product.colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColor(color)}
              className={`w-7 h-7 rounded-full border-2 transition ${
                selectedColor === color ? 'border-roj-blue ring-2 ring-roj-blue ring-offset-2' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
        <button 
          onClick={() => onAddToCart && onAddToCart(product, selectedColor)}
          className="w-full bg-gradient-to-r from-roj-blue to-roj-indigo text-white py-2.5 rounded-lg font-semibold hover:from-roj-indigo hover:to-roj-blue transition flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;