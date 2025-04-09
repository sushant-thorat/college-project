import { pool } from "../config/db.js";

// Add Property
export const addProperty = async (property) => {
  try {
    const query = `
      INSERT INTO properties 
      (name, location, price, bedrooms, bathrooms, area, image, description, property_type, status, furnishing, year_built, floor_number, total_floors, parking_spaces) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      property.name,
      property.location,
      property.price,
      property.bedrooms,
      property.bathrooms,
      property.area,
      property.image,
      property.description,
      property.property_type,
      property.status,
      property.furnishing,
      property.year_built,
      property.floor_number,
      property.total_floors,
      property.parking_spaces,
    ];

    await pool.execute(query, values);
    return { success: true, message: "Property added successfully" };
  } catch (error) {
    console.error("Error adding property:", error);
    return { success: false, message: "Failed to add property" };
  }
};

// Get All Properties
export const getAllProperties = async () => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM properties`);
    return { success: true, data: rows };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { success: false, message: "Failed to fetch properties" };
  }
};

// Update Property
export const updateProperty = async (id, updatedProperty) => {
  try {
    const query = `
      UPDATE properties 
      SET name=?, location=?, price=?, bedrooms=?, bathrooms=?, area=?, image=?, description=?, property_type=?, status=?, furnishing=?, year_built=?, floor_number=?, total_floors=?, parking_spaces=? WHERE id=?`;

    const values = [
      updatedProperty.name,
      updatedProperty.location,
      updatedProperty.price,
      updatedProperty.bedrooms,
      updatedProperty.bathrooms,
      updatedProperty.area,
      updatedProperty.image,
      updatedProperty.description,
      updatedProperty.property_type,
      updatedProperty.status,
      updatedProperty.furnishing,
      updatedProperty.year_built,
      updatedProperty.floor_number,
      updatedProperty.total_floors,
      updatedProperty.parking_spaces,
      id,
    ];

    await pool.execute(query, values);
    return { success: true, message: "Property updated successfully" };
  } catch (error) {
    console.error("Error updating property:", error);
    return { success: false, message: "Failed to update property" };
  }
};

// Delete Property
export const deleteProperty = async (id) => {
  try {
    await pool.execute(`DELETE FROM properties WHERE id=?`, [id]);
    return { success: true, message: "Property deleted successfully" };
  } catch (error) {
    console.error("Error deleting property:", error);
    return { success: false, message: "Failed to delete property" };
  }
};
