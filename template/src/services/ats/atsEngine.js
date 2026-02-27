/**
 * ATS Scoring Engine
 * Analyzes resume data against job descriptions or general best practices.
 */

export const parseResumeFromText = (text) => {
    const lines = text.split('\n');
    let resumeData = {
        header: { name: "", links: [] },
        experience: [],
        skills: { categories: [] },
        education: []
    };

    let currentSection = "";
    lines.forEach(line => {
        const cleanLine = line.trim();
        if (!cleanLine) return;

        // Try to identify section headers
        if (/experience|work history/i.test(cleanLine) && cleanLine.length < 20) {
            currentSection = "experience";
        } else if (/skills|tech stack/i.test(cleanLine) && cleanLine.length < 15) {
            currentSection = "skills";
        } else if (/education/i.test(cleanLine) && cleanLine.length < 15) {
            currentSection = "education";
        } else if (/github|linkedin|mailto|@/i.test(cleanLine)) {
            // Very simple contact extraction
            if (cleanLine.includes('@')) {
                resumeData.header.links.push({ type: 'Email', label: cleanLine });
            }
        } else if (currentSection === "experience" && cleanLine.startsWith('•')) {
            // Rough bullet point collection
            if (resumeData.experience.length === 0) resumeData.experience.push({ description: [] });
            resumeData.experience[0].description.push(cleanLine.substring(1).trim());
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
        feedback: []
    };

    // 1. Keyword Matching (Skills)
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    const jdKeywords = jobDescription.toLowerCase().split(/[ ,.\n]+/).filter(k => k.length > 3);

    let matchedKeywords = 0;
    if (jdKeywords.length > 0) {
        jdKeywords.forEach(kw => {
            if (resumeText.includes(kw)) matchedKeywords++;
        });
        score.sections.skills = Math.min(100, Math.round((matchedKeywords / jdKeywords.length) * 100));
    } else {
        // Fallback: Check if skills section is well-populated
        const skillCount = resumeData.skills?.categories?.reduce((acc, cat) => acc + (cat.items?.split(',').length || 0), 0) || 0;
        score.sections.skills = Math.min(100, skillCount * 5);
        if (skillCount < 10) score.feedback.push("Add more specific technical skills to your Skills section.");
    }

    // 2. Formatting Compatibility
    // Check for "bad" formatting signs in data (e.g., too many nested columns if we were parsing PDF, 
    // but here we check if crucial contact info is missing)
    let formattingScore = 100;
    if (!resumeData.header?.links?.some(l => l.type === 'Email')) {
        formattingScore -= 20;
        score.feedback.push("Missing Email address in header.");
    }
    if (!resumeData.header?.links?.some(l => l.type === 'Mobile')) {
        formattingScore -= 10;
        score.feedback.push("Missing Mobile number.");
    }
    score.sections.formatting = formattingScore;

    // 3. Section Headers
    const requiredHeaders = ["experience", "education", "skills"];
    let headerMatches = 0;
    requiredHeaders.forEach(h => {
        if (resumeData[h] && (Array.isArray(resumeData[h]) ? resumeData[h].length > 0 : true)) {
            headerMatches++;
        }
    });
    score.sections.headers = Math.round((headerMatches / requiredHeaders.length) * 100);
    if (headerMatches < requiredHeaders.length) {
        score.feedback.push("Ensure you have Experience, Education, and Skills sections.");
    }

    // 4. Experience & Bullet Strength
    let expScore = 0;
    if (resumeData.experience && resumeData.experience.length > 0) {
        let totalBullets = 0;
        let strongBullets = 0;
        let quantifiedBullets = 0;

        resumeData.experience.forEach(exp => {
            exp.description?.forEach(bullet => {
                totalBullets++;
                // Check for action verbs (simple list)
                if (/^(Optimized|Led|Developed|Engineered|Spearheaded|Architected|Increased|Reduced|Trained|Solved)/i.test(bullet)) {
                    strongBullets++;
                }
                // Check for numbers (quantification)
                if (/\d+%|\d+\+|\$\d+/.test(bullet)) {
                    quantifiedBullets++;
                }
            });
        });

        if (totalBullets > 0) {
            expScore = Math.round(((strongBullets / totalBullets) * 0.5 + (quantifiedBullets / totalBullets) * 0.5) * 100);
        }

        if (quantifiedBullets < totalBullets / 2) {
            score.feedback.push("Try to quantify more of your achievements (e.g., 'Increased efficiency by 20%').");
        }
    }
    score.sections.experience = Math.min(100, expScore + 20); // Base score for having experience

    // Overall Weighted Score
    score.overall = Math.round(
        score.sections.skills * 0.4 +
        score.sections.experience * 0.3 +
        score.sections.formatting * 0.15 +
        score.sections.headers * 0.15
    );

    return score;
};
