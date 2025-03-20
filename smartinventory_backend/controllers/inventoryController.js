const Inventory = require("../models/Inventory");

// Get all inventory items
const getItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new inventory item
const addItem = async (req, res) => {
  const { name, category, quantity, expiryDate } = req.body;
  try {
    const newItem = new Inventory({ name, category, quantity, expiryDate });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getItems, addItem };
