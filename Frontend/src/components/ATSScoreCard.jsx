import React from 'react';

const ATSScoreCard = ({ score, role }) => {
    const getScoreColor = (val) => {
        if (val > 80) return '#22c55e'; // Green
        if (val > 50) return '#f59e0b'; // Amber
        return '#ef4444'; // Red
    };

    return (
        <div className="ats-score-card" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
            marginBottom: '20px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>ATS Optimization</h3>
                    {role && <div style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Target: {role}</div>}
                </div>
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: getScoreColor(score.overall),
                    background: `${getScoreColor(score.overall)}22`,
                    padding: '8px 16px',
                    borderRadius: '12px',
                    border: `1px solid ${getScoreColor(score.overall)}`
                }}>
                    {score.overall}/100
                </div>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
                {Object.entries(score.sections).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.8 }}>
                            <span style={{ textTransform: 'capitalize' }}>{key}</span>
                            <span>{val}%</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                width: `${val}%`,
                                background: getScoreColor(val),
                                transition: 'width 0.5s ease-out'
                            }}></div>
                        </div>
                    </div>
                ))}
            </div>

            {score.feedback.length > 0 && (
                <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: '600', color: '#fca5a5' }}>Suggestions:</p>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: '#fca5a5' }}>
                        {score.feedback.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                </div>
            )}
            {/* Benchmark Info */}
            <div style={{
                marginTop: '15px',
                fontSize: '0.65rem',
                color: '#94a3b8',
                fontStyle: 'italic',
                textAlign: 'right'
            }}>
                Benchmarked against: {score.benchmark || "Global Standard V1"}
            </div>
        </div>
    );
};

export default ATSScoreCard;
