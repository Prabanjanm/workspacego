import express from "express";
import cors from "cors";
import multer from "multer";
import { Storage } from "@google-cloud/storage";
import { decideFilesToSync } from "../ai-agent/aiAgent.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Google Cloud Storage
const storage = new Storage();
const bucket = storage.bucket("workspacego-backend");

// 🔹 API: Decide files using AI
app.post("/ai/decide", async (req, res) => {
  const { files } = req.body;

  const decision = await decideFilesToSync(files);
  res.json(decision);
});

// 🔹 API: Upload files (only AI-approved ones)
app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const files = req.files;

    for (const file of files) {
      const blob = bucket.file(file.originalname);
      const stream = blob.createWriteStream();

      stream.end(file.buffer);
    }

    res.json({ message: "Files uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 API: List files
app.get("/files", async (req, res) => {
  const [files] = await bucket.getFiles();
  res.json(files.map(f => f.name));
});

// 🔹 API: End session (cleanup)
app.post("/logout", async (req, res) => {
  const [files] = await bucket.getFiles();

  for (const file of files) {
    await file.delete();
  }

  res.json({ message: "Session ended and data cleared" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
