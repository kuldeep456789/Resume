import React, { useState } from 'react';
import { Type, Palette, Save, Download, Plus, Trash2, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

const Editor = ({ data, onChange, onDownload, onReset }) => {
    const [activeSection, setActiveSection] = useState('header');

    const handleChange = (section, field, value, index = null, subField = null) => {
        const newData = { ...data };

        if (index !== null) {
            const updatedArray = [...data[section]];
            if (subField) {
                updatedArray[index] = { ...updatedArray[index], [subField]: value };
            } else {
                updatedArray[index] = value;
            }
            newData[section] = updatedArray;
        } else {
            newData[section] = { ...data[section], [field]: value };
        }
        onChange(newData);
    };

    const addArrayItem = (section, initialItem) => {
        onChange({
            ...data,
            [section]: [...(data[section] || []), initialItem]
        });
    };

    const removeArrayItem = (section, index) => {
        onChange({
            ...data,
            [section]: data[section].filter((_, i) => i !== index)
        });
    };

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="editor-sidebar no-print" style={{
            width: isCollapsed ? '50px' : '400px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: isCollapsed ? '10px' : '24px',
            borderRight: '1px solid #e2e8f0',
            height: '100vh',
            overflowY: 'auto',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
        }}>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                    position: 'absolute',
                    right: isCollapsed ? '50%' : '-15px',
                    top: '20px',
                    transform: isCollapsed ? 'translateX(50%)' : 'none',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: '#004AAD',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 100
                }}
            >
                {isCollapsed ? <ChevronDown style={{ transform: 'rotate(-90deg)' }} size={16} /> : <ChevronDown style={{ transform: 'rotate(90deg)' }} size={16} />}
            </button>

            {!isCollapsed && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                        <div style={{ width: '32px', height: '32px', background: '#004AAD', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>R</div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1a202c', letterSpacing: '-0.02em' }}>Resume Builder</h2>
                    </div>

                    <div className="controls" style={{ marginBottom: '32px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <button onClick={onDownload} style={{
                                padding: '12px',
                                background: '#004AAD',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '13px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 12px rgba(0, 74, 173, 0.2)'
                            }}>
                                <Download size={14} /> Download
                            </button>

                            <button onClick={onReset} style={{
                                padding: '12px',
                                background: '#fff',
                                color: '#dc3545',
                                border: '1.5px solid #fee2e2',
                                borderRadius: '10px',
                                fontSize: '13px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>
                                <RotateCcw size={14} /> Reset
                            </button>
                        </div>

                        <div style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', fontStyle: 'italic', background: '#f8fafc', padding: '8px', borderRadius: '8px' }}>
                            ✨ Draft auto-saved locally
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="section-block">
                        <h3 onClick={() => setActiveSection(activeSection === 'settings' ? '' : 'settings')} style={headerStyle}>
                            <Palette size={16} /> Appearance
                        </h3>
                        {activeSection === 'settings' && (
                            <div className="fields">
                                <label>Theme Color</label>
                                <input
                                    type="color"
                                    value={data.settings.themeColor}
                                    onChange={(e) => handleChange('settings', 'themeColor', e.target.value)}
                                    style={{ width: '100%', padding: '5px' }}
                                />
                                <label>Font Family</label>
                                <select
                                    value={data.settings.fontFamily}
                                    onChange={(e) => handleChange('settings', 'fontFamily', e.target.value)}
                                    style={inputStyle}
                                >
                                    <option value="Georgia, serif">Georgia</option>
                                    <option value="Arial, sans-serif">Arial</option>
                                    <option value="'Times New Roman', Times, serif">Times New Roman</option>
                                </select>

                                <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #ddd' }} />
                                <label style={{ fontWeight: 'bold', fontSize: '12px' }}>Section Titles</label>
                                <div style={{ marginTop: '10px' }}>
                                    {Object.keys(data.sectionTitles || {}).map(key => (
                                        <div key={key} style={{ marginBottom: '5px' }}>
                                            <label style={{ fontSize: '11px', textTransform: 'capitalize' }}>{key}</label>
                                            <input
                                                value={data.sectionTitles[key]}
                                                onChange={(e) => {
                                                    const titles = { ...data.sectionTitles, [key]: e.target.value };
                                                    onChange({ ...data, sectionTitles: titles });
                                                }}
                                                style={{ ...inputStyle, padding: '5px', fontSize: '12px' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Header Data */}
                    <div className="section-block">
                        <h3 onClick={() => setActiveSection(activeSection === 'header' ? '' : 'header')} style={headerStyle}>
                            Person Info
                        </h3>
                        {activeSection === 'header' && (
                            <div className="fields">
                                <input
                                    placeholder="Full Name"
                                    value={data.header.name}
                                    onChange={(e) => handleChange('header', 'name', e.target.value)}
                                    style={inputStyle}
                                />
                                {data.header.links.map((link, i) => (
                                    <div key={i} style={{ marginBottom: '10px', padding: '10px', background: 'white', borderRadius: '4px', border: '1px solid #eee' }}>
                                        <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                                            <input
                                                placeholder="Label (e.g. LinkedIn)"
                                                value={link.label}
                                                onChange={(e) => {
                                                    const links = [...data.header.links];
                                                    links[i].label = e.target.value;
                                                    handleChange('header', 'links', links);
                                                }}
                                                style={{ ...inputStyle, marginBottom: '0' }}
                                            />
                                            <button onClick={() => {
                                                const links = [...data.header.links];
                                                links.splice(i, 1);
                                                handleChange('header', 'links', links);
                                            }} style={{ ...deleteBtnStyle, marginTop: '0' }}><Trash2 size={12} /></button>
                                        </div>
                                        <input
                                            placeholder="URL"
                                            value={link.url}
                                            onChange={(e) => {
                                                const links = [...data.header.links];
                                                links[i].url = e.target.value;
                                                handleChange('header', 'links', links);
                                            }}
                                            style={{ ...inputStyle, marginBottom: '0' }}
                                        />
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const links = [...data.header.links];
                                    links.push({ label: 'New Link', url: '', type: '' });
                                    handleChange('header', 'links', links);
                                }} style={addBtnStyle}><Plus size={12} /> Add Contact Link</button>
                            </div>
                        )}
                    </div>

                    {/* Skills */}
                    <div className="section-block">
                        <h3 onClick={() => setActiveSection(activeSection === 'skills' ? '' : 'skills')} style={headerStyle}>
                            Skills
                        </h3>
                        {activeSection === 'skills' && (
                            <div className="fields">
                                {data.skills.categories.map((cat, i) => (
                                    <div key={i} style={{ borderBottom: '1px solid #eee', marginBottom: '10px', paddingBottom: '10px' }}>
                                        <input
                                            placeholder="Category Name"
                                            value={cat.name}
                                            onChange={(e) => {
                                                const cats = [...data.skills.categories];
                                                cats[i].name = e.target.value;
                                                handleChange('skills', 'categories', cats);
                                            }}
                                            style={{ ...inputStyle, fontWeight: 'bold' }}
                                        />
                                        <textarea
                                            placeholder="Items (comma separated)"
                                            value={cat.items}
                                            onChange={(e) => {
                                                const cats = [...data.skills.categories];
                                                cats[i].items = e.target.value;
                                                handleChange('skills', 'categories', cats);
                                            }}
                                            style={textareaStyle}
                                        />
                                        <button onClick={() => {
                                            const cats = [...data.skills.categories];
                                            cats.splice(i, 1);
                                            handleChange('skills', 'categories', cats);
                                        }} style={deleteBtnStyle}><Trash2 size={12} /> Remove Category</button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const cats = [...data.skills.categories];
                                    cats.push({ name: 'New Category', items: '' });
                                    handleChange('skills', 'categories', cats);
                                }} style={addBtnStyle}><Plus size={12} /> Add Category</button>
                            </div>
                        )}
                    </div>

                    {/* Experience / Internship */}
                    <div className="section-block">
                        <h3 onClick={() => setActiveSection(activeSection === 'experience' ? '' : 'experience')} style={headerStyle}>
                            Internship
                        </h3>
                        {activeSection === 'experience' && (
                            <div className="fields">
                                {data.experience.map((exp, i) => (
                                    <div key={i} style={cardStyle}>
                                        <input value={exp.company} onChange={(e) => handleChange('experience', 'company', e.target.value, i, 'company')} style={inputStyle} placeholder="Company" />
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <input value={exp.role} onChange={(e) => handleChange('experience', 'role', e.target.value, i, 'role')} style={inputStyle} placeholder="Role" />
                                            <input value={exp.category || ''} onChange={(e) => handleChange('experience', 'category', e.target.value, i, 'category')} style={inputStyle} placeholder="Category" />
                                        </div>
                                        <input value={exp.date} onChange={(e) => handleChange('experience', 'date', e.target.value, i, 'date')} style={inputStyle} placeholder="Date" />
                                        <textarea
                                            value={exp.description.join('\n')}
                                            onChange={(e) => handleChange('experience', 'description', e.target.value.split('\n'), i, 'description')}
                                            style={textareaStyle}
                                            placeholder="Description (one per line)"
                                        />
                                        <button onClick={() => removeArrayItem('experience', i)} style={deleteBtnStyle}><Trash2 size={12} /> Remove Role</button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('experience', { company: 'New Company', role: '', category: '', date: '', description: [] })} style={addBtnStyle}><Plus size={12} /> Add Internship</button>
                            </div>
                        )}
                    </div>

                    {/* Projects */}
                    <div className="section-block">
                        <h3 onClick={() => setActiveSection(activeSection === 'projects' ? '' : 'projects')} style={headerStyle}>
                            Projects
                        </h3>
                        {activeSection === 'projects' && (
                            <div className="fields">
                                {data.projects.map((proj, i) => (
                                    <div key={i} style={cardStyle}>
                                        <input value={proj.title} onChange={(e) => handleChange('projects', 'title', e.target.value, i, 'title')} style={inputStyle} placeholder="Title" />
                                        <input value={proj.date} onChange={(e) => handleChange('projects', 'date', e.target.value, i, 'date')} style={inputStyle} placeholder="Date" />
                                        <input value={proj.techStack} onChange={(e) => handleChange('projects', 'techStack', e.target.value, i, 'techStack')} style={inputStyle} placeholder="Tech Stack" />

                                        <div style={{ marginBottom: '10px' }}>
                                            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Project Links</label>
                                            {(proj.links || []).map((link, lIdx) => (
                                                <div key={lIdx} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                                                    <input
                                                        placeholder="Label"
                                                        value={link.label}
                                                        onChange={(e) => {
                                                            const newLinks = [...proj.links];
                                                            newLinks[lIdx] = { ...newLinks[lIdx], label: e.target.value };
                                                            handleChange('projects', 'links', newLinks, i, 'links');
                                                        }}
                                                        style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                                                    />
                                                    <input
                                                        placeholder="URL"
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const newLinks = [...proj.links];
                                                            newLinks[lIdx] = { ...newLinks[lIdx], url: e.target.value };
                                                            handleChange('projects', 'links', newLinks, i, 'links');
                                                        }}
                                                        style={{ ...inputStyle, marginBottom: 0, flex: 2 }}
                                                    />
                                                    <button onClick={() => {
                                                        const newLinks = proj.links.filter((_, idx) => idx !== lIdx);
                                                        handleChange('projects', 'links', newLinks, i, 'links');
                                                    }} style={{ ...deleteBtnStyle, marginTop: 0 }}><Trash2 size={12} /></button>
                                                </div>
                                            ))}
                                            <button onClick={() => {
                                                const newLinks = [...(proj.links || []), { label: 'Link', url: '' }];
                                                handleChange('projects', 'links', newLinks, i, 'links');
                                            }} style={{ ...addBtnStyle, background: '#6c757d', marginTop: '5px' }}><Plus size={12} /> Add Link</button>
                                        </div>

                                        <textarea
                                            value={proj.summary || ''}
                                            onChange={(e) => handleChange('projects', 'summary', e.target.value, i, 'summary')}
                                            style={{ ...textareaStyle, minHeight: '60px', marginBottom: '15px' }}
                                            placeholder="Project Summary (Paragraph)"
                                        />

                                        <textarea
                                            value={proj.description ? proj.description.join('\n') : ''}
                                            onChange={(e) => handleChange('projects', 'description', e.target.value.split('\n'), i, 'description')}
                                            style={textareaStyle}
                                            placeholder="Description Bullets (one per line)"
                                        />
                                        <button onClick={() => removeArrayItem('projects', i)} style={deleteBtnStyle}><Trash2 size={12} /> Remove Project</button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('projects', { title: 'New Project', date: '', techStack: '', summary: '', description: [], links: [] })} style={addBtnStyle}><Plus size={12} /> Add Project</button>
                            </div>
                        )}
                    </div>

                    {/* Certifications / Training */}
                    <div className="section-block">
                        <h3 onClick={() => setActiveSection(activeSection === 'certifications' ? '' : 'certifications')} style={headerStyle}>
                            Training
                        </h3>
                        {activeSection === 'certifications' && (
                            <div className="fields">
                                {data.certifications.map((cert, i) => (
                                    <div key={i} style={cardStyle}>
                                        <input value={cert.name} onChange={(e) => handleChange('certifications', 'name', e.target.value, i, 'name')} style={inputStyle} placeholder="Name" />
                                        <input value={cert.provider} onChange={(e) => handleChange('certifications', 'provider', e.target.value, i, 'provider')} style={inputStyle} placeholder="Provider" />
                                        <input value={cert.date} onChange={(e) => handleChange('certifications', 'date', e.target.value, i, 'date')} style={inputStyle} placeholder="Date" />
                                        <input value={cert.link} onChange={(e) => handleChange('certifications', 'link', e.target.value, i, 'link')} style={inputStyle} placeholder="Link" />
                                        <button onClick={() => removeArrayItem('certifications', i)} style={deleteBtnStyle}><Trash2 size={12} /> Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('certifications', { name: 'New Certification', provider: '', date: '', link: '' })} style={addBtnStyle}><Plus size={12} /> Add Certification</button>
                            </div>
                        )}
                    </div>


                    {/* Achievements */}
                    <div className="section-block">
                        <h3 onClick={() => setActiveSection(activeSection === 'achievements' ? '' : 'achievements')} style={headerStyle}>
                            Achievements
                        </h3>
                        {activeSection === 'achievements' && (
                            <div className="fields">
                                {data.achievements.map((ach, i) => (
                                    <div key={i} style={{ marginBottom: '10px' }}>
                                        <textarea
                                            value={ach}
                                            onChange={(e) => handleChange('achievements', null, e.target.value, i)}
                                            style={textareaStyle}
                                            placeholder="Achievement"
                                        />
                                        <button onClick={() => removeArrayItem('achievements', i)} style={deleteBtnStyle}><Trash2 size={12} /> Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('achievements', "New Achievement")} style={addBtnStyle}><Plus size={12} /> Add Achievement</button>
                            </div>
                        )}
                    </div>

                    {/* Education */}
                    <div className="section-block">
                        <h3 onClick={() => setActiveSection(activeSection === 'education' ? '' : 'education')} style={headerStyle}>
                            Education
                        </h3>
                        {activeSection === 'education' && (
                            <div className="fields">
                                {data.education.map((edu, i) => (
                                    <div key={i} style={cardStyle}>
                                        <input value={edu.institution} onChange={(e) => handleChange('education', 'institution', e.target.value, i, 'institution')} style={inputStyle} placeholder="Institution" />
                                        <input value={edu.location} onChange={(e) => handleChange('education', 'location', e.target.value, i, 'location')} style={inputStyle} placeholder="Location" />
                                        <input value={edu.degree} onChange={(e) => handleChange('education', 'degree', e.target.value, i, 'degree')} style={inputStyle} placeholder="Degree" />
                                        <input value={edu.date} onChange={(e) => handleChange('education', 'date', e.target.value, i, 'date')} style={inputStyle} placeholder="Date" />
                                        <button onClick={() => removeArrayItem('education', i)} style={deleteBtnStyle}><Trash2 size={12} /> Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addArrayItem('education', { institution: 'New Institution', location: '', degree: '', date: '' })} style={addBtnStyle}><Plus size={12} /> Add Education</button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
const headerStyle = {
    cursor: 'pointer',
    padding: '14px 16px',
    background: '#f8fafc',
    borderRadius: '12px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
    transition: 'all 0.2s',
    border: '1px solid #f1f5f9'
};

const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: '#fff'
};

const textareaStyle = {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    minHeight: '80px',
    fontSize: '13px',
    fontFamily: 'inherit',
    outline: 'none',
    resize: 'vertical'
};

const cardStyle = {
    background: '#fff',
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
};

const addBtnStyle = {
    background: '#ecfdf5',
    color: '#059669',
    border: '1px solid #d1fae5',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: '600',
    width: '100%',
    justifyContent: 'center',
    marginTop: '8px'
};

const deleteBtnStyle = {
    background: '#fff5f5',
    color: '#e53e3e',
    border: '1px solid #fed7d7',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    fontWeight: '500'
};

export default Editor;
