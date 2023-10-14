import mongoose from "mongoose";
const layoutSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "must provide typpe"],
    },
    faq: [
      {
        question: String,
        answer: String,
      },
    ],
    banner: {
      picture: String,
      title: String,
      subTitle: String,
    },
    hero: {
      picture: String,
      title: String,
      subTitle:String
    },
    aboutContent: {
      title: String,
      content: String,
    },
    video: {
      video: String,
      title: String,
      subTitle: String,
      banner: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Layout", layoutSchema);
