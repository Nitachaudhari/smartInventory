const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");
const alertRoutes = require("./routes/alertRoutes");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reports");
const inventoryRoutes = require('./routes/inventoryRoutes')
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

//routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/inventory", inventoryRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("SmartInventory API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
