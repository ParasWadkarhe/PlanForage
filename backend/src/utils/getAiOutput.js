require("dotenv").config();
const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function getAiOutput(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });
        return response

    }  catch (error) {
        console.error("Error generating AI content:", error);
        return error
    }

}


module.exports = getAiOutput