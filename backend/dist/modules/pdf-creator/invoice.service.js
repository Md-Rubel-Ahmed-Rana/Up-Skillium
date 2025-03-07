"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const pdf_lib_1 = require("pdf-lib");
const envConfig_1 = __importDefault(require("../../config/envConfig"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class InvoiceCreator {
    createInvoice(invoiceData) {
        return __awaiter(this, void 0, void 0, function* () {
            const pdfDoc = yield pdf_lib_1.PDFDocument.create();
            const page = this.createPage(pdfDoc);
            // Add logo
            yield this.addLogo(pdfDoc, page);
            // Add header slogan
            yield this.AddHeaderSlogan(page);
            // Add Order ID and Issue Date
            yield this.addOrderIdIssueDate(page);
            // Add Recipient Text
            yield this.addRecipientText(page);
            // Draw horizontal line
            yield this.drawHorizontalLine(page, 50, 440, 700, (0, pdf_lib_1.rgb)(0, 0, 0));
            // Add Customer Details
            yield this.AddCustomerDetails(page, pdfDoc, invoiceData.customerInfo);
            // Add Platform Details
            yield this.addPlatformDetails(page, pdfDoc);
            // add item and price header
            yield this.addItemAndPriceHeader(page, pdfDoc);
            // add course name and price
            yield this.addCourseNameAndPrice(page, invoiceData.courseInfo);
            // add concluding text
            yield this.addConcludingText(page, pdfDoc);
            // save pdf
            yield this.savePdf(pdfDoc, "Web Development");
        });
    }
    createPage(pdfDoc) {
        const pageWidth = 792;
        const pageHeight = 612;
        return pdfDoc.addPage([pageWidth, pageHeight]);
    }
    addLogo(pdfDoc, page) {
        return __awaiter(this, void 0, void 0, function* () {
            let logoImageUrl = envConfig_1.default.app.logo;
            const logoBytes = yield fetch(logoImageUrl).then((res) => res.arrayBuffer());
            const logoImage = yield pdfDoc.embedPng(logoBytes);
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
        });
    }
    AddHeaderSlogan(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const header = "Up Skillium";
            const headerSlogan = "Where Meet Skills Success";
            page.drawText(header, {
                x: 100,
                y: 540,
                size: 18,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            page.drawText(headerSlogan, {
                x: 60,
                y: 515,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
        });
    }
    formateIssueDate(date) {
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
    addOrderIdIssueDate(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const paidText = "PAID";
            // fetch order id from database
            const orderIdText = `Order ID: #${Math.floor(Math.random() * 1000000)}`;
            const issueDateText = `Date of issue: ${this.formateIssueDate(new Date())}`;
            const paidTextWidth = 40;
            const paidTextHeight = 20;
            page.drawRectangle({
                x: 500,
                y: 555 - paidTextHeight,
                width: paidTextWidth,
                height: paidTextHeight,
                color: (0, pdf_lib_1.rgb)(0, 1, 0),
            });
            page.drawText(paidText, {
                x: 505,
                y: 540,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            page.drawText(orderIdText, {
                x: 500,
                y: 520,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            page.drawText(issueDateText, {
                x: 500,
                y: 500,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
        });
    }
    addRecipientText(page) {
        return __awaiter(this, void 0, void 0, function* () {
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
                color: (0, pdf_lib_1.rgb)(0, 0, 1),
            });
            page.drawText(recipientText, {
                x: middleOfPage + 7,
                y: yPosition + 7,
                size: 16,
                color: (0, pdf_lib_1.rgb)(1, 1, 1),
            });
        });
    }
    AddCustomerDetails(page, pdfDoc, customerInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerNameText = `Name: ${customerInfo.name}`;
            const customerEmailText = `Email: ${customerInfo.email}`;
            const studentIdText = `Student ID: ${customerInfo.studentId}`;
            page.drawText("Customer info", {
                x: 50,
                y: 420,
                size: 14,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
                font: yield pdfDoc.embedFont("Helvetica-Bold"),
            });
            page.drawText(customerNameText, {
                x: 50,
                y: 400,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            page.drawText(customerEmailText, {
                x: 50,
                y: 380,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            page.drawText(studentIdText, {
                x: 50,
                y: 360,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
        });
    }
    addPlatformDetails(page, pdfDoc) {
        return __awaiter(this, void 0, void 0, function* () {
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
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
                font: yield pdfDoc.embedFont("Helvetica-Bold"),
            });
            page.drawText(addressText, {
                x: 500,
                y: 400,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            page.drawText(platformEmailText, {
                x: 500,
                y: 380,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            page.drawText(platformPhoneText, {
                x: 500,
                y: 360,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
        });
    }
    addItemAndPriceHeader(page, pdfDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemText = "Item";
            const priceText = "Price";
            const yPosition = 300;
            page.drawRectangle({
                x: 50,
                y: yPosition,
                width: 700,
                height: 30,
                color: yield this.addColor(200, 255, 255),
            });
            page.drawText(itemText, {
                x: 55,
                y: yPosition + 10,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
                font: yield pdfDoc.embedFont("Helvetica-Bold"),
            });
            page.drawText(priceText, {
                x: 705,
                y: yPosition + 10,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
                font: yield pdfDoc.embedFont("Helvetica-Bold"),
            });
        });
    }
    addCourseNameAndPrice(page, courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const yPosition = 270;
            const xPosition = 650;
            page.drawText(courseData.name, {
                x: 55,
                y: yPosition,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            page.drawText(`Price: $${courseData.price}`, {
                x: xPosition,
                y: yPosition,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            page.drawText(`Discount: ${courseData.discount}%`, {
                x: xPosition,
                y: yPosition - 20,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
            yield this.drawHorizontalLine(page, 55, yPosition - 30, 700, (0, pdf_lib_1.rgb)(0, 0, 0));
            page.drawText(`Total: $${courseData.price - (courseData.price * courseData.discount) / 100}`, {
                x: xPosition,
                y: yPosition - 50,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
        });
    }
    addConcludingText(page, pdfDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            const concludingText = {
                firstLine: "Thank you for purchasing our course!",
                secondLine: "We appreciate your support and look forward to helping you on your learning journey.",
            };
            const yPosition = 100;
            const xPosition = page.getWidth() / 2 - 150;
            page.drawText(concludingText.firstLine, {
                x: xPosition,
                y: yPosition,
                size: 14,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
                font: yield pdfDoc.embedFont("Helvetica-Bold"),
            });
            page.drawText(concludingText.secondLine, {
                x: xPosition - 100,
                y: yPosition - 20,
                size: 12,
                color: (0, pdf_lib_1.rgb)(0, 0, 0),
            });
        });
    }
    drawHorizontalLine(page, x, y, width, color) {
        return __awaiter(this, void 0, void 0, function* () {
            page.drawLine({
                start: { x, y },
                end: { x: x + width, y },
                thickness: 1,
                color,
            });
        });
    }
    addColor(color1, color2, color3) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, pdf_lib_1.rgb)(color1 / 255, color2 / 255, color3 / 255);
        });
    }
    savePdf(pdfDoc, courseName) {
        return __awaiter(this, void 0, void 0, function* () {
            const pdfBytes = yield pdfDoc.save();
            const filePath = path_1.default.join(__dirname + `../../../invoices/${courseName}-invoice-${Date.now()}.pdf`);
            fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
            fs_1.default.writeFileSync(filePath, pdfBytes);
            return filePath;
        });
    }
}
exports.InvoiceService = new InvoiceCreator();
