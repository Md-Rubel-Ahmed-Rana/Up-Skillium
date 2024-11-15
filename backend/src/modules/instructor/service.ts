import { Instructor } from "./model";
import generateTeacherId from "./generateTeacherId";
import { Types } from "mongoose";

class Service {
  async createNewInstructor(userId: Types.ObjectId): Promise<void> {
    const lastTeacherId = await Instructor.findOne({}).sort({ createdAt: -1 });
    const teacherId = lastTeacherId
      ? generateTeacherId(lastTeacherId.teacherId)
      : generateTeacherId("US-TE-0000");

    await Instructor.create({ userId: userId, teacherId });
  }
  async getAllInstructors() {
    const instructors = await Instructor.find({}).populate([
      {
        path: "user",
        model: "User",
        select: { name: 1, email: 1 },
      },
      {
        path: "courses",
        model: "Course",
        select: { title: 1, image: 1, category: 1 },
      },
    ]);
    return instructors;
  }
  async assignCourseToInstructor(
    userId: Types.ObjectId,
    courseId: Types.ObjectId
  ) {
    await Instructor.findOneAndUpdate(
      { user: userId },
      {
        $push: { courses: courseId },
      }
    );
  }
  async resignInstructorFromCourse(
    userId: Types.ObjectId,
    courseId: Types.ObjectId
  ) {
    await Instructor.findOneAndUpdate(
      { user: userId },
      {
        $pull: { courses: courseId },
      }
    );
  }
}

export const InstructorService = new Service();
