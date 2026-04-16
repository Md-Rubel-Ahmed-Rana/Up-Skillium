import { Types } from "mongoose";
import { LessonService } from "../lesson/service";
import { ILesson } from "../lesson/interface";

class Service {
  async getAllAssignments(): Promise<ILesson[]> {
    const assignments = await LessonService.getAllAssignmentLessons();
    return assignments;
  }
  async getSingleAssignment(id: Types.ObjectId): Promise<ILesson | null> {
    return await LessonService.getLessonById(id);
  }
  async updateAssignment(
    id: Types.ObjectId,
    data: Partial<ILesson>,
  ): Promise<void> {
    await LessonService.updateLesson(id, data);
  }
  async deleteAssignment(id: Types.ObjectId): Promise<void> {
    await LessonService.deleteLesson(id);
  }
}

export const AssignmentService = new Service();
