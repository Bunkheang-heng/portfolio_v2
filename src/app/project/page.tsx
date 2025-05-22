"use client";

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('@/app/components/nav'), { ssr: false })

// Define the Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
  github?: string;
  demo?: string;
  category?: string;
  tags?: string[];
}

export default function Project() {
  const [activeTab, setActiveTab] = useState('all');
  const [terminalText, setTerminalText] = useState('');
  const [showTerminal, setShowTerminal] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/project.json');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Terminal typing effect
  useEffect(() => {
    if (showTerminal) {
      const welcomeText = [
        "$ cd ~/projects",
        "$ ls -la",
        "Scanning directory...",
        `Found ${projects.length} projects...`,
        "Rendering projects to DOM...",
        "Ready to browse. Enjoy exploring!"
      ];
      
      let fullText = '';
      let currentLine = 0;
      let currentChar = 0;
      
      const typingInterval = setInterval(() => {
        if (currentLine < welcomeText.length) {
          if (currentChar < welcomeText[currentLine].length) {
            fullText += welcomeText[currentLine][currentChar];
            setTerminalText(fullText);
            currentChar++;
          } else {
            fullText += '\n';
            setTerminalText(fullText);
            currentLine++;
            currentChar = 0;
            
            if (currentLine === welcomeText.length) {
              clearInterval(typingInterval);
              setTimeout(() => {
                setShowTerminal(false);
              }, 1000);
            }
          }
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, [showTerminal, projects]);

  // Filter projects by category
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  // Extract unique categories from projects
  const categories = ['all', ...new Set(projects.map(project => project.category || 'other').filter(Boolean))];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-mono">
      <div className="matrix-bg fixed inset-0 opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--accent-primary)] mb-4 glitch-text" data-text="<Projects/>">
                &lt;Projects/&gt;
              </h1>
              <div className="text-lg text-[var(--accent-primary)] max-w-2xl mx-auto bg-[var(--code-editor-bg)]/50 rounded-lg p-3 border border-[var(--card-border)]">
                <span className="text-green-400">const</span> <span className="text-[var(--accent-secondary)]">myProjects</span> = {`{`} <span className="text-purple-400">status</span>: <span className="text-green-400">"production-ready"</span> {`}`};
              </div>
            </motion.div>
            
            {showTerminal ? (
              <motion.div 
                className="mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[var(--code-editor-bg)] rounded-lg overflow-hidden shadow-xl border border-[var(--card-border)]">
                  <div className="bg-[var(--code-window-bg)] px-4 py-2 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto text-sm text-[var(--text-secondary)]">projects ~ bash</div>
                  </div>
                  <div className="p-4 terminal-text font-mono text-sm text-green-400 whitespace-pre-line">
                    {terminalText}
                    <span className="animate-blink">▋</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                {categories.length > 1 && (
                  <motion.div 
                    className="mb-8 flex justify-center flex-wrap gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {categories.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          activeTab === tab 
                            ? 'bg-[var(--accent-primary)] text-white' 
                            : 'bg-[var(--code-editor-bg)] text-[var(--text-secondary)] hover:bg-[var(--code-window-bg)]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </motion.div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="bg-[var(--code-editor-bg)] rounded-lg overflow-hidden shadow-lg border border-[var(--card-border)] hover:border-[var(--accent-primary)] transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative h-48 overflow-hidden bg-[var(--code-window-bg)] flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--code-window-bg)] z-10"></div>
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-90"
                          />
                        ) : (
                          <div className="text-5xl text-[var(--text-muted)] font-mono">{"{ }"}</div>
                        )}
                        <div className="absolute top-3 right-3 bg-[var(--code-editor-bg)]/80 backdrop-blur-sm px-2 py-1 rounded text-xs z-20">
                          {project.id.toString().padStart(2, '0')}.js
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] mr-2"></div>
                          <h3 className="text-xl font-bold text-[var(--accent-primary)]">{project.title}</h3>
                        </div>
                        
                        <p className="text-[var(--text-secondary)] mb-4 text-sm">
                          {project.description}
                        </p>
                        
                        {project.tags && project.tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                              <span 
                                key={i} 
                                className="px-2 py-1 bg-[var(--code-window-bg)] text-xs rounded"
                                style={{ 
                                  color: 
                                    tag.includes('React') ? '#61DAFB' : 
                                    tag.includes('Node') ? '#8CC84B' : 
                                    tag.includes('Vue') ? '#42B883' : 
                                    tag.includes('Python') ? '#FFD43B' : 
                                    tag.includes('Go') ? '#00ADD8' : 
                                    '#A5AFCC'
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          {project.category && (
                            <div className="text-xs text-[var(--text-muted)]">
                              <span className="text-[var(--accent-primary)]">category:</span> {project.category}
                            </div>
                          )}
                          
                          <div className="flex space-x-2">
                            {project.github && (
                              <a 
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-[var(--code-window-bg)] rounded hover:bg-[var(--code-editor-bg)] text-sm transition-colors"
                              >
                                <span className="text-[var(--text-secondary)]">git clone</span>
                              </a>
                            )}
                            {(project.demo || project.link) && (
                              <a 
                                href={project.demo || project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 bg-[var(--accent-primary)] rounded hover:bg-[var(--accent-secondary)] text-sm transition-colors"
                              >
                                <span className="text-white">npm start</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
      
      <style jsx global>{`
        .matrix-bg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='var(--matrix-pattern)' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"),
                          linear-gradient(to bottom, var(--code-window-bg), var(--code-editor-bg));
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .glitch-text {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                      -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        }
      `}</style>
    </main>
  )
}
