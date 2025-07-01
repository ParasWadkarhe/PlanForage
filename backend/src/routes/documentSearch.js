
const axios = require('axios');
const pdf = require('pdf-parse');
const textToJsonPrompt = require('../templates/textToJsonPrompt.js');
const textSummaryPrompt = require('../templates/textSummaryPrompt.js');

const getAiOutput = require('../utils/getAiOutput.js');
const query = require('./query.js');

const chunkTextByWordCount = (text, wordLimit = 300) => {
    const words = text.split(/\s+/).filter(Boolean);
    const chunks = [];

    for (let i = 0; i < words.length; i += wordLimit) {
        const chunk = words.slice(i, i + wordLimit).join(' ');
        chunks.push(chunk);
    }

    return chunks;
};

const summarizeChunks = async (chunks) => {
    let summarizedChunks = [];
    for (const chunk of chunks) {
        try {
            const prompt = textSummaryPrompt(chunk);
            const aiOutput = await getAiOutput(prompt);
            summarizedChunks.push(aiOutput.text.trim());
        } catch (error) {   
            console.error('Error summarizing chunk:', error);
            summarizedChunks.push(chunk); 
        }
    }
    return summarizedChunks;
};


const documentSearch = async (req, res) => {
    const url = req.body.url;
    const type = req.body.type;

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = response.data;
        const text = await pdf(buffer);

        const chunks = chunkTextByWordCount(text.text);
        const summarizedChunks = await summarizeChunks(chunks);
        const finalSummary = summarizedChunks.join(' ')

        const prompt = textToJsonPrompt(finalSummary);
        const aiOutput = await getAiOutput(prompt);
        const cleanedAiOutput = aiOutput.text.replace(/^```json\n/, '').replace(/\n```$/, '');
        const json = JSON.parse(cleanedAiOutput);

        json['search_string'] = finalSummary

        return query({
            body: json,
            user: req.user
        }, res);

    } catch (error) {
        console.error('Failed to extract PDF content:', error);
        return res.status(500).json({ error: 'Failed to process document', details: error.message });
    }
}

module.exports = documentSearch;