/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, Phone, Mail, PlusCircle, MinusCircle, Clock, CheckCircle, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "../../../utils/Axios";

const HelpSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [showTicketSuccess, setShowTicketSuccess] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [ticketError, setTicketError] = useState(null);
  const navigate = useNavigate();

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
    },
    {
      question: "How can I secure my account with two-factor authentication?",
      answer: "Go to Account Security in your dashboard settings. Click on 'Two-Factor Authentication' and follow the step-by-step process to set up an authenticator app or SMS verification for added security.",
      category: "account"
    },
    {
      question: "What should I do if I detect a security breach?",
      answer: "Immediately change your password and enable two-factor authentication if not already enabled. Then contact our support team through the ticket system with details of the suspected breach. Our security team will investigate and guide you through necessary steps.",
      category: "troubleshooting"
    },
    {
      question: "How do I run my first vulnerability scan?",
      answer: "Navigate to the Dashboard and select 'New Scan' from the Security Tools section. Enter the target information, select your preferred scan type (Quick, Standard, or Deep), and click 'Start Scan'. Results will be available in your Security Reports section.",
      category: "getting-started"
    },
    {
      question: "How do I interpret the vulnerability scores?",
      answer: "We use the CVSS (Common Vulnerability Scoring System) on a scale of 0-10. Scores 0-3.9 are Low risk, 4.0-6.9 Medium risk, 7.0-8.9 High risk, and 9.0-10 Critical risk. Each vulnerability report includes recommended actions based on severity.",
      category: "features"
    },
    {
      question: "Can I export security reports for compliance purposes?",
      answer: "Yes, all security reports can be exported in multiple formats (PDF, CSV, JSON) for compliance documentation. Go to Reports, select the report you need, click the Export button, and choose your preferred format.",
      category: "features"
    },
    {
      question: "How often should I change my password?",
      answer: "We recommend changing your password every 90 days. For enhanced security, use a password manager to generate strong, unique passwords. You'll receive email reminders when it's time to update your credentials.",
      category: "account"
    },
    {
      question: "My scan is taking longer than expected. What should I do?",
      answer: "Deep scans on large systems can take several hours depending on the complexity and size of the target. If a scan exceeds 24 hours or appears stuck at the same percentage for over 2 hours, you can safely cancel it and contact support for assistance.",
      category: "troubleshooting"
    },
    {
      question: "How do I set up real-time security alerts?",
      answer: "In your dashboard, go to 'Alert Settings' and configure your notification preferences. You can select which events trigger alerts (login attempts, vulnerabilities found, etc.) and choose delivery methods (email, SMS, platform notifications).",
      category: "features"
    },
    {
      question: "What's included in the different subscription tiers?",
      answer: "Our Basic tier includes essential security tools and monthly scans. Professional adds advanced threat detection and weekly scans. Enterprise includes dedicated support, unlimited scans, and custom security policies. Visit our Pricing page for a detailed comparison.",
      category: "account"
    },
    {
      question: "How do I add team members to my account?",
      answer: "Enterprise and Professional accounts can add team members through the User Management section. Go to Settings > Team, click 'Add Member', enter their email address and assign appropriate role permissions. They'll receive an invitation to join your security workspace.",
      category: "account"
    },
    {
      question: "Does Cyber-Hunter comply with industry regulations?",
      answer: "Yes, our platform is compliant with major security frameworks including GDPR, HIPAA, PCI DSS, and SOC2. You can find our compliance certifications and documentation in the Security Trust Center section of your account.",
      category: "features"
    },
    {
      question: "I forgot my 2FA device. How can I regain access?",
      answer: "If you've lost access to your 2FA device, use one of your backup codes provided during setup. If you don't have backup codes, contact support with your account details and we'll verify your identity through alternative means to restore access.",
      category: "troubleshooting"
    }
  ];

  useEffect(() => {
    const fetchTickets = async () => {
      setLoadingTickets(true);
      setTicketError(null);
      try {
        const res = await axios.get("/api/v1/support/tickets", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        setTickets(res.data?.data || []);
      } catch (err) {
        setTicketError("Failed to load tickets.");
      } finally {
        setLoadingTickets(false);
      }
    };
    fetchTickets();
  }, []);

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/v1/support/tickets",
        { title: ticketTitle, description: ticketDescription },
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      );
      setShowTicketSuccess(true);
      setTicketTitle('');
      setTicketDescription('');
      setTimeout(() => {
        setShowTicketSuccess(false);
        (async () => {
          setLoadingTickets(true);
          try {
            const res = await axios.get("/api/v1/support/tickets", {
              headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });
            setTickets(res.data?.data || []);
          } catch {
            setTicketError("Failed to load tickets.");
          }
          setLoadingTickets(false);
        })();
      }, 2000);
    } catch (err) {
      setTicketError("Failed to submit ticket.");
    }
  };

  const filteredFaqs = faqItems.filter(item =>
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-gray-900/50 border border-brandPrimary/20 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Help & Support</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: <Mail size={24} />, title: "Mail", description: "Send Email to our support team", link: "" },
          { icon: <Book size={24} />, title: "Documentation", description: "Browse our guides", link: "/docs" },
          { icon: <Phone size={24} />, title: "Contact Us", description: "Get in touch", link: "/contact" }
        ].map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl hover:border-brandPrimary/30 transition-all cursor-pointer"
            onClick={() => action.link && navigate(action.link)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brandPrimary/10 rounded-lg flex items-center justify-center text-brandPrimary">
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
        <div className="lg:col-span-2">
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category.id
                    ? 'bg-brandPrimary text-black font-medium'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
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
                        <div className="p-4 text-white">
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
                <p className="text-gray-400">We&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Title</label>
                  <input
                    type="text"
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary transition-all"
                    placeholder="Title of your issue"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Description</label>
                  <textarea
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary transition-all h-32"
                    placeholder="Provide more details about your issue..."
                    required
                  />
                </div>
                {ticketError && <div className="text-red-400 text-sm">{ticketError}</div>}
                <button
                  type="submit"
                  className="w-full py-3 bg-brandPrimary text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors"
                >
                  Submit Ticket
                </button>
              </form>
            )}
            <div className="mt-8">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <List size={18} /> Your Tickets
              </h4>
              {loadingTickets ? (
                <div className="text-gray-400 text-sm">Loading tickets...</div>
              ) : ticketError ? (
                <div className="text-red-400 text-sm">{ticketError}</div>
              ) : tickets.length === 0 ? (
                <div className="text-gray-400 text-sm">No tickets submitted yet.</div>
              ) : (
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {tickets.map((ticket) => (
                    <div key={ticket._id} className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-cyan-400">{ticket.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${ticket.status === "open" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="text-gray-300 text-xs mt-1 line-clamp-2">{ticket.description}</div>
                      <div className="text-gray-500 text-xs mt-1">{new Date(ticket.createdAt).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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