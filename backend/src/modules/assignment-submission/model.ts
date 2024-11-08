import { model, Schema, Types } from "mongoose";
import { IAssignmentSubmission } from "./interface";
import schemaOption from "../../utils/schemaOption";

const submissionSchema = new Schema({
  content: { type: String, required: true },
  file: { type: String },
});

const assignmentSubmissionSchema = new Schema<IAssignmentSubmission>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    status: { type: String, enum: ["pending", "checked"], default: "pending" },
    fullMark: { type: Number },
    yourMark: { type: Number },
    submission: { type: submissionSchema, required: true },
    submittedAt: { type: Date, default: Date.now },
    checkedAt: { type: Date },
    feedback: { type: String },
    isLate: { type: Boolean, default: false },
    dueDate: { type: Date },
  },
  schemaOption
);

export const AssignmentSubmission = model<IAssignmentSubmission>(
  "AssignmentSubmission",
  assignmentSubmissionSchema
);
