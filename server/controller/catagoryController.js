import User from "../model/userModel.js";
import Course from "../model/courseModel.js";
import { BadRequestError, NotFoundError } from "../error/index.js";
import mongoose from "mongoose";
import Catagory from "../model/catagoryModel.js";

//@desc get all catagories
//@method GET  /catagory
//@access public
export const getCatagories = async (req, res) => {
  const catagories = await Catagory.find().populate({
    path: "courses",
    select: "courseName",
  });
  res.status(200).json({ catagories });
};

//@desc create new catagory
//@method POST /catagory
//@access private
export const createCatagory = async (req, res) => {
  const { catagoryName } = req.body;
  if (!catagoryName) throw BadRequestError("Catagory name required");
  const course = await Catagory.create({ catagoryName });
  return res.status(201).json(course);
};

//@desc delete catagory
//@method DELETE /course/:id
//@access private
export const deleteCatagory = async (req, res) => {
  const { id } = req.params;
  const catagory = await Catagory.findById(id).exec();
  if (!catagory) throw new BadRequestError("No catagory was found");
  const deletedcatagory = await catagory.deleteOne();
  res.status(204).json({
    message: `Course with code ${deletedcatagory.catagoryName}is deleted successfully`,
  });
};

//@desc update catagory
//@method PATCH /course/:id
//@access private
export const updateCatagory = async (req, res) => {
  const { id } = req.params;
  const course = await Catagory.findById(id).lean().exec();
  if (!course) throw new BadRequestError("No course found");
  const updatedCourse = await Catagory.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  console.log(updatedCourse)
  if (updatedCourse) {
    res.status(200).json({ course: updatedCourse });
  } else {
    throw new BadRequestError("Invalid catagory credential, cannot update");
  }
};
