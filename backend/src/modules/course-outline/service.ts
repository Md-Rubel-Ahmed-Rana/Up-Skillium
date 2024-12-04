import { Types } from "mongoose";
import ApiError from "../../shared/apiError";
import {
  ICourseOutline,
  IModuleOutline,
  IModuleSerialUpdate,
} from "./interface";
import { CourseOutline } from "./model";

class Service {
  async createOutline(data: ICourseOutline | ICourseOutline[]): Promise<void> {
    await CourseOutline.create(data);
  }

  async getOutlines(): Promise<ICourseOutline[]> {
    const outlines = await CourseOutline.find({}).populate([
      {
        path: "course",
        model: "Course",
        select: { title: 1, image: 1 },
      },
    ]);

    return outlines.map((outline) => {
      outline.modules = outline.modules.sort((a, b) => a.serial - b.serial);
      return outline;
    });
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
    data.modules = data.modules.sort((a, b) => a.serial - b.serial);
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

    data.modules = data.modules.sort((a, b) => a.serial - b.serial);

    return data;
  }

  async updateOutlineModules(
    id: string,
    modules: IModuleOutline[]
  ): Promise<void> {
    await CourseOutline.findByIdAndUpdate(id, { $set: { modules: modules } });
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

  async deleteModule(courseId: Types.ObjectId, moduleId: Types.ObjectId) {
    await CourseOutline.updateOne(
      { course: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
  }

  async updateModuleName(
    courseId: Types.ObjectId,
    moduleId: Types.ObjectId,
    updatedName: string
  ) {
    const outline = await CourseOutline.findOne({
      course: courseId,
    });

    if (!outline) {
      throw new Error("Course outline or module not found");
    }

    const module = outline?.modules.find((mod) => mod?.id === moduleId);
    if (!module) {
      throw new Error("Module not found");
    }

    module.name = updatedName;

    await outline.save();
  }
}

export const CourseOutlineService = new Service();
