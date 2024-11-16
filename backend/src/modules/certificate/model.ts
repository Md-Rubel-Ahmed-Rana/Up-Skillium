import { model, Schema } from "mongoose";
import schemaOption from "../../utils/schemaOption";
import { ICertificateSchema } from "./interface";

const certificateSchema = new Schema<ICertificateSchema>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    course: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    certificateUrl: {
      type: String,
      required: true,
    },
  },
  schemaOption
);

export const Certificate = model("Certificate", certificateSchema);
