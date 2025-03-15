import nodemailer from "nodemailer";
import config from "../../config/envConfig";

class Mail {
  private sendEmail(subject: string, to: string, htmlContent: string) {
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

    const mailOptions = {
      from: `Up Skillium <${config.google.appUser}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    };

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
}

export const MailService = new Mail();
