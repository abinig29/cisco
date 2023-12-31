import mongoose from "mongoose";
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mainContent: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("News", newsSchema);
