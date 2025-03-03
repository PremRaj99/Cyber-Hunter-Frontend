import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, Sparkles } from "lucide-react";
import AnimatedSuccess from "../Common/AnimatedSuccess";

const ModernContact = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    subject: "",
    query: ""
  });
  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
          Have a question or project in mind? <br/> We'd love to hear from you!
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
            className="w-full bg-black/60 border-b-2 border-gray-600 focus:border-cyan-400 px-4 py-3 text-white rounded-lg outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-900/20"
          />
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
            className="w-full bg-black/60 border-b-2 border-gray-600 focus:border-cyan-400 px-4 py-3 text-white rounded-lg outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-900/20"
          />
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
            className="w-full bg-black/60 border-b-2 border-gray-600 focus:border-cyan-400 px-4 py-3 text-white rounded-lg outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-900/20"
          />
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
            className="w-full bg-black/60 border-b-2 border-gray-600 focus:border-cyan-400 px-4 py-3 text-white rounded-lg outline-none transition-all duration-300 focus:shadow-lg focus:shadow-cyan-900/20 resize-none no-scrollbar"
          ></textarea>
        </motion.div>

        <div className="pt-4 relative">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-black to-brandPrimary text-white font-medium rounded-full overflow-hidden relative group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-600 blur-xl"></span>
            <span className="relative flex items-center justify-center gap-2">
              <span>SUBMIT</span>
              <Send className="w-4 h-4" />
            </span>
          </motion.button>

          <AnimatedSuccess show={submitted} />
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ModernContact;