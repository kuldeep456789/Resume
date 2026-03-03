/**
 * ATS Scoring Engine - Calibrated for Industry Standards (V3)
 */
import { analyzeResumeWithAI, getAvailableProviders } from '../llmService';

// Gold Standard Reference (Benchmark)
export const GOLD_STANDARD = {
    keywords: ["React", "JavaScript", "TypeScript", "Node.js", "Express", "Python", "SQL", "PostgreSQL", "Git", "AWS", "CI/CD", "Testing", "Agile", "Architecture", "Optimization", "Scalability", "API Design", "Data Structures", "Algorithms"],
    sections: ["experience", "skills", "education", "projects", "achievements", "training"],
    experienceMinBullets: 4,
    formattingChecks: {
        hasEmail: true,
        hasPhone: true,
        hasLinkedIn: true,
        noQuantificationGap: true
    }
};

export const parseResumeFromText = (text) => {
    const lines = text.split('\n');
    let resumeData = {
        header: { name: "", links: [] },
        experience: [],
        skills: { categories: [] },
        education: [],
        projects: [],
        achievements: [],
        training: []
    };

    let currentSection = "";
    lines.forEach(line => {
        const cleanLine = line.trim();
        if (!cleanLine) return;

        // Enhanced Section Detection
        const lowerLine = cleanLine.toLowerCase();
        if (/(experience|work history|internship|employment)/i.test(lowerLine) && cleanLine.length < 30) {
            currentSection = "experience";
        } else if (/(skills|tech stack|technical profile|competencies|tools)/i.test(lowerLine) && cleanLine.length < 25) {
            currentSection = "skills";
        } else if (/(projects|personal work)/i.test(lowerLine) && cleanLine.length < 20) {
            currentSection = "projects";
        } else if (/(education|academic background|qualifications)/i.test(lowerLine) && cleanLine.length < 20) {
            currentSection = "education";
        } else if (/(achievements|honors|awards)/i.test(lowerLine) && cleanLine.length < 25) {
            currentSection = "achievements";
        } else if (/(training|certifications|courses|professional development)/i.test(lowerLine) && cleanLine.length < 35) {
            currentSection = "training";
        } else if (/github|linkedin|mailto|@/i.test(cleanLine)) {
            if (cleanLine.includes('@')) {
                resumeData.header.links.push({ type: 'Email', label: cleanLine });
            }
        } else if (currentSection === "experience") {
            // More robust bullet detection for PDF text extraction
            const isBullet = /^[•\-\*]/.test(cleanLine);
            if (resumeData.experience.length === 0) resumeData.experience.push({ description: [] });
            const content = isBullet ? cleanLine.substring(1).trim() : cleanLine;
            if (content) resumeData.experience[resumeData.experience.length - 1].description.push(content);
        } else if (currentSection === "achievements") {
            const isBullet = /^[•\-\*]/.test(cleanLine);
            resumeData.achievements.push(isBullet ? cleanLine.substring(1).trim() : cleanLine);
        } else if (currentSection === "skills") {
            if (resumeData.skills.categories.length === 0) resumeData.skills.categories.push({ items: "" });
            resumeData.skills.categories[0].items += (resumeData.skills.categories[0].items ? ", " : "") + cleanLine;
        }
    });

    return resumeData;
};

export const calculateATSScore = (resumeDataOrText, jobDescription = "") => {
    const resumeData = typeof resumeDataOrText === 'string'
        ? parseResumeFromText(resumeDataOrText)
        : resumeDataOrText;

    let score = {
        overall: 0,
        sections: {
            skills: 0,
            experience: 0,
            formatting: 0,
            headers: 0
        },
        feedback: [],
        benchmark: "Industry Standard V3 (Calibrated)"
    };

    // 1. Keywords Analysis (Weight: 30%)
    // Combine structural data with raw text to ensure no keyword is missed
    const structuralText = JSON.stringify(resumeData).toLowerCase();
    const rawContent = typeof resumeDataOrText === 'string' ? resumeDataOrText.toLowerCase() : structuralText;

    const referenceKeywords = jobDescription
        ? jobDescription.toLowerCase().split(/[ ,.\n]+/).filter(k => k.length > 3)
        : GOLD_STANDARD.keywords.map(k => k.toLowerCase());

    let matchCount = 0;
    referenceKeywords.forEach(kw => {
        if (rawContent.includes(kw) || structuralText.includes(kw)) matchCount++;
    });

    score.sections.skills = Math.min(100, Math.round((matchCount / referenceKeywords.length) * 100));
    if (score.sections.skills < 70) {
        const missing = GOLD_STANDARD.keywords.filter(k => !rawContent.includes(k.toLowerCase()) && !structuralText.includes(k.toLowerCase())).slice(0, 3).join(', ');
        if (missing) score.feedback.push(`Keywords Gap: Missing high-impact terms like ${missing}.`);
    }

    // 2. Formatting & Contact (Weight: 15%)
    let formatScore = 100;
    const hasEmail = resumeData.header?.links?.some(l => l.type?.toLowerCase().includes('email') || l.label?.includes('@')) || rawContent.includes('@');
    const hasLinkedIn = rawContent.includes('linkedin.com') || rawContent.includes('linkedin:');

    if (!hasEmail) { formatScore -= 30; score.feedback.push("CRITICAL: Missing email address."); }
    if (!hasLinkedIn) { formatScore -= 15; score.feedback.push("Missing LinkedIn profile link."); }

    score.sections.formatting = formatScore;

    // 3. Section Headers (Weight: 15%)
    let headerMatches = 0;
    GOLD_STANDARD.sections.forEach(h => {
        const section = resumeData[h] || (h === 'training' ? (resumeData.certifications || []) : []);
        if (section && (Array.isArray(section) ? section.length > 0 : (section.categories && section.categories.length > 0))) {
            headerMatches++;
        }
    });
    score.sections.headers = Math.round((headerMatches / GOLD_STANDARD.sections.length) * 100);
    if (score.sections.headers < 80) {
        score.feedback.push("Structural Gap: Consider adding missing sections like Achievements or specialized Training.");
    }

    // 4. Achievement & Quantification (Weight: 40%)
    let expScore = 0;
    const allText = [
        ...(resumeData.experience || []).flatMap(e => e.description || []),
        ...(resumeData.projects || []).flatMap(p => p.description || []),
        ...(resumeData.achievements || [])
    ];

    if (allText.length > 0) {
        let actionOriented = 0;
        let quantified = 0;

        allText.forEach(bullet => {
            const b = bullet.trim();
            if (/^(optimized|led|developed|engineered|spearheaded|architected|increased|reduced|achieved|delivered|managed|solved|designed|implemented|calculated|created|maintained|monitored|evaluated)/i.test(b)) {
                actionOriented++;
            }
            // Catch more varieties of quantification: percentages, currency, time periods, team sizes, user counts
            if (/\d+[%$]|million|billion|thousand|\d+\+|\d+ (users|clients|problems|developers|members|years|months|projects)/i.test(b)) {
                quantified++;
            }
        });

        const actionRatio = actionOriented / allText.length;
        const quantRatio = quantified / allText.length;

        // Industry benchmark: 30% of bullets should have numbers, 60% should start with action verbs
        expScore = Math.round((Math.min(1, actionRatio / 0.6) * 0.4 + Math.min(1, quantRatio / 0.3) * 0.6) * 100);

        if (quantRatio < 0.2) {
            score.feedback.push("Quantification Tip: Only a few points have numbers. Try to quantify impact (e.g., 'Solved 450+ problems' is better than 'Solved problems').");
        }
    }
    score.sections.experience = expScore;

    // 5. Overall Weighted Total
    score.overall = Math.round(
        score.sections.skills * 0.30 +
        score.sections.experience * 0.40 +
        score.sections.formatting * 0.15 +
        score.sections.headers * 0.15
    );

    return score;
};

export const analyzeWithAI = async (resumeText, jobDescription = "", provider, location = "") => {
    const availableProviders = getAvailableProviders();
    const selectedProvider = provider || availableProviders[0];

    if (!selectedProvider) {
        throw new Error("No AI providers configured. Please check your .env file.");
    }

    try {
        const aiResult = await analyzeResumeWithAI(resumeText, jobDescription, selectedProvider, location);
        return {
            ...aiResult,
            benchmark: `AI Powered (${selectedProvider.toUpperCase()})`
        };
    } catch (error) {
        console.error("AI Analysis failed, falling back to local scoring:", error);
        return {
            ...calculateATSScore(resumeText, jobDescription),
            benchmark: "Local Fallback (AI Failed)"
        };
    }
};
