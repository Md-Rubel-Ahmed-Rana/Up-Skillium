import { ILesson } from "./interface";
import { Lesson } from "./model";
import { Types } from "mongoose";

class Service {
  async createLesson(data: ILesson | ILesson[]): Promise<void> {
    await Lesson.create(data);
  }

  async getAllLessons(
    search: string = "",
    type?: "video" | "instruction" | "quiz" | "assignment",
    page: number = 1,
    limit: number = 10
  ): Promise<ILesson[]> {
    const searchQuery: any = {
      ...(search && { title: { $regex: search, $options: "i" } }),
      ...(type && { type }),
    };

    const skip = (page - 1) * limit;

    return await Lesson.find(searchQuery).skip(skip).limit(limit).exec();
  }

  async getLessonById(id: string): Promise<ILesson | null> {
    return await Lesson.findById(id).exec();
  }

  async updateLesson(id: string, data: Partial<ILesson>): Promise<void> {
    await Lesson.findByIdAndUpdate(id, { ...data }).exec();
  }

  async deleteLesson(id: string): Promise<void> {
    await Lesson.findByIdAndDelete(id).exec();
  }

  async getLessonsByModule(
    moduleId: Types.ObjectId,
    page: number = 1,
    limit: number = 10
  ): Promise<ILesson[]> {
    const skip = (page - 1) * limit;
    return await Lesson.find({ moduleId }).skip(skip).limit(limit).exec();
  }
}

export const LessonService = new Service();
