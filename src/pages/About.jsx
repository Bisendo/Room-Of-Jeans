import { useState, useEffect } from 'react';
import { Users, Truck, Shield, Award, Heart, Star, Clock, RefreshCw, MapPin, Phone, Mail, Globe } from 'lucide-react';

const About = () => {
  const [counters, setCounters] = useState({
    customers: 0,
    products: 0,
    years: 0,
    satisfaction: 0
  });

  const stats = [
    { id: 1, label: "Happy Customers", value: 15000, icon: <Users className="w-8 h-8" />, suffix: "+" },
    { id: 2, label: "Products Sold", value: 50000, icon: <Truck className="w-8 h-8" />, suffix: "+" },
    { id: 3, label: "Years Experience", value: 5, icon: <Clock className="w-8 h-8" />, suffix: "" },
    { id: 4, label: "Satisfaction Rate", value: 98, icon: <Award className="w-8 h-8" />, suffix: "%" }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We source the finest materials and ensure every pair of jeans meets our highest standards.",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-blue-100 text-roj-blue"
    },
    {
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We're here to help you find your perfect fit.",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-red-100 text-red-500"
    },
    {
      title: "Sustainable Fashion",
      description: "Committed to eco-friendly practices and sustainable production methods.",
      icon: <RefreshCw className="w-8 h-8" />,
      color: "bg-green-100 text-green-500"
    },
    {
      title: "Innovation",
      description: "Constantly evolving to bring you the latest trends and comfortable fits.",
      icon: <Star className="w-8 h-8" />,
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      bio: "Passionate about denim and fashion with over 10 years of industry experience."
    },
    {
      name: "Michael Chen",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "Creative visionary behind our unique collections and trends."
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      bio: "Dedicated to ensuring every customer has an amazing experience."
    },
    {
      name: "David Kim",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      bio: "Ensuring smooth operations and timely deliveries worldwide."
    }
  ];

  // Animated counter
  useEffect(() => {
    const animateCounter = (target, setter, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateCounter(15000, (val) => setCounters(prev => ({ ...prev, customers: val })));
    animateCounter(50000, (val) => setCounters(prev => ({ ...prev, products: val })));
    animateCounter(5, (val) => setCounters(prev => ({ ...prev, years: val })));
    animateCounter(98, (val) => setCounters(prev => ({ ...prev, satisfaction: val })));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-roj-blue to-roj-indigo text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in-up">
              About ROJ - Room of Jeans
            </h1>
            <p className="text-xl text-blue-100 animate-slide-in-up animation-delay-200">
              Premium denim crafted with passion, designed for you
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2019, ROJ (Room of Jeans) was born from a simple idea: to provide high-quality, 
                stylish denim that everyone can afford and feel confident wearing.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                What started as a small boutique in Dar es Salaam has grown into a beloved brand 
                serving thousands of customers across Tanzania and beyond. We believe that the perfect 
                pair of jeans can transform not just your outfit, but your entire day.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to innovate and expand our collection while staying true to our 
                core values of quality, comfort, and style. Every pair of jeans is thoughtfully 
                designed and crafted to help you look and feel your best.
              </p>
            </div>
            <div className="animate-slide-in-right">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" 
                alt="Our Store"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-roj-blue py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">{counters.customers.toLocaleString()}+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">{counters.products.toLocaleString()}+</div>
              <div className="text-blue-100">Products Sold</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">{counters.years}+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">{counters.satisfaction}%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at ROJ
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`${value.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to bringing you the best denim experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-roj-blue text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-roj-blue to-roj-indigo text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Fit?</h2>
          <p className="text-xl text-blue-100 mb-8">Explore our collection and discover your new favorite jeans</p>
          <button className="bg-white text-roj-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;