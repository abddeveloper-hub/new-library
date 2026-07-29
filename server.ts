import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI SDK
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in environment variables.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// API Endpoint 1: Ask AI Scholar Assistant
app.post("/api/scholar/ask", async (req, res) => {
  try {
    const { query, contextType, contextData } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required." });
    }

    const ai = getAIClient();
    const systemInstruction = `You are a scholarly, serene, and deeply respectful Islamic Sacred Knowledge Assistant (Al-Mu'allim Al-Digital).
Your task is to provide authentic, academically sound, and spiritually uplifting answers rooted in traditional Sunni Islamic scholarship (classical tafsir like Ibn Kathir/Al-Qurtubi/Al-Jalalayn, authentic hadith collections, and recognized classical jurists and lexicographers).
Provide clear, structured responses with:
1. Executive Summary / Classical Overview
2. Direct Textual Evidences (Quran Verses / Hadiths with Arabic & English where relevant)
3. Scholarly Commentary & Linguistic Nuances (Root words, classical consensus or major positions)
4. Practical Spiritual Lessons & Modern Reflections

Maintain high respect, objective academic rigor, clear formatting (use markdown headings and bullet points), and avoid controversial or political polemic.`;

    let promptContext = `User Query: "${query}"\n`;
    if (contextType && contextData) {
      promptContext += `Context Mode: ${contextType}\nContext Details: ${JSON.stringify(contextData)}\n`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptContext,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    res.json({ answer: response.text });
  } catch (error: any) {
    console.error("Error in /api/scholar/ask:", error);
    res.status(500).json({ error: error.message || "Failed to query AI Scholar Assistant." });
  }
});

// API Endpoint 2: Generate Thematic Study Plan
app.post("/api/scholar/study-plan", async (req, res) => {
  try {
    const { topic, difficulty, durationWeeks } = req.body;
    const ai = getAIClient();
    
    const systemInstruction = `You are an expert Islamic curriculum designer and classical scholar.
Create a structured, weekly thematic study plan for a student of sacred knowledge based on the requested topic.
Return the response formatted strictly as JSON with the following structure:
{
  "title": "Topic Study Plan Title",
  "overview": "Brief description of the study journey",
  "recommendedBooks": ["Book 1", "Book 2"],
  "weeklyModules": [
    {
      "week": 1,
      "title": "Module Title",
      "objective": "Learning objective",
      "keyTexts": ["Text/Verse/Hadith 1", "Text 2"],
      "actionablePractice": "Daily reflection or practice task"
    }
  ]
}`;

    const prompt = `Topic: "${topic || 'Purification of the Heart (Tazkiyat al-Nafs)'}"\nTarget Level: ${difficulty || 'Intermediate'}\nDuration: ${durationWeeks || 4} weeks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error in /api/scholar/study-plan:", error);
    res.status(500).json({ error: error.message || "Failed to generate study plan." });
  }
});

// API Endpoint 3: Root Word Deep Morphological Analysis
app.post("/api/scholar/root-analysis", async (req, res) => {
  try {
    const { root } = req.body;
    if (!root) {
      return res.status(400).json({ error: "Root letters are required." });
    }

    const ai = getAIClient();
    const systemInstruction = `You are an expert Arabic lexicographer and Quranic linguist (referencing Lisān al-'Arab, Taj al-'Arus, and Raghib al-Isfahani's Mufradat).
Analyze the given Arabic triliteral/quadriliteral root and return a structured JSON response:
{
  "root": "${root}",
  "arabicRoot": "Arabic script for root",
  "primaryMeaning": "Core semantic essence",
  "classicalEtymology": "Explanations from classical dictionaries",
  "keyDerivatives": [
    { "word": "Arabic word", "transliteration": "Transliteration", "meaning": "Meaning", "form": "Verb Form / Noun" }
  ],
  "quranicSignificance": "How this root is used across the Quranic narrative",
  "spiritualTakeaway": "Deep spiritual resonance of this linguistic root"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Analyze the Arabic root: ${root}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error in /api/scholar/root-analysis:", error);
    res.status(500).json({ error: error.message || "Failed to analyze root." });
  }
});

// Start Express with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sacred Knowledge System server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
