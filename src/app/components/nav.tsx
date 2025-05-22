"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '@/app/context/ThemeContext';

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/project', label: 'Projects' },
    { path: '/skill', label: 'Skills' },
    { path: '/certificate', label: 'Certificates' },
    { path: '/ask', label: 'Ask AI' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-[var(--nav-bg)] backdrop-blur-md shadow-lg border-b border-[var(--card-border)]" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
          {/* Logo/Name Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/" 
              className="relative text-xl font-bold font-mono hover:text-[var(--accent-primary)] transition-colors group"
            >
              <span className={`${scrolled ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'} transition-colors duration-300`}>
                <span className="text-[var(--accent-primary)]">&lt;</span>HENG <span className="text-[var(--accent-primary)]">Bunkheang</span><span className="text-[var(--accent-primary)]">/&gt;</span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-primary)] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <motion.ul 
            className="hidden md:flex items-center space-x-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;
              
              return (
                <motion.li key={item.path} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link 
                    href={item.path}
                    className="relative px-4 py-2 rounded-lg font-mono transition-all"
                  >
                    <span className={`relative z-10 ${
                      scrolled 
                        ? isActive ? 'text-[var(--accent-primary)] font-medium' : 'text-[var(--text-secondary)]'
                        : isActive ? 'text-[var(--accent-primary)] font-medium' : 'text-[var(--text-secondary)]'
                    } transition-colors duration-300`}>
                      {item.label}
                    </span>
                    
                    {isActive && (
                      <motion.span 
                        className="absolute inset-0 bg-[var(--accent-primary)]/10 rounded-lg -z-0 border border-[var(--accent-primary)]/30"
                        layoutId="activeNavItem"
                        transition={{ type: "spring", duration: 0.6 }}
                      ></motion.span>
                    )}
                    
                    <span className="absolute inset-0 bg-[var(--card-bg)] rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Theme Toggle and Contact Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center gap-3"
          >
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </motion.button>
            
            {/* Contact Button */}
            <Link 
              href="/contact"
              className="relative overflow-hidden group bg-[var(--accent-primary)] text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-[var(--accent-primary)]/20 transition-all duration-300 font-mono"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                contact.me()
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                scrolled 
                  ? "text-[var(--text-secondary)] hover:bg-[var(--card-bg)]" 
                  : "text-[var(--text-secondary)] hover:bg-[var(--card-bg)]/50"
              } transition-colors`}
              whileTap={{ scale: 0.95 }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </motion.button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${
                scrolled 
                  ? "text-[var(--text-secondary)] hover:bg-[var(--card-bg)]" 
                  : "text-[var(--text-secondary)] hover:bg-[var(--card-bg)]/50"
              } transition-colors`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </motion.div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--card-bg)] shadow-lg overflow-hidden border-t border-[var(--card-border)]"
          >
            <div className="px-6 py-4">
              <div className="text-xs text-[var(--code-comment)] mb-2">// NAVIGATION</div>
              <ul className="flex flex-col space-y-3">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  
                  return (
                    <li key={item.path}>
                      <Link 
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)} 
                        className={`block px-4 py-2 rounded-lg font-mono ${
                          isActive 
                            ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-medium border border-[var(--accent-primary)]/30" 
                            : "text-[var(--text-secondary)] hover:bg-[var(--code-editor-bg)]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full mt-2 bg-[var(--accent-primary)] text-white px-4 py-3 rounded-lg hover:bg-[var(--accent-secondary)] transition-colors flex items-center justify-center gap-2 font-mono"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    contact.me()
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
