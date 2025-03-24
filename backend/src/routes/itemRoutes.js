const express = require("express");
const { getItems, getItemById, createItem, updateItem, deleteItem } = require("../controllers/itemController");
const Item =require('../models/Item')
const router = express.Router();


// Search item by barcode or QR data
router.get("/search/:code", async (req, res) => {
    try {
        const item = await Item.findOne({ barcode: req.params.code });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
 
router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
