import { pool } from "../config/db.js";

const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'seller', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const teamTableQuery = `CREATE TABLE IF NOT EXISTS team (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const clientTableQuery = `CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  feedback TEXT NOT NULL,
  rating ENUM('1', '2', '3', '4', '5') NOT NULL,
  image VARCHAR(255), 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const propertyTableQuery = `CREATE TABLE IF NOT EXISTS properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  bedrooms INT CHECK (bedrooms >= 1),
  bathrooms INT CHECK (bathrooms >= 1),
  area INT NOT NULL,
  image VARCHAR(255),
  description VARCHAR(255) NOT NULL,

  property_type VARCHAR(100) NOT NULL, -- e.g., Apartment, Villa, Plot
  status ENUM('available', 'sold', 'pending') DEFAULT 'available',
  furnishing ENUM('furnished', 'semi-furnished', 'unfurnished'),
  year_built YEAR,
  floor_number INT,
  total_floors INT,
  parking_spaces INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const userPropertiesTableQuery = `CREATE TABLE IF NOT EXISTS user_properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  property_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const paymentTableQuery = `CREATE TABLE IF NOT EXISTS payment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  property_id INT NOT NULL,
  amount_paid DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(20) NOT NULL,
  payment_details JSON NOT NULL,
  status VARCHAR(20) DEFAULT 'success',
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

// const contactTableQuery = `CREATE TABLE IF NOT EXISTS contact (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   fullname VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   phone VARCHAR(20) NOT NULL,
//   subject VARCHAR(100) NOT NULL,
//   message TEXT NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );`;

const createTable = async (tableName, query) => {
  try {
    await pool.execute(query);
    console.log(`${tableName} table created or already exists`);
  } catch (error) {
    console.error(`Error creating ${tableName} table:`, error);
  }
};

const createAllTables = async () => {
  try {
    await createTable("users", userTableQuery);
    await createTable("team", teamTableQuery);
    await createTable("clients", clientTableQuery);
    await createTable("properties", propertyTableQuery);
    await createTable("user_properties", userPropertiesTableQuery);
    await createTable("payment", paymentTableQuery);
    // await createTable("contact", contactTableQuery);
    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};

export default createAllTables;
