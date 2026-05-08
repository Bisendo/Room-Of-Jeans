import { useState, useEffect } from 'react';
import { Filter, Grid, List, SlidersHorizontal, X, ChevronDown, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 200]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get unique categories, sizes, colors
  const categories = ['all', ...new Set(products.map(p => p.category))];
  const allSizes = [...new Set(products.flatMap(p => p.sizes))].sort();
  const allColors = [...new Set(products.flatMap(p => p.colors))];
  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $150', min: 100, max: 150 },
    { label: 'Over $150', min: 150, max: Infinity }
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.price >= selectedPriceRange[0] && p.price <= selectedPriceRange[1])
    .filter(p => selectedRatings.length === 0 || selectedRatings.includes(Math.floor(p.rating)))
    .filter(p => selectedSizes.length === 0 || p.sizes.some(size => selectedSizes.includes(size)))
    .filter(p => selectedColors.length === 0 || p.colors.some(color => selectedColors.includes(color)))
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, selectedPriceRange, selectedRatings, selectedSizes, selectedColors, searchQuery]);

  const handleAddToCart = (product, selectedColor) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id && item.selectedColor === selectedColor);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, selectedColor });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${product.name} to cart!`);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange([0, 200]);
    setSelectedRatings([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSearchQuery('');
    setSortBy('featured');
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-gray-800">Category</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                className="text-roj-blue focus:ring-roj-blue"
              />
              <span className="capitalize text-gray-600 group-hover:text-roj-blue transition">
                {cat} ({products.filter(p => cat === 'all' || p.category === cat).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-gray-800">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange[0] === range.min && selectedPriceRange[1] === range.max}
                onChange={() => setSelectedPriceRange([range.min, range.max])}
                className="text-roj-blue focus:ring-roj-blue"
              />
              <span className="text-gray-600 group-hover:text-roj-blue transition">{range.label}</span>
            </label>
          ))}
        </div>
        <div className="mt-3">
          <input
            type="range"
            min="0"
            max="200"
            value={selectedPriceRange[1]}
            onChange={(e) => setSelectedPriceRange([selectedPriceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>${selectedPriceRange[0]}</span>
            <span>${selectedPriceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-gray-800">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => {
                  if (selectedRatings.includes(rating)) {
                    setSelectedRatings(selectedRatings.filter(r => r !== rating));
                  } else {
                    setSelectedRatings([...selectedRatings, rating]);
                  }
                }}
                className="text-roj-blue focus:ring-roj-blue rounded"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="text-gray-600 ml-1">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-gray-800">Size</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => {
                if (selectedSizes.includes(size)) {
                  setSelectedSizes(selectedSizes.filter(s => s !== size));
                } else {
                  setSelectedSizes([...selectedSizes, size]);
                }
              }}
              className={`px-3 py-1 rounded-lg border transition ${
                selectedSizes.includes(size)
                  ? 'bg-roj-blue text-white border-roj-blue'
                  : 'border-gray-300 text-gray-600 hover:border-roj-blue hover:text-roj-blue'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-gray-800">Color</h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map(color => (
            <button
              key={color}
              onClick={() => {
                if (selectedColors.includes(color)) {
                  setSelectedColors(selectedColors.filter(c => c !== color));
                } else {
                  setSelectedColors([...selectedColors, color]);
                }
              }}
              className={`w-8 h-8 rounded-full border-2 transition ${
                selectedColors.includes(color)
                  ? 'border-roj-blue ring-2 ring-roj-blue ring-offset-1'
                  : 'border-gray-300 hover:border-roj-blue'
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Shop All Denim</h1>
          <p className="text-gray-600">Find your perfect pair from our premium collection</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-roj-blue"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <FilterSidebar />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="w-full bg-white py-3 rounded-lg shadow-md flex items-center justify-center gap-2 font-semibold"
            >
              <Filter className="w-5 h-5" />
              Filters & Sort
            </button>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
              <div className="text-gray-600">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </div>
              
              <div className="flex gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:border-roj-blue"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-roj-blue text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-roj-blue text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== 'all' || selectedRatings.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0 || selectedPriceRange[0] > 0 || selectedPriceRange[1] < 200) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory !== 'all' && (
                  <span className="bg-roj-blue text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {(selectedPriceRange[0] > 0 || selectedPriceRange[1] < 200) && (
                  <span className="bg-roj-blue text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Price: ${selectedPriceRange[0]} - ${selectedPriceRange[1]}
                    <button onClick={() => setSelectedPriceRange([0, 200])}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedSizes.map(size => (
                  <span key={size} className="bg-roj-blue text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Size: {size}
                    <button onClick={() => setSelectedSizes(selectedSizes.filter(s => s !== size))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedColors.map(color => (
                  <span key={color} className="bg-roj-blue text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Color: {color}
                    <button onClick={() => setSelectedColors(selectedColors.filter(c => c !== color))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Products Grid/List */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <p className="text-gray-500 text-lg">No products found</p>
                <button onClick={clearFilters} className="mt-4 text-roj-blue hover:underline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg transition ${
                      currentPage === i + 1
                        ? 'bg-roj-blue text-white'
                        : 'border hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterSidebar />
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-roj-blue text-white py-3 rounded-lg font-semibold mt-6"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;