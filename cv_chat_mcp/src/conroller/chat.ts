import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const askResumeQuestionWithFile = (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = path.join(__dirname, "../../uploads", file.filename);

  // Process the uploaded file (e.g., read its content, analyze it, etc.)
  // This is a placeholder for the actual logic you want to implement.
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the file.");
    }

    // Here you can implement your logic to ask questions based on the resume content
    // For now, we will just send back the content as a response
    res.send(data);
  });
};