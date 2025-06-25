const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(fileUpload());

app.post('/pdf-to-text', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const pdfFile = req.files.file;
    const data = await pdfParse(pdfFile.data);

    res.json({ success: true, text: data.text });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error parsing PDF', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
