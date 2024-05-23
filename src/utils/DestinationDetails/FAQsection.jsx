"use client"
import { useState } from "react";

const FAQsection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does it work?",
      answer:
        "Discover and book your dream travel experiences effortlessly on Go-Venture's user-friendly platform.",
    },
    {
      question: "Do I need a designer to use Go-Venture's?",
      answer:
        "No, design skills required! Go-Venture's website is designed for easy navigation by everyone.",
    },
    {
      question: "What do I need to do to start selling?",
      answer:
        "Create an account, list your travel offerings, and start selling to our global community of travelers.",
    },
    {
      question: "What happens when I receive an order?",
      answer:
        "Receive instant email notifications upon order placement, and manage your orders seamlessly through your dashboard.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Questions & Answers:</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-md">
            <button
              className={`w-full text-left p-4 ${
                activeIndex === index ? "bg-gray-100" : "bg-white"
              } flex justify-between items-center`}
              onClick={() => toggleFAQ(index)}
            >
              <span
                className={`font-medium ${
                  activeIndex === index ? "text-red-500" : "text-black"
                }`}
              >
                {faq.question}
              </span>
              <span className="text-xl">
                {activeIndex === index ? "▲" : "▼"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-gray-50 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsection;
