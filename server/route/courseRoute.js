import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
  coverTopic,
  updateCourse,
} from "../controller/courseController.js";

const router = express.Router();

router.route("/").get(getCourses).post(createCourse);
router.route("/:id").patch(updateCourse).delete(deleteCourse);
router.route("/:id/coverTopic").patch(coverTopic);

export default router;
