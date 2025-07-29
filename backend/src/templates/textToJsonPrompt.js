module.exports = (summarizedText) => {
  return `
    Your are given a summarized text of a PDF document. 
    you have to give output in the following format ONLY no other text should be present in the output:
    {
        location: "location mentioned in the document where the product is to be created",
        budget: "budget mentioned in the document for the product. only numerical value eg. 20000 or 1293. also convert currency to USD only. and give this new updated value in USD"
    }

    Summarized Text:
    ${summarizedText}
  `;
};