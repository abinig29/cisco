import Registree from "../model/registreeModel.js";
import { BadRequestError, NotFoundError } from "../error/index.js";

//@desc create new Registree
//@method POST /registree
//@access public
export const createRegistree = async (req, res) => {
  const body = req?.body;
  if (req?.files?.picture) body["picture"] = req?.files?.picture?.[0]?.filename;
  if (req?.files?.personalPicture)
    body["personalPicture"] = req?.files?.personalPicture?.[0]?.filename;
  const user = await Registree.create({
    ...body,
  });
  if (user) {
    res.status(201).json(user);
  } else {
    throw new BadRequestError("Invalid registration credential");
  }
};

//@desc get registrees
//@method GET /registree
//@access private
export const getRegistrees = async (req, res) => {
  const query = req.query;
  const temp = {};

  if (query.courseId) temp.course = query.courseId;
  const users = await Registree.find(temp)
    .sort("-createdAt")
    .populate({ path: "course", select: "courseName" })
    .exec();
  console.log({ users });
  res.status(200).json({ registree: users });
};

//@desc update registree
//@method PATCH /registree/:id
//@access private
export const updateRegistree = async (req, res) => {
  const { id } = req.params;
  const user = await Registree.findById(id).lean().exec();
  if (!user) throw new BadRequestError("No user found");

  const updatedUser = await Registree.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    throw new BadRequestError("Invalid registration credential, cannot update");
  }
};

//@desc delete registree
//@method DELETE /registree/:id
//@access private
export const deleteRegistree = async (req, res) => {
  const { id } = req.params;
  const user = await Registree.findById(id).exec();
  if (!user) throw new BadRequestError("No user found");
  await user.deleteOne();
  res.status(204).json({
    message: `User deleted`,
  });
};
