import { model, Schema } from "mongoose";
import { IEducation } from "./interface";

const educationSchema = new Schema<IEducation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    degree: {
      type: String,
      required: true,
    },
    fieldOfStudy: {
      type: String,
    },
    institution: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  }
);

export const Education = model<IEducation>("Education", educationSchema);
