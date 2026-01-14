import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function decideFilesToSync(files) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are an AI assistant helping a college student manage their workspace.

Given the following list of files, identify which files should be synced for academic or development work.

Rules:
- Include code files and documents
- Exclude personal photos, videos, and media files

Files:
${files.map(f => `- ${f}`).join("\n")}

Return result in JSON format with:
sync: []
ignore: []
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    return JSON.parse(response);
  } catch (err) {
    console.error("AI response parsing failed:", response);
    return {
      sync: [],
      ignore: files
    };
  }
}
