import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import mammoth from "mammoth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // API endpoint to get list of ESG learning topics and their documents
  app.get("/api/esg-learning/topics", async (_req, res) => {
    try {
      const assetsPath = path.resolve(import.meta.dirname, "..", "attached_assets", "ESGLearning");
      const topics: Array<{
        id: number;
        folderName: string;
        title: string;
        titleVi: string;
        documents: Array<{
          fileName: string;
          title: string;
        }>;
      }> = [];

      if (!fs.existsSync(assetsPath)) {
        return res.json({ topics: [] });
      }

      const folders = fs.readdirSync(assetsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .sort((a, b) => {
          // Sort by number prefix if exists
          const numA = parseInt(a.name.match(/^\d+/)?.[0] || "0");
          const numB = parseInt(b.name.match(/^\d+/)?.[0] || "0");
          return numA - numB;
        });

      for (const folder of folders) {
        const folderPath = path.join(assetsPath, folder.name);
        const files = fs.readdirSync(folderPath)
          .filter(file => file.endsWith(".docx"))
          .sort();

        const documents = files.map(file => ({
          fileName: file,
          title: file.replace(".docx", "").replace(/^\d+\.\s*/, ""),
        }));

        if (documents.length > 0) {
          const match = folder.name.match(/^\d+\.\s*(.+)/);
          const baseTitle = match ? match[1] : folder.name;
          
          // Map English titles to Vietnamese
          const titleMap: Record<string, string> = {
            "ESG Essentials for Sustainable Business": "Kiến thức cơ bản về ESG cho Doanh nghiệp Bền vững",
            "ESG Communication for Inclusive Dialogue": "Giao tiếp ESG cho Đối thoại Hòa nhập",
            "ESG Value Creation for Business Impact": "Tạo giá trị ESG cho Tác động Kinh doanh",
            "ESG Challenges and Solutions for Business": "Thách thức và Giải pháp ESG cho Doanh nghiệp",
            "ESG Mindsets for Business Transformation": "Tư duy ESG cho Chuyển đổi Kinh doanh",
            "How to Prioritize ESG Initiatives": "Cách Ưu tiên các Sáng kiến ESG",
          };
          
          topics.push({
            id: topics.length + 1,
            folderName: folder.name,
            title: baseTitle,
            titleVi: titleMap[baseTitle] || baseTitle,
            documents,
          });
        }
      }

      res.json({ topics });
    } catch (error) {
      console.error("Error reading topics:", error);
      res.status(500).json({ error: "Failed to read topics" });
    }
  });

  // API endpoint to get content of a specific docx file
  app.get("/api/esg-learning/content", async (req, res) => {
    try {
      const { topic, document } = req.query;

      if (!topic || !document) {
        return res.status(400).json({ error: "Topic and document parameters are required" });
      }

      const docxPath = path.resolve(
        import.meta.dirname,
        "..",
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

      res.json({ 
        html,
        messages: result.messages 
      });
    } catch (error) {
      console.error("Error reading document:", error);
      res.status(500).json({ error: "Failed to read document" });
    }
  });

  return httpServer;
}
