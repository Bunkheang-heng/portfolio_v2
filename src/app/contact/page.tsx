"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/nav'), { ssr: false })

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [terminalReady, setTerminalReady] = useState(false);
  
  // Simulate terminal typing effect
  useEffect(() => {
    const bootText = [
      "Initializing communication protocols...",
      "Loading contact modules...",
      "Setting up secure connection...",
      "Communication channels ready!",
      "Type your message to connect with Bunkheang..."
    ];
    
    let currentText = '';
    let currentIndex = 0;
    let charIndex = 0;
    
    const typeText = () => {
      if (currentIndex < bootText.length) {
        if (charIndex < bootText[currentIndex].length) {
          currentText += bootText[currentIndex][charIndex];
          setTerminalText(currentText);
          charIndex++;
          setTimeout(typeText, 20);
        } else {
          currentText += '\n';
          setTerminalText(currentText);
          currentIndex++;
          charIndex = 0;
          setTimeout(typeText, 400);
        }
      } else {
        setTerminalReady(true);
      }
    };
    
    // Start typing animation
    setTimeout(() => {
      typeText();
    }, 500);
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }, 5000);
    }, 1500);
  };
  
  return (
    
    <main className="min-h-screen pt-24 pb-16 bg-[var(--background)] text-[var(--text-primary)] font-mono">
        <Navbar />
      {/* Matrix-like background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="matrix-bg"></div>
      </div>
      
      {/* Page content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 mb-6">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-secondary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-primary)]"></span>
            </span>
            <span className="text-[var(--accent-primary)]">online and ready to connect</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 glitch-text" data-text="// CONNECT WITH ME">// CONNECT WITH ME</h1>
          
          <p className="text-lg text-[var(--accent-primary)] max-w-2xl mx-auto">
            <span className="text-[var(--accent-primary)]">const</span> <span className="text-green-400">developer</span> = &#123;
            open_to: <span className="text-[var(--accent-secondary)]">"new opportunities"</span>,
            loves_to: <span className="text-[var(--accent-secondary)]">"collaborate"</span> 
            &#125;;
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Terminal Section */}
          <motion.div 
            className="lg:col-span-5 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              {/* Terminal header */}
              <div className="bg-[var(--code-window-bg)] px-4 py-2 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm text-[var(--text-secondary)]">contact.sh ~ 70x24</div>
              </div>
              
              {/* Terminal body */}
              <div className="bg-[var(--code-editor-bg)] p-4 h-96 overflow-y-auto terminal-container">
                <div className="text-green-500 mb-4">
                  {terminalText}
                  {cursorVisible && terminalReady && <span className="terminal-cursor">▋</span>}
                </div>
                
                {terminalReady && (
                  <div className="text-[var(--text-secondary)]">
                    <div className="mb-4">
                      <span className="text-[var(--accent-primary)]">$</span> <span className="text-[var(--accent-secondary)]">contact</span> --info
                    </div>
                    
                    <div className="pl-4 border-l-2 border-[var(--card-border)] mb-6">
                      <div className="mb-3">
                        <span className="text-[var(--accent-primary)]">➜ EMAIL:</span> bunkheang@example.com
                      </div>
                      <div className="mb-3">
                        <span className="text-[var(--accent-primary)]">➜ LOCATION:</span> Phnom Penh, Cambodia
                      </div>
                      <div className="mb-3">
                        <span className="text-[var(--accent-primary)]">➜ AVAILABILITY:</span> Open to work
                      </div>
                      <div>
                        <span className="text-[var(--accent-primary)]">➜ STATUS:</span> <span className="text-green-400">Online</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-[var(--accent-primary)]">$</span> <span className="text-[var(--accent-secondary)]">contact</span> --social
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {['github', 'linkedin', 'twitter', 'instagram'].map((social) => (
                        <motion.a
                          key={social}
                          href={`https://${social}.com/yourusername`}
                          className="bg-[var(--code-window-bg)] p-3 rounded-lg hover:bg-[var(--card-bg)] transition-colors flex items-center justify-center"
                          whileHover={{ y: -5, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image 
                            src={`/social/${social}.svg`} 
                            alt={social} 
                            width={24} 
                            height={24}
                            className="w-5 h-5"
                          />
                        </motion.a>
                      ))}
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-[var(--accent-primary)]">$</span> <span className="text-[var(--accent-secondary)]">working-hours</span> --get
                    </div>
                    
                    <div className="bg-[var(--code-window-bg)] rounded-lg p-4 mb-6 border-l-4 border-[var(--accent-primary)]">
                      <div className="text-xs text-[var(--text-muted)] mb-2">// SCHEDULE</div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span className="text-green-400">09:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Weekends:</span>
                          <span className="text-yellow-400">By appointment</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-[var(--accent-primary)]">$</span> <span className="text-[var(--text-secondary)]">_</span>
                      {cursorVisible && <span className="terminal-cursor">▋</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Code Editor Form Section */}
          <motion.div 
            className="lg:col-span-7 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              {/* Editor header */}
              <div className="bg-[var(--code-window-bg)] px-4 py-2 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm text-[var(--text-secondary)] flex-1">
                  <span className="bg-[var(--code-editor-bg)] px-2 py-1 rounded text-[var(--accent-primary)]">message.js</span>
                  <span className="px-2 py-1">contact.css</span>
                </div>
              </div>
              
              {/* Editor body */}
              <div className="bg-[var(--code-editor-bg)] p-6">
                {submitted ? (
                  <motion.div 
                    className="border border-green-500 rounded-lg p-8 text-center bg-[var(--code-window-bg)]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <div className="text-[var(--text-secondary)] text-sm mb-2">// SUCCESS</div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Message Transmitted!</h3>
                    <p className="text-[var(--text-secondary)]">
                      <span className="text-[var(--accent-primary)]">Promise</span> resolved successfully. I'll respond to your message as soon as possible.
                    </p>
                    <div className="mt-4 bg-[var(--code-window-bg)] p-3 rounded-lg text-left overflow-x-auto">
                      <pre className="text-sm">
                        <span className="text-[var(--accent-primary)]">const</span> <span className="text-green-400">response</span> = <span className="text-[var(--accent-primary)]">await</span> <span className="text-[var(--accent-secondary)]">message.send</span>()<br/>
                        <span className="text-[var(--text-muted)]">// Returns: </span><br/>
                        &#123;<br/>
                        &nbsp;&nbsp;<span className="text-[var(--accent-primary)]">status</span>: <span className="text-green-400">"success"</span>,<br/>
                        &nbsp;&nbsp;<span className="text-[var(--accent-primary)]">message</span>: <span className="text-green-400">"Thank you for reaching out!"</span>,<br/>
                        &nbsp;&nbsp;<span className="text-[var(--accent-primary)]">eta</span>: <span className="text-green-400">"&lt; 24 hours"</span><br/>
                        &#125;
                      </pre>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-xs text-[var(--text-secondary)] mb-2">// SEND ME A MESSAGE</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-purple-400">const</span>
                          <label htmlFor="name" className="ml-2 text-[var(--accent-secondary)]">yourName</label>
                          <span className="text-[var(--accent-primary)] ml-2">=</span>
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-[var(--code-window-bg)] border border-[var(--card-border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none transition-colors text-[var(--text-primary)]"
                          placeholder='"John Doe"'
                        />
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-purple-400">const</span>
                          <label htmlFor="email" className="ml-2 text-[var(--accent-secondary)]">yourEmail</label>
                          <span className="text-[var(--accent-primary)] ml-2">=</span>
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-[var(--code-window-bg)] border border-[var(--card-border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none transition-colors text-[var(--text-primary)]"
                          placeholder='"john@example.com"'
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="text-purple-400">const</span>
                        <label htmlFor="subject" className="ml-2 text-[var(--accent-secondary)]">subject</label>
                        <span className="text-[var(--accent-primary)] ml-2">=</span>
                      </div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[var(--code-window-bg)] border border-[var(--card-border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none transition-colors text-[var(--text-primary)]"
                        placeholder='"Project Inquiry"'
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-start mb-1">
                        <span className="text-purple-400">function</span>
                        <label htmlFor="message" className="ml-2 text-[var(--accent-secondary)]">yourMessage</label>
                        <span className="text-[var(--text-primary)] ml-2">() &#123;</span>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-[var(--code-window-bg)] border border-[var(--card-border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none transition-colors resize-none text-[var(--text-primary)]"
                        placeholder="return `Hello, I'd like to discuss a potential project...`"
                      />
                      <div className="text-[var(--text-primary)]">&#125;</div>
                    </div>
                    
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        className="w-full bg-[var(--accent-primary)] text-white font-medium py-3 px-6 rounded-lg hover:bg-[var(--accent-secondary)] transition-colors relative overflow-hidden group"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 font-mono">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              message.send()...
                            </>
                          ) : (
                            <>
                              message.send()<span className="text-[var(--accent-secondary)]">;</span>
                            </>
                          )}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-primary)] to-[var(--accent-secondary)] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </motion.button>
                      <div className="text-xs text-[var(--text-muted)] mt-2 text-right">// Powered by Bunkheang.sendMessage()</div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Add CSS for animations */}
      <style jsx global>{`
        /* Matrix-like background effect */
        .matrix-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(var(--code-window-bg), var(--code-editor-bg)),
                      url("data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='0' y='5' font-size='5' fill='var(--matrix-pattern)'%3E1%3C/text%3E%3C/svg%3E"),
                      url("data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='0' y='5' font-size='5' fill='var(--matrix-pattern)'%3E0%3C/text%3E%3C/svg%3E");
          opacity: 0.05;
        }
        
        /* Terminal cursor blinking */
        .terminal-cursor {
          display: inline-block;
          width: 0.6em;
          height: 1em;
          background-color: var(--accent-primary);
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        /* Terminal container styling */
        .terminal-container {
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          line-height: 1.5;
        }
        
        /* Glitch text effect */
        .glitch-text {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                      -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          animation: glitch 2s infinite;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          animation: glitch-effect 3s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          transform: translate(-0.04em, -0.04em);
          opacity: 0.8;
        }
        
        .glitch-text::after {
          animation: glitch-effect 2s infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          transform: translate(0.04em, 0.04em);
          opacity: 0.8;
        }
        
        @keyframes glitch-effect {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                        -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                        -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                        -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                        -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                        0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                        -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                        0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                        -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                        0.05em 0 0 rgba(0, 255, 0, 0.75),
                        0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                        0.05em 0 0 rgba(0, 255, 0, 0.75),
                        0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                        -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                        -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
        }
      `}</style>
    </main>
  );
};

export default ContactPage;
