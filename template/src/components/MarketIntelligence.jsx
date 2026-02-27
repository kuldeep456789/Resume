import React from 'react';
import { TrendingUp, DollarSign, Building2 } from 'lucide-react';
import { TRENDING_SKILLS, HIRING_COMPANIES } from '../services/ats/skillDatabase';

const MarketIntelligence = () => {
    return (
        <div className="market-intelligence" style={{ color: 'white' }}>
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <TrendingUp size={18} className="text-gold" />
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Trending Skills</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {TRENDING_SKILLS.map(skill => (
                        <div key={skill.name} style={{
                            padding: '6px 12px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <span>{skill.name}</span>
                            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{skill.growth}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Building2 size={18} className="text-gold" />
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Active Hiring</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {HIRING_COMPANIES.map(company => (
                        <div key={company.name} style={{
                            padding: '12px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <img src={company.logo} alt={company.name} style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{company.name}</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{company.roles} Open Roles</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <DollarSign size={18} className="text-gold" />
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Salary Insights</h3>
                </div>
                <div style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0) 100%)',
                    borderRadius: '12px',
                    border: '1px solid rgba(212,175,55,0.2)'
                }}>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '4px' }}>Full Stack Developer</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--gold-accent)' }}>$80k - $160k / year</div>
                </div>
            </div>
        </div>
    );
};

export default MarketIntelligence;
