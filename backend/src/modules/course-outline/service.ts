import ApiError from "../../shared/apiError";
import { ICourseOutline } from "./interface";
import { CourseOutline } from "./model";

class Service {
  async createOutline(data: ICourseOutline): Promise<void> {
    await CourseOutline.create(data);
  }
  async getOutlines(): Promise<ICourseOutline[]> {
    return await CourseOutline.find({});
  }
  async getOutline(id: string): Promise<ICourseOutline | null> {
    const data = await CourseOutline.findById(id);
    if (!data) {
      throw new ApiError(404, "Course outline was not found!");
    }
    return data;
  }
  async getOutlineByCourse(courseId: string): Promise<ICourseOutline | null> {
    const data = await CourseOutline.findOne({ courseId: courseId });
    if (!data) {
      throw new ApiError(404, "Course outline was not found!");
    }
    return data;
  }
  async updateOutline(
    id: string,
    updatedData: Partial<ICourseOutline>
  ): Promise<void> {
    await CourseOutline.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async deleteOutline(id: string): Promise<void> {
    await CourseOutline.findByIdAndDelete(id);
  }
}

export const CourseOutlineService = new Service();
