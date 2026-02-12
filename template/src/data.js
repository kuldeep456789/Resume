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
            { name: "Frameworks & Libraries", items: "React, Node, Flask, Express, DSA, Pandas, NumPy, Matplotlib, TensorFlow, OpenCV" },
            // { name: "Databases", items: "MongoDB, PostgreSQL, Prisma ORM" },
            { name: "Database", items: "MongoDB, PostreSQL" },
            { name: "Developer Tools", items: "Git, Git-Actions, Google colab, JupterNotebook Vercel, Postman" },
            { name: "Soft Skills", items: "Adaptability, Time Management" },
        ],
    },
    experience: [
        {
            company: "Bluestock.in",
            role: "Backend Developer Intern",
            date: "Jun'24 – Jul'24",
            description: [
                "Backend Developer Intern, optimized backend services and APIs to deliver faster response times and improved reliability at scale",
                "Gained expertise in SQL databases (DBMS), data querying, data optimization, and analytical processing.",
            ],
        },
        {
            company: "Outlier.ai",
            role: "AI Intern",
            date: "Oct'24 – Dec'24",
            description: [
                "Artificial Intelligence Intern focused on training and evaluating LLMs, enhancing accuracy and query understanding",
                "Reviewed 500+ AI responses for errors, bias, and accuracy, improving prompt quality and output reliability.",
            ],
        },
    ],
    projects: [
        {
            title: "AgriSmart",
            links: [
                { label: "Github", url: "https://github.com/kuldeep456789" },
                { label: "Link", url: "https://smart-crop-five.vercel.app/" },
            ],
            techStack: "ReactJS, TypeScript, Node.js, Express.js, PostgreSQL",
            date: "Jan'26 – Present",
            description: [
                "Developed an crop recommendation system using soil, climate, and water data to suggest optimal crops via an intelligent platform.",
                "Built an agricultural decision-support platform for data-driven crop selection and profit estimation.",
                "Supported sustainable farming practices by optimizing resource usage and improving crop planning efficiency by 30%.",
            ],
        },
        {
            title: "VisionIQ",
            links: [
                { label: "Github", url: "https://github.com/kuldeep456789" },
                { label: "Link", url: "https://connect-now-lyart.vercel.app/" },
            ],
            techStack: "YOLOv8, DeepSORT, OpenCV, TensorFlow, Flask, React, Recharts",
            date: "Aug'25 – Sep'25",
            description: [
                "Architected real-time crowd detection solutions to detect, track, and count individuals in dense environments with 95% accuracy",
                "Improved detection and tracking pipelines to reliably track objects in crowded scenes with occlusions, overlaps, and fast movement",
                "Identified congestion-prone areas using real-time crowd density analysis and triggered alerts to enable early intervention.",
            ],
        },
        {
            title: "ConnectNow",
            links: [
                { label: "Github", url: "https://github.com/kuldeep456789" },
                { label: "Link", url: "https://connect-now-lyart.vercel.app/" },
            ],
            techStack: "React, Flask, PostgreSQL, Socket.IO, WebRTC, TensorFlow, MediaPipe",
            date: "Oct'25 – Dec'25",
            description: [
                "Engineered live chat and video platforms with P2P video calls, group messaging, and ML-based hand gesture interactions.",
                "Built a WebRTC and Socket.IO architecture enabling low-latency messaging and video streaming.",
                "Integrated real-time gesture inference with adaptive bitrate streaming and connection fallback for reliable communication.",
            ],
        },
    ],
    certifications: [
        {
            name: "Full-Stack Development",
            provider: "Apna College",
            date: "Feb'25",
            link: "https://www.dropbox.com/scl/fi/9am2hz33t74wqgd1mf6ou/kuldeep-fullstack.pdf?rlkey=zbct3akiij62h7vrozsplsggs&dl=0",
        },
        {
            name: "IBM DevOps and Software Engineer",
            provider: "Coursera",
            date: "Aug'24",
            link: "https://www.dropbox.com/scl/fi/o45oz7win5tgmqgvz8llm/Devops-certificate.pdf?rlkey=ihncxgfu18l91o66zr6fursc1&dl=0",
        },
        {
            name: "Data Structures and Algorithms",
            provider: "CipherSchool",
            date: "Aug'24",
            link: "https://www.dropbox.com/scl/fi/rqm41dmcez9yof5f0tybx/cipher_school-java-summer-term.pdf?rlkey=fviwsgibcx61lpzlsxdl6oprz&dl=0",
        },
    ],
    achievements: [
        "Smart India Hackathon: Qualified in the top 1% among 1000+ participants by developing a crop advisory solution that delivers region-specific crop recommendations with profitability insights using soil conditions, weather patterns, and historical farming data.",
        "Solved 450+ DSA problems using Python to strengthen problem-solving and algorithmic thinking skills.",
    ],
    education: [
        {
            institution: "Lovely Professional University",
            location: "Punjab, India",
            degree: "B.Tech in Computer Science",
            date: "Nov'22 – Present",
        },
        {
            institution: "Gossner College",
            location: "Jharkhand, India",
            degree: "Senior Secondary School - Science",
            date: "Mar'20 – May'22",
        },
        {
            institution: "L.A. Garden High School",
            location: "Jharkhand, India",
            degree: "Secondary School",
            date: "Aug'18 – May'19",
        },
    ],
    settings: {
        themeColor: "#332293",
        fontFamily: "Georgia, serif",
    }
};
