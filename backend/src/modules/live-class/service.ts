import { Types } from "mongoose";
import ILiveClass from "./interface";
import LiveClass from "./model";
import { GoogleService } from "../google/service";
import { ICreateMeetLink } from "../google/interface";
import { UserService } from "../user/service";

class Service {
  async createLiveClass(data: ILiveClass): Promise<void> {
    if (data?.meetingLink && data?.meetingLink !== "") {
      await LiveClass.create(data);
    } else {
      const attendees = await UserService.getUsersEmailByIds(data?.students);
      const meetData: ICreateMeetLink = {
        summary: data?.title,
        description: data?.description as string,
        startDateTime: data?.startDateTime,
        endDateTime: data?.endDateTime,
        attendees: attendees,
      };
      const meetLink = await GoogleService.createMeetLink(meetData);
      await LiveClass.create({ ...data, meetingLink: meetLink });
    }
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
      .sort({ createdAt: -1 })
      .populate("instructor", "name email image")
      .populate("creator", "name email image")
      .populate("course", "title image category")
      .populate("students", "name email image");
    return classes;
  }

  async getSingleClass(id: Types.ObjectId): Promise<ILiveClass | null> {
    const singleClass = await LiveClass.findById(id)
      .populate("instructor", "name email image")
      .populate("creator", "name email image")
      .populate("course", "title image category")
      .populate("students", "name email image");
    return singleClass;
  }

  async getUpcomingLiveClassesByInstructor(
    instructorId: Types.ObjectId
  ): Promise<ILiveClass[]> {
    const classes = await LiveClass.find({
      instructor: instructorId,
      status: "upcoming",
    })
      .sort({ createdAt: -1 })
      .populate("instructor", "name email image")
      .populate("creator", "name email image")
      .populate("course", "title image category")
      .populate("students", "name email image");
    return classes;
  }

  async getCompletedLiveClassesByInstructor(
    instructorId: Types.ObjectId
  ): Promise<ILiveClass[]> {
    const classes = await LiveClass.find({
      instructor: instructorId,
      status: "completed",
    })
      .sort({ createdAt: -1 })
      .populate("instructor", "name email image")
      .populate("creator", "name email image")
      .populate("course", "title image category")
      .populate("students", "name email image");
    return classes;
  }

  async getLiveClassesByStudent(
    studentId: Types.ObjectId
  ): Promise<ILiveClass[]> {
    return await LiveClass.find({ students: studentId })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "course",
          model: "Course",
          select: "name description instructor",
        },
        {
          path: "instructor",
          model: "User",
          select: "name email",
        },
      ]);
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

  async updateStudentsAttendees(
    liveClassId: Types.ObjectId,
    studentsIds: Types.ObjectId[]
  ): Promise<void> {
    await LiveClass.findByIdAndUpdate(liveClassId, {
      $set: { students: studentsIds },
    });
  }
}

export const LiveClassService = new Service();
