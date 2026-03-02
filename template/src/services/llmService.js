/**
 * LLM Service - Frontend bridge to the secure backend server
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const BACKEND_URL = `${API_URL}/api/analyze`;

const PROVIDERS = {
    GROQ: 'groq',
    OPENROUTER: 'openrouter',
    MISTRAL: 'mistral',
    DEEPSEEK: 'deepseek',
    CEREBRAS: 'cerebras'
};

/**
 * In backend mode, we assume providers are available if the backend is reachable.
 * We can optionally call a health check endpoint here.
 */
export const getAvailableProviders = () => {
    return [PROVIDERS.GROQ, PROVIDERS.OPENROUTER, PROVIDERS.MISTRAL, PROVIDERS.DEEPSEEK, PROVIDERS.CEREBRAS];
};

export const analyzeResumeWithAI = async (resumeText, jobDescription = "", provider = PROVIDERS.GROQ) => {
    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                resumeText,
                jobDescription,
                provider
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Backend Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("AI Analysis failed (Backend Mode):", error);
        throw error;
    }
};
