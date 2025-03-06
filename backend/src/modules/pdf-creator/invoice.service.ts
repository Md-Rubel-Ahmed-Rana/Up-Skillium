import { PDFDocument, PDFPage, RGB, rgb } from "pdf-lib";
import config from "../../config/envConfig";
import fs from "fs";
import path from "path";

class InvoiceCreator {
  public async createInvoice(): Promise<any> {
    const pdfDoc = await PDFDocument.create();
    const page = this.createPage(pdfDoc);

    // Add logo
    await this.addLogo(pdfDoc, page);

    // Add header slogan
    await this.AddHeaderSlogan(page);

    // Add Order ID and Issue Date
    await this.addOrderIdIssueDate(page, "123456", new Date());

    // Add Recipient Text
    await this.addRecipientText(page);

    // Draw horizontal line
    await this.drawHorizontalLine(page, 50, 440, 700, rgb(0, 0, 0));

    // Add Customer Details
    await this.AddCustomerDetails(page, pdfDoc);

    // Add Platform Details
    await this.addPlatformDetails(page, pdfDoc);

    // add item and price header
    await this.addItemAndPriceHeader(page, pdfDoc);

    // add course name and price
    await this.addCourseNameAndPrice(page, "Web Development", 100, 10);

    // save pdf
    await this.savePdf(pdfDoc, "Web Development");
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

  private formateIssueDate(date: Date): string {
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
    orderId: string,
    issueDate: Date
  ): Promise<void> {
    const paidText = "PAID";
    const orderIdText = `Order ID: #${orderId}`;
    const issueDateText = `Date of issue: ${this.formateIssueDate(issueDate)}`;
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
    pdfDoc: PDFDocument
  ): Promise<void> {
    const customerName = "John Doe";
    const customerEmail = "john@gmail.com";
    const studentId = "123456";
    const customerNameText = `Name: ${customerName}`;
    const customerEmailText = `Email: ${customerEmail}`;
    const studentIdText = `Student ID: ${studentId}`;
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
    const address = "1234 Main Street, New York, NY 10001";
    const platformEmail = "upskillium@office.com";
    const platformPhone = "+1234567890";
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
    courseName: string,
    price: number,
    discount: number
  ): Promise<void> {
    const yPosition = 270;
    const xPosition = 650;
    page.drawText(courseName, {
      x: 55,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Price: $${price}`, {
      x: xPosition,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Discount: ${discount}%`, {
      x: xPosition,
      y: yPosition - 20,
      size: 12,
      color: rgb(0, 0, 0),
    });

    await this.drawHorizontalLine(page, 55, yPosition - 30, 700, rgb(0, 0, 0));

    page.drawText(`Total: $${price - (price * discount) / 100}`, {
      x: xPosition,
      y: yPosition - 50,
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
}

export const InvoiceService = new InvoiceCreator();
