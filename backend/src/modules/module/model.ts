import { model, Schema } from "mongoose";
import { IModule } from "./interface";
import schemaOption from "../../utils/schemaOption";

const moduleSchema = new Schema<IModule>(
  {
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    serial: {
      type: Number,
    },
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson", default: [] }],
  },
  schemaOption
);

export const Module = model("Module", moduleSchema);
