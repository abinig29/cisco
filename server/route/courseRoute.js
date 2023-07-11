import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
  coverTopic,
  updateCourse,
} from "";

const router = express.Router();

router.route("/").get(getCourses).post(createCourse);
router.route("/:id").patch(updateCourse).delete(deleteCourse);
route.route("/:id/coverTopic").patch(coverTopic);

export default router;
