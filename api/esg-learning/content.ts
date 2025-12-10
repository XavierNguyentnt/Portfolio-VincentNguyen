import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";
import mammoth from "mammoth";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { topic, document } = req.query;

    if (!topic || !document) {
      return res
        .status(400)
        .json({ error: "Topic and document parameters are required" });
    }

    // Vercel serverless functions run from project root
    const docxPath = path.resolve(
      process.cwd(),
      "attached_assets",
      "ESGLearning",
      topic as string,
      document as string
    );

    if (!fs.existsSync(docxPath)) {
      return res.status(404).json({ error: "Document not found" });
    }

    const buffer = fs.readFileSync(docxPath);
    const result = await mammoth.convertToHtml({ buffer });
    const html = result.value;

    res.status(200).json({
      html,
      messages: result.messages,
    });
  } catch (error) {
    console.error("Error reading document:", error);
    res.status(500).json({ error: "Failed to read document" });
  }
}

