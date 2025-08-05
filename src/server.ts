// configure dotenv FIRST before any other imports
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import chatRoutes from "./router/chat";
//start application
const app = express();

//configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static files
app.use(express.static("public"));

//chat routes
app.use("/api/chat", chatRoutes);

// Root route redirect to chat interface
app.get("/", (_req, res) => {
  res.render("chat", { title: "CV Chat Assistant" });
});

// configure live port (avoiding Chrome's unsafe port 6000)
const port = process.env.PORT || 3000;

//start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
