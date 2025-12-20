const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("report"), async (req, res) => {
    try {
    const file = req.file;
    let text = "";

    if (file.mimetype === "application/pdf") {
        const buffer = fs.readFileSync(file.path);
        const data = await pdfParse(buffer);
        text = data.text;
    } else {
        const result = await Tesseract.recognize(file.path, "eng");
        text = result.data.text;
    }

    res.json({ text });
    } catch (error) {
    res.status(500).json({ error: "Failed to read medical report" });
    }
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});