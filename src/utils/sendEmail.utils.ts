import { createTransport } from "nodemailer";
import { TEmailRequest } from "../interfaces/users";
import "dotenv/config";
import Mailgen from "mailgen";

class EmailService {
  async sendEmail({ to, subject, text }: TEmailRequest) {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter
      .sendMail({
        from: "grupo008gustavo@gmail.com",
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log("Email send");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  resetPasswordTemplate(
    userEmail: string,
    userName: string,
    resetToken: string
  ) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Motor_shop",
        link: "http://localhost:3001/users",
      },
    });

    const email = {
      body: {
        name: userName,
        intro:
          "You have received this email because a password reset request for your account was received.",
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#DC4D2F",
            text: "Reset your password",
            link: `http://localhost:3001/resetPassword?${resetToken}`,
          },
        },
        outro:
          "If you did not request a password reset, no further action is required on your part.",
      },
    };

    const emailBody = mailGenerator.generate(email);

    const emailtemplate = {
      to: userEmail,
      subject: "Reset Password",
      text: emailBody,
    };
    return emailtemplate;
  }
}

const emailservice = new EmailService();

export { emailservice };
