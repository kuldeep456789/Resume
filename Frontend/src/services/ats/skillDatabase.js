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
    // Premium / Top Tier
    { name: "Google", logo: "https://www.google.com/favicon.ico", roles: 145, locations: ["Mountain View", "Bangalore", "London", "Zurich"], tier: "Premium" },
    { name: "Amazon", logo: "https://www.amazon.com/favicon.ico", roles: 230, locations: ["Seattle", "Hyderabad", "Berlin", "Dublin"], tier: "Premium" },
    { name: "Microsoft", logo: "https://www.microsoft.com/favicon.ico", roles: 180, locations: ["Redmond", "Bangalore", "Vancouver", "Prague"], tier: "Premium" },
    { name: "Meta", logo: "https://www.facebook.com/favicon.ico", roles: 85, locations: ["Menlo Park", "London", "Singapore", "Tel Aviv"], tier: "Premium" },

    // High Growth / Startups
    { name: "Stripe", logo: "https://www.stripe.com/favicon.ico", roles: 42, locations: ["San Francisco", "Dublin", "Singapore", "Bangalore"], tier: "High Growth" },
    { name: "Uber", logo: "https://www.uber.com/favicon.ico", roles: 64, locations: ["San Francisco", "Bangalore", "Amsterdam", "Hyderabad"], tier: "High Growth" },
    { name: "Zomato", logo: "https://www.zomato.com/favicon.ico", roles: 28, locations: ["Gurugram", "Bangalore", "Mumbai"], tier: "High Growth" },
    { name: "Swiggy", logo: "https://www.swiggy.com/favicon.ico", roles: 32, locations: ["Bangalore", "Hyderabad", "Gurugram"], tier: "High Growth" },
    { name: "PhonePe", logo: "https://www.phonepe.com/favicon.ico", roles: 45, locations: ["Bangalore", "Mumbai"], tier: "High Growth" },

    // Established / Good Companies
    { name: "TCS", logo: "https://www.tcs.com/favicon.ico", roles: 1200, locations: ["Mumbai", "Bangalore", "Hyderabad", "London"], tier: "Established" },
    { name: "Oracle", logo: "https://www.oracle.com/favicon.ico", roles: 95, locations: ["Austin", "Bangalore", "Hyderabad", "Reading"], tier: "Established" },
    { name: "JPMC", logo: "https://www.jpmorganchase.com/favicon.ico", roles: 110, locations: ["New York", "London", "Mumbai", "Bangalore"], tier: "Established" },
    { name: "Bloomberg", logo: "https://www.bloomberg.com/favicon.ico", roles: 55, locations: ["New York", "London", "Hong Kong"], tier: "Established" },
    { name: "Canva", logo: "https://www.canva.com/favicon.ico", roles: 35, locations: ["Sydney", "Melbourne", "London", "Austin"], tier: "High Growth" }
];

export const LOCATION_MAPPING = {
    "India": {
        "Bangalore": ["Google", "Microsoft", "Uber", "Stripe", "Zomato"],
        "Hyderabad": ["Amazon", "Microsoft", "Uber", "Oracle"],
        "Gurugram": ["Zomato", "Google", "MakeMyTrip"],
        "Mumbai": ["TCS", "JPMC", "Zomato"]
    },
    "USA": {
        "San Francisco": ["Stripe", "Uber", "Meta", "OpenAI"],
        "Seattle": ["Amazon", "Microsoft", "Starbucks"],
        "New York": ["Bloomberg", "JPMC", "Google"]
    },
    "Europe": {
        "London": ["Google", "Meta", "DeepMind", "Revolut"],
        "Berlin": ["Amazon", "Zalando", "HelloFresh"]
    }
};

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
