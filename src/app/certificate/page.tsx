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
  const [expandedCert, setExpandedCert] = useState<number | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loadingPdf, setLoadingPdf] = useState<number | null>(null);

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
      setLoadingPdf(null);
    } else {
      setExpandedCert(id);
      // Set loading state for PDF files
      const cert = certificates.find(c => c.id === id);
      if (cert && isPdfFile(cert.src)) {
        setLoadingPdf(id);
      }
    }
  };

  // Check if file is PDF
  const isPdfFile = (src: string) => {
    return src.toLowerCase().endsWith('.pdf');
  };

  // Handle PDF view/download
  const handlePdfView = (src: string, title: string) => {
    window.open(src, '_blank');
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
                        {isPdfFile(cert.src) ? (
                          <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
                            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-2">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)]">PDF</p>
                          </div>
                        ) : (
                          <Image
                            src={cert.src}
                            alt={cert.title}
                            fill
                            className="object-contain p-2"
                          />
                        )}
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
                            
                            {/* Certificate Display */}
                            <div className="mt-4 bg-[var(--code-window-bg)] p-4 rounded border border-[var(--card-border)]">
                              <div className="text-[var(--text-muted)] mb-2 text-sm">// Certificate Preview</div>
                              <div className="relative h-80 bg-white rounded border border-[var(--card-border)] overflow-hidden">
                                {isPdfFile(cert.src) ? (
                                  <div className="w-full h-full flex flex-col">
                                    {/* PDF Viewer Header */}
                                    <div className="bg-gray-100 px-3 py-2 flex items-center justify-between border-b">
                                      <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">PDF Viewer</span>
                                      </div>
                                      <button
                                        onClick={() => handlePdfView(cert.src, cert.title)}
                                        className="text-xs bg-[var(--accent-primary)] text-white px-2 py-1 rounded hover:bg-[var(--accent-secondary)] transition-colors flex items-center gap-1"
                                      >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Open in New Tab
                                      </button>
                                    </div>
                                    
                                    {/* PDF iframe */}
                                    <div className="relative flex-1">
                                      {loadingPdf === cert.id && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                                          <div className="flex flex-col items-center gap-2">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-primary)]"></div>
                                            <span className="text-sm text-gray-600">Loading PDF...</span>
                                          </div>
                                        </div>
                                      )}
                                      <iframe
                                        src={cert.src}
                                        className="w-full h-full border-0"
                                        title={`${cert.title} Certificate`}
                                        onLoad={() => setLoadingPdf(null)}
                                        onError={(e) => {
                                          setLoadingPdf(null);
                                          // Fallback if iframe fails to load
                                          const iframe = e.target as HTMLIFrameElement;
                                          iframe.style.display = 'none';
                                          const fallback = iframe.nextElementSibling as HTMLElement;
                                          if (fallback) fallback.style.display = 'flex';
                                        }}
                                      />
                                    </div>
                                    
                                    {/* Fallback content if iframe fails */}
                                    <div 
                                      className="w-full h-full flex-col items-center justify-center text-center p-4 hidden"
                                      style={{ display: 'none' }}
                                    >
                                      <div className="w-20 h-20 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                      <p className="text-gray-600 mb-4">PDF Certificate</p>
                                      <button
                                        onClick={() => handlePdfView(cert.src, cert.title)}
                                        className="bg-[var(--accent-primary)] text-white px-6 py-3 rounded hover:bg-[var(--accent-secondary)] transition-colors flex items-center gap-2"
                                      >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        View PDF Certificate
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <Image
                                    src={cert.src}
                                    alt={cert.title}
                                    fill
                                    className="object-contain p-4"
                                  />
                                )}
                              </div>
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
