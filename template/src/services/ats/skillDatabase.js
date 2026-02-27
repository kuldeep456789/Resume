/**
 * Static database of skills and benchmark data for different tech roles.
 */

export const SKILL_DATABASE = {
    "Full Stack Developer": [
        "React", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "Docker", "AWS", "Git", "REST APIs", "GraphQL", "Express", "Tailwind CSS", "Redux", "Next.js", "Prisma", "CI/CD"
    ],
    "Frontend Developer": [
        "React", "Vue", "Angular", "JavaScript", "HTML/CSS", "TypeScript", "Tailwind CSS", "Redux", "Webpack", "Vite", "Responsive Design", "SASS"
    ],
    "Backend Developer": [
        "Node.js", "Python", "Go", "Java", "PostgreSQL", "MySQL", "Redis", "Docker", "Kubernetes", "AWS", "Google Cloud", "Microservices", "REST APIs", "gRPC"
    ],
    "AI/ML Engineer": [
        "Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy", "LLMs", "NLP", "Computer Vision", "OpenCV", "Keras"
    ]
};

export const TRENDING_SKILLS = [
    { name: "Next.js", growth: "+45%", demand: "High" },
    { name: "TypeScript", growth: "+38%", demand: "Critical" },
    { name: "Docker", growth: "+22%", demand: "Medium" },
    { name: "AWS", growth: "+15%", demand: "High" },
    { name: "PostgreSQL", growth: "+12%", demand: "High" },
    { name: "Tailwind CSS", growth: "+30%", demand: "High" }
];

export const HIRING_COMPANIES = [
    { name: "Google", logo: "https://www.google.com/favicon.ico", roles: 12 },
    { name: "Amazon", logo: "https://www.amazon.com/favicon.ico", roles: 8 },
    { name: "Stripe", logo: "https://www.stripe.com/favicon.ico", roles: 5 },
    { name: "Microsoft", logo: "https://www.microsoft.com/favicon.ico", roles: 15 }
];

export const SALARY_RANGES = {
    "Full Stack": "$80k - $160k",
    "Frontend": "$70k - $140k",
    "Backend": "$85k - $170k",
    "AI/ML": "$100k - $200k"
};
