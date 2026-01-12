import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      onLogin();
      toast.success("Successfully logged in!");
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card"
        style={{ maxWidth: '420px', width: '90%', textAlign: 'center', padding: '48px 32px' }}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px',
            color: 'var(--primary-color)',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'var(--primary-color)', filter: 'blur(20px)', opacity: 0.2, borderRadius: '50%' }}></div>
          <Lock size={56} strokeWidth={1.5} />
        </motion.div>

        <h1 style={{ fontSize: '28px', marginBottom: '12px', background: '-webkit-linear-gradient(45deg, #1a73e8, #4285f4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          WorkspaceGo
        </h1>
        <p style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '16px', fontWeight: '500' }}>
          AI-Powered Secure Student Workspace
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
          “Your workspace. Anywhere. Securely.”
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary"
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', padding: '14px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }}
            />
          ) : (
            <>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', padding: '2px' }} />
              Sign in with Google
            </>
          )}
        </motion.button>

        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', color: '#5f6368' }}>
          <ShieldCheck size={14} />
          <span>Bank-grade encryption & security</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
