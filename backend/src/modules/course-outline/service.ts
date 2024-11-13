import { Types } from "mongoose";
import ApiError from "../../shared/apiError";
import {
  ICourseOutline,
  IModuleOutline,
  IModuleSerialUpdate,
} from "./interface";
import { CourseOutline } from "./model";

class Service {
  async createOutline(data: ICourseOutline): Promise<void> {
    await CourseOutline.create(data);
  }
  async getOutlines(): Promise<ICourseOutline[]> {
    return await CourseOutline.find({});
  }
  async getOutline(id: string): Promise<ICourseOutline | null> {
    const data = await CourseOutline.findById(id).populate([
      {
        path: "course",
        model: "Course",
        select: { title: 1, image: 1 },
      },
    ]);
    if (!data) {
      throw new ApiError(404, "Course outline was not found!");
    }
    return data;
  }
  async getOutlineByCourse(courseId: string): Promise<ICourseOutline | null> {
    const data = await CourseOutline.findOne({ course: courseId }).populate([
      {
        path: "course",
        model: "Course",
        select: { title: 1, image: 1 },
      },
    ]);
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
  async updateModuleSerialNumberFromDragDrop(
    courseId: Types.ObjectId,
    data: IModuleSerialUpdate
  ) {
    const outline = await CourseOutline.findOne({ course: courseId });
    if (!outline) {
      throw new Error("Course outline not found");
    }

    const modules = outline.modules as IModuleOutline[];

    const updatedModules = modules.map((module) => {
      if (module?.id === data?.sourceObject?.moduleId) {
        return {
          id: module?.id,
          name: module?.name,
          serial: data.destinationObject.serialNumber,
        };
      }
      if (module?.id === data?.destinationObject?.moduleId) {
        return {
          id: module?.id,
          name: module?.name,
          serial: data.sourceObject.serialNumber,
        };
      }
      return module;
    });
    outline.modules = updatedModules;

    await outline.save();
  }
}

export const CourseOutlineService = new Service();
