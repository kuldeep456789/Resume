import React, { useState } from 'react';
import { Type, Palette, Save, Download, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const Editor = ({ data, onChange, onDownload }) => {
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

    return (
        <div className="editor-sidebar no-print" style={{
            width: '350px',
            background: '#f8f9fa',
            padding: '20px',
            borderRight: '1px solid #ddd',
            height: '100vh',
            overflowY: 'auto'
        }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>Resume Builder</h2>

            <div className="controls">
                <button onClick={onDownload} style={{
                    width: '100%',
                    padding: '10px',
                    background: '#332293',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                }}>
                    <Download size={16} /> Download PDF
                </button>

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
                                <div key={i} style={{ marginBottom: '5px' }}>
                                    <input
                                        placeholder="Label"
                                        value={link.label}
                                        onChange={(e) => {
                                            const links = [...data.header.links];
                                            links[i].label = e.target.value;
                                            handleChange('header', 'links', links);
                                        }}
                                        style={{ ...inputStyle, marginBottom: '2px' }}
                                    />
                                    <input
                                        placeholder="URL"
                                        value={link.url}
                                        onChange={(e) => {
                                            const links = [...data.header.links];
                                            links[i].url = e.target.value;
                                            handleChange('header', 'links', links);
                                        }}
                                        style={inputStyle}
                                    />
                                </div>
                            ))}
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
                                    <textarea
                                        value={proj.description.join('\n')}
                                        onChange={(e) => {
                                            const projects = [...data.projects];
                                            projects[i].description = e.target.value.split('\n');
                                            handleChange('projects', 'description', projects);
                                        }}
                                        style={textareaStyle}
                                        placeholder="Description (one per line)"
                                    />
                                    <button onClick={() => removeArrayItem('projects', i)} style={deleteBtnStyle}><Trash2 size={12} /> Remove Project</button>
                                </div>
                            ))}
                            <button onClick={() => addArrayItem('projects', { title: 'New Project', date: '', techStack: '', description: [], links: [] })} style={addBtnStyle}><Plus size={12} /> Add Project</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Styles
const headerStyle = { cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const inputStyle = { width: '100%', padding: '8px', marginBottom: '8px', border: '1px solid #ddd', borderRadius: '4px' };
const textareaStyle = { width: '100%', padding: '8px', marginBottom: '8px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '60px' };
const cardStyle = { background: 'white', padding: '10px', borderRadius: '5px', marginBottom: '10px', border: '1px solid #eee' };
const addBtnStyle = { background: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' };
const deleteBtnStyle = { background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', marginTop: '5px' };

export default Editor;
