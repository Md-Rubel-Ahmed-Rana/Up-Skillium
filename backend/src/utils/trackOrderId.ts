import { Types } from "mongoose";
import { IEnrollment } from "../modules/enrollment/interface";
import { EnrollmentService } from "../modules/enrollment/service";

class OrderId {
  // US for platform name Up Skillium, OR for Order,
  // 000000 for global order count, 0000 for per-course order count
  static defaultOrderId = "US-OR-000000-0000";

  public async generateOrderId(
    lastOrder: IEnrollment,
    newCourseId: string
  ): Promise<string> {
    const lastOrderId = lastOrder ? lastOrder?.orderId : OrderId.defaultOrderId;
    const parts = lastOrderId
      ? lastOrderId.split("-")
      : OrderId.defaultOrderId.split("-");
    const globalOrderId = parts[2];

    const newGlobalOrderId = (parseInt(globalOrderId, 10) + 1)
      .toString()
      .padStart(6, "0");
    const newCourseOrderId = await this.generateCourseOrderId(
      lastOrder,
      newCourseId
    );

    const incrementedId = `US-OR-${newGlobalOrderId}-${newCourseOrderId}`;
    return incrementedId;
  }

  private async generateCourseOrderId(
    lastOrder: IEnrollment,
    newCourseId: string
  ): Promise<string> {
    const isSameCourse = lastOrder?.course.toString() === newCourseId;
    if (isSameCourse) {
      return await this.generateNewCourseOrderId(lastOrder);
    } else {
      const lastEnrolledCourse =
        await EnrollmentService.getLastEnrollmentByCourseId(
          newCourseId as unknown as Types.ObjectId
        );
      const lastOrderId = lastEnrolledCourse?.orderId;
      if (!lastOrderId) {
        return "0001";
      } else {
        return await this.generateNewCourseOrderId(lastEnrolledCourse);
      }
    }
  }

  private async generateNewCourseOrderId(
    lastOrder: IEnrollment
  ): Promise<string> {
    const lastOrderId = lastOrder?.orderId as string;
    const parts = lastOrderId.split("-");
    const courseOrderId = parts[3];
    return (parseInt(courseOrderId, 10) + 1).toString().padStart(4, "0");
  }
}

export const TrackOrderId = new OrderId();
