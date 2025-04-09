import express from "express";
import cors from "cors";
import { checkConnection } from "./config/db.js";
import createAllTable from "./utils/dbUtils.js";
import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js"; // Import properties routes
import userPropRoutes from "./routes/userPropRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/properties", propertyRoutes); // Added property routes
app.use("/api/userprop", userPropRoutes);
app.use("/api/payment", paymentRoutes);
// app.use("/api/contact", contactRoutes);

app.listen(3000, async () => {
  console.log("Server is running on port 3000");

  try {
    await checkConnection();
    await createAllTable();
  } catch (error) {
    console.log("Failed to initialize the database", error);
  }
});

export default app;
