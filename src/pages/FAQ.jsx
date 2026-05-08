import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react';
import faqCategories, { popularFAQs } from '../data/faqData';

const FAQ = () => {
  const [openQuestions, setOpenQuestions] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleQuestion = (questionId) => {
    if (openQuestions.includes(questionId)) {
      setOpenQuestions(openQuestions.filter(id => id !== questionId));
    } else {
      setOpenQuestions([...openQuestions, questionId]);
    }
  };

  const filteredCategories = activeCategory 
    ? faqCategories.filter(cat => cat.id === activeCategory)
    : faqCategories;

  const filteredQuestions = (questions) => {
    if (!searchQuery) return questions;
    return questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-roj-blue to-roj-indigo text-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in-up">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 animate-slide-in-up animation-delay-200">
            Find answers to common questions about ROJ products and services
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-roj-blue transition"
            />
          </div>
        </div>

        {/* Popular FAQs */}
        {!searchQuery && !activeCategory && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Popular Questions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularFAQs.map(faq => (
                <button
                  key={faq.id}
                  onClick={() => setActiveCategory(faqCategories.find(cat => cat.name === faq.category)?.id)}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition text-left group"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-roj-blue group-hover:scale-110 transition" />
                    <span className="text-gray-700 group-hover:text-roj-blue transition">{faq.question}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full transition ${
              !activeCategory 
                ? 'bg-roj-blue text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Categories
          </button>
          {faqCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-roj-blue text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto">
          {filteredCategories.map(category => {
            const questions = filteredQuestions(category.questions);
            if (questions.length === 0) return null;
            
            return (
              <div key={category.id} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
                </div>
                <div className="space-y-3">
                  {questions.map((faq) => (
                    <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(faq.id)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                      >
                        <span className="font-semibold text-gray-800">{faq.question}</span>
                        {openQuestions.includes(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-roj-blue" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {openQuestions.includes(faq.id) && (
                        <div className="px-6 py-4 bg-gray-50 border-t">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* No Results */}
          {searchQuery && filteredCategories.every(cat => filteredQuestions(cat.questions).length === 0) && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600">Try different keywords or contact our support team</p>
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div className="mt-12 bg-gradient-to-r from-roj-blue to-roj-indigo rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-blue-100 mb-6">Can't find what you're looking for? Contact our support team</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact" className="bg-white text-roj-blue px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Us
            </a>
            <a href="tel:+255123456789" className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-roj-blue transition flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call Support
            </a>
            <a href="https://wa.me/255123456789" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-roj-blue transition flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;