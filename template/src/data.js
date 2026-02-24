export const initialResumeState = {
    header: {
        name: "Kuldeep Prajapati",
        links: [
            { label: "linkedin.com/in/Kuldeep023", url: "https://linkedin.com/in/Kuldeep023", type: "LinkedIn" },
            { label: "github.com/kuldeep456789", url: "https://github.com/kuldeep456789", type: "GitHub" },
            { label: "kuldeeppraj2002@gmail.com", url: "mailto:kuldeeppraj2002@gmail.com", type: "Email" },
            { label: "+91 82354 94985", url: "tel:+918235494985", type: "Mobile" },
        ],
    },
    skills: {
        categories: [
            { name: "Programming Languages", items: "Python, JavaScript, HTML/CSS, SQL" },
            { name: "Frameworks & Libraries", items: "React, Node.js, Flask, Express, Pandas, NumPy, Matplotlib, TensorFlow, OpenCV" },
            { name: "Databases", items: "MongoDB, PostgreSQL, MySQL" },
            { name: "Developer Tools", items: "Git, GitHub Actions, Google Colab, Jupyter Notebook, Vercel, Postman" },
            { name: "Soft Skills", items: "Adaptability, Time Management, Collaborative Problem Solving" },
        ],
    },
    experience: [
        {
            company: "Bluestock.in",
            category: "Software Development",
            role: "Backend Developer Intern",
            date: "June 2024 – July 2024",
            description: [
                "Optimized backend services and REST APIs using Node.js and SQL, reducing average response latency by 30% for 5,000+ daily active users.",
                "Spearheaded scalable data querying and optimization strategies to improve analytical processing speed by 25% across distributed databases.",
            ],
        },
        {
            company: "Outlier.ai",
            category: "Artificial Intelligence",
            role: "AI Intern",
            date: "October 2024 – December 2024",
            description: [
                "Trained and evaluated Large Language Models (LLMs), enhancing model response accuracy by 20% through query refinement and RLHF strategies.",
                "Systematically audited 500+ LLM outputs for bias and logical errors, reducing model hallucination rates by 15% via precise RLHF feedback.",
            ],
        },
    ],
    projects: [
        {
            title: "AgriSmart",
            links: [
                { label: "GitHub", url: "https://github.com/kuldeep456789" },
                { label: "Link", url: "https://smart-crop-five.vercel.app/" },
            ],
            techStack: "React, TypeScript, Node.js, Express, PostgreSQL",
            date: "January 2026 – Present",
            description: [
                "Engineered an intelligent crop recommendation system using soil and climate data, achieving 94% prediction accuracy for regional farmers.",
                "Architected a decision-support dashboard for strategic crop selection and yield-based profit maximization.",
                "Streamlined resource usage and improved regional crop planning efficiency by 30% through sustainable farming insights.",
            ],
        },
        {
            title: "VisionIQ",
            links: [
                { label: "GitHub", url: "https://github.com/kuldeep456789" },
                { label: "Link", url: "https://connect-now-lyart.vercel.app/" },
            ],
            techStack: "YOLOv8, DeepSORT, OpenCV, TensorFlow, Flask, React, Recharts",
            date: "August 2025 – September 2025",
            description: [
                "Architected real-time crowd detection solutions to detect, track, and count individuals in dense environments with 95% accuracy.",
                "Pioneered robust object tracking architectures to reliably monitor dense scenes with complex occlusions and overlaps.",
                "Devised real-time density analysis tools to trigger automated alerts, reducing congestion-prone incidents by 40% in high-traffic areas.",
            ],
        },
        {
            title: "ConnectNow",
            links: [
                { label: "GitHub", url: "https://github.com/kuldeep456789" },
                { label: "Link", url: "https://connect-now-lyart.vercel.app/" },
            ],
            techStack: "React, Flask, PostgreSQL, Socket.IO, WebRTC, TensorFlow, MediaPipe",
            date: "October 2025 – December 2025",
            description: [
                "Architected live communication platforms featuring P2P video and ML-driven gesture interactions with sub-100ms latency.",
                "Integrated WebRTC and Socket.IO architecture to enable high-concurrency group messaging and 98% connection reliability.",
                "Optimized real-time gesture inference with adaptive bitrate streaming, reducing data overhead by 25% for low-bandwidth environments.",
            ],
        },
    ],
    certifications: [
        {
            name: "Full-Stack Development",
            provider: "Apna College",
            date: "February 2025",
            link: "https://www.dropbox.com/scl/fi/9am2hz33t74wqgd1mf6ou/kuldeep-fullstack.pdf?rlkey=zbct3akiij62h7vrozsplsggs&dl=0",
        },
        {
            name: "IBM DevOps and Software Engineer",
            provider: "Coursera",
            date: "August 2024",
            link: "https://www.dropbox.com/scl/fi/o45oz7win5tgmqgvz8llm/Devops-certificate.pdf?rlkey=ihncxgfu18l91o66zr6fursc1&dl=0",
        },
        {
            name: "Data Structures and Algorithms",
            provider: "CipherSchools",
            date: "August 2024",
            link: "https://www.dropbox.com/scl/fi/rqm41dmcez9yof5f0tybx/cipher_school-java-summer-term.pdf?rlkey=fviwsgibcx61lpzlsxdl6oprz&dl=0",
        },
    ],
    achievements: [
        "Smart India Hackathon: Finalist (Ranked in Top 1%) for architecting a region-specific crop advisory solution with yield-based profit estimation.",
        "Solved 450+ LeetCode problems, ranking in the top 5% globally for consistency and algorithmic efficiency.",
    ],


    education: [
        {
            institution: "Lovely Professional University",
            location: "Punjab, India",
            degree: "B.Tech in Computer Science",
            date: "November 2022 – Present",
        },
        {
            institution: "Gossner College",
            location: "Jharkhand, India",
            degree: "Higher Secondary Education (Science)",
            date: "March 2020 – May 2022",
        },
        {
            institution: "L.A. Garden High School",
            location: "Jharkhand, India",
            degree: "Secondary School (Class X)",
            date: "August 2018 – May 2019",
        },
    ],
    settings: {
        themeColor: "#004AAD",
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    sectionTitles: {
        skills: "SKILLS",
        experience: "INTERNSHIP",
        projects: "PROJECTS",
        certifications: "TRAINING",
        achievements: "ACHIEVEMENTS",
        education: "EDUCATION"
    }
};
