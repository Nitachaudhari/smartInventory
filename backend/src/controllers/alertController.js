const Item = require("../models/Item");

// Get Low Stock Items
const getLowStockItems = async (req, res) => {
  try {
    const items = await Item.find({ quantity: { $lte: 5 } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching low stock items", error });
  }
};

// Get Expiring Soon Items
const getExpiringItems = async (req, res) => {
  try {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 7); // Expiring within a week

    const items = await Item.find({ expiryDate: { $lte: futureDate } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expiring items", error });
  }
};

module.exports = { getLowStockItems, getExpiringItems };
