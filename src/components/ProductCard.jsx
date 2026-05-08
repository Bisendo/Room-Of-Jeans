import { ShoppingCart, Heart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
        />
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
        </button>
        <div className="absolute bottom-4 left-4 bg-roj-gold text-white px-2 py-1 rounded-md text-sm font-semibold">
          -15% OFF
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-roj-blue font-semibold">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-roj-blue">${product.price}</span>
          <span className="text-gray-400 line-through">$99.99</span>
        </div>
        
        <div className="flex gap-1 mb-4">
          {product.colors.map((color, idx) => (
            <div 
              key={idx}
              className={`w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer hover:border-roj-blue transition`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            ></div>
          ))}
        </div>
        
        <button className="w-full bg-roj-blue text-white py-2 rounded-lg font-semibold hover:bg-roj-indigo transition flex items-center justify-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;