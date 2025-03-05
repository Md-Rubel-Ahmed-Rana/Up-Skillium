import { Types } from "mongoose";
import { PdfCreatorService } from "../pdf-creator/certificate.service";
import { ICertificate } from "./interface";
import { Certificate } from "./model";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";
import { IPdfCertificate } from "../pdf-creator/interface";
import { CourseService } from "../course/service";

class Service {
  async createCertificate(data: ICertificate) {
    const certificatePdfData: IPdfCertificate = {
      courseName: data?.courseName,
      studentName: data?.studentName,
      score: data?.score,
      technologies: data?.technologies,
    };
    const certificateUrl = await PdfCreatorService.createCertificate(
      certificatePdfData
    );
    await Certificate.create({ ...data, certificateUrl: certificateUrl });
  }
  async getAllCertificate(): Promise<any> {
    const data = await Certificate.find({}).populate([
      {
        path: "user",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "course",
        model: "Course",
      },
    ]);
    return data;
  }
  async getSingleCertificate(id: Types.ObjectId): Promise<any> {
    return await Certificate.findById(id).populate([
      {
        path: "user",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "course",
        model: "Course",
      },
    ]);
  }
  async getCertificatesByUserId(userId: Types.ObjectId) {
    return await Certificate.find({ user: userId }).populate([
      {
        path: "user",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "course",
        model: "Course",
      },
    ]);
  }
  async getCertificatesByInstructor(
    instructorId: Types.ObjectId
  ): Promise<ICertificate[]> {
    const courseIds = await CourseService.getCourseIdsByInstructor(
      instructorId
    );
    const certificates = await Certificate.find({
      course: { $in: courseIds },
    }).populate([
      {
        path: "user",
        model: "User",
        select: { password: 0 },
      },
      {
        path: "course",
        model: "Course",
      },
    ]);
    return certificates;
  }

  async updateCertificate(
    id: Types.ObjectId,
    updateData: IPdfCertificate
  ): Promise<void> {
    const certificate = await Certificate.findById(id);
    if (certificate && certificate?.certificateUrl) {
      await FileUploadMiddleware.deleteSingle(certificate?.certificateUrl);
    }
    const certificateUrl = await PdfCreatorService.createCertificate(
      updateData
    );
    await Certificate.findByIdAndUpdate(id, {
      certificateUrl: certificateUrl,
    });
  }
  async deleteCertificate(id: Types.ObjectId): Promise<void> {
    const certificate = await Certificate.findById(id);
    if (certificate && certificate?.certificateUrl) {
      await FileUploadMiddleware.deleteSingle(certificate?.certificateUrl);
    }
    await Certificate.findByIdAndDelete(id);
  }
}

export const CertificateService = new Service();
