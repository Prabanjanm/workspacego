import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCode, FileJson, FileText, Lock, LogOut, Terminal, Play, Save, ChevronRight, X, Menu, Folder, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

// Complex looking mock code to impress judges
const mockCodePython = `import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

# WorkspaceGo Secure ML Container
# initializing trusted execution environment...

def create_secure_model():
    """Builds a secure CNN model for pattern recognition"""
    model = models.Sequential()
    model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
    model.add(layers.MaxPooling2D((2, 2)))
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))
    
    # Secure Enclave Processing
    if tf.config.list_physical_devices('GPU'):
        print("Secure GPU Enclave: Active")
    
    return model

def train_job():
    print("Fetching encrypted dataset...")
    # Simulated decryption stream
    print("Training started on Secure Node [sgx-enclave-01]")
    
    model = create_secure_model()
    model.summary()
    
    return "Training Complete"

if __name__ == "__main__":
    status = train_job()
    print(f"Job Status: {status}")
`;

const mockFiles = [
    { name: 'train_model.py', type: 'python', content: mockCodePython },
    { name: 'config.json', type: 'json', content: '{\n  "enclave_mode": "strict",\n  "encryption": "AES-256-GCM",\n  "max_memory": "8GB",\n  "timeout": 3600\n}' },
    { name: 'dataset_loader.py', type: 'python', content: '# Secure Data Loader\nimport pandas as pd\n\ndef load_secure_batch():\n    return pd.read_csv("encrypted://data/batch_01.csv")' },
    { name: 'requirements.txt', type: 'text', content: 'tensorflow==2.8.0\nnumpy==1.21.0\ncryptography==3.4.7\nsecure-enclave==1.0.4' },
];

const Workspace = () => {
    const navigate = useNavigate();
    const [activeFile, setActiveFile] = useState(mockFiles[0]);
    const [openFiles, setOpenFiles] = useState([mockFiles[0]]);
    const [terminalOpen, setTerminalOpen] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [aiPanelOpen, setAiPanelOpen] = useState(false);
    const [aiContent, setAiContent] = useState('');
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours default



    useEffect(() => {
        toast.success("Secure Workspace Environment Loaded");
        setLogs([
            { text: "user@workspace-go:~$ connecting to secure enclave...", color: "var(--text-secondary)" },
            { text: "user@workspace-go:~$ connection established (latency: 12ms)", color: "var(--success-color)" },
            { text: "user@workspace-go:~$ awaiting input...", color: "var(--text-secondary)" }
        ]);



        // Auto-close sidebar on mobile initial load
        if (window.innerWidth < 768) setSidebarOpen(false);

        const timer = setInterval(() => {
            setTimeLeft(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOpenFile = (file) => {
        if (!openFiles.find(f => f.name === file.name)) {
            setOpenFiles([...openFiles, file]);
        }
        setActiveFile(file);
        if (window.innerWidth < 768) setSidebarOpen(false);
    };

    const handleCloseTab = (e, fileName) => {
        e.stopPropagation();
        const newFiles = openFiles.filter(f => f.name !== fileName);
        if (newFiles.length === 0) {
            toast.error("Cannot close main entry point", {
                style: {
                    background: 'var(--surface-dark)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)'
                }
            });
            return;
        }
        if (activeFile.name === fileName) {
            setActiveFile(newFiles[newFiles.length - 1]);
        }
        setOpenFiles(newFiles);
    };

    const runAiAnalysis = () => {
        setAiPanelOpen(true);
        if (aiContent) return; // Don't run twice

        setIsAiTyping(true);
        const suggestion = `
I've analyzed your secure model implementation.

OPTIMIZATION SUGGESTIONS:
1. Add BatchNormalization layers to improve convergence speed (~15% faster).
2. The current dropout rate of 0.0 is risky. Suggest adding Dropout(0.5) layer after the dense layer to prevent overfitting.
3. Your secure enclave connection protocol looks solid, but consider rotating the AES keys every 60 minutes.

Here is a refactored snippet for the model:
... model.add(layers.BatchNormalization()) ...
        `;

        let i = 0;
        const typeInterval = setInterval(() => {
            setAiContent(suggestion.substring(0, i));
            i++;
            if (i > suggestion.length) {
                clearInterval(typeInterval);
                setIsAiTyping(false);
            }
        }, 30);
    };

    const addLog = (text, color) => {
        setLogs(prev => [...prev, { text, color, id: Date.now() }]);
    };

    const handleRun = () => {
        setIsRunning(true);
        addLog(`user@workspace-go:~$ python3 ${activeFile.name}`, "var(--text-primary)");

        setTimeout(() => {
            addLog(">> Initializing TensorFlow Secure Backend...", "var(--warning-color)");
        }, 800);

        setTimeout(() => {
            addLog(">> Secure GPU Enclave: Active", "var(--success-color)");
        }, 1800);

        setTimeout(() => {
            addLog(">> Model Summary: Sequential (None, 26, 26, 32)", "var(--text-primary)");
            setIsRunning(false);
        }, 2800);
    };

    const handleEndSession = () => {
        toast.custom((t) => (
            <div style={{ background: 'var(--surface-dark)', color: 'white', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)' }}>
                <Lock size={18} color="var(--danger-color)" />
                <span>Terminating secure session...</span>
            </div>
        ));
        setTimeout(() => {
            navigate('/end-session');
        }, 1500);
    };

    // Auto-end session when timer hits 0
    useEffect(() => {
        if (timeLeft === 0) {
            handleEndSession();
        }
    }, [timeLeft]);

    const getIcon = (name) => {
        if (name.endsWith('.py')) return <FileCode size={15} color="var(--primary-color)" />;
        if (name.endsWith('.js')) return <FileCode size={15} color="#fcd34d" />;
        if (name.endsWith('.json')) return <FileJson size={15} color="#f472b6" />;
        return <FileText size={15} color="var(--text-secondary)" />;
    };

    const handleSave = () => {
        toast.success("File saved successfully", {
            style: {
                background: 'var(--surface-dark)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)'
            }
        });
    };



    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-darker)', color: 'var(--text-primary)', fontFamily: 'Menlo, Monaco, "Courier New", monospace', overflow: 'hidden' }}>
            <Toaster position="bottom-right" toastOptions={{
                style: {
                    background: 'var(--surface-dark)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)'
                }
            }} />

            {/* Top Bar (VS Code style) */}
            <div style={{
                height: '48px',
                background: 'var(--bg-dark)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                        className="hide-on-desktop"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        style={{ cursor: 'pointer', padding: '4px' }}
                    >
                        <Menu size={18} color="var(--text-secondary)" />
                    </div>

                    <div className="hide-on-mobile" style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--danger-color)' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--warning-color)' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--success-color)' }}></div>
                    </div>
                    <div className="hide-on-mobile" style={{ width: '1px', height: '16px', background: 'var(--border-color)' }}></div>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>workspace-go / {activeFile.name}</span>
                </div>

                <div style={{ marginRight: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px', background: 'var(--surface-dark)', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <Clock size={14} />
                    <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                        {Math.floor(timeLeft / 3600).toString().padStart(2, '0')}:
                        {Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')}:
                        {(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginLeft: '4px' }}>
                        <div onClick={() => setTimeLeft(prev => prev + 1800)} style={{ cursor: 'pointer', lineHeight: 0.5 }}>▲</div>
                        <div onClick={() => setTimeLeft(prev => Math.max(0, prev - 1800))} style={{ cursor: 'pointer', lineHeight: 0.5 }}>▼</div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                >
                    <Lock size={12} color="var(--success-color)" />
                    <span style={{ color: 'var(--success-color)', fontWeight: 600 }}>Secure Tunnel: AES-256</span>
                </motion.div>
            </div>

            {/* Main Area */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

                {/* Sidebar */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ x: -240, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -240, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                width: '240px',
                                background: 'var(--bg-dark)',
                                borderRight: '1px solid var(--border-color)',
                                display: 'flex',
                                flexDirection: 'column',
                                position: window.innerWidth < 768 ? 'absolute' : 'relative',
                                height: '100%',
                                zIndex: 20
                            }}
                        >
                            <div style={{ padding: '16px 20px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>EXPLORER</div>
                            <div style={{ marginTop: '8px' }}>
                                {mockFiles.map(file => (
                                    <div
                                        key={file.name}
                                        onClick={() => handleOpenFile(file)}
                                        style={{
                                            padding: '8px 24px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            background: activeFile.name === file.name ? 'var(--surface-light)' : 'transparent',
                                            color: activeFile.name === file.name ? 'var(--text-primary)' : 'var(--text-muted)',
                                            fontSize: '13px',
                                            borderLeft: activeFile.name === file.name ? '3px solid var(--primary-color)' : '3px solid transparent'
                                        }}
                                    >
                                        {getIcon(file.name)}
                                        {file.name}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Overlay */}
                {sidebarOpen && window.innerWidth < 768 && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 15 }}
                    ></div>
                )}

                {/* Editor Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-darker)', minWidth: 0 }}>

                    {/* File Tabs */}
                    <div style={{ display: 'flex', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-color)', overflowX: 'auto' }}>
                        {openFiles.map(file => (
                            <div
                                key={file.name}
                                onClick={() => setActiveFile(file)}
                                style={{
                                    padding: '10px 20px',
                                    background: activeFile.name === file.name ? 'var(--bg-darker)' : 'rgba(0,0,0,0.2)',
                                    color: activeFile.name === file.name ? 'var(--text-primary)' : 'var(--text-muted)',
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    borderTop: activeFile.name === file.name ? '2px solid var(--primary-color)' : '2px solid transparent',
                                    borderRight: '1px solid var(--border-color)',
                                    cursor: 'pointer',
                                    flexShrink: 0
                                }}
                            >
                                {getIcon(file.name)} {file.name}
                                <div
                                    onClick={(e) => handleCloseTab(e, file.name)}
                                    className="hover-bg"
                                    style={{ borderRadius: '4px', padding: '2px', display: 'flex' }}
                                >
                                    <X size={12} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: 1, position: 'relative' }}>
                        <textarea
                            value={activeFile.content}
                            readOnly
                            style={{
                                width: '100%',
                                height: '100%',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                padding: '24px 32px',
                                fontFamily: '"Menlo", "Fira Code", monospace',
                                fontSize: '15px',
                                lineHeight: '1.6',
                                resize: 'none',
                                outline: 'none',
                                position: 'relative',
                                zIndex: 1
                            }}
                        />



                        {/* AI Copilot Panel */}
                        <AnimatePresence>
                            {aiPanelOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    style={{
                                        position: 'absolute',
                                        right: '20px',
                                        top: '20px',
                                        width: '300px',
                                        background: 'rgba(30, 30, 40, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        boxShadow: 'var(--shadow-lg)',
                                        zIndex: 20
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-color)', fontWeight: 600 }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', boxShadow: '0 0 8px var(--accent-color)' }}></div>
                                            AI Copilot
                                        </div>
                                        <X size={16} className="cursor-pointer" onClick={() => setAiPanelOpen(false)} />
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', whiteSpace: 'pre-wrap', maxHeight: '300px', overflowY: 'auto' }}>
                                        {aiContent}
                                        {isAiTyping && <span className="cursor-blink">|</span>}
                                    </div>
                                    {!isAiTyping && aiContent && (
                                        <button className="btn-primary" style={{ width: '100%', marginTop: '16px', fontSize: '12px', padding: '8px' }}>
                                            Apply Fixes
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Floating Action Buttons */}
                        <div style={{ position: 'absolute', bottom: '32px', right: '32px', display: 'flex', gap: '16px', zIndex: 10 }}>
                            <button
                                onClick={runAiAnalysis}
                                className="magic-button"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.1 12.1"></path><path d="M12 12 18.4 5.6"></path></svg>
                                Ask AI
                            </button>
                            <button
                                onClick={handleSave}
                                style={{
                                    background: 'var(--surface-light)',
                                    color: 'var(--text-primary)',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Save size={16} /> Save
                            </button>
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                style={{
                                    background: isRunning ? 'var(--surface-light)' : 'var(--success-color)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    cursor: isRunning ? 'default' : 'pointer',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    opacity: isRunning ? 0.7 : 1,
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Play size={16} fill="currentColor" /> {isRunning ? 'Running...' : 'Run Code'}
                            </button>
                            <button
                                onClick={handleEndSession}
                                style={{
                                    background: 'var(--danger-color)',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <LogOut size={16} /> End Session
                            </button>
                        </div>
                    </div>

                    {/* Terminal */}
                    <div style={{ height: terminalOpen ? '280px' : '40px', background: 'var(--bg-dark)', borderTop: '1px solid var(--border-color)', transition: 'height 0.3s ease', display: 'flex', flexDirection: 'column' }}>
                        <div
                            onClick={() => setTerminalOpen(!terminalOpen)}
                            style={{ padding: '8px 24px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-dark)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Terminal size={14} /> TERMINAL
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                <ChevronRight size={16} transform={terminalOpen ? 'rotate(90)' : ''} />
                            </div>
                        </div>

                        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', fontFamily: '"Fira Code", monospace', fontSize: '13px' }}>
                            {logs.map((log) => (
                                <TypewriterLog key={log.id} text={log.text} color={log.color} />
                            ))}
                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                                <span className="cursor-blink" style={{ width: '8px', height: '18px', background: 'var(--text-secondary)' }}></span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

// Component for typing effect
const TypewriterLog = ({ text, color }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginBottom: '6px', color: color }}
        >
            {text}
        </motion.div>
    );
};

export default Workspace;
