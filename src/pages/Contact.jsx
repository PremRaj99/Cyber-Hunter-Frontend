"use client"
import { useState, useEffect } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Loader2,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react"
import { toast } from "react-toastify"
import { ContactService } from "../services/ContactService"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    document.title = "Cyber Hunter | Contact Us"
  }, [])

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (!formState.name.trim()) newErrors.name = "Name is required"

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formState.subject.trim()) newErrors.subject = "Subject is required"
    if (!formState.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value,
    })

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Use the contact service to submit the form
      const response = await ContactService.submitContactForm(formState);

      if (response.success) {
        setIsSuccess(true)
        toast.success("Message sent successfully! We'll get back to you soon.")

        // Reset form
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 5000)
      } else {
        toast.error(response.message || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Contact form submission error:", error)
      toast.error(
        error.response?.data?.message ||
        "Failed to send message. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section with Floating Elements */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-96 -left-96 w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute -bottom-96 -right-96 w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600">
                <MessageSquare size={28} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-300 to-pink-300">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100/80 max-w-3xl mx-auto">
              Have questions about our Community? Our team is ready to assist you every step of the way.
            </p>
          </div>
        </div>

        {/* Floating dots */}
        <div className="absolute top-20 left-10 w-3 h-3 rounded-full bg-cyan-400/50 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-cyan-400/50 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 rounded-full bg-cyan-400/50 animate-pulse"></div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info Panel - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-800/50 shadow-xl">
                <h2 className="text-2xl font-bold mb-8 inline-block pb-2 border-b-2 border-cyan-500">
                  How to Reach Us
                </h2>

                <div className="space-y-8">
                  {/* Email */}
                  <div className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                      <Mail className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-cyan-300 transition-colors">Email Us</h3>
                      <p className="text-slate-400">info@cyberhunter.club</p>
                      <p className="text-slate-400">support@cyberhunter.club</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                      <Phone className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-cyan-300 transition-colors">Call Us</h3>
                      <p className="text-slate-400">18002743014</p>
                      <p className="text-slate-400">Help Desk : +91-9319909777</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                      <MapPin className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-cyan-300 transition-colors">Visit Us</h3>
                      <p className="text-slate-400">
                        Mandawar (22 Km milestone)<br />
                        Roorkee - Dehradun Highway (NH 73)<br />
                        Roorkee # 247167 ,Uttarakhand, India.
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                      <Clock className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-cyan-300 transition-colors">Business Hours</h3>
                      <p className="text-slate-400">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-10 pt-8 border-t border-slate-800/50">
                  <h3 className="text-lg font-medium mb-4 text-white">Connect With Us</h3>
                  <div className="flex gap-4">
                    {[
                      { icon: <Linkedin size={18} />, label: "LinkedIn", url: "#" },
                      { icon: <Twitter size={18} />, label: "Twitter", url: "#" },
                      { icon: <Instagram size={18} />, label: "Instagram", url: "#" },
                      { icon: <Facebook size={18} />, label: "Facebook", url: "#" }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-cyan-400 bg-slate-800/50 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-300"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - 3 columns */}
            <div className="lg:col-span-3">
              <div className="relative">
                {/* Form Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-cyan-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-70"></div>

                <div className="relative backdrop-blur-xl bg-slate-900/70 rounded-3xl p-8 md:p-10 border border-slate-800/50 shadow-xl">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <span className="inline-block p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/20">
                      <MessageSquare size={22} className="text-cyan-400" />
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-300">
                      Send Us a Message
                    </span>
                  </h2>

                  {isSuccess && (
                    <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-300">
                      <p className="flex items-center gap-2 font-medium">
                        <span className="text-emerald-300">✓</span>
                        Message sent successfully! We&apos;ll get back to you soon.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-cyan-200">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border focus:ring-2 text-white placeholder:text-slate-500 outline-none transition-all duration-300 ${errors.name
                            ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                            : "border-slate-700/50 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                            }`}
                          placeholder="Enter your name"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-cyan-200">Your Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border focus:ring-2 text-white placeholder:text-slate-500 outline-none transition-all duration-300 ${errors.email
                            ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                            : "border-slate-700/50 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                            }`}
                          placeholder="youremail@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-cyan-200">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border focus:ring-2 text-white placeholder:text-slate-500 outline-none transition-all duration-300 ${errors.subject
                          ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                          : "border-slate-700/50 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                          }`}
                        placeholder="How can we help you?"
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-cyan-200">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border focus:ring-2 text-white placeholder:text-slate-500 outline-none transition-all duration-300 resize-none ${errors.message
                          ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                          : "border-slate-700/50 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                          }`}
                        placeholder="Tell us about your project or inquiry..."
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-white 
                        ${isSubmitting
                            ? 'bg-slate-700 cursor-not-allowed'
                            : 'bg-gradient-to-r from-cyan-600 to-cyan-600 hover:from-cyan-500 hover:to-cyan-500 shadow-lg shadow-cyan-500/25'} 
                        transition-all duration-300`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 pt-6 border-t border-slate-800/50">
                    <p className="text-slate-400 text-sm flex items-center gap-2">
                      <Clock size={16} className="text-cyan-400" />
                      Our AI assistant typically responds within 1 hour
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
