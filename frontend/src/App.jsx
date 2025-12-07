import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LogInteraction from './pages/LogInteraction';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import HCPDirectory from './pages/HCPDirectory';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/interactions" replace />} />
                        <Route path="/interactions" element={<LogInteraction />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/hcps" element={<HCPDirectory />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
