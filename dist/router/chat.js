"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const chat_1 = require("../conroller/chat");
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const uploadPath = path_1.default.join(__dirname, "../../uploads");
if (!fs_1.default.existsSync(uploadPath)) {
    fs_1.default.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "uploads/");
    },
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({ storage });
router.get("/chat", (req, res) => {
    res.send("welcome to chat routes!");
});
router.get("/view", (req, res) => {
    res.render("chat", { title: "CV Chat Assistant" });
});
router.post("/ask", upload.single("resume"), chat_1.askResumeQuestionWithFile);
exports.default = router;
