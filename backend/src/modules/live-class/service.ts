import { Types } from "mongoose";
import ILiveClass from "./interface";
import LiveClass from "./model";

class Service {
  async createLiveClass(data: ILiveClass): Promise<void> {
    await LiveClass.create(data);
  }
  async getAllLiveClasses(filters: {
    title?: string;
    instructor?: Types.ObjectId;
    course?: Types.ObjectId;
    creator?: Types.ObjectId;
    status?: "upcoming" | "ongoing" | "completed" | "cancelled";
    startDate?: string;
    endDate?: string;
    keywords?: string;
  }): Promise<ILiveClass[]> {
    const query: any = {};

    if (filters.title) {
      query.title = { $regex: filters.title, $options: "i" };
    }

    if (filters.instructor) {
      query.instructor = filters.instructor;
    }
    if (filters.instructor) {
      query.creator = filters.creator;
    }

    if (filters.course) {
      query.course = filters.course;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.startDate || filters.endDate) {
      query.scheduledDate = {};
      if (filters.startDate) {
        query.scheduledDate.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        query.scheduledDate.$lte = new Date(filters.endDate);
      }
    }

    if (filters.keywords) {
      query.$or = [
        { title: { $regex: filters.keywords, $options: "i" } },
        { description: { $regex: filters.keywords, $options: "i" } },
      ];
    }

    const classes = await LiveClass.find(query)
      .populate("instructor", "name email image")
      .populate("creator", "name email image")
      .populate("course", "title image category");
    return classes;
  }
  async getSingleClass(id: Types.ObjectId): Promise<ILiveClass | null> {
    const singleClass = await LiveClass.findById(id)
      .populate("instructor", "name email image")
      .populate("creator", "name email image")
      .populate("course", "title image category");
    return singleClass;
  }
  async getLiveClassesByInstructor(
    instructorId: Types.ObjectId
  ): Promise<ILiveClass[]> {
    const classes = await LiveClass.find({ instructor: instructorId });
    return classes;
  }
  async updateClass(
    id: Types.ObjectId,
    updatedData: Partial<ILiveClass>
  ): Promise<void> {
    await LiveClass.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async deleteClass(id: Types.ObjectId): Promise<void> {
    await LiveClass.findByIdAndDelete(id);
  }
}

export const LiveClassService = new Service();