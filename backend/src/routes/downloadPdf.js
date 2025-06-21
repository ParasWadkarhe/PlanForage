const fs = require('fs');
const handlebars = require('handlebars');
const pdf = require('html-pdf');const path = require('path');
const templatePath = path.join(__dirname, '..', 'templates', 'template1.html');


function downloadPdf(req, res) {
  const html = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(html);
  const htmlToRender = template(req.body);
  const options = { format: 'A4' };

  try {
      pdf.create(htmlToRender, options).toBuffer((err, buffer) => {
        if (err) {
          console.error('Error generating PDF:', err);
          return res.status(500).send('Failed to generate PDF');
        }
    
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.send(buffer);
      });
  } 
  catch (error) {
        console.error('Error reading template or generating PDF:', error);
        return res.status(500).send({error: 'Failed to generate PDF'});
  }

}


module.exports = downloadPdf;