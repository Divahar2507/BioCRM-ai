import React from 'react';
import { Activity, Users, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { label: 'Total Interactions', value: '124', icon: Activity, color: '#6366f1' },
        { label: 'Active HCPs', value: '45', icon: Users, color: '#ec4899' },
        { label: 'Meetings Scheduled', value: '8', icon: Calendar, color: '#10b981' },
        { label: 'Engagement Rate', value: '87%', icon: TrendingUp, color: '#f59e0b' },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Dashboard</h1>
                <p>Overview of your sales performance and HCP engagement.</p>
            </header>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '2rem' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ padding: '12px', background: `${stat.color}20`, borderRadius: '12px', color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{stat.value}</h3>
                            <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.7 }}>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="glass-card">
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recent Activity</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: 0, fontSize: '1rem' }}>Logged Call with Dr. Smith</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem' }}>Discussed new clinical trials.</p>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2 hours ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
