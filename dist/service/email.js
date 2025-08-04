"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const config_1 = require("../config");
const sendMail = async (to, subject, content) => {
    try {
        const sender = {
            address: "omotehinse99@gmail.com",
            name: "mcp_Test",
        };
        const recipients = [to];
        const result = await config_1.transporter.sendMail({
            from: sender,
            to: recipients,
            subject: subject,
            text: content,
            category: "Integration Test",
            sandbox: true,
        });
        return result;
    }
    catch (err) {
        console.error("Email error:", err);
        throw new Error(`Failed to send email: ${err}`);
    }
};
exports.sendMail = sendMail;
