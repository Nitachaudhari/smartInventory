const express = require("express");
const { getLowStockItems, getExpiringItems } = require("../controllers/alertController");

const router = express.Router();

router.get("/low-stock", getLowStockItems);
router.get("/expiring", getExpiringItems);

module.exports = router;
