import { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, Sparkles, TrendingUp, Star, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600",
      title: "Premium Denim for Every Style",
      subtitle: "Discover the perfect fit at ROJ - Room of Jeans"
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600",
      title: "Summer Collection 2026",
      subtitle: "Fresh styles, unbeatable comfort"
    },
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
      title: "Up to 40% Off",
      subtitle: "Limited time offer on selected styles"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX - window.innerWidth / 2) / 50,
      y: (e.clientY - window.innerHeight / 2) / 50
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="relative h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${
              currentSlide === index 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `scale(${1 + mousePosition.y / 1000}) translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 animate-pulse-slow"></div>

      {/* Animated Shapes Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-roj-gold/10 rounded-full blur-3xl animate-ping-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-roj-blue/10 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] animate-float">
          <div className="glass rounded-full p-3">
            <Sparkles className="w-6 h-6 text-roj-gold animate-pulse" />
          </div>
        </div>
        <div className="absolute bottom-1/3 right-[15%] animate-float-delayed">
          <div className="glass rounded-full p-3">
            <ShoppingBag className="w-6 h-6 text-white animate-bounce-slow" />
          </div>
        </div>
        <div className="absolute top-2/3 left-[20%] animate-float-slow">
          <div className="glass rounded-full p-2">
            <Star className="w-4 h-4 text-roj-gold animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6 z-20">
          <div className="max-w-3xl">
            {/* Animated Badge */}
            <div className="animate-slide-in-left mb-6">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2">
                <TrendingUp className="w-4 h-4 text-roj-gold animate-pulse" />
                <span className="text-white text-sm font-semibold">NEW ARRIVALS</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Main Title */}
            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-in-up">
                <span className="inline-block animate-gradient-x bg-gradient-to-r from-white via-roj-gold to-white bg-clip-text text-transparent bg-[length:200%_auto]">
                  {slides[currentSlide].title}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-slide-in-up animation-delay-200 max-w-2xl">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up animation-delay-400">
              <button className="group relative overflow-hidden bg-gradient-to-r from-roj-blue to-roj-indigo text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 btn-ripple">
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-roj-gold to-roj-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
              
              <button className="group relative overflow-hidden bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-roj-blue transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  View Collection
                  <ShoppingBag className="w-5 h-5 group-hover:animate-bounce-slow" />
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 animate-slide-in-up animation-delay-600">
              {[
                { value: "5000+", label: "Happy Customers" },
                { value: "200+", label: "Premium Styles" },
                { value: "100%", label: "Quality Guaranteed" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold text-white group-hover:text-roj-gold transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index
                ? 'w-12 h-2 bg-roj-gold'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            } rounded-full`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce-slow">
        <div className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Floating Trust Badge */}
      <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-30 transition-all duration-500 ${
        scrolled ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      }`}>
        <div className="glass-dark rounded-l-2xl p-3 border-l-4 border-roj-gold animate-slide-in-right">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-roj-blue to-roj-indigo flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                  👖
                </div>
              ))}
            </div>
            <div className="text-white text-sm">
              <p className="font-semibold">Trusted by 5000+</p>
              <p className="text-xs text-gray-300">Fashion lovers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;