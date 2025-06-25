import express from "express";
import multer from "multer";
import cors from "cors";
import pdfParse from "pdf-parse";

const app = express();
const upload = multer();
app.use(cors());

app.post("/pdf-to-text", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const data = await pdfParse(req.file.buffer);
    res.json({ success: true, text: data.text });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
