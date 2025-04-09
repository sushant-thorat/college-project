import React, { useState } from "react";
import { motion } from "framer-motion";

const { div: MotionDiv, section: MotionSection } = motion;

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <MotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 bg-gradient-to-br from-amber-50 to-blue-50 px-4"
    >
      <MotionDiv className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-2xl space-y-6">
        <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-4">
          Get In Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-blue-800 font-medium">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-blue-900 placeholder:text-blue-400"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-blue-800 font-medium">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-blue-900 placeholder:text-blue-400"
              placeholder="johndoe@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-blue-800 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-blue-900 placeholder:text-blue-400"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-1 text-blue-800 font-medium">
              Subject
            </label>
            <select
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-blue-900"
            >
              <option value="">Select an option</option>
              <option>General Inquiry</option>
              <option>Book a Visit</option>
              <option>Support</option>
              <option>Partnerships</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-blue-800 font-medium">
              Message
            </label>
            <textarea
              required
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-blue-900 placeholder:text-blue-400"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform resize-none"
          >
            Send Message
          </button>
        </form>

        {/* Confirmation Message */}
        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 font-semibold text-center mt-4"
          >
            ✅ We’ll get back to you soon!
          </motion.p>
        )}
      </MotionDiv>
    </MotionSection>
  );
};

export default ContactForm;
