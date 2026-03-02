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
    ],
    "Data Scientist": [
        "Python", "R", "SQL", "Statistics", "Machine Learning", "Data Visualization", "Tableau", "Power BI", "Pandas", "Scikit-Learn", "Matplotlib"
    ],
    "DevOps Engineer": [
        "Docker", "Kubernetes", "AWS", "Azure", "Terraform", "Jenkins", "CI/CD", "Linux", "Shell Scripting", "Monitoring", "Prometheus", "Ansible"
    ],
    "Mobile Developer": [
        "React Native", "Flutter", "Swift", "Kotlin", "Java", "iOS", "Android", "Mobile UI", "Firebase", "App Store Deployment"
    ],
    "UI/UX Designer": [
        "Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Wireframing", "Visual Design", "Typography", "Color Theory"
    ],
    "Product Manager": [
        "Product Roadmap", "Agile", "Scrum", "User Stories", "Market Research", "Stakeholder Management", "Product Analytics", "Jira"
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
    "Full Stack Developer": "$80k - $160k",
    "Frontend Developer": "$70k - $140k",
    "Backend Developer": "$85k - $170k",
    "AI/ML Engineer": "$100k - $200k",
    "Data Scientist": "$90k - $180k",
    "DevOps Engineer": "$95k - $185k",
    "Mobile Developer": "$80k - $155k",
    "UI/UX Designer": "$65k - $130k",
    "Product Manager": "$90k - $175k"
};
