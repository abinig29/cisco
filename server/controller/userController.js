import User from "../model/userModel.js";
import { BadRequestError, NotFoundError } from "../error/index.js";

export const createUser = async (req, res) => {
  const { email } = req.body;
  const duplicate = await User.findOne(email).lean().exec();
  if (duplicate) throw new BadRequestError("user found with this email");
  const user = await User.create(req.body);
  if (user) {
    res.status(201).json(user);
  } else {
    throw new BadRequestError("Invalid user credential");
  }
};
export const getUsers = async (req, res) => {
  const query = req.query;
  const tempQuery = {};
  if (query.lecture) tempQuery.role = { $all: ["Lecture"] };
  const users = await User.find(tempQuery).exec();
  if (!users?.length) {
    throw new NotFoundError("No user");
  }
  res.status(200).json(users);
};

export const updateUser = async (req, res) => {
  const { id } = req.param;
  const user = await User.findById(id).lean().exec();
  if (!user) throw new BadRequestError("No user found");
  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (updatedUser) {
    res.status(200).json(user);
  } else {
    throw new BadRequestError("Invalid user credential, cannot update");
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.param;
  const user = await User.findById(id).exec();
  if (!user) throw new BadRequestError("No user found");
  const deletedUser = await user.deleteOne();
  res.status(204).json({
    message: `Username ${deletedUser.firstName} with ID ${deleteUser._id} deleted`,
  });
};
