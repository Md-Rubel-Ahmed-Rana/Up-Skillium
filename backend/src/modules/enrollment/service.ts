import { StudentService } from "../student/service";
import { IEnrollment } from "./interface";
import { Enrollment } from "./model";

class Service {
  async createEnrollment(data: IEnrollment): Promise<void> {
    await Enrollment.create(data);
    await StudentService.addNewCourse(data.studentObjectId, data.courseId);
  }

  async getEnrollmentById(id: string): Promise<IEnrollment | null> {
    return await Enrollment.findById(id)
      .populate("userId", "name email")
      .populate("courseId", "title description")
      .exec();
  }

  async updateEnrollment(
    id: string,
    data: Partial<IEnrollment>
  ): Promise<void> {
    await Enrollment.findByIdAndUpdate(id, data);
  }

  async deleteEnrollment(id: string): Promise<void> {
    await Enrollment.findByIdAndDelete(id);
  }

  async getEnrollments(
    filter: Partial<IEnrollment>,
    page: number = 1,
    limit: number = 10,
    sort: Record<string, 1 | -1> = { enrollmentDate: -1 }
  ): Promise<{
    enrollments: IEnrollment[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const enrollments = await Enrollment.find(filter)
      .populate("userId", "name email")
      .populate("courseId", "title description")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Enrollment.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return {
      enrollments,
      total,
      page,
      totalPages,
    };
  }

  async searchEnrollments(
    searchQuery: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    enrollments: IEnrollment[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const filter = {
      $or: [
        { "userId.name": { $regex: searchQuery, $options: "i" } },
        { "courseId.title": { $regex: searchQuery, $options: "i" } },
      ],
    };

    const enrollments = await Enrollment.find(filter)
      .populate("userId", "name email")
      .populate("courseId", "title description")
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Enrollment.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return {
      enrollments,
      total,
      page,
      totalPages,
    };
  }
}

export const EnrollmentService = new Service();
