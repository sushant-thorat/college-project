import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "react-feather";
import { useNavigate } from "react-router-dom";

const { div: MotionDiv, section: MotionSection, img: MotionImg } = motion;

const InfiniteScrollSection = () => {
  const [properties, setProperties] = useState([]); // State to store properties
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error state
  const [visibleCount, setVisibleCount] = useState(9); // State to control number of visible properties
  const [selectedProperty, setSelectedProperty] = useState(null); // State to manage selected property
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const navigate = useNavigate();

  // Fetching properties data from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/properties"); // Adjust URL based on your backend
        const data = await response.json();
        console.log(data);

        setProperties(data); // Set the fetched data
      } catch (err) {
        setError("Failed to load properties");
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchProperties();
  }, []); // Empty dependency array means this runs only once when the component mounts

  const handleExploreMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Increase visible count by 6
  };

  const openModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleAddProperty = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      const propertyId = selectedProperty.id;

      if (propertyId) {
        localStorage.setItem("propertyId", propertyId);
      }

      alert("You are not logged in. Property ID has been saved for later.");
      navigate("/login");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
    hover: {
      y: -10,
      scale: 1.03,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MotionSection
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-20 px-4 bg-white"
    >
      <div className="max-w-screen-2xl mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-900 mb-16">
          Featured <span className="text-amber-500">Properties</span>
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.data.map((property, i) => (
            <MotionDiv
              key={property.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <MotionImg
                  src={property.image}
                  alt={property.location}
                  className="w-full h-52 sm:h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {property.type}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-blue-900">
                  {property.name}
                </h3>
                <p className="text-lg font-semibold text-amber-500">
                  Price: {property.price}
                </p>

                <div className="text-sm text-gray-600 flex items-center gap-1">
                  Location: 📍 {property.location}
                </div>

                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                  Description: {property.description}
                </p>

                <motion.button
                  onClick={() => openModal(property)}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 250, damping: 12 }}
                  className="w-full py-2 text-white bg-blue-900 hover:bg-blue-800 transition-colors rounded-xl font-medium"
                >
                  View Details
                </motion.button>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>

      {visibleCount < properties.data.length && (
        <div className="mt-6 text-center">
          <button
            onClick={handleExploreMore}
            className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600"
          >
            Explore More
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedProperty && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-white/30 transform transition-all duration-500">
            <div className="relative">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.name}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 rounded-full w-9 h-9 flex items-center justify-center text-xl transition"
              >
                ✖
              </button>
              <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {selectedProperty.property_type}
              </span>
            </div>

            <div className="px-6 py-6 space-y-5 text-gray-800">
              <div className="text-center space-y-1">
                <h2 className="text-3xl font-bold text-blue-900">
                  Property Name <br />
                  {selectedProperty.name}
                </h2>
                <p className="text-lg text-amber-500 font-semibold">
                  Price: ₹{selectedProperty.price}
                </p>
                <p className="text-sm text-gray-600">
                  Location: 📍 {selectedProperty.location}
                </p>
                <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  Status: {selectedProperty.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-700 bg-gray-100 rounded-xl p-3 shadow-inner">
                <p>
                  🛏️{" "}
                  <span className="font-semibold">
                    {selectedProperty.bedrooms}
                  </span>{" "}
                  Beds
                </p>
                <p>
                  🛁{" "}
                  <span className="font-semibold">
                    {selectedProperty.bathrooms}
                  </span>{" "}
                  Baths
                </p>
                <p>
                  📐{" "}
                  <span className="font-semibold">{selectedProperty.area}</span>{" "}
                  sqft
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="bg-white rounded-xl p-3 shadow">
                  <p className="text-xs text-gray-500">Furnishing</p>
                  <p className="font-semibold">{selectedProperty.furnishing}</p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow">
                  <p className="text-xs text-gray-500">Built Year</p>
                  <p className="font-semibold">{selectedProperty.year_built}</p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow">
                  <p className="text-xs text-gray-500">Floor</p>
                  <p className="font-semibold">
                    {selectedProperty.floor_number}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow">
                  <p className="text-xs text-gray-500">Total Floors</p>
                  <p className="font-semibold">
                    {selectedProperty.total_floors}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow col-span-2">
                  <p className="text-xs text-gray-500">Parking Spaces</p>
                  <p className="font-semibold">
                    {selectedProperty.parking_spaces}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed border-t pt-4 mt-4">
                {selectedProperty.description}
              </p>

              <motion.button
                onClick={handleAddProperty}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-lg font-medium rounded-xl hover:from-yellow-500 hover:to-amber-400 transition duration-300 shadow-lg"
              >
                Add Property
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </MotionSection>
  );
};

export default InfiniteScrollSection;
