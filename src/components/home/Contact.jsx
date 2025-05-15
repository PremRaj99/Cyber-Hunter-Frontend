"use client"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Loader2,
  ArrowRight,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)

      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
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
                      { icon: <Linkedin size={18} />, label: "LinkedIn" },
                      { icon: <Twitter size={18} />, label: "Twitter" },
                      { icon: <Instagram size={18} />, label: "Instagram" },
                      { icon: <Facebook size={18} />, label: "Facebook" }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
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
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 outline-none transition-all duration-300"
                          placeholder="Enter your name"
                        />
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
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 outline-none transition-all duration-300"
                          placeholder="youremail@example.com"
                        />
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 outline-none transition-all duration-300"
                        placeholder="How can we help you?"
                      />
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 outline-none transition-all duration-300 resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
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

      {/* Map Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 inline-block pb-2 border-b-2 border-cyan-500 flex items-center gap-2">
              <MapPin size={22} className="text-cyan-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-300">
                Our Location
              </span>
            </h2>

            <div className="rounded-3xl overflow-hidden relative border border-slate-800/50 shadow-xl">
              {/* Map Foreground Design */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-cyan-950/80 to-cyan-950/90 flex flex-col items-center justify-center z-20 text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/20 flex items-center justify-center">
                  <MapPin className="text-cyan-400" size={36} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">AI Innovation Center</h3>
                <p className="text-cyan-200 max-w-md">
                  Visit our headquarters located in UTTARAKHAND at the District of Roorkee.
                </p>
                <div className="mt-8">
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-600 hover:from-cyan-500 hover:to-cyan-500 text-white font-medium shadow-lg shadow-cyan-500/20 transition-all duration-300 flex items-center gap-2">
                    Get Directions <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Map Patterns */}
              <div className="absolute inset-0 z-10 opacity-30">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 15% 85%, rgba(147, 51, 234, 0.1) 0%, transparent 25%), 
                                    radial-gradient(circle at 85% 15%, rgba(79, 70, 229, 0.1) 0%, transparent 25%)`,
                  backgroundSize: '100% 100%'
                }}></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px), 
                                    linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              <div className="w-full h-[500px] bg-slate-950"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}