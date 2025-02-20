// const express = require("express");
// //const next = require("next");
// const dotenv = require("dotenv");

// dotenv.config();

// // const dev = process.env.NODE_ENV !== "production";
// // //const nextApp = next({ dev });
// // const handle = nextApp.getRequestHandler();

// (async () => {
//   try {
//     //await nextApp.prepare();

//     const app = express();

//     // Example API route
//     app.get("/api/hello", (req:import('express').Request, res:import('express').Response) => {
//       res.json({ message: "Hello from Express API!" });
//     });

//     // Handle Next.js pages
//     // app.all("*", (req:import('express').Request, res:import('express').Response) => {
//     //   return handle(req, res);
//     // });

//     const PORT = process.env.PORT || 4000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running at http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("❌ Server error:", err);
//     process.exit(1);
//   }
// })();
  


import express, {Request, Response } from "express";
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Serve Next.js frontend (only if needed)
app.use(express.static(path.join(__dirname, "../../frontend/.next")));

// Example API route
app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express API!" });
});

// Catch-all route for Next.js
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/.next/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
