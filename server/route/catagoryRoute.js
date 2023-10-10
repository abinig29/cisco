import express from "express";
import {
  getCatagories,
  createCatagory,
  updateCatagory,
  deleteCatagory,
} from "../controller/catagoryController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
import { verfiyRole } from "../middleware/verifyRole.js";
import { roles } from "../config/role.js";
const router = express.Router();

router.get("/",verifyJWT, verfiyRole(roles.admin), getCatagories);
router.post("/", verifyJWT, verfiyRole(roles.admin), createCatagory);
router.route("/:id").delete(verifyJWT, verfiyRole(roles.admin), deleteCatagory);
router.route("/:id").patch(verifyJWT, verfiyRole(roles.admin), updateCatagory);

export default router;
