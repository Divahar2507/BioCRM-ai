import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessage, logInteractionManual, fetchHcps } from '../features/hcpSlice';
import { Send, Mic, FileText, Save, CheckCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const LogInteraction = () => {
    const dispatch = useDispatch();
    const { chatHistory, hcps } = useSelector((state) => state.hcp);
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'form'
    const [chatInput, setChatInput] = useState('');
    const [formData, setFormData] = useState({
        hcpName: '',
        date: new Date().toISOString().split('T')[0],
        type: 'Call',
        notes: '',
        nextSteps: '',
        sentiment: 'Neutral'
    });

    const chatEndRef = useRef(null);

    useEffect(() => {
        dispatch(fetchHcps());
    }, [dispatch]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);


    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        dispatch(sendChatMessage(chatInput));
        setChatInput('');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Simulate finding HCP ID
        const hcp = hcps.find(h => h.name.toLowerCase().includes(formData.hcpName.toLowerCase()));

        await dispatch(logInteractionManual({
            hcp_id: hcp ? hcp.id : 1, // Fallback ID for demo
            type: formData.type,
            notes: formData.notes,
            sentiment: formData.sentiment,
            next_steps: formData.nextSteps
        }));
        alert('Interaction logged successfully!');
        setFormData({ ...formData, notes: '', nextSteps: '' });
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Log Interaction</h1>
                    <p>Record your recent engagement with healthcare professionals.</p>
                </div>
                <a
                    href="https://meet.google.com/png-mrad-mzy"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ textDecoration: 'none' }}
                >
                    <Phone size={18} /> Join Call
                </a>
            </header>

            <div className="glass-card">
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
                        onClick={() => setActiveTab('chat')}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Mic size={18} /> Conversational AI
                        </span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
                        onClick={() => setActiveTab('form')}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText size={18} /> Structured Form
                        </span>
                    </button>
                </div>

                {activeTab === 'chat' ? (
                    <div className="chat-container">
                        <div className="chat-messages">
                            {chatHistory.length === 0 && (
                                <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>
                                    <div style={{ marginBottom: '1rem', opacity: 0.5 }}>
                                        <Mic size={48} />
                                    </div>
                                    <p>Start a conversation to log an interaction.</p>
                                    <p style={{ fontSize: '0.85rem' }}>Try: "I just met with Dr. Smith about the new cardiology study..."</p>
                                </div>
                            )}
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`message-bubble ${msg.role === 'user' ? 'message-user' : 'message-ai'}`}>
                                    {msg.content}
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <form onSubmit={handleChatSubmit} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Type your message..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary">
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleFormSubmit}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>HCP Name</label>
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Search HCP..."
                                value={formData.hcpName}
                                onChange={(e) => setFormData({ ...formData, hcpName: e.target.value })}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Interaction Type</label>
                            <select
                                className="input-field"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>Call</option>
                                <option>Visit</option>
                                <option>Email</option>
                                <option>Conference</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Date</label>
                            <input
                                type="date"
                                className="input-field"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Sentiment</label>
                            <select
                                className="input-field"
                                value={formData.sentiment}
                                onChange={(e) => setFormData({ ...formData, sentiment: e.target.value })}
                            >
                                <option>Positive</option>
                                <option>Neutral</option>
                                <option>Negative</option>
                            </select>
                        </div>

                        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Interaction Notes</label>
                            <textarea
                                className="input-field"
                                rows="4"
                                placeholder="Enter detailed notes..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            ></textarea>
                        </div>

                        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label>Next Steps</label>
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Follow up actions..."
                                value={formData.nextSteps}
                                onChange={(e) => setFormData({ ...formData, nextSteps: e.target.value })}
                            />
                        </div>

                        <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button type="submit" className="btn btn-primary">
                                <Save size={18} /> Save Interaction
                            </button>
                        </div>
                    </motion.form>
                )}
            </div>
        </div>
    );
};

export default LogInteraction;
