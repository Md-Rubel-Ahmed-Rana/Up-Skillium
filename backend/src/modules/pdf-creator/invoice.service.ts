import { PDFDocument, PDFPage, RGB, rgb } from "pdf-lib";
import config from "../../config/envConfig";
import fs from "fs";
import path from "path";
import { CourseInfo, CustomerInfo, IPdfInvoice } from "./interface";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";

class InvoiceCreator {
  public async createInvoice(invoiceData: IPdfInvoice): Promise<any> {
    const pdfDoc = await PDFDocument.create();
    const page = this.createPage(pdfDoc);

    // Add logo
    await this.addLogo(pdfDoc, page);

    // Add header slogan
    await this.AddHeaderSlogan(page);

    // Add Order ID and Issue Date
    await this.addOrderIdIssueDate(page, invoiceData.orderInfo.orderId);

    // Add Recipient Text
    await this.addRecipientText(page);

    // Draw horizontal line
    await this.drawHorizontalLine(page, 50, 440, 700, rgb(0, 0, 0));

    // Add Customer Details
    await this.AddCustomerDetails(page, pdfDoc, invoiceData.customerInfo);

    // Add Platform Details
    await this.addPlatformDetails(page, pdfDoc);

    // add item and price header
    await this.addItemAndPriceHeader(page, pdfDoc);

    // add course name and price
    await this.addCourseNameAndPrice(page, invoiceData.courseInfo);

    // add concluding text
    await this.addConcludingText(page, pdfDoc);

    // save pdf
    //await this.savePdf(pdfDoc, invoiceData.courseInfo.name);

    // deploy invoice
    await this.deployInvoice(
      pdfDoc,
      invoiceData.customerInfo.name,
      invoiceData.courseInfo.name
    );
  }

  private createPage(pdfDoc: PDFDocument): PDFPage {
    const pageWidth = 792;
    const pageHeight = 612;
    return pdfDoc.addPage([pageWidth, pageHeight]);
  }

  private async addLogo(pdfDoc: PDFDocument, page: PDFPage) {
    let logoImageUrl = config.app.logo;

    const logoBytes = await fetch(logoImageUrl).then((res) =>
      res.arrayBuffer()
    );
    const logoImage = await pdfDoc.embedPng(logoBytes);

    const logoWidth = 100;
    const logoHeight = (logoImage.height / logoImage.width) * logoWidth;

    const logoXPosition = 50;
    const logoYPosition = page.getHeight() - logoHeight;

    page.drawImage(logoImage, {
      x: logoXPosition,
      y: logoYPosition,
      width: logoWidth / 2,
      height: logoHeight / 2,
    });
  }

  private async AddHeaderSlogan(page: PDFPage) {
    const header = "Up Skillium";
    const headerSlogan = "Where Meet Skills Success";
    page.drawText(header, {
      x: 100,
      y: 540,
      size: 18,
      color: rgb(0, 0, 0),
    });
    page.drawText(headerSlogan, {
      x: 60,
      y: 515,
      size: 12,
      color: rgb(0, 0, 0),
    });
  }

  private formateIssueDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const hourWithZero = hour < 10 ? `0${hour}` : hour;
    const minute = date.getMinutes();
    const minuteWithZero = minute < 10 ? `0${minute}` : minute;
    const ampm = hour >= 12 ? "pm" : "am";
    return `${day}/${month}/${year}, ${hourWithZero}:${minuteWithZero}${ampm}`;
  }

  private async addOrderIdIssueDate(
    page: PDFPage,
    orderId: string
  ): Promise<void> {
    const paidText = "PAID";
    // fetch order id from database
    const orderIdText = `Order ID: #${orderId}`;
    const issueDateText = `Date of issue: ${this.formateIssueDate()}`;
    const paidTextWidth = 40;
    const paidTextHeight = 20;
    page.drawRectangle({
      x: 500,
      y: 555 - paidTextHeight,
      width: paidTextWidth,
      height: paidTextHeight,
      color: rgb(0, 1, 0),
    });
    page.drawText(paidText, {
      x: 505,
      y: 540,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(orderIdText, {
      x: 500,
      y: 520,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(issueDateText, {
      x: 500,
      y: 500,
      size: 12,
      color: rgb(0, 0, 0),
    });
  }

  private async addRecipientText(page: PDFPage): Promise<void> {
    const recipientText = "Recipient";
    const recipientTextWidth = 80;
    const recipientTextHeight = 25;
    const middleOfPage = page.getWidth() / 2 - recipientTextWidth / 2;
    const yPosition = 470 - recipientTextHeight;
    page.drawRectangle({
      x: middleOfPage,
      y: yPosition,
      width: recipientTextWidth,
      height: recipientTextHeight,
      color: rgb(0, 0, 1),
    });
    page.drawText(recipientText, {
      x: middleOfPage + 7,
      y: yPosition + 7,
      size: 16,
      color: rgb(1, 1, 1),
    });
  }

  private async AddCustomerDetails(
    page: PDFPage,
    pdfDoc: PDFDocument,
    customerInfo: CustomerInfo
  ): Promise<void> {
    const customerNameText = `Name: ${customerInfo.name}`;
    const customerEmailText = `Email: ${customerInfo.email}`;
    const studentIdText = `Student ID: ${customerInfo.studentId}`;
    page.drawText("Customer info", {
      x: 50,
      y: 420,
      size: 14,
      color: rgb(0, 0, 0),
      font: await pdfDoc.embedFont("Helvetica-Bold"),
    });
    page.drawText(customerNameText, {
      x: 50,
      y: 400,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(customerEmailText, {
      x: 50,
      y: 380,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(studentIdText, {
      x: 50,
      y: 360,
      size: 12,
      color: rgb(0, 0, 0),
    });
  }

  private async addPlatformDetails(
    page: PDFPage,
    pdfDoc: PDFDocument
  ): Promise<void> {
    const platformName = "Up Skillium";
    const address = "Amborkhana, Sylhet, Bangladesh";
    const platformEmail = "upskillium@office.com";
    const platformPhone = "+8801758049882";
    const addressText = `Address: ${address}`;
    const platformEmailText = `Email: ${platformEmail}`;
    const platformPhoneText = `Phone: ${platformPhone}`;
    page.drawText(platformName, {
      x: 500,
      y: 420,
      size: 14,
      color: rgb(0, 0, 0),
      font: await pdfDoc.embedFont("Helvetica-Bold"),
    });
    page.drawText(addressText, {
      x: 500,
      y: 400,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(platformEmailText, {
      x: 500,
      y: 380,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(platformPhoneText, {
      x: 500,
      y: 360,
      size: 12,
      color: rgb(0, 0, 0),
    });
  }

  private async addItemAndPriceHeader(
    page: PDFPage,
    pdfDoc: PDFDocument
  ): Promise<void> {
    const itemText = "Item";
    const priceText = "Price";
    const yPosition = 300;
    page.drawRectangle({
      x: 50,
      y: yPosition,
      width: 700,
      height: 30,
      color: await this.addColor(200, 255, 255),
    });
    page.drawText(itemText, {
      x: 55,
      y: yPosition + 10,
      size: 12,
      color: rgb(0, 0, 0),
      font: await pdfDoc.embedFont("Helvetica-Bold"),
    });
    page.drawText(priceText, {
      x: 705,
      y: yPosition + 10,
      size: 12,
      color: rgb(0, 0, 0),
      font: await pdfDoc.embedFont("Helvetica-Bold"),
    });
  }

  private async addCourseNameAndPrice(
    page: PDFPage,
    courseData: CourseInfo
  ): Promise<void> {
    const yPosition = 270;
    const xPosition = 650;
    page.drawText(courseData.name, {
      x: 55,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Price: $${courseData.price}`, {
      x: xPosition,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Discount: ${courseData.discount}%`, {
      x: xPosition,
      y: yPosition - 20,
      size: 12,
      color: rgb(0, 0, 0),
    });

    await this.drawHorizontalLine(page, 55, yPosition - 30, 700, rgb(0, 0, 0));

    page.drawText(
      `Total: $${
        courseData.price - (courseData.price * courseData.discount) / 100
      }`,
      {
        x: xPosition,
        y: yPosition - 50,
        size: 12,
        color: rgb(0, 0, 0),
      }
    );
  }

  private async addConcludingText(page: PDFPage, pdfDoc: PDFDocument) {
    const concludingText = {
      firstLine: "Thank you for purchasing our course!",
      secondLine:
        "We appreciate your support and look forward to helping you on your learning journey.",
    };
    const yPosition = 100;
    const xPosition = page.getWidth() / 2 - 150;
    page.drawText(concludingText.firstLine, {
      x: xPosition,
      y: yPosition,
      size: 14,
      color: rgb(0, 0, 0),
      font: await pdfDoc.embedFont("Helvetica-Bold"),
    });
    page.drawText(concludingText.secondLine, {
      x: xPosition - 100,
      y: yPosition - 20,
      size: 12,
      color: rgb(0, 0, 0),
    });
  }

  private async drawHorizontalLine(
    page: PDFPage,
    x: number,
    y: number,
    width: number,
    color: RGB
  ) {
    page.drawLine({
      start: { x, y },
      end: { x: x + width, y },
      thickness: 1,
      color,
    });
  }

  private async addColor(
    color1: number,
    color2: number,
    color3: number
  ): Promise<RGB> {
    return rgb(color1 / 255, color2 / 255, color3 / 255);
  }

  private async savePdf(pdfDoc: PDFDocument, courseName: string) {
    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(
      __dirname + `../../../invoices/${courseName}-invoice-${Date.now()}.pdf`
    );
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, pdfBytes);
    return filePath;
  }

  private async deployInvoice(
    pdfDoc: PDFDocument,
    studentName: string,
    courseName: string
  ): Promise<string> {
    const pdfBytes = await pdfDoc.save();
    const filename = `Invoice-of-${courseName}-${studentName}-${Date.now()}.pdf`;
    const pdfBuffer = Buffer.from(pdfBytes);

    try {
      const fileUrl = await FileUploadMiddleware.uploadInvoice(
        "invoices",
        pdfBuffer,
        filename
      );
      return fileUrl;
    } catch (error) {
      console.error("Error uploading invoice:", error);
      throw new Error("Invoice uploading failed.");
    }
  }
}

export const InvoiceService = new InvoiceCreator();
