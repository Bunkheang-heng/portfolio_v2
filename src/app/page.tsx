"use client";

import React from 'react'
import Navbar from '@/app/components/nav'
import Hero from '@/app/components/hero'
import Education from '@/app/components/education'
import Link from 'next/link'
import Image from 'next/image'
import SEOStructuredData, { websiteStructuredData, softwareApplicationStructuredData } from '@/app/components/SEOStructuredData'

export default function Home() {
  return (
    <>
      <SEOStructuredData type="WebSite" data={websiteStructuredData} />
      <SEOStructuredData type="SoftwareApplication" data={softwareApplicationStructuredData} />
      <main className="bg-[var(--background)] min-h-screen font-mono">
        {/* Matrix-like background effect */}
        <div className="fixed inset-0 matrix-bg opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Education />
        
        {/* Quick Links Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 mb-6">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)]/70 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-primary)]"></span>
                </span>
                <span className="text-[var(--accent-primary)] text-sm">navigate.to()</span>
              </div>
              
              <h2 className="text-3xl font-bold text-[var(--accent-primary)] mb-4 glitch-text" data-text="Quick Access">Quick Access</h2>
              
              <div className="bg-[var(--card-bg)]/50 p-4 rounded-lg max-w-2xl mx-auto border border-[var(--card-border)] mb-6">
                <code className="text-sm text-left block overflow-x-auto">
                  <span className="text-[var(--accent-primary)]">function</span> <span className="text-yellow-300">explorePortfolio</span>() &#123;<br/>
                  &nbsp;&nbsp;<span className="text-[var(--accent-primary)]">return</span> <span className="text-green-400">sections</span>.<span className="text-yellow-300">map</span>(<span className="text-purple-400">section</span> =&gt; <span className="text-orange-300">navigate</span>(section));<br/>
                  &#125;
                </code>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link 
                href="/project"
                className="group bg-[var(--card-bg)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl border border-[var(--card-border)] hover:border-[var(--accent-primary)] transition-all"
              >
                <div className="bg-[var(--code-window-bg)] px-4 py-2 flex items-center border-b border-[var(--card-border)]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-sm text-[var(--text-secondary)] flex-1">projects.js</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[var(--accent-primary)]/10 rounded-lg border border-[var(--accent-primary)]/30">
                      <Image src="/folder.svg" alt="Projects" width={24} height={24} className="text-[var(--accent-primary)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--accent-primary)] group-hover:text-[var(--accent-secondary)]">projects.map()</h3>
                  </div>
                  <p className="text-[var(--text-secondary)] bg-[var(--code-editor-bg)] p-3 rounded border border-[var(--card-border)] text-sm">
                    <span className="text-[var(--code-comment)]">// </span>
                    Check out my latest work and side projects
                  </p>
                </div>
              </Link>

              <Link 
                href="/skill"
                className="group bg-[var(--card-bg)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl border border-[var(--card-border)] hover:border-[var(--accent-primary)] transition-all"
              >
                <div className="bg-[var(--code-window-bg)] px-4 py-2 flex items-center border-b border-[var(--card-border)]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-sm text-[var(--text-secondary)] flex-1">skills.js</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[var(--accent-primary)]/10 rounded-lg border border-[var(--accent-primary)]/30">
                      <Image src="/brain.svg" alt="Knowledge" width={24} height={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--accent-primary)] group-hover:text-[var(--accent-secondary)]">skills.export()</h3>
                  </div>
                  <p className="text-[var(--text-secondary)] bg-[var(--code-editor-bg)] p-3 rounded border border-[var(--card-border)] text-sm">
                    <span className="text-[var(--code-comment)]">// </span>
                    Explore my technical skills and work history
                  </p>
                </div>
              </Link>

              <Link 
                href="/ask"
                className="group bg-[var(--card-bg)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl border border-[var(--card-border)] hover:border-[var(--accent-primary)] transition-all"
              >
                <div className="bg-[var(--code-window-bg)] px-4 py-2 flex items-center border-b border-[var(--card-border)]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-sm text-[var(--text-secondary)] flex-1">ask-ai.js</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[var(--accent-primary)]/10 rounded-lg border border-[var(--accent-primary)]/30">
                      <Image src="/robot.svg" alt="AI Assistant" width={24} height={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--accent-primary)] group-hover:text-[var(--accent-secondary)]">ai.chat()</h3>
                  </div>
                  <p className="text-[var(--text-secondary)] bg-[var(--code-editor-bg)] p-3 rounded border border-[var(--card-border)] text-sm">
                    <span className="text-[var(--code-comment)]">// </span>
                    Ask my AI assistant anything about me
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 relative border-t border-[var(--card-border)]">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl font-bold text-[var(--accent-primary)] mb-4 glitch-text" data-text="Connect()">
              <span className="text-[var(--text-muted)]">&lt;</span>
              Connect()
              <span className="text-[var(--text-muted)]">/&gt;</span>
            </h2>
            
            <div className="bg-[var(--card-bg)]/50 p-4 rounded-lg max-w-2xl mx-auto border border-[var(--card-border)] mb-8">
              <code className="text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--accent-primary)]">const</span> <span className="text-yellow-300">availability</span> = <span className="text-green-400">"always open to new opportunities"</span>;
              </code>
            </div>
            
            <div className="flex justify-center gap-4">
              <a 
                href="mailto:your.email@example.com" 
                className="bg-[var(--accent-primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--accent-secondary)] transition-colors shadow-lg hover:shadow-[var(--accent-primary)]/20 flex items-center gap-2 font-mono"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                sendEmail()
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[var(--card-bg)] text-[var(--accent-primary)] px-6 py-3 rounded-lg hover:bg-[var(--card-bg)]/80 transition-colors border border-[var(--card-border)] flex items-center gap-2 font-mono"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                connectLinkedIn()
              </a>
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
    </>
  )
}
