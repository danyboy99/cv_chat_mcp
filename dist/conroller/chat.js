"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askResumeQuestionWithFile = void 0;
const fs_1 = __importDefault(require("fs"));
const mammoth_1 = __importDefault(require("mammoth"));
const chat_1 = require("../service/chat");
const email_1 = require("../service/email");
const path_1 = __importDefault(require("path"));
// controller for asking Resume Question With cv
const askResumeQuestionWithFile = async (req, res) => {
    try {
        const { question } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "No file provided" });
        }
        //  Check if it's a .docx
        const validMime = file.mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        const validExt = path_1.default.extname(file.originalname) === ".docx";
        if (!validMime || !validExt) {
            // Cleanup uploaded file
            fs_1.default.unlinkSync(file.path);
            return res.status(400).json({ error: "Only .docx files are allowed!" });
        }
        // Convert DOCX to text
        const result = await mammoth_1.default.extractRawText({ path: file.path });
        const resumeText = result.value;
        const prompt = `Here's my resume: ${resumeText} Answer this question based on the resume: ${question}`;
        // generate response
        const response = await (0, chat_1.generatedResponse)(prompt);
        // send confirmation mail
        let mailResponse;
        try {
            console.log("Attempting to send email...");
            mailResponse = await (0, email_1.sendMail)("danyboy99official@gmail.com", "Resume Question", response);
            console.log("mail:", mailResponse);
        }
        catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Still return success for the AI response, but indicate email failure
            return res.json({
                status: "success",
                message: "Response generated successfully, but email sending failed",
                emailError: emailError instanceof Error
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
    }
    catch (err) {
        res
            .status(500)
            .json({ error: "Internal Server Error", serverError: err.message });
    }
};
exports.askResumeQuestionWithFile = askResumeQuestionWithFile;
