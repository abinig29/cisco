import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "must provide first name"],
    },
    lastName: {
      type: String,
      required: [true, "must provide last name"],
    },
    email: {
      type: String,
      required: [true, "must provide email"],
    },
    picture: String,
    password: {
      type: String,
    },
    firstTimeLogin: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Lecture"],
      default: "Lecture",
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   const hashedPass = await bcrypt.hash(this.password, salt);
//   this.password = hashedPass;
//   next();
// });
userSchema.methods.generateAccessToken = function () {
  const userInfo = {
    userId: this._id,
    role: this.role,
  };
  return jwt.sign(userInfo, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXP,
  });
};
userSchema.methods.generateRefreshToken = function () {
  const userInfo = {
    userId: this._id,
    role: this.role,
  };
  return jwt.sign(userInfo, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXP,
  });
};

export default mongoose.model("User", userSchema);
