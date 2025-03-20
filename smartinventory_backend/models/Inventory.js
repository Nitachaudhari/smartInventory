const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
