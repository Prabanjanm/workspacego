import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCode, FileJson, FileText, Lock, LogOut, Terminal, Play, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const mockFiles = [
    { name: 'main.py', type: 'python', content: 'print("Hello, WorkspaceGo!")\n\nimport os\n\ndef secure_access():\n    # Simulating secure environment access\n    if os.environ.get("SECURE_MODE"):\n        return True\n    return False\n\nif __name__ == "__main__":\n    print(f"Secure Access: {secure_access()}")' },
    { name: 'app.js', type: 'js', content: 'const express = require("express");\nconst app = express();\nconst port = 3000;\n\napp.get("/", (req, res) => {\n  res.send("Secure Workspace Active");\n});\n\napp.listen(port, () => {\n  console.log(`Example app listening from secure container`);\n});' },
    { name: 'config.json', type: 'json', content: '{\n  "environment": "temporary",\n  "encryption": "AES-256",\n  "ttl_seconds": 3600,\n  "allow_outbound": false\n}' },
    { name: 'requirements.txt', type: 'text', content: 'flask==2.0.1\nnumpy==1.21.0\nrequests==2.26.0\ncryptography==3.4.7' },
];

const Workspace = () => {
    const navigate = useNavigate();
    const [activeFile, setActiveFile] = useState(mockFiles[0]);
    const [terminalOpen, setTerminalOpen] = useState(true);

    useEffect(() => {
        toast.success("Secure Workspace Environment Loaded");
    }, []);

    const handleEndSession = () => {
        toast.loading("Terminating secure session...");
        setTimeout(() => {
            navigate('/end-session');
        }, 1000);
    };

    const getIcon = (name) => {
        if (name.endsWith('.py') || name.endsWith('.js')) return <FileCode size={16} />;
        if (name.endsWith('.json')) return <FileJson size={16} />;
        return <FileText size={16} />;
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#202124', color: '#e8eaed', fontFamily: 'Menlo, Monaco, "Courier New", monospace' }}>
            <Toaster position="bottom-right" theme="dark" />

            {/* Top Banner */}
            <div style={{
                background: '#2d2e31',
                borderBottom: '1px solid #3c4043',
                padding: '0 20px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontWeight: 600, fontSize: '16px' }}>WorkspaceGo IDE</span>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#81c995', fontSize: '12px', background: 'rgba(30,142,62,0.2)', padding: '4px 8px', borderRadius: '4px' }}
                    >
                        <Lock size={12} />
                        <span>ENCRYPTED CHANNEL</span>
                    </motion.div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-primary" style={{ padding: '6px 16px', fontSize: '12px', height: '32px' }}>
                        <Play size={12} /> Run
                    </button>
                    <button className="btn-danger" onClick={handleEndSession} style={{ padding: '6px 16px', fontSize: '12px', background: '#d93025', border: 'none', color: 'white', height: '32px' }}>
                        <LogOut size={12} /> End Session
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                {/* Left Panel: File List */}
                <div style={{ width: '240px', background: '#2d2e31', borderRight: '1px solid #3c4043', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #3c4043', fontSize: '12px', letterSpacing: '1px', color: '#9aa0a6' }}>EXPLORER</div>
                    <div style={{ flex: 1, overflowY: 'auto', paddingTop: '8px' }}>
                        {mockFiles.map((file) => (
                            <motion.div
                                whileHover={{ backgroundColor: '#3c4043' }}
                                key={file.name}
                                onClick={() => setActiveFile(file)}
                                style={{
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: activeFile.name === file.name ? '#3c4043' : 'transparent',
                                    color: activeFile.name === file.name ? '#ffffff' : '#9aa0a6',
                                    fontSize: '13px',
                                    borderLeft: activeFile.name === file.name ? '2px solid #8ab4f8' : '2px solid transparent'
                                }}
                            >
                                {getIcon(file.name)}
                                {file.name}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Code Editor Mock */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#202124' }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', background: '#2d2e31' }}>
                        <div style={{ padding: '10px 24px', background: '#202124', color: '#fff', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '2px solid #8ab4f8' }}>
                            {getIcon(activeFile.name)} {activeFile.name}
                        </div>
                    </div>

                    <motion.textarea
                        key={activeFile.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        value={activeFile.content}
                        readOnly
                        spellCheck={false}
                        style={{
                            flex: 1,
                            border: 'none',
                            padding: '24px',
                            fontFamily: '"Fira Code", monospace',
                            fontSize: '14px',
                            resize: 'none',
                            outline: 'none',
                            lineHeight: '1.6',
                            background: '#202124',
                            color: '#e8eaed'
                        }}
                    />

                    {/* Terminal Mock */}
                    <div style={{ height: terminalOpen ? '200px' : '32px', borderTop: '1px solid #3c4043', background: '#2d2e31', transition: 'height 0.3s ease' }}>
                        <div
                            onClick={() => setTerminalOpen(!terminalOpen)}
                            style={{ padding: '8px 16px', fontSize: '12px', color: '#9aa0a6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #3c4043' }}
                        >
                            <Terminal size={12} /> TERMINAL
                        </div>
                        {terminalOpen && (
                            <div style={{ padding: '12px', fontFamily: '"Fira Code", monospace', fontSize: '13px', color: '#e8eaed' }}>
                                <p style={{ color: '#81c995' }}>user@workspace-go:~$ <span style={{ color: '#e8eaed' }}>python3 main.py</span></p>
                                <p>Hello, WorkspaceGo!</p>
                                <p>Secure Access: True</p>
                                <p style={{ color: '#81c995', marginTop: '8px' }}>user@workspace-go:~$ <span className="cursor-blink" style={{ borderLeft: '8px solid #9aa0a6', height: '14px', display: 'inline-block', verticalAlign: 'bottom' }}></span></p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Workspace;
