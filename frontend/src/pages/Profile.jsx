import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, BookOpen, Briefcase, Award } from 'lucide-react';

const Profile = () => {
    const [formData, setFormData] = useState({
        // Personal
        fullName: '',
        email: '',
        phone: '',
        // College
        collegeName: '',
        degree: '',
        branch: '',
        cgpa: '',
        passoutYear: '',
        collegeProjects: '',
        // School
        schoolName12: '',
        board12: '',
        percentage12: '',
        schoolName10: '',
        board10: '',
        percentage10: '',
        // Skills
        technicalSkills: '',
        softSkills: '',
        certifications: '',
        languages: '',
        // AI Details
        llmExp: '',
        ragExp: '',
        agentExp: '',
        opensourceExp: '',
        // Interview Procedure
        preferredRole: '',
        expectedSalary: '',
        availability: '',
        relocation: 'Yes',
        resumeLink: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile Data Submitted:', formData);
        alert('Profile updated successfully!');
    };

    const Section = ({ title, icon: Icon, children }) => (
        <div className="glass-card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <Icon size={24} color="var(--primary)" />
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {children}
            </div>
        </div>
    );

    const InputGroup = ({ label, name, type = "text", placeholder, fullWidth = false, options = null }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: fullWidth ? 'span 2' : 'span 1' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{label}</label>
            {options ? (
                <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="input-field"
                >
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            ) : (
                type === 'textarea' ? (
                    <textarea
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="input-field"
                        rows="3"
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="input-field"
                    />
                )
            )}
        </div>
    );

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Candidate Profile</h1>
                <p>Complete your profile details for interview alignment.</p>
            </header>

            <form onSubmit={handleSubmit}>
                <Section title="Personal Details" icon={User}>
                    <InputGroup label="Full Name" name="fullName" placeholder="John Doe" />
                    <InputGroup label="Email" name="email" type="email" placeholder="john@example.com" />
                    <InputGroup label="Phone Number" name="phone" placeholder="+91 9876543210" />
                    <InputGroup label="Portfolio / LinkedIn URL" name="resumeLink" placeholder="https://linkedin.com/in/..." />
                </Section>

                <Section title="College Education" icon={BookOpen}>
                    <InputGroup label="College Name" name="collegeName" fullWidth placeholder="Institute of Technology" />
                    <InputGroup label="Degree" name="degree" placeholder="B.Tech, B.Sc, etc." />
                    <InputGroup label="Branch / Specialization" name="branch" placeholder="Computer Science" />
                    <InputGroup label="CGPA / Percentage" name="cgpa" placeholder="8.5" />
                    <InputGroup label="Year of Passing" name="passoutYear" type="number" placeholder="2024" />
                    <InputGroup label="Major Projects" name="collegeProjects" type="textarea" fullWidth placeholder="Describe your final year or major projects..." />
                </Section>

                <Section title="School Education" icon={BookOpen}>
                    <InputGroup label="Class 12 School Name" name="schoolName12" fullWidth placeholder="High School Name" />
                    <InputGroup label="Class 12 Board" name="board12" placeholder="CBSE, ICSE, State" />
                    <InputGroup label="Class 12 Percentage" name="percentage12" placeholder="90%" />

                    <div style={{ gridColumn: 'span 2', height: '1px', background: 'var(--border-color)', margin: '1rem 0' }}></div>

                    <InputGroup label="Class 10 School Name" name="schoolName10" fullWidth placeholder="Secondary School Name" />
                    <InputGroup label="Class 10 Board" name="board10" placeholder="CBSE, ICSE, State" />
                    <InputGroup label="Class 10 Percentage" name="percentage10" placeholder="92%" />
                </Section>

                <Section title="Skills & Certifications" icon={Award}>
                    <InputGroup label="Technical Skills" name="technicalSkills" type="textarea" fullWidth placeholder="Java, Python, React, SQL..." />
                    <InputGroup label="Soft Skills" name="softSkills" type="textarea" fullWidth placeholder="Leadership, Communication, Teamwork..." />
                    <InputGroup label="Certifications" name="certifications" type="textarea" fullWidth placeholder="AWS Certified, Google Analytics..." />
                    <InputGroup label="Languages Known" name="languages" fullWidth placeholder="English, Hindi, Spanish..." />
                </Section>

                <Section title="AI & Technical Proficiency" icon={Award}>
                    <InputGroup label="LLM Integration Experience" name="llmExp" type="textarea" fullWidth placeholder="Experience with Groq, OpenAI, Gemini..." />
                    <InputGroup label="RAG & Vector DB Knowledge" name="ragExp" type="textarea" fullWidth placeholder="Experience with Pinecone, ChromaDB, FAISS..." />
                    <InputGroup label="AI Agent Frameworks" name="agentExp" type="textarea" fullWidth placeholder="Experience with LangChain, LangGraph..." />
                    <InputGroup label="Open Source AI Contributions" name="opensourceExp" type="textarea" fullWidth placeholder="Links to PRs or Repositories..." />
                </Section>

                <Section title="Interview Alignment Details" icon={Briefcase}>
                    <InputGroup label="Preferred Job Role" name="preferredRole" placeholder="Software Engineer, Data Analyst..." />
                    <InputGroup label="Expected Salary (CTC)" name="expectedSalary" placeholder="e.g. 6 LPA" />
                    <InputGroup label="Notice Period / Availability" name="availability" placeholder="Immediate, 30 Days..." />
                    <InputGroup label="Willing to Relocate?" name="relocation" options={['Yes', 'No', 'Conditionally']} />
                </Section>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem' }}>
                        <Save size={20} /> Save Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
