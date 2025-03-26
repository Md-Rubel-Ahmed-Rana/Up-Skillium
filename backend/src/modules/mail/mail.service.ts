import nodemailer from "nodemailer";
import config from "../../config/envConfig";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ILiveClassMail } from "./interface";

class Mail {
  private sendEmail(
    subject: string,
    to: string | string[],
    htmlContent: string,
    bcc?: string[],
    cc?: string[]
  ) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: config.google.appUser,
        pass: config.google.appPass,
      },
    });

    const mailOptions: SMTPTransport.Options = {
      from: `Up Skillium <${config.google.appUser}>`,
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
      } else {
        console.log({ mailInfo: info });
      }
    });
  }

  async enrollmentConfirmationMail(
    receiver: string,
    studentName: string,
    courseName: string,
    invoiceUrl: string
  ) {
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
  }

  async resetPasswordLink(receiver: string, resetUrl: string) {
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
  }

  async sendLiveClassMail(data: ILiveClassMail) {
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
                                    <h3 style="color: #333333;">Title: <strong>${
                                      data.title
                                    }</strong></h3>
                                    <p style="color: #555555; font-size: 16px;">Instructor: ${
                                      data.instructor?.name
                                    } </p>
                                    <p style="color: #555555; font-size: 16px;">Date & Time: ${formattedTime} </p>
                                    <p style="color: #555555; font-size: 16px;">Duration: ${
                                      data.duration
                                    }</p>
                                    <p style="color: #555555; font-size: 16px;">Topics: ${data.topics.join(
                                      ", "
                                    )}</p>
                                    <p style="color: #555555; font-size: 16px;">Meeting Link: <a href=${
                                      data.meetingLink
                                    }>Join Now</a></p>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="padding: 10px;">
                                    <h3 style="color: #333333;">Course: <strong>${
                                      data.courseName
                                    }</strong></h3>
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

        `;

    this.sendEmail(
      "Live Class Alert",
      data.students.map((s) => s.email),
      content
    );
  }
}

export const MailService = new Mail();
