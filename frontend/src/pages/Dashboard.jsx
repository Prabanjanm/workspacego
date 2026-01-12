import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Cloud, Terminal, Clock, Settings, Bell, Search, Menu, LogOut, ChevronDown, Cpu, Activity, Folder } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const navigate = useNavigate();
    const [accessing, setAccessing] = useState(false);

    const handleAccess = () => {
        setAccessing(true);
        setTimeout(() => {
            navigate('/workspace');
        }, 1200);
    };

    const StatusBadge = ({ status }) => {
        const isReady = status === 'Ready';
        return (
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                background: isReady ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: isReady ? 'var(--success-color)' : 'var(--danger-color)',
                border: `1px solid ${isReady ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', marginRight: '8px', boxShadow: isReady ? '0 0 8px var(--success-color)' : 'none' }}></span>
                {status}
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
            {/* Glass Navbar */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    height: '70px',
                    background: 'var(--bg-darker)',
                    borderBottom: '1px solid var(--border-color)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50
                }}
            >
                <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Cpu size={28} className="text-gradient" />
                            <h2 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.5px' }} className="text-gradient">
                                WorkspaceGo
                            </h2>
                        </div>
                        <div style={{ display: 'none', md: { display: 'flex' }, gap: '32px', fontSize: '14px', fontWeight: 500 }}>
                            <span style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--primary-color)', paddingBottom: '21px', cursor: 'pointer' }}>Dashboard</span>
                            <span style={{ color: 'var(--text-secondary)', cursor: 'pointer', opacity: 0.8 }}>Environments</span>
                            <span style={{ color: 'var(--text-secondary)', cursor: 'pointer', opacity: 0.8 }}>Activity</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ position: 'relative', cursor: 'pointer' }}>
                            <Bell size={20} color="var(--text-secondary)" />
                            <span style={{ position: 'absolute', top: -2, right: 0, width: '8px', height: '8px', background: 'var(--danger-color)', borderRadius: '50%', border: '2px solid var(--bg-dark)' }}></span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '6px 12px', background: 'var(--surface-light)', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '12px' }}>
                                S
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>Student</span>
                            <ChevronDown size={14} color="var(--text-secondary)" />
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Dashboard Content */}
            <main className="container" style={{ padding: '40px 24px', flex: 1 }}>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ marginBottom: '40px' }}
                >
                    <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Launchpad</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Manage your high-performance containerized environments.</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '32px' }}>

                    {/* Environment Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card card-hover"
                        style={{ padding: '0', height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ padding: '32px', background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.12), transparent)', borderBottom: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Terminal size={28} color="var(--primary-color)" />
                                </div>
                                <StatusBadge status="Ready" />
                            </div>
                            <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Python ML Suite</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>PyTorch, TensorFlow, CUDA 11.8 • NVIDIA T4</p>
                        </div>

                        <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '12px', color: 'var(--text-muted)' }}>
                                    <span>Session Quota</span>
                                    <span style={{ color: 'var(--text-primary)' }}>1h remaining</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: 'var(--surface-light)', borderRadius: '4px', marginBottom: '32px', overflow: 'hidden' }}>
                                    <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))', borderRadius: '4px' }}></div>
                                </div>
                            </div>

                            <button
                                className="btn-primary"
                                style={{ width: '100%', padding: '16px' }}
                                onClick={handleAccess}
                            >
                                {accessing ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                            style={{ width: '18px', height: '18px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }}
                                        />
                                        Provisioning...
                                    </>
                                ) : (
                                    <>
                                        <span>Launch Workspace</span>
                                        <ChevronDown style={{ transform: 'rotate(-90deg)' }} size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Stats & Quick Actions Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Security Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card card-hover"
                            style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <div>
                                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Security Audit</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-color)', boxShadow: '0 0 8px var(--success-color)' }}></div>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Monitoring Active</p>
                                </div>
                            </div>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                <Shield size={28} color="var(--success-color)" />
                            </div>
                        </motion.div>

                        {/* Recent Files Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card"
                            style={{ padding: '32px', flex: 1 }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <h4 style={{ fontSize: '18px' }}>Cloud Sync</h4>
                                <Cloud size={20} color="var(--text-muted)" />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { name: 'neural_network.py', size: '12kb', icon: <Terminal size={18} /> },
                                    { name: 'dataset_v2.csv', size: '4.2mb', icon: <Activity size={18} /> },
                                    { name: 'requirements.txt', size: '1kb', icon: <Folder size={18} /> }
                                ].map((file, i) => (
                                    <motion.div
                                        whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                        key={file.name}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            padding: '12px',
                                            borderRadius: '12px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-darker)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{ color: 'var(--primary-color)' }}>{file.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '14px', marginBottom: '2px' }}>{file.name}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{file.size}</div>
                                        </div>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-color)' }} title="Synced"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
