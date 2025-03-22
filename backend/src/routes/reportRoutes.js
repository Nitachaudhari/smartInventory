const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");
const { generateStockReport, generateExpiryReport } = require("../controllers/reportController");

const router = express.Router();

// Stock Report Route (Only Admin & Manager)
router.get("/stock", authenticateUser, authorizeRoles("admin", "manager"), generateStockReport);

// Expiry Report Route (Only Admin & Manager)
router.get("/expiry", authenticateUser, authorizeRoles("admin", "manager"), generateExpiryReport);

module.exports = router;
