// import React from "react";
import { motion } from "framer-motion";
import leaduserdemo from "../../assets/leaduserdemo.png";

export default function FreelanceTestimonial() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div>
      <div className="py-16 lg:py-24">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="relative"
          >
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl tracking-tight font-extrabold text-brandPrimary sm:text-4xl"
              >
                Hear from our satisfied clients
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4"
              >
                Don&apos;t just take our word for it — here is what others have
                to say about their experience with FreelanceHub.
              </motion.p>
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {[
                {
                  category: "Web Development",
                  title: "Amazing Experience",
                  quote:
                    '"I found an exceptional web developer through FreelanceHub. The project was completed on time and exceeded my expectations."',
                  name: "Sarah Johnson",
                  role: "CEO, TechStart",
                },
                {
                  category: "Graphic Design",
                  title: "Top-notch Quality",
                  quote:
                    '"The graphic designer I hired created stunning visuals for my brand. FreelanceHub made the process smooth and hassle-free."',
                  name: "Michael Lee",
                  role: "Founder, DesignCo",
                },
                {
                  category: "Content Writing",
                  title: "Excellent Writers",
                  quote:
                    '"I have been consistently impressed with the quality of content writers I have found on FreelanceHub. Highly recommended!"',
                  name: "Emily Chen",
                  role: "Marketing Director, ContentPro",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="flex flex-col border-4 border-brandPrimary rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex-1 bg-black p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-brandPrimary">
                        {testimonial.category}
                      </p>
                      <div className="block mt-2">
                        <p className="text-xl font-semibold text-white">
                          {testimonial.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {testimonial.quote}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <span className="sr-only">{testimonial.name}</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src={leaduserdemo}
                          alt={testimonial.name}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-brandPrimary">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
