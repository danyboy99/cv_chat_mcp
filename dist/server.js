"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// configure dotenv FIRST before any other imports
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const chat_1 = __importDefault(require("./router/chat"));
//start application
const app = (0, express_1.default)();
//configuration
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", "./views");
// Serve static files
app.use(express_1.default.static("public"));
//chat routes
app.use("/api/chat", chat_1.default);
// Root route redirect to chat interface
app.get("/", (_req, res) => {
    res.redirect("/api/chat/view");
});
// configure live port (avoiding Chrome's unsafe port 6000)
const port = process.env.PORT || 3000;
//start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
