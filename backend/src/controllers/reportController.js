const Inventory = require("../models/Inventory");

// Generate Stock Report
const generateStockReport = async (req, res) => {
  try {
    const stockReport = await Inventory.find().select("name category quantity threshold");
    res.json(stockReport);
  } catch (error) {
    res.status(500).json({ message: "Error generating stock report", error });
  }
};

// Generate Expiry Report
const generateExpiryReport = async (req, res) => {
  try {
    const today = new Date();
    const expiryReport = await Inventory.find({ expiryDate: { $lte: today } }).select("name category expiryDate");
    res.json(expiryReport);
  } catch (error) {
    res.status(500).json({ message: "Error generating expiry report", error });
  }
};

module.exports = { generateStockReport, generateExpiryReport };
