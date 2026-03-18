import React from 'react';
import '../Resume.css';
import './MinimalistTemplate.css';

const MinimalistTemplate = React.forwardRef(({ data }, ref) => {
    const { header, skills, experience, projects, certifications, achievements, education, settings, sectionTitles } = data;

    const sanitizeUrl = (url) => {
        if (!url) return "#";
        const trimmed = url.trim().toLowerCase();
        if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
            return "#";
        }
        return url;
    };

    const style = {
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
        <div className="resume-container minimalist-resume" ref={ref} style={style}>
            {/* HEADER */}
            <div className="minimalist-header">
                <h1>{header.name}</h1>
                <div className="minimalist-contact-info">
                    {header.links.map((link, i) => (
                        <React.Fragment key={i}>
                            <a href={sanitizeUrl(link.url)} target="_blank" rel="noopener noreferrer">
                                {link.label}
                            </a>
                            {i < header.links.length - 1 && <span className="minimalist-separator">|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="minimalist-content">
                {/* EDUCATION */}
                {education.length > 0 && (
                    <div className="minimalist-section">
                        <div className="minimalist-section-title">{titles.education}</div>
                        <div className="minimalist-section-content">
                            {education.map((edu, i) => (
                                <div className="minimalist-item" key={i}>
                                    <div className="minimalist-item-row">
                                        <strong>{edu.institution}</strong>
                                        <span>{edu.date}</span>
                                    </div>
                                    <div className="minimalist-item-row">
                                        <i>{edu.degree}</i>
                                        <span>{edu.location}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SKILLS */}
                {skills.categories.length > 0 && (
                    <div className="minimalist-section">
                        <div className="minimalist-section-title">{titles.skills}</div>
                        <div className="minimalist-section-content">
                            <ul className="minimalist-skill-list">
                                {skills.categories.map((cat, i) => (
                                    <li key={i}>
                                        <strong>{cat.name}:</strong> {cat.items}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* EXPERIENCE */}
                {experience.length > 0 && (
                    <div className="minimalist-section">
                        <div className="minimalist-section-title">{titles.experience}</div>
                        <div className="minimalist-section-content">
                            {experience.map((exp, i) => (
                                <div className="minimalist-item" key={i}>
                                    <div className="minimalist-item-row">
                                        <strong>{exp.company}</strong>
                                        <span>{exp.date}</span>
                                    </div>
                                    <div className="minimalist-item-row">
                                        <i>{exp.role}</i>
                                    </div>
                                    <ul className="minimalist-list">
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
                    <div className="minimalist-section">
                        <div className="minimalist-section-title">{titles.projects}</div>
                        <div className="minimalist-section-content">
                            {projects.map((proj, i) => (
                                <div className="minimalist-item" key={i}>
                                    <div className="minimalist-item-row">
                                        <strong>
                                            {proj.title}
                                            {(proj.links || []).map((link, l) => (
                                                <span key={l} style={{ fontWeight: 'normal' }}> | <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a></span>
                                            ))}
                                        </strong>
                                        <span>{proj.date}</span>
                                    </div>
                                    <div className="minimalist-item-row">
                                        <i>{proj.techStack}</i>
                                    </div>
                                    {proj.summary && <p className="minimalist-summary">{proj.summary}</p>}
                                    <ul className="minimalist-list">
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
                    <div className="minimalist-section">
                        <div className="minimalist-section-title">{titles.certifications}</div>
                        <div className="minimalist-section-content">
                            {certifications.map((cert, i) => (
                                <div className="minimalist-item-row" key={i} style={{ marginBottom: '4px' }}>
                                    <span>
                                        <strong><a href={sanitizeUrl(cert.link)} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{cert.name}</a></strong>
                                        {' | '}{cert.provider}
                                    </span>
                                    <span>{cert.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ACHIEVEMENTS */}
                {achievements.length > 0 && (
                    <div className="minimalist-section">
                        <div className="minimalist-section-title">{titles.achievements}</div>
                        <div className="minimalist-section-content">
                            <ul className="minimalist-list">
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

export default MinimalistTemplate;
