module.exports = (text) => {
  return `
    You are an expert in summarizing project proposals. You are given a project plan your task is to condense the following content 
    into approximately 30% of its original length, capturing only the most critical and relevant information.

    Do not add any external context or interpretation—summarize strictly based on the provided text.

    Text:
    ${text}

    Please return the output in plain text format only without newlines.
  `;
};