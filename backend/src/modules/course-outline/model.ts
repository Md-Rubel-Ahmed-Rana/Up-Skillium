import { model, Schema } from "mongoose";
import { ICourseOutline, IModuleOutline } from "./interface";

const moduleSchema = new Schema<IModuleOutline>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

const courseOutlineSchema = new Schema<ICourseOutline>(
  {
    courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    description: { type: String, required: true },
    modules: [moduleSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const CourseOutline = model("CourseOutline", courseOutlineSchema);
