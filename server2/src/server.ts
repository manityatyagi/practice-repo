import "dotenv/config";
import express from "express";
import { OpenAI } from "openai";

const app = express();
const PORT = process.env.PORT ?? 7500;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI App is running"
    });
})

const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_TOKEN
});

app.post("/ai", async (req, res) => {
    try {
        const { query } = req.body;
        if(!query) {
            return res.status(400).json({
                message: "Missing query"
            });
        }

        const aiResponse = await client.responses.create({
            model: "openai/gpt-oss-120b",
            max_output_tokens: 500,
            input: query.trim()
        });
        

        if(!aiResponse) {
            return res.status(404).json({
                message: "No response from AI"
            });
        }

        console.log(aiResponse);
        return res.status(200).json({
            success: true,
            data: aiResponse.output_text.length > 250 ? aiResponse.output_text.substring(0, 200) + "....." : aiResponse.output_text
        })

} catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
})
