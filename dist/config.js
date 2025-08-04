"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailtrap_1 = require("mailtrap");
const TOKEN = process.env.mailtrap_Api_key;
if (!TOKEN) {
    console.error("❌ Mailtrap API key is missing from environment variables");
    throw new Error("Mailtrap API key is missing from environment variables");
}
exports.transporter = nodemailer_1.default.createTransport((0, mailtrap_1.MailtrapTransport)({
    token: TOKEN,
    testInboxId: 3940095,
    sandbox: true,
}));
