const getAiOutput = require('../utils/getAiOutput.js')
const generatePrompt = require('../templates/textSummaryPrompt.js')

async function getTextSummary(text) {
    const prompt = generatePrompt(text);
    try {
        const response = await getAiOutput(prompt)
        return response.text
    } catch (error) {
        console.error("Error summarizing content:", error);
        return ""
    }
}

module.exports = getTextSummary