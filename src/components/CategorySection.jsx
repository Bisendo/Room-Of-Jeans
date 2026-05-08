import { categories } from '../data/products';

const CategorySection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your perfect fit from our wide range of premium denim collections
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-3">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-500">{category.count} Products</p>
              <button className="mt-4 text-roj-blue font-medium hover:text-roj-indigo">
                Shop Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;