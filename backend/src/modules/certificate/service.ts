import { PdfCreatorService } from "../pdf-creator/service";
import { ICertificate } from "./interface";
import { Certificate } from "./model";

class Service {
  async createCertificate(data: ICertificate) {
    const certificateUrl = await PdfCreatorService.createCertificate(
      data.certificatePdfData
    );
    const schemaData = { ...data.schema, certificateUrl: certificateUrl };
    await Certificate.create(schemaData);
  }
}

export const CertificateService = new Service();
