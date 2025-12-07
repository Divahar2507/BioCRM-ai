import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHcps } from '../features/hcpSlice';
import { User, MapPin, Stethoscope } from 'lucide-react';

const HCPDirectory = () => {
    const dispatch = useDispatch();
    const { hcps } = useSelector((state) => state.hcp);

    useEffect(() => {
        dispatch(fetchHcps());
    }, [dispatch]);

    // Dummy fallback data if DB is empty
    const displayHcps = hcps.length > 0 ? hcps : [
        { id: 1, name: 'Dr. Sarah Wilson', role: 'Cardiologist', hospital: 'City General Hospital' },
        { id: 2, name: 'Dr. James Carter', role: 'Neurologist', hospital: 'Neuro Center' },
        { id: 3, name: 'Dr. Emily Chen', role: 'Pediatrician', hospital: 'Kids First Clinic' },
        { id: 4, name: 'Dr. Michael Brown', role: 'Oncologist', hospital: 'Memorial Hospital' },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1>HCP Directory</h1>
                <p>Manage and view details of your assigned Healthcare Professionals.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {displayHcps.map((hcp) => (
                    <div key={hcp.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #ddd, #999)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
                                <User size={24} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{hcp.name}</h3>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--primary)' }}>{hcp.role || 'Specialist'}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <Stethoscope size={16} />
                            <span>{hcp.role || 'Unknown Specialty'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <MapPin size={16} />
                            <span>{hcp.hospital || 'Unknown Location'}</span>
                        </div>

                        <button className="btn btn-primary" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HCPDirectory;
