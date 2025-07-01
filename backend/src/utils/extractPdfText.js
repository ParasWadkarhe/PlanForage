const pdf = require('pdf-parse');

const extractPdfText = async (buffer, type) => {
  try {
    let data = null
    if(type.includes('pdf')) {
        const result = await pdf(buffer);
        data = result.data
    }
    return data;
  } catch (error) {
    console.error('Failed to extract PDF content:', error);
    throw error;
  }
};

module.exports = extractPdfText;