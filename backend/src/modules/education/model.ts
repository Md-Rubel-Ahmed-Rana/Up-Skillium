import { model, Schema } from "mongoose";
import { IEducation } from "./interface";
import schemaOption from "../../utils/schemaOption";

const educationSchema = new Schema<IEducation>(
  {
    user: {
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
    isCurrent: {
      type: Boolean,
      default: false,
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
  schemaOption
);

export const Education = model<IEducation>("Education", educationSchema);
