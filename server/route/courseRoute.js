import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
  coverTopic,
  updateCourse,
} from "../controller/courseController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
import { verfiyRole } from "../middleware/verifyRole.js";
import { roles } from "../config/role.js";
const router = express.Router();

router.get("/", getCourses);
router
  .route("/:id")
  // .patch(verifyJWT, verfiyRole(roles.admin, roles.lecture), updateCourse)
  .patch(updateCourse)
  // .delete(verifyJWT, verfiyRole(roles.admin), deleteCourse);
  .delete(deleteCourse);

router.route("/:id/coverTopic").patch(verifyJWT, coverTopic);

export default router;
