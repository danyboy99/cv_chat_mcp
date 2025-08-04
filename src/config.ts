import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = process.env.mailtrap_Api_key;

if (!TOKEN) {
  console.error("❌ Mailtrap API key is missing from environment variables");
  throw new Error("Mailtrap API key is missing from environment variables");
}

export const transporter = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: 3940095,
    sandbox: true,
  })
);
