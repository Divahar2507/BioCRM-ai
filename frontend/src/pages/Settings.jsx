import React from 'react';
import { Bell, Moon, Lock, LogOut } from 'lucide-react';

const Settings = () => {
    const SettingItem = ({ icon: Icon, title, desc, toggle = false }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <Icon size={20} />
                </div>
                <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{title}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{desc}</p>
                </div>
            </div>
            {toggle ? (
                <div style={{ width: '40px', height: '20px', background: 'var(--primary)', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                </div>
            ) : (
                <button className="btn btn-ghost">Edit</button>
            )}
        </div>
    );

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Settings</h1>
                <p>Manage your preferences and account settings.</p>
            </header>

            <div className="glass-card">
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Preferences</h2>
                <SettingItem icon={Bell} title="Notifications" desc="Receive alerts for new interactions" toggle />
                <SettingItem icon={Moon} title="Dark Mode" desc="Toggle application theme" toggle />
            </div>

            <div className="glass-card" style={{ marginTop: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Account</h2>
                <SettingItem icon={Lock} title="Change Password" desc="Update your security credentials" />

                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <button className="btn" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', width: '100%', justifyContent: 'center' }}>
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
