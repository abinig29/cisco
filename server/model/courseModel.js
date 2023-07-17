import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: [true, "must have course code"],
    },
    courseName: {
      type: String,
      required: [true, "must provide last name"],
    },
    endDate: {
      type: Date,
    },
    description: String,
    shortDescription: String,
    picture: String,
    price: {
      type: Number,
      required: [true, "must provide price"],
    },
    lecture: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      //   required: [true, "must have lecture"],
    },
    topics: [String],
    coverdTopics: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
