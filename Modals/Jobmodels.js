import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company Name is require"],
    },
    position: {
      type: String,
      required: [true, "Job Position is require"],
      maxlength: 15,
    },
    status: {
      type: String,
      enum: ["Pending", "Reject", "interview"],
      default: "Pending",
    },
    worktype: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "internship"],
      default: "Full-time",
    },
    location: {
      type: String,
      default: "Mumbai",
      required: [true, "Work location is rquire"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("job", jobSchema);
