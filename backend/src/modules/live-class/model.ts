import { model, Schema } from "mongoose";
import schemaOption from "../../utils/schemaOption";
import ILiveClass from "./interface";

const liveClassSchema = new Schema<ILiveClass>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    meetingLink: {
      type: String,
      required: true,
    },
    recordingLink: {
      type: String,
    },
    topics: [String],
    tags: [String],
  },
  schemaOption
);

const LiveClass = model("LiveClass", liveClassSchema);

export default LiveClass;
