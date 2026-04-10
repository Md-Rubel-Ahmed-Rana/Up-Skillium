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
exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envConfig_1 = __importDefault(require("../../config/envConfig"));
class Mail {
    sendEmail(subject, to, htmlContent, bcc, cc) {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            secure: true,
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: envConfig_1.default.google.appUser,
                pass: envConfig_1.default.google.appPass,
            },
        });
        const mailOptions = {
            from: `Up Skillium <${envConfig_1.default.google.appUser}>`,
            to: to,
            subject: subject,
            html: htmlContent,
        };
        if (bcc) {
            mailOptions.bcc = bcc;
        }
        if (cc) {
            mailOptions.cc = cc;
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log({ mailError: error });
            }
            else {
                console.log({ mailInfo: info });
            }
        });
    }
    enrollmentConfirmationMail(receiver, studentName, courseName, invoiceUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = `
      <!DOCTYPE html>
     <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enrollment Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px 5px;">
       <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table width="600px" style="background-color: #ffffff; padding: 10px; border-radius: 10px; box-shadow: 0px 0px 10px #cccccc;">
                    <tr>
                        <td align="center" style="padding: 10px;">
                            <h2 style="color: #333333;">🎉 Enrollment Confirmed!</h2>
                            <p style="color: #555555; font-size: 16px;">Dear ${studentName},</p>
                            <p style="color: #555555; font-size: 16px;">Congratulations! You have successfully enrolled in <strong>${courseName}</strong>.</p>
                            <p style="color: #555555; font-size: 16px;">Your learning journey starts now. Click below to explore your courses, download your invoice, or discover more opportunities.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px;">
                            <a href="https://upskillium.vercel.app/dashboard/my-courses" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">📚 My Courses</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px;">
                            <a href=${invoiceUrl} style="background-color: #28a745; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">📄 Download Invoice</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px;">
                            <a href="https://upskillium.vercel.app/courses" style="background-color: #ffc107; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">🚀 Explore More</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px; font-size: 14px; color: #777777;">
                            <p>Need help? Contact our support team at <a href="mailto:support@example.com">support@example.com</a></p>
                            <p>Thank you for choosing us. Happy Learning! 🎓</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
       </table>
    </body>
   </html>

    `;
            this.sendEmail("Enrollment Confirmation", receiver, content);
        });
    }
    resetPasswordLink(receiver, resetUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px 5px;">
          <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td align="center">
                      <table width="600px" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px #cccccc;">
                          <tr>
                              <td align="center" style="padding: 10px;">
                                  <h2 style="color: #333333;">🔒 Password Reset Request</h2>
                                  <p style="color: #555555; font-size: 16px;">Hello,</p>
                                  <p style="color: #555555; font-size: 16px;">We received a request to reset your password. Click the button below to reset your password.</p>
                              </td>
                          </tr>
                          <tr>
                              <td align="center" style="padding: 10px;">
                                  <a href="${resetUrl}" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">🔑 Reset Password</a>
                              </td>
                          </tr>
                          <tr>
                              <td align="center" style="padding: 10px;">
                                  <p style="color: #555555; font-size: 14px;">This link will expire in <strong>10 minutes</strong>. If you did not request a password reset, you can safely ignore this email.</p>
                              </td>
                          </tr>
                          <tr>
                              <td align="center" style="padding: 20px; font-size: 14px; color: #777777;">
                                  <p>If you have any issues, please contact our support team at <a href="mailto:support@example.com">support@example.com</a></p>
                                  <p>Thank you for using our service. Stay secure! 🔐</p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `;
            this.sendEmail("Reset Your Password", receiver, content);
        });
    }
    sendLiveClassMail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const classTime = new Date(data.startDateTime);
            const formattedTime = classTime.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Live Class Alert</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px 5px;">
            <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <table width="600px" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px #cccccc;">
                            
                              <tr>
                                <td align="center" style="padding: 10px;">
                                    <h2 style="color: #333333;">📢 Live Class Alert</h2>
                                    <p style="color: #555555; font-size: 16px;">Hello,</p>
                                    <p style="color: #555555; font-size: 16px;">We are excited to inform you about an upcoming live class. Here are the details:</p>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding: 10px;">
                                    <h3 style="color: #333333;">Title: <strong>${data.title}</strong></h3>
                                    <p style="color: #555555; font-size: 16px;">Instructor: ${(_a = data.instructor) === null || _a === void 0 ? void 0 : _a.name} </p>
                                    <p style="color: #555555; font-size: 16px;">Date & Time: ${formattedTime} </p>
                                    <p style="color: #555555; font-size: 16px;">Duration: ${data.duration}</p>
                                    <p style="color: #555555; font-size: 16px;">Topics: ${data.topics.join(", ")}</p>
                                    <p style="color: #555555; font-size: 16px;">Meeting Link: <a href=${data.meetingLink}>Join Now</a></p>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding: 10px;">
                                    <h3 style="color: #333333;">Course: <strong>${data.courseName}</strong></h3>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding: 10px;">
                                    <a href="https://upskillium.vercel.app/dashboard/my-courses" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">📚 My Courses</a>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding: 10px;">
                                    <a href="https://upskillium.vercel.app/dashboard/live-classes" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Live Classes</a>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding: 10px;">
                                    <a href="https://upskillium.vercel.app/courses" style="background-color: #ffc107; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">🚀 Explore More</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;
            this.sendEmail("Live Class Alert", data.students.map((s) => s.email), content);
        });
    }
    sendMailToInstructorAssignedToCourse(courseName, instructorName, instructorEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Course Assignment</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px 5px;">
          <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td align="center">
                      <table width="600px" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px #cccccc;">
                          <tr>
                              <td align="center" style="padding: 10px;">
                                  <h2 style="color: #333333;">📢 Course Assignment</h2>
                                  <p style="color: #555555; font-size: 16px;">Hello ${instructorName},</p>
                                  <p style="color: #555555; font-size: 16px;">You have been assigned to teach <strong>${courseName}</strong> course.</p>
                                  <p style="color: #555555; font-size: 16px;">Please login to your account to view the course details and start teaching.</p>
                              </td>
                          </tr>
                          <tr>
                              <td align="center" style="padding: 10px;">
                                  <a href="https://upskillium.vercel.app/dashboard/my-classes" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">📚 My Classes</a>
                              </td>
                          </tr>
                      </table>
                  </td>

              </tr>
          </table>
      </body>
      </html>

    `;
            this.sendEmail("Course Assignment", instructorEmail, content);
        });
    }
    sendAssignmentMarkedMail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Assignment Marked</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px 5px;">
          <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td align="center">
                      <table width="600px" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px #cccccc;">
                          <tr>
                              <td align="center" style="padding: 10px;">
                                  <h2 style="color: #333333;">📢 Assignment Marked</h2>
                                  <p style="color: #555555; font-size: 16px;">Hello ${data.student.name},</p>
                                  <p style="color: #555555; font-size: 16px;">Your assignment <strong>${data.assignmentTitle}</strong> has been marked.</p>
                                  <p style="color: #555555; font-size: 16px;">You scored ${data.marks} out of ${data.totalMarks}.</p>
                                  <p style="color: #555555; font-size: 16px;">Please login to your account to view the feedback and your final grade.</p>
                              </td>
                          </tr>
                          <tr>
                              <td align="center" style="padding: 10px;">
                                  <a href="https://upskillium.vercel.app/dashboard/my-assignments" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">📚 My Assignments</a>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `;
            this.sendEmail("Assignment Marked", data.student.email, content);
        });
    }
    sendGotCertificateMail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = `
      <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificate Issued</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 10px 5px;">
            <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <table width="600px" style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px #cccccc;">
                            <tr>
                                <td align="center" style="padding: 10px;">
                                    <h2 style="color: #333333;">📢 Certificate Issued</h2>
                                    <p style="color: #555555; font-size: 16px;">Hello ${data.student.name},</p>
                                    <p style="color: #555555; font-size: 16px;">Congratulations! You have successfully completed the course <strong>${data.courseName}</strong>.</p>
                                    <p style="color: #555555; font-size: 16px;">Your certificate is ready. Click the button below to download your certificate.</p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 10px;">
                                    <a href="${data.certificateLink}" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">📜 Download Certificate</a>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 10px;">
                                    <a href="https://upskillium.vercel.app/dashboard/certificates" style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">📚 My Certificates</a>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 10px;">
                                    <a href="https://upskillium.vercel.app/courses" style="background-color: #ffc107; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">🚀 Explore More</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
            this.sendEmail("Certificate Issued", data.student.email, content);
        });
    }
}
exports.MailService = new Mail();
