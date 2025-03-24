const mongoose = require("mongoose");

const WastageSchema = new mongoose.Schema({
  name: String,
  category: String,
  wastedQuantity: Number,
  reason: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Wastage", WastageSchema);
