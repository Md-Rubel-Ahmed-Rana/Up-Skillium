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
    students: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    startDateTime: {
      type: String,
      required: true,
    },
    endDateTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
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
