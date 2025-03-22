const Item = require("../models/Item");

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// Get single item
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
};

// Create item
const createItem = async (req, res) => {
  try {
    const { name, category, quantity, expiryDate } = req.body;
    const newItem = new Item({ name, category, quantity, expiryDate });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: "Error creating item", error });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const { name, category, quantity, expiryDate } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, category, quantity, expiryDate },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Error updating item", error });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem };
