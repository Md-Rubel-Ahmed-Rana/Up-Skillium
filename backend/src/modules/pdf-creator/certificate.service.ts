import { PDFDocument, PDFFont, PDFPage, RGB, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import config from "../../config/envConfig";
import { IPdfCertificate } from "./interface";
import textWrapLineBreaker from "@/utils/textWrapLineBreaker";
import { CloudinaryService } from "@/config/cloudinary";
import ApiError from "@/shared/apiError";
import { HttpStatusCode } from "@/lib/httpStatus";

class Service {
  public async createCertificate(data: IPdfCertificate): Promise<string> {
    console.log("From pdf create service", data);
    const studentName = data?.studentName;
    const courseName = data?.courseName;
    const technologies = data?.technologies;
    const score = data?.score;
    const pdfDoc = await PDFDocument.create();
    const page = this.createPage(pdfDoc);

    const colors = {
      titleColor: rgb(0, 0, 0),
      bodyColor: rgb(0.1, 0.1, 0.1),
      purpleColor: rgb(128 / 255, 0 / 255, 128 / 255),
    };

    const fonts = {
      font: await pdfDoc.embedFont("Helvetica"),
      boldFont: await pdfDoc.embedFont("Helvetica-Bold"),
    };

    const margins = { marginX: 50, maxWidth: 792 - 50 * 2 };
    const yPositions = {
      title: 512,
      studentName: 462,
      courseCompletion: 412,
      skills: 352,
      message: 282,
      footer: 200,
    };

    this.drawBorder(page, colors.purpleColor);
    this.drawTitleAndStudentName(
      page,
      studentName,
      colors,
      fonts,
      margins,
      yPositions,
    );
    this.drawCourseCompletion(
      page,
      courseName,
      colors.bodyColor,
      fonts,
      margins,
      yPositions.courseCompletion,
    );
    this.drawSkillsText(
      page,
      technologies,
      colors.bodyColor,
      fonts.font,
      margins,
      yPositions.skills,
    );
    this.drawMessageText(
      page,
      colors.bodyColor,
      fonts.font,
      margins,
      yPositions.message,
    );
    this.drawFooter(
      page,
      colors.titleColor,
      fonts.boldFont,
      margins,
      yPositions.footer,
    );
    console.log("[PdfCreatorService]: Drawing logo");
    await this.drawLogo(pdfDoc, page);
    console.log("[PdfCreatorService]: Drawn logo and start drawing badge");

    await this.drawBadge(pdfDoc, page, score);

    console.log("[PdfCreatorService]: start drawCertificateSlogan");

    await this.drawCertificateSlogan(pdfDoc, page);

    console.log("[PdfCreatorService]: start drawCeoSignature");

    await this.drawCeoSignature(pdfDoc, page, colors, fonts);

    console.log("[PdfCreatorService]: start drawCAOSignature");

    await this.drawCAOSignature(pdfDoc, page, colors, fonts);

    return this.deployCertificate(pdfDoc, studentName, data.courseName);
  }

  private createPage(pdfDoc: PDFDocument) {
    const pageWidth = 792;
    const pageHeight = 612;
    return pdfDoc.addPage([pageWidth, pageHeight]);
  }

  private drawBorder(page: PDFPage, color: RGB) {
    const borderThickness = 5;
    const outerMargin = 20;
    page.drawRectangle({
      x: outerMargin + borderThickness / 2,
      y: outerMargin + borderThickness / 2,
      width: page.getWidth() - outerMargin * 2 - borderThickness,
      height: page.getHeight() - outerMargin * 2 - borderThickness,
      borderColor: color,
      borderWidth: borderThickness,
    });
  }

  private drawTitleAndStudentName(
    page: PDFPage,
    studentName: string,
    colors: { titleColor: RGB; bodyColor: RGB; purpleColor: RGB },
    fonts: { font: PDFFont; boldFont: PDFFont },
    margins: { marginX: number; maxWidth: number },
    yPositions: { title: number; studentName: number },
  ) {
    page.drawText("Certificate of Completion", {
      x:
        margins.marginX +
        margins.maxWidth / 2 -
        fonts.boldFont.widthOfTextAtSize("Certificate of Completion", 24) / 2,
      y: yPositions.title,
      size: 24,
      color: colors.purpleColor,
      font: fonts.boldFont,
    });

    page.drawText(studentName, {
      x:
        margins.marginX +
        margins.maxWidth / 2 -
        fonts.boldFont.widthOfTextAtSize(studentName, 22) / 2,
      y: yPositions.studentName,
      size: 22,
      color: colors.purpleColor,
      font: fonts.boldFont,
    });
  }

  private async drawCertificateSlogan(pdfDoc: PDFDocument, page: PDFPage) {
    let sloganImageUrl = config.certificate.sloganUrl;

    const { bytes, contentType } = await this.fetchFileFromUrlWithMeta(
      sloganImageUrl,
      "slogan",
    );
    try {
      let sloganImage;

      if (contentType.includes("png")) {
        sloganImage = await pdfDoc.embedPng(bytes);
      } else if (contentType.includes("jpeg") || contentType.includes("jpg")) {
        sloganImage = await pdfDoc.embedJpg(bytes);
      } else {
        throw new ApiError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          `Unsupported badge image content-type: ${contentType}`,
        );
      }

      const sloganWidth = 100;
      const sloganHeight =
        (sloganImage.height / sloganImage.width) * sloganWidth;

      const sloganXPosition = 50;
      const sloganYPosition = page.getHeight() - sloganHeight - 50;

      page.drawImage(sloganImage, {
        x: sloganXPosition,
        y: sloganYPosition,
        width: sloganWidth,
        height: sloganHeight,
      });
    } catch (error: any) {
      throw new ApiError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        `Badge image not found to draw on certificate. Error: ${error?.message || error}`,
      );
    }
  }

  private drawCourseCompletion(
    page: PDFPage,
    courseName: string,
    bodyColor: RGB,
    fonts: { font: PDFFont; boldFont: PDFFont },
    margins: { marginX: number; maxWidth: number },
    yPosition: number,
  ) {
    const courseIntroText = "for the successful completion of the ";
    const courseIntroWidth = fonts.font.widthOfTextAtSize(courseIntroText, 16);
    const wrappedCourseName = textWrapLineBreaker(
      courseName,
      margins.maxWidth - courseIntroWidth,
      fonts.boldFont,
      16,
    );

    page.drawText(courseIntroText, {
      x: margins.marginX,
      y: yPosition,
      size: 16,
      color: bodyColor,
      font: fonts.font,
    });

    wrappedCourseName.forEach((line, index) => {
      page.drawText(line, {
        x: margins.marginX + courseIntroWidth,
        y: yPosition - index * 20,
        size: 16,
        color: bodyColor,
        font: fonts.boldFont,
      });
    });

    const lastLineWidth =
      wrappedCourseName.length > 0
        ? fonts.boldFont.widthOfTextAtSize(
            wrappedCourseName[wrappedCourseName.length - 1],
            16,
          )
        : 0;
    const courseXPosition =
      margins.marginX + courseIntroWidth + lastLineWidth + 5;

    page.drawText("course", {
      x: courseXPosition,
      y: yPosition - (wrappedCourseName.length - 1) * 20,
      size: 16,
      color: bodyColor,
      font: fonts.font,
    });
  }

  private drawSkillsText(
    page: PDFPage,
    technologies: string[],
    bodyColor: RGB,
    font: PDFFont,
    margins: { marginX: number; maxWidth: number },
    yPosition: number,
  ) {
    const skillsText = `with a rigorous amount of ${technologies.join(
      ", ",
    )} and applied these skills to build several projects.`;
    const wrappedSkillsText = textWrapLineBreaker(
      skillsText,
      margins.maxWidth,
      font,
      14,
    );

    wrappedSkillsText.forEach((line, index) => {
      page.drawText(line, {
        x: margins.marginX,
        y: yPosition - index * 20,
        size: 14,
        color: bodyColor,
        font,
      });
    });
  }

  private drawMessageText(
    page: PDFPage,
    bodyColor: RGB,
    font: PDFFont,
    margins: { marginX: number; maxWidth: number },
    yPosition: number,
  ) {
    const messageText =
      "We are proud of the student's hard work, dedication, and quick learning, which enabled them to complete assigned tasks on time.";
    const wrappedMessageText = textWrapLineBreaker(
      messageText,
      margins.maxWidth,
      font,
      14,
    );

    wrappedMessageText.forEach((line, index) => {
      page.drawText(line, {
        x: margins.marginX,
        y: yPosition - index * 20,
        size: 14,
        color: bodyColor,
        font,
      });
    });
  }

  private drawFooter(
    page: PDFPage,
    titleColor: RGB,
    boldFont: PDFFont,
    margins: { marginX: number },
    yPosition: number,
  ) {
    page.drawText("You did it, and we are proud of you!", {
      x: margins.marginX,
      y: yPosition,
      size: 16,
      color: titleColor,
      font: boldFont,
    });
  }

  private async drawLogo(pdfDoc: PDFDocument, page: PDFPage) {
    const logoUrl = config.certificate.logoUrl;
    const { bytes, contentType } = await this.fetchFileFromUrlWithMeta(
      logoUrl,
      "Draw LOGO",
    );
    try {
      let logoImage;

      if (contentType.includes("png")) {
        logoImage = await pdfDoc.embedPng(bytes);
      } else if (contentType.includes("jpeg") || contentType.includes("jpg")) {
        logoImage = await pdfDoc.embedJpg(bytes);
      } else {
        throw new ApiError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          `Unsupported badge image content-type: ${contentType}`,
        );
      }

      const logoWidth = 200;
      const logoHeight = (logoImage.height / logoImage.width) * logoWidth;

      page.drawImage(logoImage, {
        x: page.getWidth() - logoWidth - 25,
        y: 28,
        width: logoWidth,
        height: logoHeight,
      });
    } catch (error: any) {
      throw new ApiError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        `Badge image not found to draw on certificate. Error: ${error?.message || error}`,
      );
    }
  }

  private async drawBadge(pdfDoc: PDFDocument, page: PDFPage, score: number) {
    let badgeUrl: string | undefined;

    if (score >= 80) {
      badgeUrl = config.certificate.badges.level1;
    } else if (score >= 60) {
      badgeUrl = config.certificate.badges.level2;
    } else if (score >= 40) {
      badgeUrl = config.certificate.badges.level3;
    } else if (score >= 20) {
      badgeUrl = config.certificate.badges.level4;
    } else {
      return;
    }

    const { bytes, contentType } = await this.fetchFileFromUrlWithMeta(
      badgeUrl,
      "Badge",
    );

    try {
      let badgeImage;

      if (contentType.includes("png")) {
        badgeImage = await pdfDoc.embedPng(bytes);
      } else if (contentType.includes("jpeg") || contentType.includes("jpg")) {
        badgeImage = await pdfDoc.embedJpg(bytes);
      } else {
        throw new ApiError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          `Unsupported badge image content-type: ${contentType}`,
        );
      }

      const badgeWidth = 100;
      const badgeHeight = (badgeImage.height / badgeImage.width) * badgeWidth;
      const badgePadding = 50;

      page.drawImage(badgeImage, {
        x: page.getWidth() - badgeWidth - badgePadding,
        y: page.getHeight() - badgeHeight - badgePadding,
        width: badgeWidth,
        height: badgeHeight,
      });
    } catch (error: any) {
      throw new ApiError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        `Badge image not found to draw on certificate. Error: ${error?.message || error}`,
      );
    }
  }

  private async drawCeoSignature(
    pdfDoc: PDFDocument,
    page: PDFPage,
    colors: { bodyColor: RGB },
    fonts: { font: PDFFont; boldFont: PDFFont },
  ) {
    const ceoSignatureUrl = config.certificate.ceoSignatureUrl;
    const { bytes, contentType } = await this.fetchFileFromUrlWithMeta(
      ceoSignatureUrl,
      "CEO signature",
    );
    try {
      let signatureImage;

      if (contentType.includes("png")) {
        signatureImage = await pdfDoc.embedPng(bytes);
      } else if (contentType.includes("jpeg") || contentType.includes("jpg")) {
        signatureImage = await pdfDoc.embedJpg(bytes);
      } else {
        throw new ApiError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          `Unsupported badge image content-type: ${contentType}`,
        );
      }

      const signatureWidth = 100;
      const signatureHeight =
        signatureWidth * (signatureImage.height / signatureImage.width);
      page.drawImage(signatureImage, {
        x: 50,
        y: 60,
        width: signatureWidth,
        height: signatureHeight,
      });

      page.drawText("Md Rubel Ahmed Rana", {
        x: 50,
        y: 50,
        size: 12,
        color: colors.bodyColor,
        font: fonts.boldFont,
      });

      page.drawText("CEO, Up Skillium", {
        x: 50,
        y: 35,
        size: 12,
        color: colors.bodyColor,
        font: fonts.font,
      });
    } catch (error: any) {
      throw new ApiError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        `Badge image not found to draw on certificate. Error: ${error?.message || error}`,
      );
    }
  }

  private async drawCAOSignature(
    pdfDoc: PDFDocument,
    page: PDFPage,
    colors: { bodyColor: RGB },
    fonts: { font: PDFFont; boldFont: PDFFont },
  ) {
    const caoSignatureUrl = config.certificate.caoSignatureUrl;
    const { bytes, contentType } = await this.fetchFileFromUrlWithMeta(
      caoSignatureUrl,
      "CAO signature",
    );
    try {
      let signatureImage;

      if (contentType.includes("png")) {
        signatureImage = await pdfDoc.embedPng(bytes);
      } else if (contentType.includes("jpeg") || contentType.includes("jpg")) {
        signatureImage = await pdfDoc.embedJpg(bytes);
      } else {
        throw new ApiError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          `Unsupported badge image content-type: ${contentType}`,
        );
      }
      const xPosition = 250;

      const signatureWidth = 100;
      const signatureHeight =
        signatureWidth * (signatureImage.height / signatureImage.width);
      page.drawImage(signatureImage, {
        x: xPosition,
        y: 60,
        width: signatureWidth,
        height: signatureHeight,
      });

      page.drawText("Najim Uddin Helal", {
        x: xPosition,
        y: 50,
        size: 12,
        color: colors.bodyColor,
        font: fonts.boldFont,
      });

      page.drawText("CAO, Up Skillium", {
        x: xPosition,
        y: 35,
        size: 12,
        color: colors.bodyColor,
        font: fonts.font,
      });
    } catch (error: any) {
      throw new ApiError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        `Badge image not found to draw on certificate. Error: ${error?.message || error}`,
      );
    }
  }

  private async savePdf(pdfDoc: PDFDocument, studentName: string) {
    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(
      __dirname +
        `../../../certificates/${studentName}-certificate-${Date.now()}.pdf`,
    );
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, pdfBytes);
    return filePath;
  }

  private async deployCertificate(
    pdfDoc: PDFDocument,
    studentName: string,
    courseName: string,
  ): Promise<string> {
    const pdfBytes = await pdfDoc.save();
    const filename = `${studentName}-${courseName}-certificate-${Date.now()}.pdf`;
    const pdfBuffer = Buffer.from(pdfBytes);
    const file: any = {
      fieldname: "file",
      originalname: filename,
      original_filename: filename,
      encoding: "7-bit",
      mimetype: "application/pdf",
      size: pdfBuffer.length,
      buffer: pdfBuffer,
      destination: "",
      filename: filename,
    };

    try {
      const fileUrl = await CloudinaryService.uploadSingle(
        file,
        "certificates",
        "raw",
      );

      console.log("[PdfCreatorService]: success deployCertificate");
      return fileUrl;
    } catch (error) {
      console.log("[PdfCreatorService]: error deployCertificate");
      console.error("Error uploading certificate:", error);
      throw new Error("Certificate upload failed.");
    }
  }

  private async fetchFileFromUrlWithMeta(
    url: string,
    name = "File",
  ): Promise<{
    bytes: Uint8Array;
    contentType: string;
  }> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `${name} could not be fetched from URL`,
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "";

    return {
      bytes: new Uint8Array(arrayBuffer),
      contentType,
    };
  }
}

export const PdfCreatorService = new Service();
