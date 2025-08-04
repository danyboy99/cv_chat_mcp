"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatedResponse = void 0;
const axios_1 = __importDefault(require("axios"));
const generatedResponse = async (prompt) => {
    const response = await axios_1.default.post("https://openrouter.ai/api/v1/chat/completions", {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    }, {
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
    });
    return response.data.choices[0].message.content;
};
exports.generatedResponse = generatedResponse;
