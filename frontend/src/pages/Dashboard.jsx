import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CloudOff, UserCheck, HardDrive, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const navigate = useNavigate();
    const [accessing, setAccessing] = useState(false);

    const handleAccess = () => {
        setAccessing(true);
        setTimeout(() => {
            navigate('/workspace');
        }, 800);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '100vh', background: 'var(--background-color)' }}>
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}
            >
                <div>
                    <h2 style={{ fontSize: '24px', background: '-webkit-linear-gradient(45deg, #1a73e8, #4285f4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Student Dashboard</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Welcome back, ready to code?</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '8px 16px', borderRadius: '30px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, #1a73e8, #a4c2f4)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>S</div>
                    <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>student@university.edu</span>
                </div>
            </motion.header>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}
            >

                {/* Workspace Status Card */}
                <motion.div variants={item} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px 12px', background: '#e8daff', borderBottomLeftRadius: '12px', color: '#6200ee', fontSize: '12px', fontWeight: 'bold' }}>
                        BETA ACCESS
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ padding: '10px', background: '#e8f0fe', borderRadius: '8px' }}>
                            <HardDrive size={24} color="var(--primary-color)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px' }}>Remote Workspace</h3>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Ubuntu 22.04 LTS • 8GB RAM</p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '32px', display: 'flex', gap: '24px' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbc04' }}></span>
                                <span style={{ fontWeight: '500' }}>Idle</span>
                            </div>
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Last Snapshot</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                <Zap size={14} color="#fbbc04" fill="#fbbc04" />
                                <span style={{ fontWeight: '500' }}>Just now</span>
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary"
                        onClick={handleAccess}
                        style={{ width: '100%', justifyContent: 'space-between', padding: '16px 24px' }}
                    >
                        <span>{accessing ? 'Initializing Environment...' : 'Access Workspace'}</span>
                        {!accessing && <ArrowRight size={20} />}
                    </motion.button>
                </motion.div>

                {/* Security Assurance Card */}
                <motion.div variants={item} className="card" style={{ borderLeft: '4px solid var(--success-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ padding: '10px', background: '#e6f4ea', borderRadius: '8px' }}>
                            <Shield size={24} color="var(--success-color)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px' }}>Security Protocol</h3>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Zero-trust architecture enabled</p>
                        </div>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <motion.li
                            whileHover={{ x: 5 }}
                            style={{ background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', border: '1px solid #f0f0f0' }}
                        >
                            <CloudOff size={18} color="#5f6368" />
                            <span>No permanent cloud persistence</span>
                        </motion.li>
                        <motion.li
                            whileHover={{ x: 5 }}
                            style={{ background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', border: '1px solid #f0f0f0' }}
                        >
                            <Shield size={18} color="#5f6368" />
                            <span>Auto-wipe on session end</span>
                        </motion.li>
                        <motion.li
                            whileHover={{ x: 5 }}
                            style={{ background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '8px', marginBottom: '0', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', border: '1px solid #f0f0f0' }}
                        >
                            <UserCheck size={18} color="#5f6368" />
                            <span>Biometric verification active</span>
                        </motion.li>
                    </ul>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default Dashboard;
