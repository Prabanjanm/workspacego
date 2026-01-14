import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Shield, Cloud, Terminal, Clock, Settings, Bell, Search, Menu, LogOut, ChevronDown, Cpu, Activity, Folder, X, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const navigate = useNavigate();
    const [accessing, setAccessing] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const handleAccess = () => {
        setAccessing(true);
        setTimeout(() => {
            navigate('/workspace');
        }, 1200);
    };

    const handleComingSoon = (feature) => {
        toast(feature + " feature coming soon!", {
            icon: '🚧',
            style: {
                borderRadius: '10px',
                background: 'var(--surface-dark)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
            },
        });
    };

    const handleFileClick = (filename) => {
        toast.success(`Synced ${filename}`, {
            style: {
                borderRadius: '10px',
                background: 'var(--surface-dark)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
            }
        });
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
            <Toaster position="bottom-center" />
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div className="hide-on-desktop" onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={24} color="var(--text-primary)" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                            <div style={{ position: 'relative', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Laptop size={28} className="text-gradient" strokeWidth={1.5} />
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '-1px' }}>
                                    <Cloud size={10} className="text-gradient" fill="currentColor" style={{ opacity: 0.8 }} />
                                </div>
                            </div>
                            <h2 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.5px' }} className="text-gradient">
                                WorkspaceGo
                            </h2>
                        </div>
                        <div className="hide-on-mobile" style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: 500, marginLeft: '32px' }}>
                            <span style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--primary-color)', paddingBottom: '21px', cursor: 'pointer' }}>Dashboard</span>
                            <span onClick={() => navigate('/environments')} style={{ color: 'var(--text-secondary)', cursor: 'pointer', opacity: 0.8, transition: 'color 0.2s' }} className="hover:text-primary">Environments</span>
                            <span onClick={() => navigate('/activity')} style={{ color: 'var(--text-secondary)', cursor: 'pointer', opacity: 0.8, transition: 'color 0.2s' }} className="hover:text-primary">Activity</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setNotificationsOpen(!notificationsOpen)}>
                            <Bell size={20} color="var(--text-secondary)" />
                            <span style={{ position: 'absolute', top: -2, right: 0, width: '8px', height: '8px', background: 'var(--danger-color)', borderRadius: '50%', border: '2px solid var(--bg-dark)' }}></span>
                        </div>

                        <div
                            className="hide-on-mobile"
                            onClick={() => navigate('/profile')}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '6px 12px', background: 'var(--surface-light)', borderRadius: '30px', border: '1px solid var(--border-color)' }}
                        >
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '12px' }}>
                                S
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>Student</span>
                            <ChevronDown size={14} color="var(--text-secondary)" />
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 60, backdropFilter: 'blur(4px)' }}
                            />
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    width: '280px',
                                    background: 'var(--bg-darker)',
                                    zIndex: 70,
                                    padding: '24px',
                                    borderRight: '1px solid var(--border-color)',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ position: 'relative', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Laptop size={24} className="text-gradient" strokeWidth={1.5} />
                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '-1px' }}>
                                                <Cloud size={9} className="text-gradient" fill="currentColor" style={{ opacity: 0.8 }} />
                                            </div>
                                        </div>
                                        <span style={{ fontWeight: 700, fontSize: '20px' }}>Menu</span>
                                    </div>
                                    <div onClick={() => setMobileMenuOpen(false)}>
                                        <X size={24} color="var(--text-secondary)" />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '16px', fontWeight: 500 }}>
                                    <div style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Activity size={20} /> Dashboard
                                    </div>
                                    <div onClick={() => navigate('/environments')} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Terminal size={20} /> Environments
                                    </div>
                                    <div onClick={() => navigate('/activity')} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Clock size={20} /> Activity
                                    </div>
                                    <div onClick={() => navigate('/profile')} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Settings size={20} /> Settings
                                    </div>
                                </div>

                                <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                                    <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--danger-color)', cursor: 'pointer' }}>
                                        <LogOut size={20} /> Sign Out
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}

                    {notificationsOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            style={{
                                position: 'absolute',
                                top: '64px',
                                right: '80px',
                                width: '320px',
                                background: 'var(--surface-dark)',
                                borderRadius: '16px',
                                border: '1px solid var(--border-color)',
                                boxShadow: 'var(--shadow-lg)',
                                padding: '16px',
                                zIndex: 60
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h4 style={{ fontSize: '14px' }}>Notifications</h4>
                                <span style={{ fontSize: '12px', color: 'var(--primary-color)', cursor: 'pointer' }}>Mark all read</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-color)', marginTop: '6px' }}></div>
                                    <div>
                                        <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>New model training completed</p>
                                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>2 mins ago</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--warning-color)', marginTop: '6px' }}></div>
                                    <div>
                                        <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>High CPU usage alert</p>
                                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>1 hour ago</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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

                {/* Live System Stats */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card"
                    style={{ marginBottom: '32px', padding: '24px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}
                >
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Global CPU Usage</span>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>42%</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--surface-light)', borderRadius: '3px', overflow: 'hidden' }}>
                            <motion.div
                                animate={{ width: ['40%', '45%', '42%'] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                style={{ height: '100%', background: 'var(--primary-color)', borderRadius: '3px' }}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>GPU Cluster Load</span>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>78%</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--surface-light)', borderRadius: '3px', overflow: 'hidden' }}>
                            <motion.div
                                animate={{ width: ['75%', '82%', '78%'] }}
                                transition={{ repeat: Infinity, duration: 2.5 }}
                                style={{ height: '100%', background: 'var(--accent-color)', borderRadius: '3px' }}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Memory</span>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>12.4 GB / 32 GB</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--surface-light)', borderRadius: '3px', overflow: 'hidden' }}>
                            <motion.div
                                animate={{ width: ['38%', '39%', '38%'] }}
                                transition={{ repeat: Infinity, duration: 5 }}
                                style={{ height: '100%', background: 'var(--success-color)', borderRadius: '3px' }}
                            />
                        </div>
                    </div>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>

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

                            {/* Live Resource Graph Simulation */}
                            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px', paddingRight: '20px' }}>
                                {[40, 65, 55, 80, 45, 70, 90, 60, 75, 50, 65, 85].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: '20%' }}
                                        animate={{ height: `${h}%` }}
                                        transition={{
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            duration: 1.5,
                                            delay: i * 0.1
                                        }}
                                        style={{
                                            flex: 1,
                                            background: 'var(--primary-color)',
                                            opacity: 0.3,
                                            borderRadius: '2px'
                                        }}
                                    />
                                ))}
                            </div>
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
                            onClick={() => handleComingSoon('Security Detail')}
                            style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
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
                                        onClick={() => handleFileClick(file.name)}
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
