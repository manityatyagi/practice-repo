import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 6500;

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server(v1) is running"
    });
})

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy"
    });
})

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
})