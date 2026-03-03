import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Building2, MapPin, Globe } from 'lucide-react';
import { TRENDING_SKILLS, HIRING_COMPANIES, SALARY_RANGES, LOCATION_MAPPING } from '../services/ats/skillDatabase';

const MarketIntelligence = ({ role }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [viewMode, setViewMode] = useState('local'); // 'local' or 'global'
    const [detectedCity, setDetectedCity] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        // Using a free reverse geocoding API or a mock for this demo
                        // In a real app, you'd use a service like Google Maps or OpenStreetMap
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
                        const data = await response.json();
                        const city = data.address.city || data.address.town || data.address.village || 'Bangalore';
                        setDetectedCity(city);
                        setUserLocation(city);
                    } catch (error) {
                        console.error("Location detection failed:", error);
                        setDetectedCity('Bangalore'); // Default to a tech hub
                    }
                },
                () => {
                    setDetectedCity('Bangalore'); // Fallback
                }
            );
        }
    }, []);

    const salaryRange = SALARY_RANGES[role] || "$70k - $150k";

    const getHiringCompanies = () => {
        if (viewMode === 'global' || !detectedCity) return HIRING_COMPANIES.slice(0, 4);

        // Filter companies that have offices in the detected city
        const localCompanies = HIRING_COMPANIES.filter(c =>
            c.locations.some(loc => loc.toLowerCase().includes(detectedCity.toLowerCase()))
        );

        return localCompanies.length > 0 ? localCompanies : HIRING_COMPANIES.slice(0, 4);
    };

    const displayCompanies = getHiringCompanies();

    return (
        <div className="market-intelligence" style={{ color: 'white' }}>
            {/* Header with Location Toggle */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} className="text-gold" />
                    <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                        {detectedCity ? `Hiring in ${detectedCity}` : 'Detecting Location...'}
                    </span>
                </div>
                <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '20px', padding: '2px' }}>
                    <button
                        onClick={() => setViewMode('local')}
                        style={{
                            padding: '4px 12px',
                            fontSize: '0.7rem',
                            borderRadius: '18px',
                            border: 'none',
                            background: viewMode === 'local' ? 'var(--gold-gradient)' : 'transparent',
                            color: viewMode === 'local' ? 'black' : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >Local</button>
                    <button
                        onClick={() => setViewMode('global')}
                        style={{
                            padding: '4px 12px',
                            fontSize: '0.7rem',
                            borderRadius: '18px',
                            border: 'none',
                            background: viewMode === 'global' ? 'var(--gold-gradient)' : 'transparent',
                            color: viewMode === 'global' ? 'black' : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >Global</button>
                </div>
            </div>

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
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                        {viewMode === 'local' ? `Top Companies in ${detectedCity}` : 'Global Hiring Leaders'}
                    </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {displayCompanies.map(company => (
                        <div key={company.name} style={{
                            padding: '12px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'transform 0.2s ease'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <img src={company.logo} alt={company.name} style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: '600', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{company.name}</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{company.roles}+ Roles</div>
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
                    <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '4px' }}>{role}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--gold-accent)' }}>{salaryRange} / year</div>
                </div>
            </div>
        </div>
    );
};

export default MarketIntelligence;
