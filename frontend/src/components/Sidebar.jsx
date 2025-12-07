import React, { useState } from 'react';
import { Home, Users, MessageSquare, PieChart, Settings, Activity, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'HCPs', path: '/hcps' },
    { icon: MessageSquare, label: 'Interactions', path: '/interactions' },
    { icon: Activity, label: 'Analytics', path: '/analytics' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
    return (
        <aside style={{
            width: '260px',
            background: 'rgba(15, 23, 42, 0.9)',
            borderRight: '1px solid var(--border-color)',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ marginBottom: '3rem', paddingLeft: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '8px' }}></div>
                <h2 style={{ fontSize: '1.25rem', letterSpacing: '-0.5px' }}>BioCRM <span style={{ color: 'var(--primary)', fontSize: '0.8em' }}>AI</span></h2>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            color: isActive ? 'white' : 'var(--text-muted)',
                            background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.1), transparent)' : 'transparent',
                            borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                            fontWeight: isActive ? 500 : 400
                        })}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#334155', borderRadius: '50%' }}></div>
                    <div>
                        <p style={{ color: 'white', fontSize: '0.9rem', fontWeight: 500 }}>Dr. User</p>
                        <p style={{ fontSize: '0.75rem' }}>Field Rep</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
