import React from 'react';
import './Resume.css';

const Resume = React.forwardRef(({ data }, ref) => {
    const { header, skills, experience, projects, certifications, achievements, education, settings, sectionTitles } = data;

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
        <div className="resume-container" ref={ref} style={style}>
            {/* HEADER */}
            <div className="header">
                <h1>{header.name}</h1>
                <div className="contact-info">
                    <div className="contact-left">
                        {header.links.slice(0, 2).map((link, i) => (
                            <div key={i}>
                                {link.type && `${link.type}: `}
                                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                            </div>
                        ))}
                    </div>
                    <div className="contact-right">
                        {header.links.slice(2).map((link, i) => (
                            <div key={i}>
                                {link.type && `${link.type}: `}
                                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SKILLS */}
            <div className="section">
                <div className="section-title">{titles.skills}</div>
                <div className="section-content">
                    <ul className="skill-list">
                        {skills.categories.map((cat, i) => (
                            <li key={i} className="skill-category">
                                <strong>{cat.name}:</strong> {cat.items}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* INTERNSHIP */}
            <div className="section">
                <div className="section-title">{titles.experience}</div>
                <div className="section-content">
                    {experience.map((exp, i) => (
                        <div className="experience-item" key={i}>
                            <div className="item-header">
                                <div>
                                    <div className="item-title">
                                        {exp.company}
                                        {exp.role && <span style={{ fontSize: '0.9em', fontWeight: 'normal', marginLeft: '10px' }}>| {exp.role}</span>}
                                        {exp.category && <span style={{ fontSize: '0.8em', fontStyle: 'italic', color: '#666', marginLeft: '10px', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>{exp.category}</span>}
                                    </div>
                                </div>
                                <div className="item-date">{exp.date}</div>
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

            {/* PROJECTS */}
            <div className="section">
                <div className="section-title">{titles.projects}</div>
                <div className="section-content">
                    {projects.map((proj, i) => (
                        <div className="project-item" key={i}>
                            <div className="item-header">
                                <div>
                                    <span className="item-title">
                                        {proj.title} |
                                        {(proj.links || []).map((link, l) => (
                                            <span key={l}> <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a> |</span>
                                        ))}
                                    </span>
                                    <span className="item-subtitle"> {proj.techStack}</span>
                                </div>
                                <div className="item-date">{proj.date}</div>
                            </div>
                            {proj.summary && <p className="item-summary" style={{ fontSize: '12px', margin: '4px 0', lineHeight: '1.3', color: '#444' }}>{proj.summary}</p>}
                            <ul className="item-description">
                                {proj.description.map((desc, d) => (
                                    <li key={d}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* CERTIFICATIONS */}
            <div className="section">
                <div className="section-title">{titles.certifications}</div>
                <div className="section-content">
                    <ul className="certificates-list">
                        {certifications.map((cert, i) => (
                            <li key={i}>
                                <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <strong>{cert.name}</strong>
                                </a>
                                {' | '}{cert.provider}
                                <span style={{ float: 'right' }}>{cert.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div className="section">
                <div className="section-title">{titles.achievements}</div>
                <div className="section-content">
                    <ul className="achievements-list">
                        {achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* EDUCATION */}
            <div className="section">
                <div className="section-title">{titles.education}</div>
                <div className="section-content">
                    {education.map((edu, i) => (
                        <div className="education-item" key={i}>
                            <div className="education-header">
                                <span className="institution">{edu.institution}</span>
                                <span className="location">{edu.location}</span>
                            </div>
                            <div className="education-header">
                                <span className="degree">{edu.degree}</span>
                                <span className="item-date">{edu.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default Resume;
