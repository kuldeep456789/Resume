const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { analyzeResumeWithAI, getAvailableProviders } = require('./services/llmService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const FRONTEND_URL = process.env.FRONTEND_URL || '*';
app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', providers: getAvailableProviders() });
});

// AI Analysis Endpoint
app.post('/api/analyze', async (req, res) => {
    try {
        const { resumeText, jobDescription, provider, location } = req.body;

        if (!resumeText) {
            return res.status(400).json({ error: "Resume text is required" });
        }

        const result = await analyzeResumeWithAI(resumeText, jobDescription, provider, location);
        res.json(result);
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({
            error: "AI Analysis failed",
            details: error.message
        });
    }
});

const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
    console.log(`Available Providers:`, getAvailableProviders());
});

// Handle unhandled rejections and exceptions to prevent the server from exiting silently
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
