import jwt from "jsonwebtoken";
import { ForbiddenError, UnAuthenticatedError } from "../error/index.js";
export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) throw new ForbiddenError("Forbidden");
    console.log();
    req.user = decoded.userId;
    req.role = decoded.role;
    next();
  });
};
