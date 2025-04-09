import { useState, useEffect } from "react";
import MyPropertyCard from "../components/PropertyPropertyCard";

const Property = () => {
  const [properties, setProperties] = useState([]);

  const userDataString = sessionStorage.getItem("userData");
  const parsedUserData = userDataString ? JSON.parse(userDataString) : null;
  const userId = parsedUserData?.userData?.data?.id;

  // Fetch properties from backend
  const fetchProperties = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/userprop/${userId}`
      );
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setProperties(result.data);
      } else {
        console.error("Unexpected API response:", result);
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  });

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900">
          🏡 Property Management
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <MyPropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No properties found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Property;
