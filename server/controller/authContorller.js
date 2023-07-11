import {
  BadRequestError,
  UnAuthenticatedError,
  ForbiddenError,
} from "../error";
import User from "../model/userModel";
import jwt from "jsonwebtoken";

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
  const accessToken = User.generateAccessToken();
  const refreshToken = User.generateRefreshToken();
  res.cookie("Jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json(accessToken);
};

//@desc logut
//@method POST  /auth/logout
//@access public
export const logout = async (req, res) => {
  const { Jwt } = req.cookie;
  if (!Jwt) return res.status(204);
  res.clearCookie("Jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

//@desc token refreshh
//@method GEt  /auth/refresh
//@access public
export const refreshToken = async (req, res) => {
  const { Jwt } = req.cookie;
  if (!Jwt) throw new UnAuthenticatedError("Invalid credential");
  jwt.verify(Jwt, process.env.JWT_REFRESH_SECRET, async (err, decode) => {
    if (err) throw new ForbiddenError("Forbidden");
    const {
      userInfo: { userId, role },
    } = decode;
    const user = await User.findById(userId);
    if (!user) throw new UnAuthenticatedError("Unauthorized");
    const accessToken = user.generateAccessToken();
    res.status(200).json(accessToken);
  });
};
