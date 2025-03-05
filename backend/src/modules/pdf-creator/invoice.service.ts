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
