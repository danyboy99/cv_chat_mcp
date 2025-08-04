import express, { Request, Response } from "express";
import multer from "multer";
import { FileFilterCallback } from "multer";
import fs from "fs";
import { askResumeQuestionWithFile } from "../conroller/chat";
import path from "path";
const router = express.Router();
const uploadPath = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.get("/chat", (req: Request, res: Response) => {
  res.send("welcome to chat routes!");
});

router.get("/view", (req: Request, res: Response) => {
  res.render("chat", { title: "CV Chat Assistant" });
});

router.post("/ask", upload.single("resume"), askResumeQuestionWithFile);
export default router;
