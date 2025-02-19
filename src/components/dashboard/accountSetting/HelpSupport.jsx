import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Search, Book, Phone, Mail, ChevronDown,
  FileText, ExternalLink, HelpCircle, PlusCircle,
  MinusCircle, Clock, CheckCircle
} from 'lucide-react';

const HelpSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [showTicketSuccess, setShowTicketSuccess] = useState(false);

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'account', name: 'Account & Billing' },
    { id: 'features', name: 'Features & Usage' },
    { id: 'troubleshooting', name: 'Troubleshooting' }
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
      category: "account"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for business accounts.",
      category: "account"
    },
    {
      question: "How do I get started with the platform?",
      answer: "Begin by watching our quick start video guide and following our interactive tutorial. You can also book a demo with our team.",
      category: "getting-started"
    }
  ];

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    setShowTicketSuccess(true);
    setTimeout(() => {
      setShowTicketSuccess(false);
      setTicketTitle('');
      setTicketDescription('');
    }, 3000);
  };

  const filteredFaqs = faqItems.filter(item =>
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {/* Header Section */}
      <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Help & Support</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: <MessageCircle size={24} />, title: "Live Chat", description: "Chat with our support team" },
          { icon: <Book size={24} />, title: "Documentation", description: "Browse our guides" },
          { icon: <Phone size={24} />, title: "Contact Us", description: "Get in touch" }
        ].map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl hover:border-cyan-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-500">
                {action.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{action.title}</h3>
                <p className="text-gray-400">{action.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h3>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category.id
                      ? 'bg-cyan-500 text-black font-medium'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  className="border border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition-colors"
                  >
                    <span className="text-white font-medium">{faq.question}</span>
                    {expandedFaq === index ? (
                      <MinusCircle size={20} className="text-cyan-400" />
                    ) : (
                      <PlusCircle size={20} className="text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-gray-700"
                      >
                        <div className="p-4 text-gray-300">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Ticket Section */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Submit a Ticket</h3>

            {showTicketSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Ticket Submitted!</h4>
                <p className="text-gray-400">We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Title</label>
                  <input
                    type="text"
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">Description</label>
                  <textarea
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all h-32"
                    placeholder="Provide more details about your issue..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors"
                >
                  Submit Ticket
                </button>
              </form>
            )}

            {/* Quick Support Links */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-white font-medium mb-4">Quick Support</h4>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Mail size={16} />
                  <span>support@example.com</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Clock size={16} />
                  <span>24/7 Live Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HelpSection;