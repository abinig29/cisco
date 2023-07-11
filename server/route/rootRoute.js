import express from "express";
import { __dirname, __filename } from "../config/dirSetup.js";
const router = express.Router();
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
export default router;
