const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  name: String,
  category: String,
  soldQuantity: Number,
  totalSales: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sale", SaleSchema);
