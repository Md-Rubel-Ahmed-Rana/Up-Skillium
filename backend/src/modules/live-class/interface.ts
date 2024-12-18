import { Types } from "mongoose";

type ILiveClass = {
  title: string;
  description?: string;
  instructor: Types.ObjectId;
  course: Types.ObjectId;
  creator: Types.ObjectId;
  scheduledDate: Date;
  duration: number;
  status?: "upcoming" | "ongoing" | "completed" | "cancelled";
  meetingLink: string;
  recordingLink?: string;
  topics?: string[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default ILiveClass;
