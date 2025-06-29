import { Types } from "mongoose";
import { EnrollmentAnalyticsParams, IEnrollment } from "./interface";
import { Enrollment } from "./model";
import { TrackOrderId } from "../../utils/trackOrderId";
import { InvoiceService } from "../pdf-creator/invoice.service";
import { MailService } from "../mail/mail.service";
import { MyCourseService } from "../my-courses/service";
import ApiError from "../../shared/apiError";
import { CourseService } from "../course/service";

class Service {
  async createEnrollment(data: IEnrollment): Promise<void> {
    await this.isExist(data.user, data.course);
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
  async createManyEnrollment(enrollments: IEnrollment[]) {
    const lastEnrollment = await Enrollment.findOne().sort({ _id: -1 });
    for (const enrollment of enrollments) {
      const newOrderId = await TrackOrderId.generateOrderId(
        lastEnrollment as IEnrollment,
        enrollment.course.toString()
      );
      await Enrollment.create({
        ...enrollment,
        orderId: newOrderId,
      });
    }
  }
  async isExist(
    userId: Types.ObjectId,
    courseId: Types.ObjectId
  ): Promise<void> {
    const isExist = await Enrollment.findOne({
      user: userId,
      course: courseId,
      status: "success",
    });

    if (isExist) {
      throw new ApiError(400, "You already have enrolled to this course!");
    }
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
          studentId: enrollment?.user?.userRoleId,
        },
        orderInfo: {
          orderId: enrollment.orderId as string,
        },
      });

      await Enrollment.updateOne(
        { paymentSessionId: sessionId },
        { $set: { status: "success", invoice: invoiceUrl } }
      );

      await MyCourseService.addNewCourse({
        course: enrollment.course.id,
        user: enrollment.user._id,
      });

      await CourseService.addStudentToCourse(
        enrollment?.course?.id,
        enrollment?.user?._id
      );

      await MailService.enrollmentConfirmationMail(
        enrollment.user.email,
        enrollment.user.name,
        enrollment.course.title,
        invoiceUrl
      );
    }
  }

  async updateCartEnrollmentsWebhook(sessionId: string): Promise<void> {
    const enrollments: any = await Enrollment.find({
      paymentSessionId: sessionId,
    })
      .populate("user", "-password")
      .populate("course");

    console.log({ from: "updateCartEnrollmentsWebhook", enrollments });

    for (const enrollment of enrollments) {
      if (enrollment) {
        try {
          const invoiceUrl = await InvoiceService.createInvoice({
            courseInfo: {
              name: enrollment.course.title as string,
              price: enrollment.course.price.salePrice as number,
              discount: enrollment.course.price.discount as number,
            },
            customerInfo: {
              name: enrollment.user.name as string,
              email: enrollment.user.email as string,
              studentId: enrollment?.user?.userRoleId,
            },
            orderInfo: {
              orderId: enrollment.orderId as string,
            },
          });

          await Enrollment.findByIdAndUpdate(enrollment._id, {
            $set: {
              status: "success",
              invoice: invoiceUrl,
            },
          });

          await CourseService.addStudentToCourse(
            enrollment?.course?.id,
            enrollment?.user?._id
          );

          await MailService.enrollmentConfirmationMail(
            enrollment.user.email,
            enrollment.user.name,
            enrollment.course.title,
            invoiceUrl
          );
        } catch (error) {
          console.error(`Error processing enrollment ${enrollment._id}`, error);
        }
      }
    }

    // add
    const payload: { user: string; course: string }[] = enrollments.map(
      (enrollment: any) => ({
        user: enrollment.user?.id || enrollment.user?._id,
        course: enrollment.course?.id || enrollment.course?._id,
      })
    );
    await MyCourseService.addMultipleCourses(payload);
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

  async getEnrollmentAnalyticsSummary(params: EnrollmentAnalyticsParams) {
    const { startDate, endDate } = params;

    const match: any = {};
    if (startDate || endDate) {
      match.createdAt = {};
      if (startDate) match.createdAt.$gte = new Date(startDate);
      if (endDate) match.createdAt.$lte = new Date(endDate);
    }

    const summary = await Enrollment.aggregate([
      { $match: match },

      {
        $facet: {
          totalEnrollments: [{ $count: "count" }],

          successCount: [
            { $match: { status: "success" } },
            { $count: "count" },
          ],

          failedCount: [{ $match: { status: "failed" } }, { $count: "count" }],

          totalRevenue: [
            { $match: { status: "success" } },
            {
              $group: {
                _id: null,
                total: { $sum: "$price" },
              },
            },
          ],

          enrollmentsByDate: [
            { $match: { status: "success" } },
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                count: { $sum: 1 },
                revenue: { $sum: "$price" },
              },
            },
            { $project: { _id: 0, date: "$_id", count: 1, revenue: 1 } },
            { $sort: { date: 1 } },
          ],
        },
      },
    ]);

    const result = summary[0];
    return {
      totalEnrollments: result.totalEnrollments[0]?.count || 0,
      successCount: result.successCount[0]?.count || 0,
      failedCount: result.failedCount[0]?.count || 0,
      totalRevenue: result.totalRevenue[0]?.total || 0,
      enrollmentsByDate: result.enrollmentsByDate || [],
    };
  }
}

export const EnrollmentService = new Service();
