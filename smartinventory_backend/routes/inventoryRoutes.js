const express = require("express");
const { getItems, addItem } = require("../controllers/inventoryController");
const router = express.Router();

router.route("/").get(getItems).post(addItem);

module.exports = router;
