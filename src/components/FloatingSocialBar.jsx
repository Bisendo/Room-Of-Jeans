import { useState, useEffect } from 'react';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaTiktok, 
  FaPinterest, 
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaSnapchat,
  FaWeixin,
  FaLine,
  FaVk
} from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';
import { 
  MessageCircle, 
  Share2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Send,
  Mail,
  Phone
} from 'lucide-react';

const FloatingSocialBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [position, setPosition] = useState('left'); // 'left' or 'right'
  const [showTooltip, setShowTooltip] = useState(null);

  // Social media links configuration
  const socialLinks = {
    // Main Social Platforms
    facebook: {
      url: "https://facebook.com/rojroomofjeans",
      icon: <FaFacebook className="w-5 h-5" />,
      color: "#1877f2",
      label: "Facebook",
      active: true
    },
    instagram: {
      url: "https://instagram.com/rojroomofjeans",
      icon: <FaInstagram className="w-5 h-5" />,
      color: "#E4405F",
      label: "Instagram",
      active: true
    },
    threads: {
      url: "https://threads.net/@rojroomofjeans",
      icon: <SiThreads className="w-5 h-5" />,
      color: "#000000",
      label: "Threads",
      active: true
    },
    twitter: {
      url: "https://twitter.com/rojroomofjeans",
      icon: <FaTwitter className="w-5 h-5" />,
      color: "#1DA1F2",
      label: "Twitter",
      active: true
    },
    youtube: {
      url: "https://youtube.com/@rojroomofjeans",
      icon: <FaYoutube className="w-5 h-5" />,
      color: "#FF0000",
      label: "YouTube",
      active: true
    },
    tiktok: {
      url: "https://tiktok.com/@rojroomofjeans",
      icon: <FaTiktok className="w-5 h-5" />,
      color: "#000000",
      label: "TikTok",
      active: true
    },
    pinterest: {
      url: "https://pinterest.com/rojroomofjeans",
      icon: <FaPinterest className="w-5 h-5" />,
      color: "#BD081C",
      label: "Pinterest",
      active: false
    },
    linkedin: {
      url: "https://linkedin.com/company/roj-room-of-jeans",
      icon: <FaLinkedin className="w-5 h-5" />,
      color: "#0077b5",
      label: "LinkedIn",
      active: false
    },
    
    // Messaging Platforms
    whatsapp: {
      url: "https://wa.me/1234567890?text=Hi%20ROJ%2C%20I%20have%20a%20question%20about%20your%20products",
      icon: <FaWhatsapp className="w-5 h-5" />,
      color: "#25D366",
      label: "WhatsApp",
      active: true,
      type: "chat"
    },
    telegram: {
      url: "https://t.me/rojroomofjeans",
      icon: <FaTelegram className="w-5 h-5" />,
      color: "#0088cc",
      label: "Telegram",
      active: false
    },
    
    // Contact Options
    email: {
      url: "mailto:contact@roj.com?subject=Inquiry%20from%20Website",
      icon: <Mail className="w-5 h-5" />,
      color: "#EA4335",
      label: "Email Us",
      active: true,
      type: "contact"
    },
    phone: {
      url: "tel:+1234567890",
      icon: <Phone className="w-5 h-5" />,
      color: "#34B7F1",
      label: "Call Us",
      active: false
    }
  };

  // Filter active social links
  const activeSocialLinks = Object.entries(socialLinks)
    .filter(([_, data]) => data.active)
    .map(([key, data]) => ({ key, ...data }));

  // Handle scroll visibility
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Handle social click with analytics
  const handleSocialClick = (social) => {
    window.open(social.url, '_blank', 'noopener,noreferrer');
    
    // Track click for analytics
    console.log(`Clicked ${social.label} from floating bar`);
    
    // You can add Google Analytics or other tracking here
    if (window.gtag) {
      window.gtag('event', 'social_click', {
        'social_platform': social.label,
        'component': 'FloatingSocialBar'
      });
    }
  };

  // Share current page
  const handleShare = async () => {
    const currentUrl = window.location.href;
    const pageTitle = document.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: pageTitle,
          text: 'Check out ROJ - Room of Jeans!',
          url: currentUrl,
        });
        console.log('Shared successfully');
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(currentUrl);
      alert('Link copied to clipboard!');
    }
  };

  // Toggle position between left and right
  const togglePosition = () => {
    setPosition(prev => prev === 'left' ? 'right' : 'left');
  };

  return (
    <>
      {/* Floating Social Bar */}
      <div 
        className={`fixed ${position === 'left' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ${
          isVisible ? 'translate-x-0 opacity-100' : `${position === 'left' ? '-translate-x-full' : 'translate-x-full'} opacity-0`
        }`}
      >
        {/* Position Toggle Button */}
        <button
          onClick={togglePosition}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-roj-blue text-white p-1 rounded-full hover:bg-roj-indigo transition z-50"
          aria-label="Toggle position"
        >
          {position === 'left' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Main Social Icons Container */}
        <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-52' : 'w-12'
        }`}>
          {/* Header */}
          <div className={`bg-gradient-to-r from-roj-blue to-roj-indigo p-3 ${isExpanded ? 'block' : 'hidden'}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold text-sm">Connect With Us</h3>
              <button 
                onClick={() => setIsExpanded(false)}
                className="text-white hover:text-roj-gold transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white/80 text-xs mt-1">Follow for updates & offers</p>
          </div>

          {/* Social Icons */}
          <div className="py-2">
            {/* Expand/Collapse Button (when collapsed) */}
            {!isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="w-full py-3 flex justify-center hover:bg-gray-50 transition group"
                aria-label="Expand social menu"
              >
                <Share2 className="w-5 h-5 text-roj-blue group-hover:scale-110 transition" />
              </button>
            )}

            {/* Social Links */}
            <div className={`space-y-1 ${isExpanded ? 'px-3' : 'px-1'}`}>
              {activeSocialLinks.map((social, index) => (
                <div key={social.key} className="relative">
                  <button
                    onClick={() => handleSocialClick(social)}
                    onMouseEnter={() => setShowTooltip(index)}
                    onMouseLeave={() => setShowTooltip(null)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-300 group ${
                      isExpanded ? 'justify-start' : 'justify-center'
                    } hover:bg-gray-100`}
                    style={{
                      '--hover-color': social.color
                    }}
                  >
                    <div 
                      className="transition-transform group-hover:scale-110"
                      style={{ color: social.color }}
                    >
                      {social.icon}
                    </div>
                    {isExpanded && (
                      <span className="text-sm text-gray-700 group-hover:text-roj-blue transition">
                        {social.label}
                      </span>
                    )}
                  </button>
                  
                  {/* Tooltip for collapsed mode */}
                  {!isExpanded && showTooltip === index && (
                    <div className={`absolute ${position === 'left' ? 'left-full ml-2' : 'right-full mr-2'} top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 animate-fade-in`}>
                      {social.label}
                      <div className={`absolute top-1/2 transform -translate-y-1/2 ${position === 'left' ? '-left-1' : '-right-1'} w-2 h-2 bg-gray-900 rotate-45`}></div>
                    </div>
                  )}
                </div>
              ))}

              {/* Divider */}
              {isExpanded && (
                <div className="border-t border-gray-200 my-2"></div>
              )}

              {/* Share Button */}
              <button
                onClick={handleShare}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-300 group ${
                  isExpanded ? 'justify-start' : 'justify-center'
                } hover:bg-gray-100`}
              >
                <Send className="w-5 h-5 text-gray-600 group-hover:text-roj-blue transition-transform group-hover:scale-110" />
                {isExpanded && (
                  <span className="text-sm text-gray-700 group-hover:text-roj-blue transition">
                    Share this page
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          {isExpanded && (
            <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
              <p className="text-xs text-gray-500">Follow us for exclusive deals!</p>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Chat Button (Alternative Floating Button) */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => handleSocialClick(socialLinks.whatsapp)}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group relative animate-bounce-slow"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6" />
          <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Chat with us
          </span>
        </button>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-8 left-8 z-40">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-roj-blue text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
          aria-label="Back to top"
        >
          <ChevronLeft className="w-5 h-5 rotate-90" />
        </button>
      </div>
    </>
  );
};

export default FloatingSocialBar;