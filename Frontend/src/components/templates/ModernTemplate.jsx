import React from 'react';
import '../Resume.css';
import './ModernTemplate.css';

const ModernTemplate = React.forwardRef(({ data }, ref) => {
    const { header, skills, experience, projects, certifications, achievements, education, settings, sectionTitles } = data;

    // SECURITY: URL Sanitization to prevent javascript: XSS
    const sanitizeUrl = (url) => {
        if (!url) return "#";
        const trimmed = url.trim().toLowerCase();
        if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
            console.warn("Blocked potentially dangerous URL:", url);
            return "#";
        }
        return url;
    };

    const style = {
        '--theme-color': settings.themeColor,
        '--font-family': settings.fontFamily,
    };

    const titles = sectionTitles || {
        skills: "SKILLS",
        experience: "INTERNSHIP",
        projects: "PROJECTS",
        certifications: "TRAINING",
        achievements: "ACHIEVEMENTS",
        education: "EDUCATION"
    };

    return (
        <div className="resume-container modern-resume" ref={ref} style={style}>
            {/* HEADER */}
            <div className="modern-header" style={{ backgroundColor: 'var(--theme-color)', color: 'white' }}>
                <h1 style={{ color: 'white' }}>{header.name}</h1>
                <div className="modern-contact-info">
                    {header.links.map((link, i) => (
                        <span key={i} className="modern-contact-item">
                            <a href={sanitizeUrl(link.url)} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                                {link.label}
                            </a>
                        </span>
                    ))}
                </div>
            </div>

            <div className="modern-content">
                {/* SKILLS */}
                {skills.categories.length > 0 && (
                    <div className="section modern-section">
                        <div className="modern-section-title">{titles.skills}</div>
                        <div className="modern-section-content">
                            <ul className="skill-list modern-skill-list">
                                {skills.categories.map((cat, i) => (
                                    <li key={i} className="skill-category">
                                        <strong style={{ color: 'var(--theme-color)' }}>{cat.name}:</strong> {cat.items}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* INTERNSHIP */}
                {experience.length > 0 && (
                    <div className="section modern-section">
                        <div className="modern-section-title">{titles.experience}</div>
                        <div className="modern-section-content">
                            {experience.map((exp, i) => (
                                <div className="modern-item" key={i}>
                                    <div className="modern-item-header">
                                        <h3 style={{ color: 'var(--theme-color)' }}>{exp.company} {exp.role && <span className="modern-role">| {exp.role}</span>}</h3>
                                        <span className="modern-date">{exp.date}</span>
                                    </div>
                                    <ul className="item-description">
                                        {exp.description.map((desc, d) => (
                                            <li key={d}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PROJECTS */}
                {projects.length > 0 && (
                    <div className="section modern-section">
                        <div className="modern-section-title">{titles.projects}</div>
                        <div className="modern-section-content">
                            {projects.map((proj, i) => (
                                <div className="modern-item" key={i}>
                                    <div className="modern-item-header">
                                        <h3 style={{ color: 'var(--theme-color)' }}>
                                            {proj.title}
                                            {(proj.links || []).map((link, l) => (
                                                <span key={l} className="modern-link"> | <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a></span>
                                            ))}
                                        </h3>
                                        <span className="modern-date">{proj.date}</span>
                                    </div>
                                    <div className="modern-subtitle">{proj.techStack}</div>
                                    {proj.summary && <p className="modern-summary">{proj.summary}</p>}
                                    <ul className="item-description">
                                        {proj.description.map((desc, d) => (
                                            <li key={d}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CERTIFICATIONS */}
                {certifications.length > 0 && (
                    <div className="section modern-section">
                        <div className="modern-section-title">{titles.certifications}</div>
                        <div className="modern-section-content">
                            <ul className="certificates-list modern-cert-list">
                                {certifications.map((cert, i) => (
                                    <li key={i}>
                                        <a href={sanitizeUrl(cert.link)} target="_blank" rel="noopener noreferrer">
                                            <strong style={{ color: 'var(--theme-color)' }}>{cert.name}</strong>
                                        </a>
                                        {' | '}{cert.provider}
                                        <span style={{ float: 'right' }}>{cert.date}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* EDUCATION */}
                {education.length > 0 && (
                    <div className="section modern-section">
                        <div className="modern-section-title">{titles.education}</div>
                        <div className="modern-section-content">
                            {education.map((edu, i) => (
                                <div className="modern-item" key={i} style={{ marginBottom: '8px' }}>
                                    <div className="modern-item-header">
                                        <h3 style={{ color: 'var(--theme-color)' }}>{edu.institution}</h3>
                                        <span className="modern-date">{edu.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{edu.degree}</span>
                                        <span>{edu.location}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ACHIEVEMENTS */}
                {achievements.length > 0 && (
                    <div className="section modern-section">
                        <div className="modern-section-title">{titles.achievements}</div>
                        <div className="modern-section-content">
                            <ul className="achievements-list">
                                {achievements.map((ach, i) => (
                                    <li key={i}>{ach}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default ModernTemplate;
