import { PDFDocument, PDFFont, PDFPage, RGB, rgb } from "pdf-lib";
import config from "../../config/envConfig";
import fs from "fs";
import path from "path";

class InvoiceCreator {
  async createInvoice(): Promise<any> {
    const pdfDoc = await PDFDocument.create();
    const page = this.createPage(pdfDoc);

    // Add logo
    await this.addLogo(pdfDoc, page);

    // Add header slogan
    await this.AddHeaderSlogan(page);

    // Add Order ID and Issue Date
    await this.addOrderIdIssueDate(page, "123456", new Date());

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

  // Add Order ID and Issue Date
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
