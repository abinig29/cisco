import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
    password: {
      type: String,
      required: [true, "must provide password"],
    },
    role: {
      type: String,
      enum: ["Admin", "Lecture"],
      default: "Lecture",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(this.password, salt);
  this.password = hashedPass;
  next();
});

export default mongoose.model("User", userSchema);
