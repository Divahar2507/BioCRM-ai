import React from 'react';
import { BarChart, PieChart, TrendingUp } from 'lucide-react';

const Analytics = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Analytics</h1>
                <p>Insights into your engagement metrics and performance.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3>Interaction Types</h3>
                        <PieChart color="var(--primary)" />
                    </div>
                    {/* Dummy Chart Visualization */}
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ width: '40px', height: '60%', background: '#6366f1', borderRadius: '4px 4px 0 0' }} title="Calls"></div>
                        <div style={{ width: '40px', height: '80%', background: '#ec4899', borderRadius: '4px 4px 0 0' }} title="Visits"></div>
                        <div style={{ width: '40px', height: '40%', background: '#10b981', borderRadius: '4px 4px 0 0' }} title="Emails"></div>
                        <div style={{ width: '40px', height: '20%', background: '#f59e0b', borderRadius: '4px 4px 0 0' }} title="Conf"></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', fontSize: '0.8rem' }}>
                        <span>Calls</span>
                        <span>Visits</span>
                        <span>Emails</span>
                        <span>Conf</span>
                    </div>
                </div>

                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3>Monthly Engagement</h3>
                        <BarChart color="var(--secondary)" />
                    </div>
                    {/* Dummy Chart Visualization */}
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ width: '100%', height: '2px', background: 'var(--border-color)', position: 'absolute' }}></div>
                        <svg viewBox="0 0 100 50" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            <polyline
                                fill="none"
                                stroke="var(--success)"
                                strokeWidth="2"
                                points="0,40 20,35 40,20 60,25 80,10 100,5"
                            />
                        </svg>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9rem', color: 'var(--success)' }}>
                        <TrendingUp size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        +15% Growth this month
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
