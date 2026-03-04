import React, { useState } from 'react';
import {
    X, Upload, FileJson, FileText, CheckCircle2, ChevronRight,
    Code2, Layout, Server, Brain, BarChart3, Terminal, Smartphone, Palette, Briefcase,
    TrendingUp, DollarSign, Building2
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import ATSScoreCard from './ATSScoreCard';
import MarketIntelligence from './MarketIntelligence';
import { calculateATSScore, analyzeWithAI } from '../services/ats/atsEngine';
import { getAvailableProviders } from '../services/llmService';
import { SKILL_DATABASE, TRENDING_SKILLS, HIRING_COMPANIES, SALARY_RANGES } from '../services/ats/skillDatabase';

// Set worker source for pdfjs - using the bundled worker from the package
// This is the recommended way for Vite to handle the worker
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ResumeUploadModal = ({ isOpen, onClose, onUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, processing, success, results
    const [atsResults, setAtsResults] = useState(null);
    const [tempData, setTempData] = useState(null);
    const [scanLog, setScanLog] = useState('');
    const [isLocalMode, setIsLocalMode] = useState(false);
    const [selectedRole, setSelectedRole] = useState("Full Stack Developer");
    const [userLocation, setUserLocation] = useState("");

    React.useEffect(() => {
        if (navigator.geolocation) {
            try {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        try {
                            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
                            const data = await response.json();
                            const city = data.address.city || data.address.town || data.address.village || "";
                            setUserLocation(city);
                        } catch (error) {
                            console.warn("Modal reverse geocoding failed.");
                        }
                    },
                    (error) => {
                        // Silent fallback
                    }
                );
            } catch (err) {
                // Silent fallback
            }
        }
    }, []);

    const roleIcons = {
        "Full Stack Developer": <Code2 size={18} />,
        "Frontend Developer": <Layout size={18} />,
        "Backend Developer": <Server size={18} />,
        "AI/ML Engineer": <Brain size={18} />,
        "Data Scientist": <BarChart3 size={18} />,
        "DevOps Engineer": <Terminal size={18} />,
        "Mobile Developer": <Smartphone size={18} />,
        "UI/UX Designer": <Palette size={18} />,
        "Product Manager": <Briefcase size={18} />
    };

    const scanSteps = [
        "Analyzing resume structure...",
        "Scanning for keywords...",
        "Checking contact information...",
        "Evaluating experience metrics...",
        "Verifying formatting...",
        "Calculating ATS score..."
    ];

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const extractTextFromPDF = async (file) => {
        console.log("Starting PDF extraction for:", file.name);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            console.log(`PDF loaded: ${pdf.numPages} pages found.`);
            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + "\n";
                console.log(`Page ${i} extracted.`);
            }
            return fullText;
        } catch (error) {
            console.error("PDF Extraction failed:", error);
            throw error;
        }
    };

    const processFile = async (file) => {
        // SECURITY STEP: File size limit (e.g., 5MB)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            alert("Security Alert: File is too large. Max limit is 5MB.");
            return;
        }

        // SECURITY STEP: Filename sanitization (basic)
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        console.log(`Processing sanitized file: ${safeName}`);

        setUploadStatus('processing');

        // Dynamic scan log effect
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < scanSteps.length) {
                setScanLog(scanSteps[logIndex]);
                logIndex++;
            } else {
                clearInterval(logInterval);
            }
        }, 600);

        try {
            let extractedData;
            let rawText = "";

            if (file.name.endsWith('.json') && (file.type === 'application/json' || file.type === '')) {
                const reader = new FileReader();
                const jsonPromise = new Promise((resolve, reject) => {
                    reader.onload = (e) => {
                        try {
                            resolve(JSON.parse(e.target.result));
                        } catch (err) {
                            reject(new Error("Invalid JSON structure"));
                        }
                    };
                    reader.onerror = () => reject(new Error("File read error"));
                    reader.readAsText(file);
                });
                const jsonData = await jsonPromise;
                extractedData = jsonData;
                rawText = JSON.stringify(jsonData, null, 2);
            } else if (file.name.endsWith('.pdf') && (file.type === 'application/pdf' || file.type === '')) {
                rawText = await extractTextFromPDF(file);
            } else {
                alert("Security Alert: Invalid file type. Only .pdf and .json are allowed.");
                clearInterval(logInterval);
                setUploadStatus('idle');
                return;
            }

            // Prepare "Job Description" based on selected role
            const roleSkills = SKILL_DATABASE[selectedRole] || [];
            const jobDescription = `Target Role: ${selectedRole}. Required Skills: ${roleSkills.join(', ')}`;

            // Decide whether to use AI or local scan
            const availableProviders = getAvailableProviders();
            let finalResults;

            if (availableProviders.length > 0) {
                setScanLog(`Initializing AI Analysis for ${selectedRole}...`);
                finalResults = await analyzeWithAI(rawText || JSON.stringify(extractedData), jobDescription, availableProviders[0], userLocation);
                setIsLocalMode(false);
            } else {
                finalResults = calculateATSScore(rawText || extractedData, jobDescription);
                setIsLocalMode(true);
            }

            setAtsResults(finalResults);
            setTempData(extractedData || finalResults);

            // Ensure animation finishes
            setTimeout(() => {
                clearInterval(logInterval);
                setUploadStatus('success');
                setTimeout(() => {
                    setUploadStatus('results');
                }, 800);
            }, 2000);
        } catch (err) {
            clearInterval(logInterval);
            console.error("Upload error:", err);
            alert("Error processing file. Please ensure it is a valid PDF or JSON resume.");
            setUploadStatus('idle');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
        }}>
            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.5s ease-out forwards;
                    }
                    .animate-spin {
                        animation: spin 1s linear infinite;
                    }
                    @keyframes scan {
                        0% { top: 0%; opacity: 0; }
                        50% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                    }
                    .animate-scan {
                        position: absolute;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: var(--gold-accent);
                        box-shadow: 0 0 15px var(--gold-accent);
                        z-index: 5;
                        animation: scan 2s linear infinite;
                    }
                `}
            </style>

            <div style={{
                background: '#1a1a1a',
                width: '100%',
                maxWidth: uploadStatus === 'results' ? '900px' : '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: '24px',
                padding: uploadStatus === 'results' ? '30px' : '40px',
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                transition: 'max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    zIndex: 10
                }}>
                    <X size={24} />
                </button>

                {uploadStatus === 'results' ? (
                    <div className="animate-fade-in">
                        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 400px' }}>
                                <ATSScoreCard score={atsResults} role={selectedRole} />
                                <button
                                    onClick={() => {
                                        onUpload(tempData);
                                        onClose();
                                        setUploadStatus('idle');
                                        setAtsResults(null);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        background: 'var(--gold-accent)',
                                        color: 'black',
                                        fontWeight: '800',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        fontSize: '1rem',
                                        boxShadow: '0 10px 20px -5px rgba(212, 175, 55, 0.3)'
                                    }}
                                >
                                    Continue to Dashboard <ChevronRight size={18} />
                                </button>
                            </div>
                            <div style={{ flex: '1 1 300px' }}>
                                <MarketIntelligence role={selectedRole} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px', textAlign: 'center' }}>
                            Upload <span style={{ color: 'var(--gold-accent)' }}>Resume</span>
                        </h2>
                        <p style={{ textAlign: 'center', color: '#888', marginBottom: '20px', fontSize: '0.9rem' }}>
                            {uploadStatus === 'processing' ? 'Processing your data...' : 'Select your target role and upload your resume for a precise ATS scan.'}
                        </p>

                        {/* Role Selection Grid */}
                        {uploadStatus === 'idle' && (
                            <div style={{ marginBottom: '30px' }}>
                                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Select Target Role
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                    {Object.keys(SKILL_DATABASE).map(role => (
                                        <div
                                            key={role}
                                            onClick={() => setSelectedRole(role)}
                                            style={{
                                                padding: '16px 12px',
                                                borderRadius: '16px',
                                                border: `1px solid ${selectedRole === role ? 'var(--gold-accent)' : 'rgba(255,255,255,0.05)'}`,
                                                background: selectedRole === role ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.02)',
                                                color: selectedRole === role ? 'var(--gold-accent)' : '#aaa',
                                                fontSize: '0.8rem',
                                                fontWeight: selectedRole === role ? '700' : '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '8px',
                                                boxShadow: selectedRole === role ? '0 8px 20px -8px rgba(212, 175, 55, 0.4)' : 'none',
                                                transform: selectedRole === role ? 'translateY(-2px)' : 'none'
                                            }}
                                        >
                                            <div style={{ opacity: selectedRole === role ? 1 : 0.6 }}>
                                                {roleIcons[role]}
                                            </div>
                                            {role}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragging(false);
                                const file = e.dataTransfer.files[0];
                                if (file) processFile(file);
                            }}
                            style={{
                                border: `2px dashed ${isDragging ? 'var(--gold-accent)' : 'rgba(255, 255, 255, 0.1)'}`,
                                borderRadius: '20px',
                                padding: '40px 20px',
                                textAlign: 'center',
                                background: isDragging ? 'rgba(212, 175, 55, 0.05)' : 'rgba(255,255,255,0.02)',
                                transition: 'all 0.2s ease',
                                cursor: uploadStatus === 'idle' ? 'pointer' : 'default'
                            }}
                            onClick={() => uploadStatus === 'idle' && document.getElementById('fileInput').click()}
                        >
                            <input
                                id="fileInput"
                                type="file"
                                accept=".json,.pdf,.doc,.docx"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />

                            {uploadStatus === 'success' ? (
                                <div style={{ color: '#22c55e' }}>
                                    <CheckCircle2 size={48} style={{ marginBottom: '15px' }} />
                                    <div style={{ fontWeight: '700' }}>Analysis Complete!</div>
                                    <div style={{ fontSize: '0.65rem', color: '#888', marginTop: '5px' }}>
                                        {atsResults?.benchmark || "Calibrated"}
                                    </div>
                                </div>
                            ) : uploadStatus === 'processing' ? (
                                <div style={{ position: 'relative', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="animate-scan"></div>
                                    <div className="animate-spin" style={{
                                        border: '4px solid rgba(255,255,255,0.1)',
                                        borderTop: '4px solid var(--gold-accent)',
                                        borderRadius: '50%',
                                        width: '40px',
                                        height: '40px',
                                        marginBottom: '20px'
                                    }}></div>
                                    <div style={{
                                        fontFamily: "'Space Mono', monospace",
                                        fontSize: '0.75rem',
                                        color: 'var(--gold-accent)',
                                        background: 'rgba(0,0,0,0.3)',
                                        padding: '4px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid rgba(197, 163, 99, 0.2)',
                                        textAlign: 'center'
                                    }}>
                                        [{isLocalMode ? 'LOCAL SCAN' : 'AI SCAN'}] Analyzing...
                                        <div style={{ fontSize: '0.65rem', opacity: 0.7, marginTop: '4px' }}>{scanLog}</div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Upload size={48} style={{ color: 'var(--gold-accent)', marginBottom: '15px', opacity: 0.8 }} />
                                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                                        Drag and drop your file here
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                        Support for .json (ATS Optimized Format)
                                    </div>
                                </>
                            )}
                        </div>


                        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={{
                                padding: '15px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <FileJson size={20} style={{ color: '#6366f1' }} />
                                <div style={{ fontSize: '0.8rem' }}>JSON Import</div>
                            </div>
                            <div style={{
                                padding: '15px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <FileText size={20} style={{ color: '#ec4899' }} />
                                <div style={{ fontSize: '0.8rem' }}>PDF / Word <br /><span style={{ fontSize: '10px' }}>(Local NLP)</span></div>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            style={{
                                width: '100%',
                                marginTop: '30px',
                                padding: '12px',
                                borderRadius: '12px',
                                background: 'white',
                                color: 'black',
                                fontWeight: '700',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResumeUploadModal;
