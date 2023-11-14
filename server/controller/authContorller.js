import {
  BadRequestError,
  UnAuthenticatedError,
  ForbiddenError,
} from "../error/index.js";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//@desc login
//@method POST  /auth/login
//@access public
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new UnAuthenticatedError("Invalid credential");
  const user = await User.findOne({ email }).lean().exec();
  if (!user) throw new BadRequestError("invalid credential");
  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new UnAuthenticatedError("Invalid credential");
  const accessToken = generateToken(
    res,
    user,
    process.env.JWT_ACCESS_SECRET,
    process.env.JWT_ACCESS_EXP
  );
  const refreshToken = generateToken(
    res,
    user,
    process.env.JWT_REFRESH_SECRET,
    process.env.JWT_REFRESH_EXP
  );

  res.cookie("Jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ accessToken, user });
};

//@desc logut
//@method POST  /auth/logout
//@access public
export const logout = async (req, res) => {
  const Jwt = req.cookies?.Jwt;
  if (!Jwt) return res.status(204).json({message:"wasnt there"});
  res.cookie("Jwt", "");
  res.json({ message: "Cookie cleared" });
};

//@desc token refreshh
//@method GEt  /auth/refresh
//@access public
export const refreshToken = async (req, res) => {
  const Jwt = req.cookies?.Jwt;
  if (!Jwt) throw new UnAuthenticatedError("Invalid credential");
  jwt.verify(Jwt, process.env.JWT_REFRESH_SECRET, async (err, decode) => {
    if (err) throw new ForbiddenError("Forbidden");
    const { userId } = decode;
    const user = await User.findById(userId);
    if (!user) throw new UnAuthenticatedError("Unauthorized");
    const accessToken = generateToken(
      res,
      user,
      process.env.JWT_ACCESS_SECRET,
      process.env.JWT_ACCESS_EXP
    );
    res.status(200).json(accessToken);
  });
};
const generateToken = (res, user, secretKey, expire) => {
  console.log(expire);
  const userInfo = {
    userId: user._id,
    role: user.role,
  };

  return jwt.sign(userInfo, secretKey, {
    expiresIn: expire,
  });
};
