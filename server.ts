import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const MAX_DOCUMENT_CHARS = 15000;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));

  // API routes FIRST
  app.post("/api/generate-flashcards", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: "Gemini API key is missing" });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'lacademy-server',
          }
        }
      });

      // Read the documentation file
      const uploadedContent = typeof req.body?.content === "string" ? req.body.content.trim() : "";
      if (uploadedContent.length > MAX_DOCUMENT_CHARS) {
        res.status(400).json({ error: `Document exceeds ${MAX_DOCUMENT_CHARS} characters. Please upload a smaller file.` });
        return;
      }
      const docPath = path.join(process.cwd(), "hackathon_boring_dense_valves_doc.md");
      const docContent = uploadedContent || fs.readFileSync(docPath, "utf-8");

      const prompt = `Based on the following technical documentation, generate exactly 5 flashcards for studying. Each flashcard should have a question and a concise answer. Focus on key concepts, safety requirements, technical specifications, and operational procedures.

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
[{"question":"...","answer":"..."},{"question":"...","answer":"..."},{"question":"...","answer":"..."},{"question":"...","answer":"..."},{"question":"...","answer":"..."}]

Make the questions varied - include definitions, procedures, safety warnings, and technical details. Keep answers brief (1-3 sentences max).

Documentation:
${docContent.substring(0, MAX_DOCUMENT_CHARS)}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text || "";
      // Extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("Failed to parse flashcards from AI response");
      }

      const cards = JSON.parse(jsonMatch[0]);
      res.json({ cards });
    } catch (error: any) {
      console.error("Flashcards API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate flashcards" });
    }
  });

  app.post("/api/generate-summary", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        res.status(400).json({ error: "No text provided" });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: "Gemini API key is missing" });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'lacademy-server',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Summarize the following notes concisely (max 2-3 bullet points) focusing on the key takeaways:\n\n${text}`,
      });

      res.json({ summary: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate summary" });
    }
  });

  app.post("/api/generate-quiz", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: "Gemini API key is missing" });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'lacademy-server',
          }
        }
      });

      const uploadedContent = typeof req.body?.content === "string" ? req.body.content.trim() : "";
      if (uploadedContent.length > MAX_DOCUMENT_CHARS) {
        res.status(400).json({ error: `Document exceeds ${MAX_DOCUMENT_CHARS} characters. Please upload a smaller file.` });
        return;
      }
      const fs = await import("fs");
      const docPath = path.join(process.cwd(), "hackathon_boring_dense_valves_doc.md");
      const docContent = uploadedContent || fs.readFileSync(docPath, "utf-8");

      const prompt = `Based on the following technical documentation, generate exactly 5 multiple choice questions to test a reader's understanding. Each question should have exactly 4 options with only one correct answer.

Return ONLY valid JSON in this exact format (no markdown, no code fences):
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0
  }
]

The questions should cover different sections of the documentation and test practical understanding, not just memorization.

Documentation:
${docContent.slice(0, MAX_DOCUMENT_CHARS)}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const text = response.text || "";
      // Extract JSON from response (handle potential markdown fences)
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("Failed to parse quiz response");
      }

      const questions = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(questions) || questions.length !== 5) {
        throw new Error("Invalid quiz format returned");
      }

      res.json({ questions });
    } catch (error: any) {
      console.error("Quiz Generation Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate quiz" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // @ts-ignore
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
