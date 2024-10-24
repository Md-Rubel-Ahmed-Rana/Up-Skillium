import { ICourse } from "./interface";
import { Course } from "./model";

class Service {
  async createCourse(data: ICourse) {
    await Course.create(data);
  }
}

export const CourseService = new Service();
