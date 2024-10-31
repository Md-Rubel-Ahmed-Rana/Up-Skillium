import { ICourse } from "./interface";
import { Course } from "./model";

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
          select: { name: 1, image: 1 },
        },
      ])
      .skip(skip)
      .limit(limit)
      .exec();

    return courses;
  }
  async getSingleCourse(id: string): Promise<ICourse | null> {
    return await Course.findById(id).populate([
      {
        path: "instructor",
        model: "User",
        select: { name: 1, image: 1 },
      },
      {
        path: "students",
        model: "User",
        select: { name: 1, image: 1 },
      },
      {
        path: "reviews",
        model: "User",
        select: { name: 1, image: 1 },
      },
    ]);
  }
  async updateCourse(id: string, updatedData: Partial<ICourse>): Promise<void> {
    await Course.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async deleteCourse(id: string): Promise<void> {
    await Course.findByIdAndDelete(id);
  }
}

export const CourseService = new Service();
