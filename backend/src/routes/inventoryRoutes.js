const express = require("express");
const Inventory = require('../models/Inventory')
const router = express.Router();

router.get("/:barcode", async (req, res) => {
  try {
    const product = await Inventory.findOne({ barcode: req.params.barcode });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
