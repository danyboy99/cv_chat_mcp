import { Request, Response } from "express";
import fs from "fs";
import mammoth from "mammoth";
import { generatedResponse } from "../service/chat";
import { sendMail } from "../service/email";
import path from "path";

// controller for asking Resume Question With cv
export const askResumeQuestionWithFile = async (
  req: Request,
  res: Response
) => {
  try {
    const { question } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }
    //  Check if it's a .docx
    const validMime =
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const validExt = path.extname(file.originalname) === ".docx";

    if (!validMime || !validExt) {
      // Cleanup uploaded file
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: "Only .docx files are allowed!" });
    }
    // Convert DOCX to text
    const result = await mammoth.extractRawText({ path: file.path });
    const resumeText = result.value;
    const prompt = `Here's my resume: ${resumeText} Answer this question based on the resume: ${question}`;
    // generate response
    const response = await generatedResponse(prompt);

    // send confirmation mail
    let mailResponse;
    try {
      console.log("Attempting to send email...");
      mailResponse = await sendMail(
        "danyboy99official@gmail.com",
        "Resume Question",
        response
      );
      console.log("mail:", mailResponse);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Still return success for the AI response, but indicate email failure
      return res.json({
        status: "success",
        message: "Response generated successfully, but email sending failed",
        emailError:
          emailError instanceof Error
            ? emailError.message
            : "Unknown email error",
        response,
      });
    }

    res.json({
      status: "success",
      message: "your response has been generated and sent to your email",
      mailResponse: mailResponse,
      response,
    });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Internal Server Error", serverError: err.message });
  }
};
