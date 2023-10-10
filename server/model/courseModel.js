import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: [true, "must have course code"],
    },
    courseName: {
      type: String,
      required: [true, "must provide course name"],
    },
    endDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    registrationDeadline: {
      type: Date,
    },
    description: String,
    shortDescription: String,
    picture: String,

    aauUGStudentPrice: {
      type: Number,
      required: [true, "must provide this price"],
    },
    aauPGStudentPrice: {
      type: Number,
      required: [true, "must provide this price"],
    },
    aauExtensionStudentPrice: {
      type: Number,
      required: [true, "must provide this price"],
    },
    aauStaffPrice: {
      type: Number,
      required: [true, "must provide this price"],
    },
    noneAAUSelfSponsoredPrice: {
      type: Number,
      required: [true, "must provide this price"],
    },
    noneAAUOrganizationSponsoredPrice: {
      type: Number,
      required: [true, "must provide this price"],
    },
    lecture: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      //   required: [true, "must have lecture"],
    },
    courseProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory",
    },
    topics: [String],
    coverdTopics: [String],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
