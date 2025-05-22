"use client";

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Navbar = dynamic(() => import('@/app/components/nav'), { ssr: false })

// Define certificate type
interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  src: string;
  description: string;
}

export default function Certificate() {
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCert, setExpandedCert] = useState<number | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Fetch certificate data
  useEffect(() => {
    fetch('/data/certifcate.json')
      .then(response => response.json())
      .then(data => setCertificates(data))
      .catch(error => console.error('Error loading certificates:', error));
  }, []);

  const toggleExpand = (id: number) => {
    if (expandedCert === id) {
      setExpandedCert(null);
    } else {
      setExpandedCert(id);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-mono">
      <div className="matrix-bg fixed inset-0 opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-[var(--accent-primary)]/20 px-4 py-2 rounded-full border border-[var(--accent-primary)]/30 mb-4">
                <span className="h-2 w-2 bg-[var(--accent-primary)] rounded-full animate-pulse"></span>
                <span className="text-[var(--accent-primary)] text-sm">rendering certificates</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--accent-primary)] mb-4 glitch-text" data-text="Achievements.render()">
                Achievements.render()
              </h1>
              
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto bg-[var(--code-editor-bg)]/50 p-3 rounded-lg border border-[var(--card-border)]">
                <span className="text-[var(--accent-primary)]">function</span> <span className="text-[var(--accent-secondary)]">validateSkills</span>() &#123; 
                <span className="text-green-400"> return </span> 
                <span className="text-purple-300">certifications</span>.map(
                <span className="text-orange-300">cert</span> {`=>`} 
                <span className="text-orange-300">cert</span>.verified) 
                &#125;
              </p>
              
              <motion.div 
                className="h-1 w-32 bg-[var(--accent-primary)] rounded-full mx-auto mt-8"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            {/* View mode toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-[var(--code-editor-bg)] p-1 rounded-lg border border-[var(--card-border)] flex">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded ${viewMode === 'grid' ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  <span className="text-sm">grid.view()</span>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded ${viewMode === 'list' ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  <span className="text-sm">list.view()</span>
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-[var(--code-editor-bg)]/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-[var(--card-border)] hover:border-[var(--accent-primary)] transition-all duration-300"
                  >
                    <div className="bg-[var(--code-window-bg)] px-4 py-2 border-b border-[var(--card-border)] flex justify-between items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-xs text-[var(--text-secondary)]">certificate-{cert.id}.json</span>
                    </div>
                    
                    <div className="p-5">
                      <div className="relative h-40 mb-4 bg-[var(--code-window-bg)] rounded flex items-center justify-center">
                        <Image
                          src={cert.src}
                          alt={cert.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-[var(--accent-primary)] flex items-center">
                          <span className="w-2 h-4 bg-[var(--accent-primary)] mr-2"></span>
                          {cert.title}
                        </h3>
                        
                        <div className="text-[var(--text-primary)] flex justify-between">
                          <span className="text-[var(--text-secondary)]">
                            <span className="text-[var(--accent-primary)]">issuer:</span> {cert.issuer}
                          </span>
                          <span className="bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] px-2 py-1 rounded text-xs">
                            {cert.date}
                          </span>
                        </div>
                        
                        <p className="text-[var(--text-secondary)] text-sm border-t border-[var(--card-border)] pt-3 mt-2">
                          {cert.description.length > 100 
                            ? `${cert.description.substring(0, 100)}...` 
                            : cert.description}
                        </p>
                        
                        <div className="flex justify-end">
                          <button 
                            className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
                            onClick={() => toggleExpand(cert.id)}
                          >
                            <code>
                              {expandedCert === cert.id 
                                ? 'certificate.collapse()' 
                                : 'certificate.expand()'}
                            </code>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-[var(--code-editor-bg)] rounded-lg p-4 border border-[var(--card-border)] mb-4">
                  <code className="text-sm text-[var(--text-primary)]">
                    <span className="text-[var(--accent-primary)]">const</span> <span className="text-[var(--accent-secondary)]">certificates</span> = [
                  </code>
                </div>
                
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-[var(--code-editor-bg)]/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-[var(--card-border)] 
                      transition-all duration-300 ${expandedCert === cert.id ? 'border-[var(--accent-primary)]' : ''}`}
                  >
                    <div 
                      className="p-4 flex items-start gap-6 cursor-pointer" 
                      onClick={() => toggleExpand(cert.id)}
                    >
                      <div className="relative min-w-[100px] h-[100px] bg-[var(--code-window-bg)] rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={cert.src}
                          alt={cert.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-[var(--accent-primary)]">
                            <span className="text-[var(--text-muted)]">{'{'}</span> {cert.title} <span className="text-[var(--text-muted)]">{'}'}</span>
                          </h3>
                          <span className="bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] px-2 py-1 rounded text-xs">
                            {cert.date}
                          </span>
                        </div>
                        
                        <div className="text-green-400 mb-2">
                          <span className="text-[var(--text-secondary)]">issuer:</span> "{cert.issuer}"
                        </div>
                        
                        {expandedCert === cert.id ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="text-[var(--text-primary)] border-t border-[var(--card-border)] pt-3 mt-2">
                              <div className="text-[var(--text-muted)] mb-1">// Description</div>
                              <p>{cert.description}</p>
                            </div>
                            <div className="mt-4 bg-[var(--code-window-bg)] p-3 rounded border border-[var(--card-border)]">
                              <code className="text-xs text-[var(--text-secondary)]">
                                <span className="text-[var(--accent-primary)]">certificate</span>.<span className="text-[var(--accent-secondary)]">verify</span>() =&gt; &#123; <span className="text-green-400">status</span>: <span className="text-orange-300">"valid"</span>, <span className="text-green-400">expires</span>: <span className="text-orange-300">"never"</span> &#125;
                              </code>
                            </div>
                          </motion.div>
                        ) : (
                          <p className="text-[var(--text-secondary)] text-sm">
                            {cert.description.length > 60 
                              ? `${cert.description.substring(0, 60)}...` 
                              : cert.description}
                            <button 
                              className="ml-2 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
                            >
                              <code>view.more()</code>
                            </button>
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <div className="bg-[var(--code-editor-bg)] rounded-lg p-4 border border-[var(--card-border)]">
                  <code className="text-sm text-[var(--text-primary)]">
                    <span className="text-[var(--text-muted)]">];</span>
                  </code>
                </div>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <div className="inline-block bg-[var(--code-editor-bg)] px-6 py-3 rounded-lg border border-[var(--card-border)]">
                <code className="text-sm">
                  <span className="text-[var(--accent-secondary)]">npm</span> <span className="text-[var(--accent-primary)]">run</span> add-more-certificates
                </code>
                <p className="text-xs text-[var(--text-muted)] mt-1">// More achievements coming soon</p>
              </div>
            </div>
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
  )
}
