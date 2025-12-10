import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Vercel serverless functions run from project root
    const assetsPath = path.resolve(
      process.cwd(),
      "attached_assets",
      "ESGLearning"
    );

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
      return res.status(200).json({ topics: [] });
    }

    const folders = fs
      .readdirSync(assetsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .sort((a, b) => {
        // Sort by number prefix if exists
        const numA = parseInt(a.name.match(/^\d+/)?.[0] || "0");
        const numB = parseInt(b.name.match(/^\d+/)?.[0] || "0");
        return numA - numB;
      });

    // Map English titles to Vietnamese
    const titleMap: Record<string, string> = {
      "ESG Essentials for Sustainable Business":
        "Kiến thức cơ bản về ESG cho Doanh nghiệp Bền vững",
      "ESG Communication for Inclusive Dialogue":
        "Giao tiếp ESG cho Đối thoại Hòa nhập",
      "ESG Value Creation for Business Impact":
        "Tạo giá trị ESG cho Tác động Kinh doanh",
      "ESG Challenges and Solutions for Business":
        "Thách thức và Giải pháp ESG cho Doanh nghiệp",
      "ESG Mindsets for Business Transformation":
        "Tư duy ESG cho Chuyển đổi Kinh doanh",
      "How to Prioritize ESG Initiatives":
        "Cách Ưu tiên các Sáng kiến ESG",
    };

    for (const folder of folders) {
      const folderPath = path.join(assetsPath, folder.name);
      const files = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".docx"))
        .sort();

      const documents = files.map((file) => ({
        fileName: file,
        title: file.replace(".docx", "").replace(/^\d+\.\s*/, ""),
      }));

      if (documents.length > 0) {
        const match = folder.name.match(/^\d+\.\s*(.+)/);
        const baseTitle = match ? match[1] : folder.name;

        topics.push({
          id: topics.length + 1,
          folderName: folder.name,
          title: baseTitle,
          titleVi: titleMap[baseTitle] || baseTitle,
          documents,
        });
      }
    }

    res.status(200).json({ topics });
  } catch (error) {
    console.error("Error reading topics:", error);
    res.status(500).json({ error: "Failed to read topics" });
  }
}

