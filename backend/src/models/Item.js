const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    expiryDate: { type: Date },
    supplier: {
      type: String,
    },
    location: {
      type: String,
    },
    barcode: {
      type: String,
      required: [true, "Barcode is required"],
      unique: true,
    },
    pricePerPiece: {
      type: Number,
    },
    lowStockThreshold: { type: Number, default: 5 }, // Default alert threshold
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
