import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, GitCommit, PlayCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Activity = () => {
    const navigate = useNavigate();

    const activities = [
        { id: 1, type: 'session', title: 'Started Python ML Suite', time: '2 mins ago', icon: <PlayCircle size={18} color="var(--success-color)" /> },
        { id: 2, type: 'commit', title: 'Committed changes to train_model.py', time: '1 hour ago', icon: <GitCommit size={18} color="var(--primary-color)" /> },
        { id: 3, type: 'alert', title: 'High Memory Usage Warning', time: '4 hours ago', icon: <AlertCircle size={18} color="var(--warning-color)" /> },
        { id: 4, type: 'session', title: 'Ended Session', time: 'Yesterday', icon: <Clock size={18} color="var(--text-secondary)" /> },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)', padding: '40px 24px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.button
                    whileHover={{ x: -4 }}
                    onClick={() => navigate('/dashboard')}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </motion.button>

                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Activity Log</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Recent actions and events in your workspace.</p>

                <div style={{ position: 'relative' }}>
                    {/* Timeline line */}
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: '23px', width: '2px', background: 'var(--border-color)' }}></div>

                    {activities.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{ display: 'flex', gap: '24px', marginBottom: '32px', position: 'relative' }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: 'var(--bg-dark)',
                                border: '2px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1
                            }}>
                                {item.icon}
                            </div>
                            <div className="glass-card" style={{ flex: 1, padding: '20px' }}>
                                <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>{item.title}</h4>
                                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.time}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Activity;
