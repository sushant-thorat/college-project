import React from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "react-feather";

const { section: MotionSection, div: MotionDiv } = motion;

const SearchFilterBar = () => {
  return (
    <MotionSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white py-8 px-4 shadow-lg rounded-xl max-w-screen-xl mx-auto -mt-20 relative z-10"
    >
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        {/* Search Input */}
        <div className="col-span-2 flex items-center border rounded-lg px-3">
          <Search className="text-blue-600" size={18} />
          <input
            type="text"
            placeholder="Search by keyword or location"
            className="w-full px-2 py-2 outline-none"
          />
        </div>

        {/* Property Type */}
        <select className="border rounded-lg px-3 py-2">
          <option>Property Type</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Office</option>
          <option>Plot</option>
        </select>

        {/* Price Range */}
        <select className="border rounded-lg px-3 py-2">
          <option>Price Range</option>
          <option>Below $100k</option>
          <option>$100k - $500k</option>
          <option>$500k - $1M</option>
          <option>Above $1M</option>
        </select>

        {/* Sorting */}
        <select className="border rounded-lg px-3 py-2">
          <option>Sort by</option>
          <option>Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </MotionDiv>

      <div className="mt-4 flex flex-wrap gap-4">
        {/* Additional Filters */}
        <select className="border rounded-lg px-3 py-2">
          <option>Bedrooms</option>
          <option>1+</option>
          <option>2+</option>
          <option>3+</option>
          <option>4+</option>
        </select>

        <select className="border rounded-lg px-3 py-2">
          <option>Bathrooms</option>
          <option>1+</option>
          <option>2+</option>
          <option>3+</option>
          <option>4+</option>
        </select>

        <select className="border rounded-lg px-3 py-2">
          <option>Area (sq.ft)</option>
          <option>Below 1000</option>
          <option>1000 - 3000</option>
          <option>3000 - 5000</option>
          <option>5000+</option>
        </select>

        <select className="border rounded-lg px-3 py-2">
          <option>Status</option>
          <option>For Sale</option>
          <option>For Rent</option>
        </select>

        <button className="flex items-center gap-1 bg-amber-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
          <Filter size={16} /> Filter
        </button>
      </div>
    </MotionSection>
  );
};

export default SearchFilterBar;
