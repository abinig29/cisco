import { UnAuthenticatedError } from "../error/index.js";

export const verfiyRole = (...role) => {
  return (req, res, next) => {
    if (!req?.role) throw new UnAuthenticatedError("Unauthorized");
    const roles = [...role];
    if (!roles.includes(req.role))
      throw new UnAuthenticatedError("Unauthorized, cant perform this action");
    next();
  };
};
