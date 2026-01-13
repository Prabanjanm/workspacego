import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Cpu, ArrowLeft, Play, Plus, Box } from 'lucide-react';
import { motion } from 'framer-motion';

const Environments = () => {
    const navigate = useNavigate();

    const environments = [
        { id: 1, name: 'Python ML Suite', status: 'Ready', specs: 'NVIDIA T4 • 16GB RAM', icon: <Terminal size={24} color="#3b82f6" /> },
        { id: 2, name: 'Node.js Backend', status: 'Stopped', specs: '2 vCPU • 4GB RAM', icon: <Box size={24} color="#22c55e" /> },
        { id: 3, name: 'Rust Systems', status: 'Building', specs: '4 vCPU • 8GB RAM', icon: <Cpu size={24} color="#f97316" /> },
    ];

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
                    <button className="btn-primary">
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
        </div>
    );
};

export default Environments;
