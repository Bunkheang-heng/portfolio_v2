"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/nav'), { ssr: false })

// Define message types
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AskAI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat with greeting
  useEffect(() => {
    if (!initialized) {
      setTimeout(() => {
        const initialMessage: Message = {
          id: Date.now().toString(),
          text: "Hello! I'm Bunkheang's AI assistant powered by Google Gemini. I have detailed knowledge about Bunkheang's skills, projects, experience, education, certificates, hackathons, and volunteer work. Ask me anything about Bunkheang!",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages([initialMessage]);
        setInitialized(true);
      }, 1000);
    }
  }, [initialized]);

  // Function to handle user input
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);
    
    try {
      // First try the direct Gemini API endpoint
      let response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      
      // If direct Gemini fails, fall back to our simple API
      if (!response.ok) {
        console.log('Gemini API failed, trying fallback API');
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });
        
        if (!response.ok) {
          throw new Error('All API endpoints failed');
        }
      }
      
      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error getting AI response:', err);
      setError('Sorry, I encountered an error. Please try again later.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-mono">
      {/* Matrix-like background effect */}
      <div className="fixed inset-0 matrix-bg opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 mb-4">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)]/70 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-primary)]"></span>
                </span>
                <span className="text-[var(--accent-primary)] text-sm">AI assistant.online()</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--accent-primary)] mb-4 glitch-text" data-text="Ask Me Anything">
                Ask Me Anything
              </h1>
              
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                <span className="text-[var(--accent-primary)]">function</span> <span className="text-[var(--accent-secondary)]">askAboutBunkheang</span>() &#123; <span className="text-green-400">return</span> <span className="text-purple-400">gemini</span>.<span className="text-orange-400">generateResponse</span>(prompt) &#125;
              </p>
              
              <div className="flex items-center justify-center mt-2 text-xs text-[var(--text-muted)]">
                <svg viewBox="0 0 24 24" width="16" height="16" className="mr-1">
                  <path fill="currentColor" d="M12 11h-2V9h2V7h2v2h2v2h-2v2h-2zM8 9v2H6V9zm10 4v2h-2v-2zm-14 0v2H2v-2zm16-8v2h-2V5zM6 5v2H4V5zm16 4v2h-2V9zM4 13v-2H2v2zm16 4v2h-2v-2zM4 17v2H2v-2zm4 0v2H6v-2zm10-8v2h-2V9z" />
                </svg>
                Powered by Google Gemini AI
              </div>
            </motion.div>
            
            {/* Chat interface */}
            <div className="bg-[var(--code-editor-bg)] rounded-lg overflow-hidden shadow-lg border border-[var(--card-border)]">
              {/* Chat header */}
              <div className="bg-[var(--code-window-bg)] px-4 py-3 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm text-[var(--text-secondary)] flex-1">gemini-assistant.js</div>
                <div className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-green-500">online</span>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="h-[60vh] overflow-y-auto p-4 space-y-4" id="chat-messages">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-[var(--accent-primary)] text-white' 
                          : 'bg-[var(--code-window-bg)] border border-[var(--card-border)]'
                      }`}
                    >
                      {message.sender === 'ai' && (
                        <div className="flex items-center gap-2 mb-1 pb-1 border-b border-[var(--card-border)]">
                          <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                            <span className="text-[var(--accent-primary)] text-xs">AI</span>
                          </div>
                          <span className="text-xs text-[var(--text-secondary)]">gemini-powered</span>
                          <div className="ml-auto flex items-center gap-1">
                            <svg viewBox="0 0 24 24" width="12" height="12" className="text-[var(--text-secondary)]">
                              <path fill="currentColor" d="M12 11h-2V9h2V7h2v2h2v2h-2v2h-2zM8 9v2H6V9zm10 4v2h-2v-2zm-14 0v2H2v-2zm16-8v2h-2V5zM6 5v2H4V5zm16 4v2h-2V9zM4 13v-2H2v2zm16 4v2h-2v-2zM4 17v2H2v-2zm4 0v2H6v-2zm10-8v2h-2V9z" />
                            </svg>
                            <span className="text-[8px] text-[var(--text-muted)]">Google Gemini</span>
                          </div>
                        </div>
                      )}
                      <div className={message.sender === 'ai' ? 'text-[var(--text-primary)]' : ''}>
                        {message.text}
                      </div>
                      <div className={`text-right text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[var(--code-window-bg)] rounded-lg p-3 border border-[var(--card-border)]">
                      <div className="flex items-center gap-2 mb-1 pb-1 border-b border-[var(--card-border)]">
                        <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                          <span className="text-[var(--accent-primary)] text-xs">AI</span>
                        </div>
                        <span className="text-xs text-[var(--text-secondary)]">gemini-powered</span>
                        <div className="ml-auto flex items-center gap-1">
                          <svg viewBox="0 0 24 24" width="12" height="12" className="text-[var(--text-secondary)]">
                            <path fill="currentColor" d="M12 11h-2V9h2V7h2v2h2v2h-2v2h-2zM8 9v2H6V9zm10 4v2h-2v-2zm-14 0v2H2v-2zm16-8v2h-2V5zM6 5v2H4V5zm16 4v2h-2V9zM4 13v-2H2v2zm16 4v2h-2v-2zM4 17v2H2v-2zm4 0v2H6v-2zm10-8v2h-2V9z" />
                          </svg>
                          <span className="text-[8px] text-[var(--text-muted)]">Google Gemini</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="flex justify-start">
                    <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-3 max-w-[80%]">
                      <p>{error}</p>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat input */}
              <div className="border-t border-[var(--card-border)] p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <div className="flex-1 relative">
                    <div className="absolute left-0 top-0 pl-3 h-full flex items-center">
                      <span className="text-[var(--text-secondary)]">&gt;</span>
                    </div>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything about Bunkheang..."
                      className="w-full bg-[var(--code-window-bg)] border border-[var(--card-border)] rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
                    disabled={!input.trim() || isTyping}
                  >
                    <span>Ask</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </form>
                <div className="text-xs text-[var(--text-secondary)] mt-2">
                  <span className="text-[var(--accent-primary)]">Tip:</span> Ask about skills, projects, experience, education, certificates, hackathons, or volunteer work
                </div>
              </div>
            </div>
            
            {/* Info panel */}
            <motion.div 
              className="mt-8 bg-[var(--card-bg)]/50 rounded-lg p-4 border border-[var(--card-border)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div className="bg-[var(--accent-primary)]/20 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[var(--accent-primary)] font-bold mb-1">AI Assistant Powered by Google Gemini</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    This AI assistant has been fed comprehensive data from Bunkheang&apos;s portfolio. It can provide detailed information about his skills, projects, experience, education, certificates, hackathons, and volunteer work. Powered by Google&apos;s Gemini AI, it delivers accurate and personalized responses about Bunkheang&apos;s professional background.
                  </p>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['Skills', 'Projects', 'Certificates', 'Education', 'Experience', 'Hackathons', 'Volunteer'].map((item) => (
                      <div key={item} className="bg-[var(--code-window-bg)] p-2 rounded text-center text-xs text-[var(--accent-primary)]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <style jsx global>{`
        .matrix-bg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='var(--matrix-pattern)' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"),
                          linear-gradient(to bottom, var(--code-window-bg), var(--code-editor-bg));
        }
        
        .glitch-text {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                      -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        }
      `}</style>
    </main>
  );
} 