import { Types } from "mongoose";
import { StudentProgressService } from "../student-progress/service";
import { IEnrollment } from "./interface";
import { Enrollment } from "./model";
import { StudentService } from "../student/service";
import { TrackOrderId } from "../../utils/trackOrderId";
import { InvoiceService } from "../pdf-creator/invoice.service";

class Service {
  async createEnrollment(data: IEnrollment): Promise<void> {
    const lastEnrollment = await Enrollment.findOne().sort({ _id: -1 });
    const newOrderId = await TrackOrderId.generateOrderId(
      lastEnrollment as IEnrollment,
      data.course.toString()
    );

    await Enrollment.create({
      ...data,
      orderId: newOrderId,
    });
  }

  async getEnrollmentById(id: Types.ObjectId): Promise<IEnrollment | null> {
    return await Enrollment.findById(id)
      .populate("user", "-password")
      .populate("course");
  }

  async getLastEnrollmentByCourseId(
    courseId: Types.ObjectId
  ): Promise<IEnrollment | null> {
    const lastEnrolledCourse = await Enrollment.findOne({
      course: courseId,
    }).sort({ _id: -1 });

    return lastEnrolledCourse;
  }

  async updateEnrollment(
    id: string,
    data: Partial<IEnrollment>
  ): Promise<void> {
    await Enrollment.findByIdAndUpdate(id, data);
  }

  async getSuccessEnrollmentForStudent(
    userId: Types.ObjectId
  ): Promise<IEnrollment[]> {
    const data = await Enrollment.find({ user: userId, status: "success" })
      .populate("user", "-password")
      .populate("course");
    return data;
  }

  async getOrderEnrollmentHistoryForStudent(
    userId: Types.ObjectId
  ): Promise<IEnrollment[]> {
    const data = await Enrollment.find({ user: userId })
      .populate("user", "-password")
      .populate("course");
    return data;
  }

  async updateStatusAsSuccessByWebhook(sessionId: string): Promise<void> {
    const enrollment: any = await Enrollment.findOne({
      paymentSessionId: sessionId,
    })
      .populate("user", "-password")
      .populate("course");
    if (enrollment) {
      // generate PDF invoice here
      const invoiceUrl = await InvoiceService.createInvoice({
        courseInfo: {
          name: enrollment.course.title as string,
          price: enrollment.course.price.salePrice as number,
          discount: enrollment.course.price.discount as number,
        },
        customerInfo: {
          name: enrollment.user.name as string,
          email: enrollment.user.email as string,
          studentId: await StudentService.getStudentIdByUserId(
            enrollment.user._id as Types.ObjectId
          ),
        },
        orderInfo: {
          orderId: enrollment.orderId as string,
        },
      });

      await Enrollment.updateOne(
        { paymentSessionId: sessionId },
        { $set: { status: "success", invoice: invoiceUrl } }
      );

      await StudentProgressService.createOrUpdateStudentProgress({
        userId: enrollment?.user?._id,
        courseId: enrollment?.course?._id,
      });
      await StudentService.addNewCourse(
        enrollment?.user?._id,
        enrollment?.course?._id
      );
    }
  }

  async deleteEnrollment(id: string): Promise<void> {
    await Enrollment.findByIdAndDelete(id);
  }

  async getAllOrderHistory(): Promise<IEnrollment[]> {
    const enrollments = await Enrollment.find({})
      .populate("user", "-password")
      .populate("course");
    return enrollments;
  }

  async getAllSuccessEnrollments(): Promise<IEnrollment[]> {
    const enrollments = await Enrollment.find({ status: "success" })
      .populate("user", "-password")
      .populate("course");
    return enrollments;
  }

  async searchEnrollments(
    searchQuery: string,
    page: number = 1,
    limit: number = 10
  ): Promise<IEnrollment[]> {
    const skip = (page - 1) * limit;

    const filter = {
      $or: [
        { "user.name": { $regex: searchQuery, $options: "i" } },
        { courseName: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const enrollments = await Enrollment.find(filter)
      .populate("user", "-password")
      .populate("course")
      .skip(skip)
      .limit(limit);

    return enrollments;
  }
}

export const EnrollmentService = new Service();
