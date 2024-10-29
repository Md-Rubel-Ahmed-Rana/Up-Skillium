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
}

export const InstructorService = new Service();
