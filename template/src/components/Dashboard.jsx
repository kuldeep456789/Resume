import React from 'react';
import { Upload } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ onEdit, onNew, lastSaved, data }) => {
    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                {/* Left Side: Text & Actions */}
                <div className="dashboard-left">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: 'var(--gold-accent)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4L4 8V16L12 20L20 16V8L12 4Z" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
                                <path d="M12 8L8 12V14C8 14.5304 8.21071 15.0391 8.58579 15.4142C8.96086 15.7893 9.46957 16 10 16H14C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14V12L12 8Z" fill="black" />
                                <path d="M11 16V20L12 21L13 20V16" stroke="var(--gold-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.8rem', fontWeight: '700', letterSpacing: '2px', color: 'white' }}>RESUME <span style={{ color: 'var(--gold-accent)' }}>FIX</span></span>
                    </div>
                    {/* <div className="workspace-label">// YOUR WORKSPACE</div> */}
                    <h1 className="main-title">
                        Craft Your <br />
                        <span className="serif-italic-gold">Story.</span>
                    </h1>
                    <p className="description">
                        You have 1 active draft and your profile is 84% complete.
                        A few more details and you're ready to impress.
                    </p>
                    <div className="button-group">
                        <button className="btn-continue" onClick={onEdit}>
                            Continue Editing
                        </button>
                        <button className="btn-new" onClick={onNew}>
                            New Resume
                        </button>
                        <button className="btn-upload">
                            <Upload size={18} /> Upload Resume
                        </button>
                    </div>
                </div>

                {/* Right Side: Floating Preview */}
                <div className="dashboard-right">
                    <div className="preview-card-wrapper">
                        <div className="active-badge">ACTIVE</div>
                        <div className="preview-card">
                            <div className="card-line-gold"></div>
                            <h2 className="card-name">{data.header.name}</h2>
                            <p className="card-role">SOFTWARE DEVELOPER</p>

                            <div className="card-section">
                                <div className="card-section-title">PROJECTS</div>
                                {(data.projects || []).slice(0, 2).map((proj, i) => (
                                    <div key={i} className="mini-project-link">
                                        <span className="dot"></span>
                                        <a href={(proj.links && proj.links[0]?.url) || "#"} target="_blank" rel="noopener noreferrer">
                                            {proj.title}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className="card-section">
                                <div className="card-section-title">SKILLS</div>
                                <div className="skeleton-bar gold"></div>
                                <div className="skeleton-bar red"></div>
                                <div className="skeleton-bar green"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
