import React from "react";
import { PhoneCall } from "react-feather";
import { motion } from "framer-motion";

const { div: MotionDiv, section: MotionSection } = motion;

const ContactBanner = () => {
  return (
    <MotionSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-[calc(100vh-65px)] bg-gradient-to-r from-blue-100 to-amber-100 flex items-center justify-center px-4"
    >
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-screen-xl mx-auto w-full text-center space-y-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight">
          Contact <span className="text-amber-500">Our Team</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-800 font-medium">
          We’re here to help you with your property needs. Reach out today!
        </p>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center"
        >
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-8 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer">
            <PhoneCall size={18} /> Contact Us Now
          </button>
        </MotionDiv>
      </MotionDiv>
    </MotionSection>
  );
};

export default ContactBanner;
