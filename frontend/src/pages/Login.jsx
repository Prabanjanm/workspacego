import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
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
    <div className="flex-center" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Abstract Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'var(--primary-color)', opacity: '0.15', filter: 'blur(120px)', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'var(--secondary-color)', opacity: '0.15', filter: 'blur(120px)', borderRadius: '50%' }}></div>

      <Toaster position="top-center" toastOptions={{
        style: {
          background: 'var(--surface-dark)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)'
        }
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card"
        style={{ maxWidth: '440px', width: '90%', padding: '48px 40px', textAlign: 'center', zIndex: 10 }}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{ width: '80px', height: '80px', margin: '0 auto 32px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', borderRadius: '20px', opacity: 0.2, transform: 'rotate(45deg)' }}></div>
          <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(255,255,255,0.1)', borderRadius: '20px', transform: 'rotate(45deg)' }}></div>
          <Cpu size={40} className="text-gradient" />
        </motion.div>

        <h1 className="text-gradient" style={{ fontSize: '36px', marginBottom: '12px', letterSpacing: '-1px' }}>
          WorkspaceGo
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '16px', lineHeight: '1.6' }}>
          Secure, isolated development environments <br />for the modern student.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary"
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '32px' }}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }}
            />
          ) : (
            <>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '22px', height: '22px', background: 'white', borderRadius: '50%', padding: '2px' }} />
              <span>Continue with Google</span>
            </>
          )}
        </motion.button>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <ShieldCheck size={14} color="var(--success-color)" />
            <span>End-to-end encrypted session</span>
          </div>
        </div>
      </motion.div>

      <div style={{ position: 'absolute', bottom: '20px', color: 'var(--text-muted)', fontSize: '12px' }}>
        &copy; 2024 WorkspaceGo. All systems operational.
      </div>
    </div>
  );
};

export default Login;
