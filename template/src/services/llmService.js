/**
 * LLM Service - Unified interface for multiple AI providers
 */

const PROVIDERS = {
    GROQ: 'groq',
    OPENROUTER: 'openrouter',
    MISTRAL: 'mistral',
    DEEPSEEK: 'deepseek',
    CEREBRAS: 'cerebras'
};

export const getAvailableProviders = () => {
    const providers = [];
    if (import.meta.env.VITE_GROQ_API_KEY) providers.push(PROVIDERS.GROQ);
    if (import.meta.env.VITE_OPENROUTER_API_KEY) providers.push(PROVIDERS.OPENROUTER);
    if (import.meta.env.VITE_MISTRAL_API_KEY) providers.push(PROVIDERS.MISTRAL);
    if (import.meta.env.VITE_DEEPSEEK_API_KEY) providers.push(PROVIDERS.DEEPSEEK);
    if (import.meta.env.VITE_CEREBRAS_API_KEY) providers.push(PROVIDERS.CEREBRAS);
    return providers;
};

export const analyzeResumeWithAI = async (resumeText, jobDescription = "", provider = PROVIDERS.GROQ) => {
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
            "benchmark": string
        }

        Resume Text:
        ${resumeText}

        Job Description:
        ${jobDescription || "Standard Industry Benchmarks"}
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
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
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
    if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
        throw new Error("Groq AI returned no valid choices.");
    }
    return parseJSONResponse(data.choices[0].message.content);
};

const callOpenRouter = async (prompt) => {
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
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
    if (!data.choices || data.choices.length === 0) {
        throw new Error("OpenRouter AI returned no valid choices.");
    }
    return parseJSONResponse(data.choices[0].message.content);
};

const callMistral = async (prompt) => {
    const API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
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
    if (!data.choices || data.choices.length === 0) {
        throw new Error("Mistral AI returned no valid choices.");
    }
    return parseJSONResponse(data.choices[0].message.content);
};

const callDeepSeek = async (prompt) => {
    const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
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
    if (!data.choices || data.choices.length === 0) {
        throw new Error("DeepSeek AI returned no valid choices.");
    }
    return parseJSONResponse(data.choices[0].message.content);
};

const callCerebras = async (prompt) => {
    const API_KEY = import.meta.env.VITE_CEREBRAS_API_KEY;
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
    if (!data.choices || data.choices.length === 0) {
        throw new Error("Cerebras AI returned no valid choices.");
    }
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
