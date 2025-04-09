import PropertyModel from "../models/propertyModel.js";
import {
  addProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
} from "../services/propertyService.js";

// Add Property
export const createProperty = async (req, res) => {
  try {
    const {
      name,
      location,
      price,
      bedrooms,
      bathrooms,
      area,
      image,
      description,
      property_type,
      status,
      furnishing,
      year_built,
      floor_number,
      total_floors,
      parking_spaces,
    } = req.body;

    if (
      !name ||
      !location ||
      !price ||
      !bedrooms ||
      !bathrooms ||
      !area ||
      !description ||
      !property_type ||
      !status ||
      !furnishing ||
      !year_built ||
      !floor_number ||
      !total_floors ||
      !parking_spaces ||
      !image
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const property = new PropertyModel({
      name,
      location,
      price,
      bedrooms,
      bathrooms,
      area,
      description,
      property_type,
      status,
      furnishing,
      year_built,
      floor_number,
      total_floors,
      parking_spaces,
      image,
    });
    const response = await addProperty(property);
    return res.status(response.success ? 200 : 400).json(response);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Properties
export const fetchProperties = async (req, res) => {
  try {
    const response = await getAllProperties();
    return res.status(response.success ? 200 : 400).json(response);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Property
export const modifyProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (Object.values(updatedData).some((value) => !value)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const response = await updateProperty(id, updatedData);
    return res.status(response.success ? 200 : 400).json(response);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Property
export const removeProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteProperty(id);
    return res.status(response.success ? 200 : 400).json(response);
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
