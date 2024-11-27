import { Instructor } from "./model";
import generateTeacherId from "./generateTeacherId";
import { Types } from "mongoose";
import { CourseService } from "../course/service";
import { IUser } from "../user/interface";
import incrementAverageRating from "../../utils/incrementAverageRating";
import ApiError from "../../shared/apiError";

class Service {
  async createNewInstructor(userId: Types.ObjectId): Promise<void> {
    const lastTeacherId = await Instructor.findOne({}).sort({ createdAt: -1 });
    const teacherId = lastTeacherId
      ? generateTeacherId(lastTeacherId.teacherId)
      : generateTeacherId("US-TE-0000");

    await Instructor.create({ user: userId, teacherId });
  }
  async getAllInstructors() {
    const instructors = await Instructor.find({}).populate([
      {
        path: "user",
        model: "User",
        select: { name: 1, email: 1, image: 1 },
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
  async getMyStudents(instructorId: Types.ObjectId): Promise<IUser[]> {
    const students = await CourseService.getMyStudentsByInstructor(
      instructorId
    );
    return students;
  }
  async incrementRatings(
    userId: Types.ObjectId,
    newRating: number
  ): Promise<void> {
    const instructor = await Instructor.findOne({ user: userId });

    if (!instructor) {
      throw new ApiError(404, "Instructor not found");
    }

    await Instructor.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          "ratings.averageRating": incrementAverageRating(
            instructor?.ratings?.totalReviews,
            instructor?.ratings?.averageRating,
            newRating
          ),
        },
        $inc: {
          "ratings.totalReviews": 1,
        },
      }
    );
  }
}

export const InstructorService = new Service();
