export const faqCategories = [
  {
    id: 1,
    name: "Orders & Shipping",
    icon: "📦",
    questions: [
      {
        id: 1,
        question: "How long does shipping take?",
        answer: "Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on your location. Express shipping options are available at checkout for faster delivery."
      },
      {
        id: 2,
        question: "How can I track my order?",
        answer: "Once your order is shipped, you'll receive a confirmation email with a tracking number. You can track your order through our website by clicking 'Track Order' in the footer or using the tracking link in your email."
      },
      {
        id: 3,
        question: "Do you ship internationally?",
        answer: "Yes, we ship worldwide! International shipping rates vary by location and will be calculated at checkout. Please note that customs fees may apply depending on your country's regulations."
      },
      {
        id: 4,
        question: "What shipping carriers do you use?",
        answer: "We partner with major carriers including DHL, FedEx, UPS, and local postal services depending on your location and chosen shipping method."
      }
    ]
  },
  {
    id: 2,
    name: "Returns & Exchanges",
    icon: "🔄",
    questions: [
      {
        id: 5,
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unworn, unwashed items with original tags attached. Returns are free for domestic orders. Contact our support team to initiate a return."
      },
      {
        id: 6,
        question: "How do I exchange an item?",
        answer: "To exchange an item, please initiate a return for the original item and place a new order for the desired size or color. This ensures you get your new item faster."
      },
      {
        id: 7,
        question: "How long does it take to process a refund?",
        answer: "Once we receive your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method."
      },
      {
        id: 8,
        question: "Can I return sale items?",
        answer: "Sale items are final sale and cannot be returned unless defective. Please check the product page for specific return eligibility."
      }
    ]
  },
  {
    id: 3,
    name: "Products & Sizing",
    icon: "👖",
    questions: [
      {
        id: 9,
        question: "How do I find my correct size?",
        answer: "Check our detailed size guide available on each product page. We recommend measuring your waist, hips, and inseam to find your perfect fit. When in doubt, size up for a more relaxed fit."
      },
      {
        id: 10,
        question: "Do your jeans shrink after washing?",
        answer: "Our jeans are pre-shrunk to minimize shrinkage. However, we recommend washing in cold water and air drying to maintain the perfect fit and prolong the life of your jeans."
      },
      {
        id: 11,
        question: "What materials are used in your jeans?",
        answer: "We use premium quality denim blends including 98-100% cotton with small amounts of elastane or spandex for stretch. Material composition is listed on each product page."
      },
      {
        id: 12,
        question: "How should I care for my jeans?",
        answer: "Wash inside out in cold water, avoid bleach, and tumble dry low or air dry. This helps preserve the color and fit of your jeans."
      }
    ]
  },
  {
    id: 4,
    name: "Payment & Security",
    icon: "💳",
    questions: [
      {
        id: 13,
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and mobile payments like M-Pesa for local customers."
      },
      {
        id: 14,
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full payment details on our servers."
      },
      {
        id: 15,
        question: "Do you offer installment payments?",
        answer: "Yes, we offer buy now pay later options through partners like Klarna, Afterpay, and local providers. Select this option at checkout."
      },
      {
        id: 16,
        question: "Are there any hidden fees?",
        answer: "No, the price you see is the price you pay. Taxes and shipping costs are clearly displayed at checkout before you complete your purchase."
      }
    ]
  },
  {
    id: 5,
    name: "Account & Support",
    icon: "👤",
    questions: [
      {
        id: 17,
        question: "How do I create an account?",
        answer: "Click on the user icon in the top right corner and select 'Sign Up'. You can create an account using your email or social media login."
      },
      {
        id: 18,
        question: "How can I contact customer support?",
        answer: "You can reach us via email at support@roj.com, phone at +255 123 456 789, or through our contact form. We're available Monday-Friday, 9AM-6PM EAT."
      },
      {
        id: 19,
        question: "Do you have a loyalty program?",
        answer: "Yes! Join our ROJ Rewards program to earn points on every purchase, get exclusive discounts, and early access to new collections. Sign up through your account dashboard."
      },
      {
        id: 20,
        question: "Can I change or cancel my order?",
        answer: "Orders can be modified or cancelled within 1 hour of placement. Contact our support team immediately with your order number for assistance."
      }
    ]
  }
];

export const popularFAQs = [
  { id: 1, question: "How long does shipping take?", category: "Orders & Shipping" },
  { id: 5, question: "What is your return policy?", category: "Returns & Exchanges" },
  { id: 9, question: "How do I find my correct size?", category: "Products & Sizing" },
  { id: 13, question: "What payment methods do you accept?", category: "Payment & Security" }
];

export default faqCategories;