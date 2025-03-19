import express from "express";
import { register, login } from "../controllers/authController.js";
import { check } from "express-validator";

const router = express.Router();

router.post("/register", [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Valid email is required").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
], register);

router.post("/login", login);

export default router;
