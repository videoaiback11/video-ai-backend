const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Pastikan ini ada!
app.get("/", (req, res) => {
    res.send("Backend Video AI Berjalan!");
});

// Endpoint untuk generate skrip
app.post("/generate-script", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ error: "Prompt is required" });

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: `Buat skrip video tentang: ${prompt}` }],
            },
            {
                headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
            }
        );

        res.json({ script: response.data.choices[0].message.content });
    } catch (error) {
        console.error("ERROR RESPONSE:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Gagal membuat skrip", details: error.response ? error.response.data : error.message });
    }
});

// Jika menggunakan Vercel Serverless, tambahkan ini:
module.exports = app;

// Jika menggunakan Vercel dengan server normal, gunakan ini:
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
