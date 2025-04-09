import { MapPin, Bed, Bath, Ruler, IndianRupee } from "lucide-react";

const NewPropertyCard = ({ property }) => {
  const property_id = localStorage.getItem("propertyId");
  const user_id = localStorage.getItem("userId");

  const handleAddProperty = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/userprop/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property_id: property_id,
          user_id: user_id,
        }),
      });

      const result = await response.json();
      if (result.success) {
        window.alert("Property Added Successfully");
        localStorage.removeItem("propertyId");
      } else {
        window.alert("Failed to add property");
        console.log("API Error", result);
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="relative">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-48 object-cover"
        />
        {property.tag && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {property.tag}
          </span>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{property.name}</h2>
        <p className="text-gray-500 flex items-center gap-1 text-sm">
          <MapPin size={14} /> {property.location}
        </p>
        <p className="text-blue-500 flex items-center gap-1 font-semibold mt-2">
          <IndianRupee size={16} /> {property.price}
        </p>
        <div className="flex justify-between mt-3 text-gray-600 text-sm border-t pt-4">
          <span className="flex items-center gap-1">
            <Bed size={14} /> {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <Bath size={14} /> {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1">
            <Ruler size={14} /> {property.area} sq.ft
          </span>
        </div>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleAddProperty}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all"
        >
          Add Property
        </button>
      </div>
    </div>
  );
};

export default NewPropertyCard;
