import { Types } from "mongoose";
import { PdfCreatorService } from "../pdf-creator/service";
import { ICertificate } from "./interface";
import { Certificate } from "./model";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";
import { IPdfCertificate } from "../pdf-creator/interface";

class Service {
  async createCertificate(data: ICertificate) {
    const certificateUrl = await PdfCreatorService.createCertificate(
      data.certificatePdfData
    );
    const schemaData = { ...data.schema, certificateUrl: certificateUrl };
    await Certificate.create(schemaData);
  }
  async getAllCertificate(): Promise<any> {
    const data = await Certificate.find({}).populate([
      {
        path: "user",
        model: "User",
        select: { name: 1, image: 1, email: 1 },
      },
      {
        path: "course",
        model: "Course",
        select: { title: 1, category: 1, image: 1 },
      },
    ]);
    return data;
  }
  async getSingleCertificate(id: Types.ObjectId): Promise<any> {
    return await Certificate.findById(id).populate([
      {
        path: "user",
        model: "User",
        select: { name: 1, image: 1, email: 1 },
      },
      {
        path: "course",
        model: "Course",
        select: { title: 1, category: 1, image: 1 },
      },
    ]);
  }
  async getCertificatesByUserId(userId: Types.ObjectId) {
    return await Certificate.find({ user: userId }).populate("course", "title");
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
    await Certificate.findByIdAndDelete(id);
  }
}

export const CertificateService = new Service();
