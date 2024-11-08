import { Types } from "mongoose";
import { StudentProgressService } from "../student-progress/service";
import { IAssignmentSubmission } from "./interface";
import { AssignmentSubmission } from "./model";

class Service {
  async submit(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    moduleId: Types.ObjectId,
    lessonId: Types.ObjectId,
    data: IAssignmentSubmission
  ): Promise<IAssignmentSubmission> {
    const result = await AssignmentSubmission.create(data);
    await StudentProgressService.assignmentLessonMarkAsSubmitted(
      userId,
      courseId,
      moduleId,
      lessonId
    );
    return result;
  }
}

export const AssignmentSubmissionService = new Service();
