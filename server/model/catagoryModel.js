import mongoose from "mongoose";
const catagorySchema = new mongoose.Schema(
  {
    catagoryName: {
      type: String,
      required: [true, "must provide name"],
    },
    courses:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Course"
    }
  },
  { timestamps: true }
);

export default  mongoose.model("Catagory", catagorySchema);

