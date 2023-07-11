import express from "express";
import { logout, refreshToken, login } from "../controller/authContorller.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/login", loginLimiter, login);
router.get("/refresh", refreshToken);
router.post("/logout", logout);

export default router;
