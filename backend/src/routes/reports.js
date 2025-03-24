const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Sale = require("../models/Sale");
const Wastage = require("../models/Wastage");

// Fetch reports (weekly or monthly)
router.get("/reports/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const now = new Date();
    const startDate =
      type === "weekly"
        ? new Date(now.setDate(now.getDate() - 7))
        : new Date(now.setMonth(now.getMonth() - 1));

    // Fetch stock levels
    const stock = await Item.find({}, "name category quantity threshold");

    // Fetch sales
    const sales = await Sale.find(
      { date: { $gte: startDate } },
      "name category soldQuantity totalSales"
    );

    // Fetch wastage
    const wastage = await Wastage.find(
      { date: { $gte: startDate } },
      "name category wastedQuantity reason"
    );

    res.json({ stock, sales, wastage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
