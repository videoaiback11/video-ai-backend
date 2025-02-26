const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/generate-script", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: `Buat skrip video tentang: ${prompt}` }],
            },
            {
                headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
            }
        );
        res.json({ script: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan dalam AI." });
    }
});

app.listen(5000, () => console.log("Backend berjalan di port 5000"));
