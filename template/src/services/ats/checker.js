/**
 * Spelling and Grammar patterns (Local implementation for demonstration)
 */

const COMMON_CONFUSED_WORDS = {
    "their": "there/they're",
    "there": "their/they're",
    "affect": "effect",
    "effect": "affect",
    "its": "it's",
    "it's": "its",
    "accept": "except",
    "except": "accept",
};

export const checkGrammarAndSpelling = (text) => {
    const suggestions = [];
    const words = text.split(/\s+/);

    words.forEach((word, index) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
        if (COMMON_CONFUSED_WORDS[cleanWord]) {
            suggestions.push({
                word: word,
                suggestion: COMMON_CONFUSED_WORDS[cleanWord],
                type: 'confused_word',
                index: index
            });
        }
    });

    // Tone analysis (Simple)
    const weakVerbs = ["helped", "made", "worked", "did", "was"];
    const foundWeakVerbs = words.filter(w => weakVerbs.includes(w.toLowerCase()));

    return {
        suggestions,
        tone: foundWeakVerbs.length > 3 ? "Passive/Weak" : "Professional/Active",
        weakVerbCount: foundWeakVerbs.length
    };
};
