const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const PROVIDERS = {
    GROQ: 'groq',
    OPENROUTER: 'openrouter',
    MISTRAL: 'mistral',
    DEEPSEEK: 'deepseek',
    CEREBRAS: 'cerebras'
};

const getAvailableProviders = () => {
    const providers = [];
    if (process.env.GROQ_API_KEY) providers.push(PROVIDERS.GROQ);
    if (process.env.OPENROUTER_API_KEY) providers.push(PROVIDERS.OPENROUTER);
    if (process.env.MISTRAL_API_KEY) providers.push(PROVIDERS.MISTRAL);
    if (process.env.DEEPSEEK_API_KEY) providers.push(PROVIDERS.DEEPSEEK);
    if (process.env.CEREBRAS_API_KEY) providers.push(PROVIDERS.CEREBRAS);
    return providers;
};

const analyzeResumeWithAI = async (resumeText, jobDescription = "", provider = PROVIDERS.GROQ, location = "") => {
    const prompt = `
        Analyze the following resume text against the job description (if provided).
        Provide a detailed ATS score analysis in JSON format with the following structure:
        {
            "overall": number (0-100),
            "sections": {
                "skills": number (0-100),
                "experience": number (0-100),
                "formatting": number (0-100),
                "headers": number (0-100)
            },
            "feedback": [string],
            "benchmark": string,
            "locationAnalysis": {
                "currentLocation": "${location || 'Not Provided'}",
                "hiringHubs": [string],
                "topCompanies": {
                    "premium": [string],
                    "highGrowth": [string],
                    "established": [string]
                },
                "marketDemand": "High" | "Medium" | "Low"
            }
        }

        Resume Text:
        ${resumeText}

        Job Description:
        ${jobDescription || "Standard Industry Benchmarks"}

        Constraint: If the user's location is provided, suggest companies and hubs specifically for that city/region. 
        Categorize the companies into three tiers:
        - Premium: MAANG and top-tier global tech giants.
        - High Growth: Fast-scaling startups and unicorns.
        - Established: Reliable mid-to-large scale companies with steady hiring.
    `;

    try {
        switch (provider) {
            case PROVIDERS.GROQ:
                return await callGroq(prompt);
            case PROVIDERS.OPENROUTER:
                return await callOpenRouter(prompt);
            case PROVIDERS.MISTRAL:
                return await callMistral(prompt);
            case PROVIDERS.DEEPSEEK:
                return await callDeepSeek(prompt);
            case PROVIDERS.CEREBRAS:
                return await callCerebras(prompt);
            default:
                throw new Error("Unsupported provider");
        }
    } catch (error) {
        console.error(`Error with ${provider}:`, error);
        throw error;
    }
};

const callGroq = async (prompt) => {
    const API_KEY = process.env.GROQ_API_KEY;
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Groq API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return parseJSONResponse(data.choices[0].message.content);
};

const callOpenRouter = async (prompt) => {
    const API_KEY = process.env.OPENROUTER_API_KEY;
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'google/gemini-pro-1.5',
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenRouter API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return parseJSONResponse(data.choices[0].message.content);
};

const callMistral = async (prompt) => {
    const API_KEY = process.env.MISTRAL_API_KEY;
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mistral-tiny',
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Mistral API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return parseJSONResponse(data.choices[0].message.content);
};

const callDeepSeek = async (prompt) => {
    const API_KEY = process.env.DEEPSEEK_API_KEY;
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`DeepSeek API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return parseJSONResponse(data.choices[0].message.content);
};

const callCerebras = async (prompt) => {
    const API_KEY = process.env.CEREBRAS_API_KEY;
    const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama3.1-8b',
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Cerebras API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return parseJSONResponse(data.choices[0].message.content);
};

const parseJSONResponse = (text) => {
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("No JSON found in response");
    } catch (e) {
        console.error("Failed to parse LLM response:", text);
        throw new Error("Invalid response format from AI");
    }
};

module.exports = {
    analyzeResumeWithAI,
    getAvailableProviders,
    PROVIDERS
};
