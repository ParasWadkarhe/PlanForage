const fs = require('fs-extra');
const handlebars = require('handlebars');
const puppeteer = require('puppeteer');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'templates', 'template1.html');

async function downloadPdf(req, res) {
  try {
    const html = await fs.readFile(templatePath, 'utf8');
    const template = handlebars.compile(html);
    const htmlToRender = template(req.body.data);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(htmlToRender, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=output.pdf'
    });
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send({ error: 'Failed to generate PDF' });
  }
}

module.exports = downloadPdf;