import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Trash2, Home, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const EndSession = ({ onLogout }) => {
    const navigate = useNavigate();
    const [clearedSteps, setClearedSteps] = useState([false, false, false]);

    useEffect(() => {
        // Perform cleanup logic
        if (onLogout) onLogout();

        // Animate cleanup steps
        setTimeout(() => setClearedSteps(prev => [true, prev[1], prev[2]]), 600);
        setTimeout(() => setClearedSteps(prev => [prev[0], true, prev[2]]), 1400);
        setTimeout(() => setClearedSteps(prev => [prev[0], prev[1], true]), 2200);

    }, [onLogout]);

    return (
        <div className="flex-center" style={{ minHeight: '100vh', flexDirection: 'column', textAlign: 'center', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>

            {/* Background elements */}
            <div style={{ position: 'absolute', top: '20%', left: '25%', width: '400px', height: '400px', background: 'var(--primary-color)', opacity: '0.05', filter: 'blur(100px)', borderRadius: '50%' }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="glass-card"
                style={{ maxWidth: '500px', width: '90%', padding: '56px 40px', zIndex: 10 }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    style={{ margin: '0 auto 24px', width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                >
                    <CheckCircle size={40} color="var(--success-color)" />
                </motion.div>

                <h2 style={{ marginBottom: '12px', fontSize: '28px', color: 'var(--text-primary)' }}>Session Securely Ended</h2>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '16px', lineHeight: '1.6' }}>
                    All temporary workspace data has been securely wiped.<br />No traces remain on this device.
                </p>

                <div style={{ background: 'var(--bg-darker)', padding: '24px', borderRadius: '16px', marginBottom: '40px', textAlign: 'left', border: '1px solid var(--border-color)' }}>
                    <CleanupItem label="Wiping ephemeral storage..." completed={clearedSteps[0]} icon={<Trash2 size={18} />} />
                    <CleanupItem label="Revoking identity tokens..." completed={clearedSteps[1]} icon={<ShieldCheck size={18} />} />
                    <CleanupItem label="Clearing local cache..." completed={clearedSteps[2]} icon={<Lock size={18} />} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: clearedSteps[2] ? 1 : 0, y: clearedSteps[2] ? 0 : 10 }}
                    transition={{ duration: 0.4 }}
                >
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/')}
                        style={{ width: '100%', padding: '16px', fontSize: '15px' }}
                    >
                        <Home size={18} />
                        Return to Login
                    </button>
                </motion.div>

            </motion.div>
        </div>
    );
};

const CleanupItem = ({ label, completed, icon }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px', color: completed ? 'var(--success-color)' : 'var(--text-muted)', transition: 'all 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ color: completed ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                {icon}
            </div>
            <span style={{ fontWeight: 500 }}>{label}</span>
        </div>
        {completed ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <CheckCircle size={18} fill="currentColor" color="var(--bg-darker)" />
            </motion.div>
        ) : (
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                style={{ width: '14px', height: '14px', border: '2px solid var(--border-color)', borderTopColor: 'var(--primary-color)', borderRadius: '50%' }}
            />
        )}
    </div>
);

export default EndSession;
