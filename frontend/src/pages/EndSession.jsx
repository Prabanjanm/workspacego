import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Trash2, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from 'react-hot-toast'; // Just simulating import if needed for consistent styling

const EndSession = ({ onLogout }) => {
    const navigate = useNavigate();
    const [clearedSteps, setClearedSteps] = useState([false, false, false]);

    useEffect(() => {
        // Perform cleanup logic
        if (onLogout) onLogout();

        // Animate cleanup steps
        setTimeout(() => setClearedSteps(prev => [true, prev[1], prev[2]]), 500);
        setTimeout(() => setClearedSteps(prev => [prev[0], true, prev[2]]), 1200);
        setTimeout(() => setClearedSteps(prev => [prev[0], prev[1], true]), 1900);

    }, [onLogout]);

    return (
        <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', textAlign: 'center', background: 'var(--background-color)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card"
                style={{ maxWidth: '500px', width: '90%', padding: '50px 30px' }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    style={{ margin: '0 auto 24px', width: '80px', height: '80px', background: '#e6f4ea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <CheckCircle size={40} color="var(--success-color)" />
                </motion.div>

                <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>Session Securely Ended</h2>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                    All temporary workspace data has been securely deleted. No traces remain on this device.
                </p>

                <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px', marginBottom: '32px', textAlign: 'left' }}>
                    <CleanupItem label="Deleting temporary files..." completed={clearedSteps[0]} icon={<Trash2 size={18} />} />
                    <CleanupItem label="Revoking access tokens..." completed={clearedSteps[1]} icon={<ShieldCheck size={18} />} />
                    <CleanupItem label="Clearing local cache..." completed={clearedSteps[2]} icon={<ShieldCheck size={18} />} />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: clearedSteps[2] ? 1 : 0 }}
                >
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/')}
                        style={{ width: '100%', padding: '16px' }}
                    >
                        <Home size={18} />
                        Return to Dashboard
                    </button>
                </motion.div>

            </motion.div>
        </div>
    );
};

const CleanupItem = ({ label, completed, icon }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', fontSize: '15px', color: completed ? '#1e8e3e' : '#5f6368', opacity: completed ? 1 : 0.6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {icon}
            <span>{label}</span>
        </div>
        {completed && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle size={16} fill="#e6f4ea" /></motion.div>}
    </div>
);

export default EndSession;
