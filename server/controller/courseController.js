import User from "../model/userModel.js";
import Course from "../model/courseModel.js";
import { BadRequestError, NotFoundError } from "../error/index.js";
import mongoose from "mongoose";

//@desc get all courses
//@method GET  /course
//@access public
export const getCourses = async (req, res) => {
  const courses = await Course.find().lean();
  if (!courses?.length) throw new NotFoundError("No course was found");
  const formatedCourses = await Promise.all(
    courses.map(async (course) => {
      const formatedLectures = await Promise.all(
        course.lecture.map((lecture) => User.findOne({ lecture }).lean().exec())
      );
      return { ...course, lecture: formatedLectures };
    })
  );

  res.status(200).json({ courses: formatedCourses });
};

//@desc create new course
//@method POST /course
//@access private
export const createCourse = async (req, res) => {
  const { courseCode } = req.body;
  const duplicate = await Course.findOne({ courseCode });
  if (duplicate) throw new BadRequestError("Course dose exist");

  let courseBody = { ...req.body, picture: req.file?.filename };
  const course = await Course.create(courseBody);
  if (course) {
    res.status(201).json(course);
  } else {
    throw new BadRequestError("Invalid Course information provided");
  }
};

//@desc delete course
//@method DELETE /course/:id
//@access private
export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).exec();
  if (!course) throw new BadRequestError("No course was found");
  const deletedCourse = await User.deleteOne();
  res.status(204).json({
    message: `Course with code ${deletedCourse.courseCode}is deleted successfully`,
  });
};

//@desc update covered topics by the course
//@method PATCH /course/:id
//@access private
export const coverTopic = async (req, res) => {
  const { id } = req.params;
  const { topic } = req.body;
  const course = await Course.findById(id).exec();
  if (!course) throw new BadRequestError("No course was found");
  if (!course.topics.includes(topic))
    throw new BadRequestError("Provided topic isnt part of this course");
  if (course.coverdTopics.includes(topic)) {
    const updatedCourse = await course.updateOne(
      { $pull: { coverdTopics: topic } },
      { new: true }
    );
    res.status(200).json({ course: updatedCourse });
  } else {
    const updatedCourse = await course.updateOne(
      { $push: { coverdTopics: topic } },
      { new: true }
    );
    res.status(200).json({ course: updatedCourse });
  }
};

//@desc update course
//@method PATCH /course/:id
//@access private
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).lean().exec();
  if (!course) throw new BadRequestError("No course found");
  const updatedCourse = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedCourse) {
    res.status(200).json({ course: updatedCourse });
  } else {
    throw new BadRequestError("Invalid course credential, cannot update");
  }
};
