import mongoose, { Schema } from "mongoose";

const scanSchema = new Schema(
  {
    scans: {
      type: Number,
      default: 0,
    },
    buttonClicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


const ScanModel= mongoose.model("Scan", scanSchema);

export default ScanModel;