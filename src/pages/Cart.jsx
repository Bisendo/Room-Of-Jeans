import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  // Update quantity
  const updateQuantity = (id, selectedColor, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map(item =>
      item.id === id && item.selectedColor === selectedColor
        ? { ...item, quantity: Math.min(newQuantity, item.stock) }
        : item
    );
    saveCart(updatedItems);
  };

  // Remove item
  const removeItem = (id, selectedColor) => {
    const updatedItems = cartItems.filter(
      item => !(item.id === id && item.selectedColor === selectedColor)
    );
    saveCart(updatedItems);
  };

  // Apply promo code
  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE20' && !promoApplied) {
      setDiscount(20);
      setPromoApplied(true);
      alert('Promo code applied! 20% discount added.');
    } else if (promoCode.toUpperCase() === 'WELCOME10' && !promoApplied) {
      setDiscount(10);
      setPromoApplied(true);
      alert('Promo code applied! 10% discount added.');
    } else if (promoApplied) {
      alert('Promo code already applied!');
    } else {
      alert('Invalid promo code');
    }
    setPromoCode('');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discountAmount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-roj-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-roj-indigo transition"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-semibold text-gray-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
              
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} className="border-b last:border-b-0 p-4">
                  <div className="grid md:grid-cols-12 gap-4 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-6 flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                        <p className="text-sm text-gray-500">Size: {item.selectedSize || 'Regular'}</p>
                        <button
                          onClick={() => removeItem(item.id, item.selectedColor)}
                          className="text-red-500 text-sm hover:text-red-600 mt-1 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 text-center">
                      <span className="font-semibold text-gray-800">${item.price}</span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 text-center">
                      <span className="font-bold text-roj-blue">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-4">
              <Link to="/shop" className="text-roj-blue hover:underline inline-flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-roj-blue"
                  />
                  <button
                    onClick={applyPromo}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-1">Discount applied: {discount}% off</p>
                )}
                <p className="text-xs text-gray-500 mt-2">Try: SAVE20 or WELCOME10</p>
              </div>
              
              {/* Totals */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-roj-blue">${total.toFixed(2)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>
              </div>
              
              {/* Checkout Button */}
              <button className="w-full bg-roj-blue text-white py-3 rounded-lg font-semibold hover:bg-roj-indigo transition mt-6 flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </button>
              
              {/* Payment Methods */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-center gap-2">
                  <div className="w-10 h-6 bg-blue-600 rounded"></div>
                  <div className="w-10 h-6 bg-red-600 rounded"></div>
                  <div className="w-10 h-6 bg-gray-800 rounded"></div>
                  <div className="w-10 h-6 bg-blue-400 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="mt-4 bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-roj-blue" />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-gray-500 text-xs">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm mt-3">
                <Shield className="w-5 h-5 text-roj-blue" />
                <div>
                  <p className="font-semibold">Secure Checkout</p>
                  <p className="text-gray-500 text-xs">100% secure payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;