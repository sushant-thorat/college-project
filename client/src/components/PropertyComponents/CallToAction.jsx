import React from "react";
import { motion } from "framer-motion";
import { PhoneCall } from "react-feather";
import { Link } from "react-router-dom";

const { div: MotionDiv, section: MotionSection } = motion;

const CallToAction = () => {
  return (
    <MotionSection
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 bg-gradient-to-r from-blue-100 to-amber-100"
    >
      <MotionDiv className="max-w-screen-xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          Didn't find what you're looking for?
        </h2>
        <p className="text-lg md:text-xl text-blue-800 font-medium">
          Our agents are ready to assist you with a personalized search.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-8 rounded-xl font-semibold hover:shadow-lg transition"
          >
            Contact an Agent <PhoneCall size={18} />
          </Link>
        </motion.div>
      </MotionDiv>
    </MotionSection>
  );
};

export default CallToAction;
