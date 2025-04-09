import { useState, useEffect } from "react";
import { IndianRupee, PlusCircle, XCircle } from "lucide-react";
import PropertyCard from "../components/PropertyCard";

const PropertyFeatures = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [newProperty, setNewProperty] = useState({
    name: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    property_type: "",
    status: "",
    furnishing: "",
    year_built: "",
    floor_number: "",
    total_floors: "",
    parking_spaces: "",
    image: "https://i.pravatar.cc/150?img=1",
  });

  const fetchProperties = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/properties");
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
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleAddOrEditProperty = async () => {
    if (!newProperty.name || !newProperty.location || !newProperty.price) return;

    try {
      let response;
      if (isEditing && selectedProperty) {
        response = await fetch(
          `http://localhost:3000/api/properties/${selectedProperty.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProperty),
          }
        );
      } else {
        response = await fetch("http://localhost:3000/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProperty),
        });
      }

      if (response.ok) fetchProperties();
    } catch (error) {
      console.error("Error saving property:", error);
    }

    resetForm();
    setShowModal(false);
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setNewProperty(property);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/properties/${id}`, {
          method: "DELETE",
        });
        if (response.ok) fetchProperties();
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  const resetForm = () => {
    setNewProperty({
      name: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      description: "",
      property_type: "",
      status: "",
      furnishing: "",
      year_built: "",
      floor_number: "",
      total_floors: "",
      parking_spaces: "",
      image: "https://i.pravatar.cc/150?img=1",
    });
    setIsEditing(false);
    setSelectedProperty(null);
  };

  const bedroomOptions = [1, 2, 3, 4, 5, 6];
  const bathroomOptions = [1, 2, 3, 4, 5];
  const propertyTypeOption = ["Apartment", "Villa", "Plot"];
  const statusOption = ["available", "sold", "pending"];
  const furnishingOption = ["furnished", "semi-furnished", "unfurnished"];

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData?.userData?.data?.role) {
      setUserRole(userData.userData.data.role);
    }
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900">🏡 Property Management</h1>
        {(userRole === "admin" || userRole === "seller") && (
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition-all hover:shadow-xl"
          >
            <PlusCircle size={22} /> Add Property
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={() => handleEditProperty(property)}
              onDelete={() => handleDeleteProperty(property.id)}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No properties found.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {isEditing ? "Edit Property" : "Add New Property"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500">
                <XCircle size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.keys(newProperty).map((key) =>
                key !== "id" ? (
                  <div key={key}>
                    <label className="block text-gray-700 font-medium capitalize">{key}</label>
                    {key === "bedrooms" || key === "bathrooms" ? (
                      <select
                        name={key}
                        value={newProperty[key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select {key}</option>
                        {(key === "bedrooms" ? bedroomOptions : bathroomOptions).map((option) => (
                          <option key={option} value={option}>
                            {option} {key === "bedrooms" ? "Bedroom(s)" : "Bathroom(s)"}
                          </option>
                        ))}
                      </select>
                    ) : key === "property_type" ? (
                      <select
                        name={key}
                        value={newProperty[key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Property Type</option>
                        {propertyTypeOption.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : key === "status" ? (
                      <select
                        name={key}
                        value={newProperty[key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Status</option>
                        {statusOption.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : key === "furnishing" ? (
                      <select
                        name={key}
                        value={newProperty[key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Furnishing</option>
                        {furnishingOption.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : key === "description" ? (
                      <textarea
                        name={key}
                        value={newProperty[key]}
                        onChange={handleInputChange}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        className="w-full p-2 border rounded-md"
                        rows="1"
                      ></textarea>
                    ) : (
                      <input
                        type={key === "image" ? "url" : key === "price" || key === "area" ? "number" : "text"}
                        name={key}
                        placeholder={
                          key === "price"
                            ? "Enter Price"
                            : key === "area"
                            ? "Enter Area (sq ft)"
                            : key.charAt(0).toUpperCase() + key.slice(1)
                        }
                        value={newProperty[key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                      />
                    )}
                  </div>
                ) : null
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEditProperty}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFeatures;
