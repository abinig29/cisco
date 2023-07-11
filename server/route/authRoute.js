import express from "express";
import { logout, refreshToken, login } from "../controller/authController.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/login", loginLimiter, login);
router.get("/refresh", refreshToken);
router.route("/logout").post("/logout", logout);

export default router;
