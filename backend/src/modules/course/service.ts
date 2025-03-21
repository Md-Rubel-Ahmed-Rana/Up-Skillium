import { Types } from "mongoose";
import {
  ICourse,
  ICourseBasicInfo,
  ICourseTagsTechsUpdate,
  IPriceUpdate,
} from "./interface";
import { Course } from "./model";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";
import incrementAverageRating from "../../utils/incrementAverageRating";
import ApiError from "../../shared/apiError";
import { IUser } from "../user/interface";

class Service {
  async createCourse(data: ICourse): Promise<void> {
    await Course.create(data);
  }

  async getCourses(
    search: string = "",
    page: number = 1,
    limit: number = 5,
    filters: {
      category?: string;
      level?: string;
      minPrice?: number;
      maxPrice?: number;
      status?: string;
    } = {}
  ): Promise<ICourse[]> {
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    let filterQuery: any = {
      ...searchQuery,
      ...(filters.category && { category: filters.category }),
      ...(filters.level && { level: filters.level }),
      ...(filters.status && { status: filters.status }),
    };

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filterQuery["price.salePrice"] = {
        ...(filters.minPrice !== undefined && { $gte: filters.minPrice }),
        ...(filters.maxPrice !== undefined && { $lte: filters.maxPrice }),
      };
    }

    const skip = (page - 1) * limit;

    const courses = await Course.find(filterQuery)
      .populate([
        {
          path: "instructor",
          model: "User",
          select: { password: 0 },
        },
        {
          path: "students",
          model: "User",
          select: { password: 0 },
        },
      ])
      .skip(skip)
      .limit(limit);

    return courses;
  }

  async getOnlyPublishedCourses(
    search: string = "",
    page: number = 1,
    limit: number = 5,
    filters: {
      category?: string;
      level?: string;
      minPrice?: number;
      maxPrice?: number;
      status?: string;
    } = {}
  ): Promise<{ courses: ICourse[]; totalCourse: number }> {
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    let filterQuery: any = {
      status: "published",
      ...searchQuery,
      ...(filters.category && { category: filters.category }),
      ...(filters.level && { level: filters.level }),
    };

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filterQuery["price.salePrice"] = {
        ...(filters.minPrice !== undefined && { $gte: filters.minPrice }),
        ...(filters.maxPrice !== undefined && { $lte: filters.maxPrice }),
      };
    }

    const skip = (page - 1) * limit;

    const courses = await Course.find(filterQuery)
      .populate([
        {
          path: "instructor",
          model: "User",
          select: { password: 0 },
        },
        {
          path: "students",
          model: "User",
          select: { password: 0 },
        },
      ])
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments({ status: "published" });

    return { courses, totalCourse: total };
  }

  async getSingleCourse(id: Types.ObjectId): Promise<ICourse | null> {
    return await Course.findById(id).populate([
      {
        path: "instructor",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "students",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "reviews",
        model: "User",
        select: { password: 0 },
      },
    ]);
  }

  async getCoursesByInstructor(instructorId: Types.ObjectId) {
    const courses = await Course.find({ instructor: instructorId }).populate([
      {
        path: "instructor",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "students",
        model: "User",
        select: { password: 0 },
      },
    ]);
    return courses;
  }

  async getCourseIdsByInstructor(
    instructorId: Types.ObjectId
  ): Promise<Types.ObjectId[]> {
    const courses = await Course.find({ instructor: instructorId });
    return courses.map((course) => course?.id);
  }

  async getMyStudentsByInstructor(instructorId: Types.ObjectId): Promise<any> {
    const courses = await Course.find({ instructor: instructorId }).populate(
      "students",
      "name email image"
    );

    const studentMap = new Map();

    courses.forEach((course) => {
      course?.students?.forEach((student) => {
        const studentId = student?._id.toString();

        if (studentMap.has(studentId)) {
          studentMap.get(studentId).courses.push({
            id: course?.id,
            title: course?.title,
            image: course?.image,
          });
        } else {
          studentMap.set(studentId, {
            student: student,
            courses: [
              {
                id: course?.id,
                title: course?.title,
                image: course?.image,
              },
            ],
          });
        }
      });
    });

    const organizedData = Array.from(studentMap.values());

    return organizedData;
  }

  async updateCourse(
    id: Types.ObjectId,
    updatedData: Partial<ICourse>
  ): Promise<void> {
    await Course.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }

  async deleteCourse(id: Types.ObjectId): Promise<void> {
    await Course.findByIdAndDelete(id);
  }

  async updateCourseBasicInfo(
    courseId: Types.ObjectId,
    data: ICourseBasicInfo
  ) {
    await Course.findByIdAndUpdate(courseId, {
      $set: {
        title: data?.title,
        category: data?.category,
        description: data?.description,
        duration: data?.duration,
        level: data?.level,
        status: data?.status,
      },
    });
  }

  async updateCoursePrice(courseId: Types.ObjectId, data: IPriceUpdate) {
    await Course.findByIdAndUpdate(courseId, {
      $set: { price: { ...data } },
    });
  }

  async updateCourseTagsTechnologies(
    courseId: Types.ObjectId,
    data: ICourseTagsTechsUpdate
  ) {
    await Course.findByIdAndUpdate(courseId, {
      $set: { tags: data?.tags, technologies: data?.technologies },
    });
  }

  async updateCourseInstructor(
    courseId: Types.ObjectId,
    instructorId: Types.ObjectId
  ) {
    await Course.findByIdAndUpdate(courseId, {
      $set: { instructor: instructorId },
    });
  }

  async updateCourseImage(id: Types.ObjectId, imageUrl: string) {
    const course = await Course.findById(id);
    if (course && course?.image) {
      await FileUploadMiddleware.deleteSingle(course?.image);
    }
    await Course.findByIdAndUpdate(id, { $set: { image: imageUrl } });
  }

  async updateCourseIntroductoryVideo(id: Types.ObjectId, videoUrl: string) {
    const course = await Course.findById(id);
    if (course && course?.introductoryVideo) {
      await FileUploadMiddleware.deleteSingle(course?.introductoryVideo);
    }
    await Course.findByIdAndUpdate(id, {
      $set: { introductoryVideo: videoUrl },
    });
  }

  async incrementRatings(id: Types.ObjectId, newRating: number): Promise<void> {
    const course = await Course.findById(id);

    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    await Course.findByIdAndUpdate(id, {
      $set: {
        "ratings.averageRating": incrementAverageRating(
          course?.ratings?.totalReviews as number,
          course?.ratings?.averageRating as number,
          newRating
        ),
      },
      $inc: {
        "ratings.totalReviews": 1,
      },
    });
  }

  async getMatchedRelatedCourses(relatableText: string): Promise<ICourse[]> {
    let courses = await Course.find({
      $text: { $search: relatableText, $caseSensitive: false },
      status: "published",
    })
      .populate([
        {
          path: "instructor",
          model: "User",
          select: { password: 0 },
        },
        {
          path: "students",
          model: "User",
          select: { password: 0 },
        },
      ])
      .limit(5);

    if (courses?.length === 0) {
      courses = await Course.find({ status: "published" })
        .populate([
          {
            path: "instructor",
            model: "User",
            select: { password: 0 },
          },
        ])
        .sort({ createdAt: -1 })
        .limit(5);
    }

    return courses;
  }

  async getCoursesByCategory(
    category: string
  ): Promise<{ courses: ICourse[]; otherCourses: ICourse[] }> {
    const courses = await Course.find({
      category: category,
      status: "published",
    }).populate([
      {
        path: "instructor",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "students",
        model: "User",
        select: { password: 0 },
      },
    ]);

    const otherCourses = await Course.find({
      category: { $ne: category },
      status: "published",
    })
      .populate([
        {
          path: "instructor",
          model: "User",
          select: { password: 0 },
        },
        {
          path: "students",
          model: "User",
          select: { password: 0 },
        },
      ])
      .sort({ createdAt: -1 })
      .limit(6);

    return { courses, otherCourses };
  }

  async addStudentToCourse(
    courseId: Types.ObjectId,
    studentId: Types.ObjectId
  ) {
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { students: studentId },
    });
  }

  async getStudentsFromCourse(courseId: Types.ObjectId): Promise<IUser[]> {
    const course = await Course.findById(courseId).populate([
      {
        path: "instructor",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "students",
        model: "User",
        select: { password: 0 },
      },
    ]);
    const students = course?.students as unknown as IUser[];
    return students;
  }
}

export const CourseService = new Service();
