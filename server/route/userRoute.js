import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
import { verfiyRole } from "../middleware/verifyRole.js";
import { roles } from "../config/role.js";

const router = express.Router();
// router.use(verifyJWT, verfiyRole(roles.admin));
router.route("/").get(getUsers);
router.route("/:id").patch(updateUser).delete(deleteUser);

export default router;
