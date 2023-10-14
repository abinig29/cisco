import mongoose from "mongoose";
const registreeSchema = new mongoose.Schema(
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
    phoneNumber: {
      type: Number,
      required: [true, "must provide phone number"],
    },
    picture: {
      type: String,
      required: [true, "you must provide bill photo"],
    },
    personalPicture: {
      type: String,
      required: [true, "you must provide personal photo"],
    },
    gender: {
      type: String,
      required: [true, "you must provide gender"],
    },
    program: {
      type: String,
      required: [true, "you must program"],
    },
    registreeType: {
      type: String,
      required: [true, "you must provide registree type"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "choose course"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Registree", registreeSchema);
