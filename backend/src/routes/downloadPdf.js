
const axios = require('axios');
const CloudConvert = require('cloudconvert');
const fs = require('fs-extra');
const handlebars = require('handlebars');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'templates', 'template1.html');

const cloudConvert = new CloudConvert(process.env.CLOUD_CONVERT_API_KEY);

async function func(req, res) {
    try {
        const html = await fs.readFile(templatePath, 'utf8');
        const template = handlebars.compile(html);
        const htmlContent = template(req.body.data);

        // Create CloudConvert job with import, convert, export tasks
        const job = await cloudConvert.jobs.create({
            tasks: {
                "import-html": {
                    operation: "import/raw",
                    file: htmlContent,
                    filename: "document.html"
                },
                "convert-html": {
                    operation: "convert",
                    input: "import-html",
                    input_format: "html",
                    output_format: "pdf",
                    engine: "chrome"
                },
                "export-pdf": {
                    operation: "export/url",
                    input: "convert-html"
                }
            }
        });

        // Wait for job to complete
        const completedJob = await cloudConvert.jobs.wait(job.id);

        // Find export task
        const exportTask = completedJob.tasks.find(task => task.name === "export-pdf");

        if (!exportTask || !exportTask.result || !exportTask.result.files.length) {
            return res.status(500).send({ error: "Failed to export PDF." });
        }

        // Download the generated PDF
        const fileUrl = exportTask.result.files[0].url;
        const fileResponse = await axios.get(fileUrl, { responseType: "arraybuffer" });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=output.pdf"
        });
        res.send(fileResponse.data);

    } catch (error) {
        console.error("Error generating PDF:", error.response?.data || error.message || error);
        res.status(500).send({ error: "Failed to generate PDF." });
    }
}

module.exports = func;