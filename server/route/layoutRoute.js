import express from "express";
import {
  getSingleLayout,
  deleteLayout,
  getAllLayout,
} from "../controller/layoutController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
import { verfiyRole } from "../middleware/verifyRole.js";
import { roles } from "../config/role.js";
const router = express.Router();

router.get("/", getAllLayout);
router.get("/:type", getSingleLayout);
router.route("/:id").delete(verifyJWT, verfiyRole(roles.admin), deleteLayout);

export default router;
