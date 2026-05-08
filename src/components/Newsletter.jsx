const Newsletter = () => {
  return (
    <div className="bg-roj-blue py-16">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Get exclusive offers, new arrivals, and style tips straight to your inbox.
        </p>
        
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Enter your email address"
            className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-roj-gold"
          />
          <button className="bg-roj-gold text-roj-blue px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;