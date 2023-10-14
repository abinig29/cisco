import User from "../model/userModel.js";
import { BadRequestError, NotFoundError } from "../error/index.js";
import bcrypt from "bcrypt";

//@desc create new user
//@method POST /user
//@access private
export const createUser = async (req, res) => {
  const { email } = req.body;
  const duplicate = await User.findOne({ email }).lean().exec();
  if (duplicate) throw new BadRequestError("user found with this email");
  const user = await User.create(req.body);
  if (user) {
    res.status(201).json(user);
  } else {
    throw new BadRequestError("Invalid user credential");
  }
};

//@desc get users
//@method GET /user
//@access private
export const getUsers = async (req, res) => {
  const query = req.query;
  const tempQuery = {};
  if (query.lecture) tempQuery.role = { $all: ["Lecture"] };
  const users = await User.find(tempQuery).sort("-createdAt").exec();
  if (!users?.length) {
    throw new NotFoundError("No user");
  }
  res.status(200).json({ users });
};

//@desc update users
//@method PATCH /user/:id
//@access private
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).lean().exec();
  if (!user) throw new BadRequestError("No user found");
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
  }
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  // console.log(updatedUser);
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    throw new BadRequestError("Invalid user credential, cannot update");
  }
};

//@desc delete users
//@method DELETE /user/:id
//@access private
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).exec();
  if (!user) throw new BadRequestError("No user found");
  await user.deleteOne();
  res.status(204).json({
    message: `User deleted`,
  });
};
