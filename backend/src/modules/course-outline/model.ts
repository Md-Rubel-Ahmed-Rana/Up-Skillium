import { model, Schema } from "mongoose";
import { ICourseOutline, IModuleOutline } from "./interface";
import schemaOption from "../../utils/schemaOption";

const moduleSchema = new Schema<IModuleOutline>(
  {
    name: { type: String, required: true },
  },
  schemaOption
);

const courseOutlineSchema = new Schema<ICourseOutline>(
  {
    courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    description: { type: String, required: true },
    modules: [moduleSchema],
  },
  schemaOption
);

export const CourseOutline = model("CourseOutline", courseOutlineSchema);
