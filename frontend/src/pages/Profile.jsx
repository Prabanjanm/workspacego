import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Shield, CreditCard, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        if (onLogout) onLogout(); // Attempt to call parent logout if passed, though mostly this will just redirect
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)', padding: '40px 24px' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <motion.button
                    whileHover={{ x: -4 }}
                    onClick={() => navigate('/dashboard')}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </motion.button>

                <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                        margin: '0 auto 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        S
                    </div>
                    <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Student User</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>student@university.edu</p>

                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <User size={20} color="var(--primary-color)" />
                            <div>
                                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Full Name</div>
                                <div>Student User</div>
                            </div>
                        </div>
                        <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Mail size={20} color="var(--accent-color)" />
                            <div>
                                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Email Address</div>
                                <div>student@university.edu</div>
                            </div>
                        </div>
                        <div style={{ padding: '16px', background: 'var(--bg-darker)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Shield size={20} color="var(--success-color)" />
                            <div>
                                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Account Type</div>
                                <div>Educational License</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="btn-danger"
                        style={{ marginTop: '32px', width: '100%', justifyContent: 'center' }}
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
