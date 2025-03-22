const express = require("express");
const { check } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password should be 6+ chars").isLength({ min: 6 }),
  ],
  registerUser
);

router.post("/login", loginUser);

module.exports = router;
