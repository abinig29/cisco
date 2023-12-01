import express from "express";
import {
  logout,
  refreshToken,
  login,
  changePassword,
} from "../controller/authContorller.js";
import { loginLimiter } from "../middleware/loginLimiter.js";
import { verifyJWT } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", loginLimiter, login);
router.get("/refresh", refreshToken);
router.post("/logout", logout);
router.patch("/changePassword",verifyJWT, changePassword);

export default router;
