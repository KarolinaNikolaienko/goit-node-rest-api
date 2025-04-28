import nodemailer from "nodemailer";
import {} from "dotenv/config"; // For .env variables to work

const { META_UA_EMAIL, META_UA_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_UA_EMAIL,
    pass: META_UA_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendMail = (data) => {
  const email = { ...data, from: `Karolina Nikolaienko ${META_UA_EMAIL}` };
  return transporter.sendMail(email);
};

export default sendMail;
