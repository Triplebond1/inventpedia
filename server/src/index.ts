import express, { Request, Response } from "express";
const path = require("path");
const dotenv = require("dotenv");
import apiApp from "./server/app";

dotenv.config();

const app = express();

// Serve Next.js frontend (only if needed)
app.use(express.static(path.join(__dirname, "../../frontend/.next")));

// Mount API routes
app.use("/api", apiApp);

// Example API route
app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express API!" });
});

// Catch-all route for Next.js
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/.next/index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
