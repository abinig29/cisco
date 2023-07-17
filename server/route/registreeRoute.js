import express from "express";
import {
  getRegistrees,
  updateRegistree,
  deleteRegistree,
} from "../controller/registreeController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
import { verfiyRole } from "../middleware/verifyRole.js";
import { roles } from "../config/role.js";
const router = express.Router();

router.get(
  "/",
  verifyJWT,
  verfiyRole(roles.admin, roles.lecture),
  getRegistrees
);

router
  .route("/:id")
  .patch(
    verifyJWT,
    verfiyRole(roles.admin, roles.admin, roles.lecture),
    updateRegistree
  )

  .delete(verifyJWT, verfiyRole(roles.admin), deleteRegistree);

export default router;
