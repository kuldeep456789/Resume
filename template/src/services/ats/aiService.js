import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateATSScore } from "./atsEngine";

const API_KEY = "AIzaSyDiu7FEM5xG77F3pS_ajjO8_1NPaHK-Xr8";
const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeResumeWithAI = async (resumeText) => {
    // List of models to try in order of preference
    const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    let lastError = null;

    for (const modelName of modelsToTry) {
        try {
            console.log(`Attempting AI Analysis with model: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const prompt = `
            Analyze the following resume text. 
            1. Identify the professional role (e.g., Full Stack Developer, Data Scientist, etc.).
            2. Calculate an ATS score out of 100 based on standard industry practices.
            3. Break down the score into categories: keywords, formatting, sections, experience.
            4. Provide 3 specific suggestions for improvement.

            Resume Text:
            ${resumeText}

            Respond ONLY in a JSON format like this:
            {
                "role": "Detected Role",
                "overall": 85,
                "sections": {
                    "keywords": 80,
                    "formatting": 90,
                    "sections": 85,
                    "experience": 85
                },
                "feedback": ["suggestion 1", "suggestion 2", "suggestion 3"]
            }
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Clean the response if it contains markdown code blocks
            const cleanText = text.replace(/```json|```/g, "").trim();
            return JSON.parse(cleanText);
        } catch (error) {
            console.warn(`Model ${modelName} failed:`, error.message);
            lastError = error;
            // Continue to next model
        }
    }

    // If all models fail, use local ML/NLP fallback
    console.warn("All AI models failed analysis. Falling back to local ML/NLP engine...");
    const localResults = calculateATSScore(resumeText);
    return {
        ...localResults,
        role: "Professional (Local Scan)",
        isLocal: true
    };
};
