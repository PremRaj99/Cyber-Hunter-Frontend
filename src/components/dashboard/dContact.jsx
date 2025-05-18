import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, Sparkles, Loader2 } from "lucide-react";
import AnimatedSuccess from "../Common/AnimatedSuccess";
import { toast } from "react-toastify";
import { ContactService } from "../../services/ContactService";

const ModernContact = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    subject: "",
    query: ""
  });
  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (!formState.fullName.trim()) newErrors.fullName = "Name is required"

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formState.subject.trim()) newErrors.subject = "Subject is required"
    if (!formState.query.trim()) newErrors.query = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });

    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Map form fields to match the API expectations
      const formData = {
        name: formState.fullName,
        email: formState.email,
        subject: formState.subject,
        message: formState.query
      };

      // Use the contact service to submit the form
      const response = await ContactService.submitContactForm(formData);

      if (response.success) {
        setSubmitted(true);
        toast.success("Message sent successfully! We'll get back to you soon.");

        // Reset form
        setFormState({
          fullName: "",
          email: "",
          subject: "",
          query: ""
        });

        // Hide success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        toast.error(response.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error(
        error.response?.data?.message ||
        "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, type: "spring", stiffness: 200, damping: 10 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const renderLabel = (name, label, icon) => (
    <label
      htmlFor={name}
      className={`absolute left-4 transition-all duration-300 flex items-center gap-2 
        ${focusedField === name || formState[name]
          ? 'text-xs -top-6 text-cyan-400'
          : 'text-gray-400 top-3'}`}
    >
      {icon}
      <span>{label}</span>
    </label>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="w-full max-w-3xl mx-auto px-6 py-12 max-h-[calc(100vh-6rem)] overflow-auto no-scrollbar"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-12"
      >
        <motion.div
          className="inline-block mb-3"
          animate={{
            rotate: [0, 5, -5, 5, 0],
            transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
        >
          <Sparkles className="w-8 h-8 text-cyan-400 mb-2 mx-auto" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-3">
          PUT YOUR QUERY
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Have a question or project in mind? <br /> We'd love to hear from you!
        </p>
      </motion.div>

      <motion.form
        variants={containerVariants}
        onSubmit={handleSubmit}
        className="space-y-8 w-full backdrop-blur-sm bg-black/40 p-8 rounded-3xl border border-cyan-400/20 shadow-xl shadow-cyan-900/20"
      >
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          {renderLabel("fullName", "Full Name", <User className="w-4 h-4" />)}
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formState.fullName}
            onChange={handleChange}
            onFocus={() => setFocusedField("fullName")}
            onBlur={() => setFocusedField(null)}
            required
            className={`w-full bg-black/60 border-b-2 ${errors.fullName ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'} px-4 py-3 text-white rounded-lg outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-900/20`}
          />
          {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative"
        >
          {renderLabel("email", "Email Address", <Mail className="w-4 h-4" />)}
          <input
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            required
            className={`w-full bg-black/60 border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'} px-4 py-3 text-white rounded-lg outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-900/20`}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative"
        >
          {renderLabel("subject", "Subject", <MessageSquare className="w-4 h-4" />)}
          <input
            type="text"
            name="subject"
            id="subject"
            value={formState.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            required
            className={`w-full bg-black/60 border-b-2 ${errors.subject ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'} px-4 py-3 text-white rounded-lg outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-900/20`}
          />
          {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <label htmlFor="query" className={`absolute left-4 transition-all duration-300 flex items-center gap-2 
              ${focusedField === "query" || formState.query ? 'text-xs -top-6 text-cyan-400' : 'text-gray-400 top-3'}`}>
            <MessageSquare className="w-4 h-4" />
            <span>Your Message</span>
          </label>
          <textarea
            name="query"
            id="query"
            value={formState.query}
            onChange={handleChange}
            onFocus={() => setFocusedField("query")}
            onBlur={() => setFocusedField(null)}
            rows="4"
            className={`w-full bg-black/60 border-b-2 ${errors.query ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'} px-4 py-3 text-white rounded-lg outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-900/20 resize-none no-scrollbar`}
          ></textarea>
          {errors.query && <p className="text-red-400 text-xs mt-1">{errors.query}</p>}
        </motion.div>

        <div className="pt-4 relative">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-black to-brandPrimary text-white font-medium rounded-full overflow-hidden relative group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-600 blur-xl"></span>
            <span className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SENDING...</span>
                </>
              ) : (
                <>
                  <span>SUBMIT</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </span>
          </motion.button>

          <AnimatedSuccess show={submitted} />
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ModernContact;