import { transporter } from "../config";

export const sendMail = async (
  to: string,
  subject: string,
  content: string
) => {
  try {
    const sender = {
      address: "omotehinse99@gmail.com",
      name: "mcp_Test",
    };
    const recipients = [to];

    const result = await transporter.sendMail({
      from: sender,
      to: recipients,
      subject: subject,
      text: content,
      category: "Integration Test",
      sandbox: true,
    });

    return result;
  } catch (err) {
    console.error("Email error:", err);
    throw new Error(`Failed to send email: ${err}`);
  }
};
