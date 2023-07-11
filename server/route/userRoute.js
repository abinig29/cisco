import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../controller/userController.js";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").patch(updateUser).delete(deleteUser);

export default router;
