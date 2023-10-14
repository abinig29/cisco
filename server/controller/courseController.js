import User from "../model/userModel.js";
import Course from "../model/courseModel.js";
import { BadRequestError, NotFoundError } from "../error/index.js";
import mongoose from "mongoose";
import Catagory from "../model/catagoryModel.js";

//@desc get all courses
//@method GET  /course
//@access public
export const getCourses = async (req, res) => {
  const query = req.query;
  const tempQuery = {};
  if (query.lecture) tempQuery.lecture = { $in: [req.user] };
  const courses = await Course.find()
    .populate({ path: "courseProvider", select: "catagoryName" })
    .lean();
  res.status(200).json({ courses: courses });
};

//@desc create new course
//@method POST /course
//@access private
export const createCourse = async (req, res) => {
  const {
    courseCode,
    topics,
    coverdTopics,
    lecture,
    courseProvider: catagoryId,
  } = req.body;
  const duplicate = await Course.findOne({ courseCode });
  if (duplicate) throw new BadRequestError("Course dose exist");

  const catagory = await Catagory.findById(catagoryId);

  const course = await Course.create(req.body);
  if (catagory) catagory.courses.push(course._id);
  catagory?.save();
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
  const catagory = await Catagory.findById(course.courseProvider);
  const deletedCourse = await course.deleteOne();
  if (catagory) {
    const indexToDelete = catagory.courses.indexOf(deletedCourse._id);
    if (indexToDelete > -1) {
      catagory.courses.splice(indexToDelete, 1);
    }
  }
  catagory?.save();

  res.status(204).json({
    message: `Course with code ${deletedCourse.courseCode}is deleted successfully`,
  });
};

//@desc update covered topics by the course
//@method PATCH /course/:id
//@access private
export const coverTopic = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { topic } = req.body;
  const course = await Course.findById(id).exec();
  if (!course) throw new BadRequestError("No course was found");

  if (!course.lecture.includes(userId))
    throw new BadRequestError("Cannot update courses other than yours");
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
  const userId = req.user;
  const role = req.role;

  const course = await Course.findById(id).lean().exec();
  if (!course) throw new BadRequestError("No course found");
  if (!role == "Admin" && !course.lecture.includes(userId))
    throw new BadRequestError("Cannot update courses other than yours");
  const catagory = await Catagory.findById(course.courseProvider);
  
  if (req.body.courseProvider != course.courseProvider) {
    const indexToDelete = catagory.courses.indexOf(course._id);
    if (indexToDelete > -1) {
      catagory.courses.splice(indexToDelete, 1);
    }
    const newCatagory = await Catagory.findById(req.body.courseProvider);
    newCatagory.courses.push(course._id);
    catagory?.save();
    newCatagory?.save();
  }
  console.log(req.body.picture)

  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedCourse) {
    res.status(200).json({ course: updatedCourse });
  } else {
    throw new BadRequestError("Invalid course credential, cannot update");
  }
};
