import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import path from "path";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const { email, subject, template, data } = options;
  const temPath = path.join(__dirname, "../mails", template);
  const html = await ejs.renderFile(temPath, data);
  const mailOption = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };
  console.log(mailOption);
  await transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
