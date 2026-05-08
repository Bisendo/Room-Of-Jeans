import { useState } from 'react';

import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  RotateCcw, 
  Shield, 
  Minus, 
  Plus,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ProductDetails = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Mock additional images (in real app, these would come from product data)
  const productImages = [
    product.image,
    product.image, // Replace with actual different images
    product.image,
    product.image
  ];

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold">
                  -{product.discount}% OFF
                </div>
              )}
              {/* Navigation Arrows */}
              <button 
                onClick={() => setSelectedImage(prev => prev === 0 ? productImages.length - 1 : prev - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setSelectedImage(prev => prev === productImages.length - 1 ? 0 : prev + 1)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-roj-blue ring-2 ring-roj-blue' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Category */}
            <div className="mb-2">
              <span className="text-sm text-roj-blue font-semibold uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{product.reviews} Reviews</span>
              <span className="text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <span className="text-green-600 font-semibold">In Stock</span>
                <span className="text-gray-500 text-sm">({product.stock} units)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-roj-blue">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="text-green-600 font-semibold">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">Tax included. Free shipping on orders over $50</p>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Color: <span className="text-roj-blue">{selectedColor}</span></h3>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color 
                        ? 'border-roj-blue ring-2 ring-roj-blue ring-offset-2' 
                        : 'border-gray-300 hover:border-roj-blue'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">Size: <span className="text-roj-blue">{selectedSize}</span></h3>
                <button className="text-sm text-roj-blue hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-lg border font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-roj-blue text-white border-roj-blue'
                        : 'border-gray-300 text-gray-700 hover:border-roj-blue hover:text-roj-blue'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={decrementQuantity}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold min-w-[50px] text-center">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">{product.stock} items available</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-roj-blue text-white py-3 rounded-lg font-semibold hover:bg-roj-indigo transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition" />
                Add to Cart
              </button>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-red-500 transition-all duration-300 group"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 group-hover:text-red-500'}`} />
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-roj-blue transition-all duration-300 group">
                <Share2 className="w-5 h-5 text-gray-600 group-hover:text-roj-blue" />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-roj-blue" />
                  <div>
                    <p className="text-sm font-semibold">Free Delivery</p>
                    <p className="text-xs text-gray-500">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-roj-blue" />
                  <div>
                    <p className="text-sm font-semibold">30 Days Return</p>
                    <p className="text-xs text-gray-500">Easy returns policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-roj-blue" />
                  <div>
                    <p className="text-sm font-semibold">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% secure transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">V</div>
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">MC</div>
                    <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs">P</div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Secure Checkout</p>
                    <p className="text-xs text-gray-500">Multiple payment options</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex gap-6 border-b">
                {['details', 'sizing', 'shipping'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-1 font-semibold transition-all ${
                      activeTab === tab
                        ? 'text-roj-blue border-b-2 border-roj-blue'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="py-4">
                {activeTab === 'details' && (
                  <div className="space-y-3 text-gray-600">
                    <p>{product.description || "Premium quality denim crafted with care. These jeans offer the perfect blend of comfort and style, making them ideal for everyday wear."}</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Premium quality cotton blend fabric</li>
                      <li>Perfect fit and comfortable wear</li>
                      <li>Durable stitching and hardware</li>
                      <li>Machine washable</li>
                      <li>Imported</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'sizing' && (
                  <div className="text-gray-600">
                    <p className="mb-2">Model is 6'0" wearing size 32. Regular fit, true to size.</p>
                    <p>For the best fit, please refer to our detailed size guide or contact customer support.</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="text-gray-600 space-y-2">
                    <p>✓ Free standard shipping on orders over $50</p>
                    <p>✓ Express shipping available at checkout</p>
                    <p>✓ 30-day easy returns</p>
                    <p>✓ Track your order in real-time</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;