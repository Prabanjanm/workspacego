import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Cpu, ArrowLeft, Play, Plus, Box, Shield, X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Environments = () => {
    const navigate = useNavigate();

    const [wizardOpen, setWizardOpen] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [selectedStack, setSelectedStack] = useState(null);
    const [duration, setDuration] = useState(2);

    const environments = [
        { id: 1, name: 'Python ML Suite', status: 'Ready', specs: 'NVIDIA T4 • 16GB RAM', icon: <Terminal size={24} color="#3b82f6" /> },
        { id: 2, name: 'Node.js Backend', status: 'Stopped', specs: '2 vCPU • 4GB RAM', icon: <Box size={24} color="#22c55e" /> },
        { id: 3, name: 'Rust Systems', status: 'Building', specs: '4 vCPU • 8GB RAM', icon: <Cpu size={24} color="#f97316" /> },
    ];

    const handleCloseWizard = () => {
        setWizardOpen(false);
        setWizardStep(1);
        setSelectedStack(null);
    };

    const handleCreate = () => {
        setWizardStep(4); // Loading state
        setTimeout(() => {
            handleCloseWizard();
            // In a real app we'd add it to the list here
        }, 2000);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)', padding: '40px 24px' }}>
            <div className="container">
                <motion.button
                    whileHover={{ x: -4 }}
                    onClick={() => navigate('/dashboard')}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </motion.button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Environments</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Manage your development containers.</p>
                    </div>
                    <button className="btn-primary" onClick={() => setWizardOpen(true)}>
                        <Plus size={18} /> New Environment
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                    {environments.map((env, index) => (
                        <motion.div
                            key={env.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card"
                            style={{ padding: '24px' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {env.icon}
                                </div>
                                <span style={{
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    background: env.status === 'Ready' ? 'rgba(16, 185, 129, 0.1)' : env.status === 'Stopped' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                    color: env.status === 'Ready' ? 'var(--success-color)' : env.status === 'Stopped' ? 'var(--text-muted)' : 'var(--warning-color)',
                                    border: '1px solid currentColor'
                                }}>
                                    {env.status}
                                </span>
                            </div>

                            <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{env.name}</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>{env.specs}</p>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn-primary" style={{ flex: 1 }} onClick={() => env.status === 'Ready' ? navigate('/workspace') : null}>
                                    <Play size={16} /> {env.status === 'Ready' ? 'Launch' : 'Start'}
                                </button>
                                <button className="btn-secondary" style={{ padding: '12px' }}>
                                    <Cpu size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Wizard Modal */}
            <AnimatePresence>
                {wizardOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseWizard}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 60 }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="glass-card"
                            style={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '90%',
                                maxWidth: '600px',
                                padding: '24px',
                                zIndex: 70,
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexShrink: 0 }}>
                                <h2 style={{ fontSize: '24px' }}>
                                    {wizardStep === 1 && "Select Stack"}
                                    {wizardStep === 2 && "Configure Specs"}
                                    {wizardStep === 3 && "Review"}
                                </h2>
                                <div onClick={handleCloseWizard} style={{ cursor: 'pointer' }}>
                                    <div style={{ padding: '4px', background: 'var(--surface-light)', borderRadius: '50%' }}>
                                        <X size={20} />
                                    </div>
                                </div>
                            </div>

                            {wizardStep === 1 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
                                    {[
                                        { name: 'Python', icon: <Terminal size={32} color="#3b82f6" />, desc: 'Data Science & ML' },
                                        { name: 'Node.js', icon: <Box size={32} color="#22c55e" />, desc: 'Web Backend' },
                                        { name: 'Go', icon: <Cpu size={32} color="#06b6d4" />, desc: 'Microservices' },
                                        { name: 'Rust', icon: <Shield size={32} color="#f97316" />, desc: 'System Programming' },
                                    ].map(stack => (
                                        <div
                                            key={stack.name}
                                            onClick={() => setSelectedStack(stack.name)}
                                            className="card-hover"
                                            style={{
                                                padding: '24px',
                                                border: `2px solid ${selectedStack === stack.name ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                                borderRadius: '16px',
                                                background: selectedStack === stack.name ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-darker)',
                                                cursor: 'pointer',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{stack.icon}</div>
                                            <div style={{ fontWeight: 600, marginBottom: '8px' }}>{stack.name}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stack.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {wizardStep === 2 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>Environment Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Deep Learning Project"
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                borderRadius: '8px',
                                                background: 'var(--bg-darker)',
                                                border: '1px solid var(--border-color)',
                                                color: 'white',
                                                fontSize: '14px',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>CPU Cores</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {[2, 4, 8].map(core => (
                                                <div key={core} style={{ flex: 1, padding: '8px', textAlign: 'center', background: 'var(--bg-darker)', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', fontSize: '13px' }}>
                                                    {core} vCPU
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>RAM</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {[4, 8, 16].map(ram => (
                                                <div key={ram} style={{ flex: 1, padding: '8px', textAlign: 'center', background: 'var(--bg-darker)', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer', fontSize: '13px' }}>
                                                    {ram} GB
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>Session Duration</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {[2, 4, 6].map(h => (
                                                <div
                                                    key={h}
                                                    onClick={() => setDuration(h)}
                                                    style={{
                                                        flex: 1,
                                                        padding: '8px',
                                                        textAlign: 'center',
                                                        background: duration === h ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-darker)',
                                                        borderRadius: '8px',
                                                        border: `1px solid ${duration === h ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                                        cursor: 'pointer',
                                                        fontSize: '13px',
                                                        color: duration === h ? 'var(--primary-color)' : 'var(--text-secondary)'
                                                    }}>
                                                    {h}h
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {wizardStep === 3 && (
                                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                    <div style={{ width: '80px', height: '80px', background: 'var(--surface-light)', borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Terminal size={40} color="var(--primary-color)" />
                                    </div>
                                    <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Ready to Launch?</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        Creating <strong>{selectedStack} Environment</strong> with 4 vCPU and 16GB RAM.
                                    </p>
                                </div>
                            )}

                            {wizardStep === 4 && (
                                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                        style={{ width: '48px', height: '48px', border: '4px solid var(--primary-color)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 24px' }}
                                    />
                                    <p>Provisioning Container...</p>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexShrink: 0 }}>
                                {wizardStep > 1 && wizardStep < 4 && (
                                    <button
                                        onClick={() => setWizardStep(prev => prev - 1)}
                                        style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}
                                    >
                                        Back
                                    </button>
                                )}
                                {wizardStep < 4 && (
                                    <button
                                        onClick={() => wizardStep === 3 ? handleCreate() : setWizardStep(prev => prev + 1)}
                                        className="btn-primary"
                                        style={{ flex: 1, padding: '14px', opacity: (wizardStep === 1 && !selectedStack) ? 0.5 : 1 }}
                                        disabled={wizardStep === 1 && !selectedStack}
                                    >
                                        {wizardStep === 3 ? 'Launch Environment' : 'Next'}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>


            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1 }}>
                {/* Background decoration if needed */}
            </div>
        </div >
    );
};

export default Environments;
