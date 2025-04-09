import {
  MapPin,
  Bed,
  Bath,
  Ruler,
  Edit,
  Trash2,
  IndianRupee,
} from "lucide-react";
import { useEffect, useState } from "react";

const PropertyCard = ({ property, onEdit, onDelete }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData.userData.data.role) {
      setUserRole(userData.userData.data.role);
    }
  }, []);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${property.name}?`)) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/properties/${property.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          onDelete(property.id); // Update UI after deletion
        } else {
          console.error("Failed to delete property");
        }
      } catch (error) {
        console.error("Error deleting property:", error);
      }
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

      {userRole === "admin" || userRole === "seller" ? (
        <div className="p-4 flex justify-between">
          <button
            onClick={() => onEdit(property)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PropertyCard;
