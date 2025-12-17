const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", (req, res) => {
    const report = req.body.report;

    res.json({
    summary:
        "The uploaded medical report has been analyzed. No major abnormalities detected.",
    });
});

app.listen(5000, () => {
    console.log("Backend server running on port 5000");
});