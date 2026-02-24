import React from 'react';
import './Dashboard.css';

const Dashboard = ({ onEdit, onNew, lastSaved, data }) => {
    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                {/* Left Side: Text & Actions */}
                <div className="dashboard-left">
                    <div className="workspace-label">// YOUR WORKSPACE</div>
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
