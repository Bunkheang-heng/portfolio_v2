"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

// Constants
const NAME_LETTERS = "Bunkheang".split("");

const TECH_LOGOS = [
  { src: "/codeLogo/react.svg", alt: "React" },
  { src: "/codeLogo/typescript.svg", alt: "TypeScript" },
  { src: "/codeLogo/next.svg", alt: "Next.js" },
  { src: "/codeLogo/js.png", alt: "JavaScript" },
  { src: "/codeLogo/python.png", alt: "Python" },
  { src: "/codeLogo/nodejs.png", alt: "Node.js" },
];

// Helper functions
const generateRandomPoints = () => {
  return Array.from({ length: 8 }, () => Math.random() * 100);
};

interface Logo {
  src: string;
  alt: string;
}

interface FloatingLogoProps {
  logo: Logo;
  index: number;
  isAdditional?: boolean;
}

const FloatingLogo: React.FC<FloatingLogoProps> = ({ logo, index, isAdditional = false }) => {
  const xPoints = generateRandomPoints();
  const yPoints = generateRandomPoints();

  return (
    <motion.div
      key={isAdditional ? `additional-${index}` : index}
      className="fixed top-0 left-0"
      style={{
        zIndex: 5,
        pointerEvents: 'none',
      }}
      animate={{
        x: xPoints.map(p => `${p}vw`),
        y: yPoints.map(p => `${p}vh`),
        rotate: isAdditional ? [360, 180, 0, 180, 360] : [0, 180, 360, 180, 0],
        scale: isAdditional ? [1, 0.8, 1.2, 0.9, 1] : [0.8, 1.1, 0.9, 1.2, 0.8]
      }}
      transition={{
        duration: isAdditional ? 30 + Math.random() * 20 : 25 + Math.random() * 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: isAdditional ? Math.random() * 5 : 0,
        times: [0, 0.25, 0.5, 0.75, 1]
      }}
    >
      <div className="p-3 bg-[var(--code-editor-bg)]/40 backdrop-blur-sm rounded-lg hover:bg-[var(--code-editor-bg)]/60 transition-all">
        <Image 
          src={logo.src} 
          alt={logo.alt} 
          width={isAdditional ? 35 : 40} 
          height={isAdditional ? 35 : 40}
          className="opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>
    </motion.div>
  );
};

const NameAnimation = () => (
  <motion.span 
    className="text-[var(--accent-primary)] inline-flex"
    whileHover={{ scale: 1.1 }}
  >
    {NAME_LETTERS.map((letter, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -10,
          color: "var(--accent-secondary)",
          transition: { duration: 0.2, delay: index * 0.05 }
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          type: "spring",
          stiffness: 120
        }}
      >
        {letter}
      </motion.span>
    ))}
  </motion.span>
);

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const controls = useAnimation();
  
  useEffect(() => {
    const phrases = [
      "I build things for the web",
      "I solve problems with code",
      "I create digital experiences",
      "I develop scalable applications"
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const typeEffect = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        setTypedText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        // Pause at the end of typing
        isDeleting = true;
        typingSpeed = 1000;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }
      
      setTimeout(typeEffect, typingSpeed);
    };
    
    // Start the typing effect
    typeEffect();
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  useEffect(() => {
    // Start the floating animation for the profile image
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    });
  }, [controls]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--code-window-bg)] font-mono text-[var(--text-primary)] pt-20">
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 matrix-bg opacity-20 pointer-events-none"></div>
      
      {/* Floating Tech Logos */}
      {TECH_LOGOS.map((logo, index) => (
        <FloatingLogo key={index} logo={logo} index={index} />
      ))}
      {TECH_LOGOS.map((logo, index) => (
        <FloatingLogo key={`additional-${index}`} logo={logo} index={index} isAdditional />
      ))}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col gap-8">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 mb-6">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-secondary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-primary)]"></span>
              </span>
              <span className="text-[var(--accent-primary)] text-sm">available for hire</span>
            </div>
            
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                Hello! I&apos;m HENG <NameAnimation />
              </h1>
            </div>
            
            <h2 className="text-xl md:text-2xl text-[var(--text-secondary)] mb-6 h-8 font-mono">
              <span className="relative">
                {typedText}
                <span className={`absolute -right-4 top-0 text-[var(--accent-primary)] ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </span>
            </h2>
            
            <div className="bg-[var(--code-editor-bg)] p-4 rounded-lg border border-[var(--card-border)] mb-6 max-w-xl">
              <div className="text-xs text-[var(--code-comment)] mb-2">// ABOUT ME</div>
              <p className="text-[var(--text-primary)] mb-2 font-mono">
                Full-stack developer with expertise in React, Next.js, and Node.js. Passionate about creating performant and accessible web applications with clean code.
              </p>
              <div className="text-xs text-[var(--code-comment)] mt-4 mb-2">// CURRENTLY</div>
              <p className="text-[var(--text-primary)] font-mono flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Actively seeking new opportunities
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group bg-[var(--accent-primary)] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Hire Me
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </motion.a>
              
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg border border-[var(--card-border)] bg-[var(--code-editor-bg)] text-[var(--text-primary)] hover:bg-[var(--code-window-bg)] transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Download CV
              </motion.a>
              
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg border border-[var(--card-border)] bg-[var(--code-editor-bg)] text-[var(--text-primary)] hover:bg-[var(--code-window-bg)] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                </svg>
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg border border-[var(--card-border)] bg-[var(--code-editor-bg)] text-[var(--text-primary)] hover:bg-[var(--code-window-bg)] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          animate={controls}
          className="order-first lg:order-last relative"
        >
          {/* Terminal-styled profile section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden border border-[var(--card-border)] shadow-2xl max-w-md mx-auto"
          >
            {/* Terminal header */}
            <div className="bg-[var(--code-window-bg)] px-4 py-2 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-xs text-[var(--text-secondary)] flex-1 text-center font-mono">
                developer@portfolio ~ /profile
              </div>
            </div>
            
            {/* Profile content */}
            <div className="bg-[var(--code-editor-bg)] p-6">
              <div className="rounded-lg overflow-hidden mb-4 border-2 border-[var(--accent-primary)]/30">
                <Image 
                  src="/me.png" 
                  alt="HENG Bunkheang"
                  width={400}
                  height={400}
                  priority
                  className="object-cover w-full aspect-square"
                />
              </div>
              
              <div className="font-mono">
                <div className="text-xs text-[var(--code-comment)] mb-2">
                  # Profile info
                </div>
                
                <div className="text-[var(--text-primary)] space-y-2">
                  <div className="flex items-start">
                    <span className="text-[var(--accent-primary)] mr-2">$</span>
                    <div>
                      <span className="text-[var(--accent-secondary)]">name</span> = <span className="text-green-400">"HENG Bunkheang"</span>;
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-[var(--accent-primary)] mr-2">$</span>
                    <div>
                      <span className="text-[var(--accent-secondary)]">role</span> = <span className="text-green-400">"Full-stack Developer"</span>;
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-[var(--accent-primary)] mr-2">$</span>
                    <div>
                      <span className="text-[var(--accent-secondary)]">location</span> = <span className="text-green-400">"Phnom Penh, Cambodia"</span>;
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-[var(--accent-primary)] mr-2">$</span>
                    <div>
                      <span className="text-[var(--accent-secondary)]">experience</span> = <span className="text-green-400">"4+ years"</span>;
                    </div>
                  </div>
                  
                  <div className="flex items-start mt-4">
                    <span className="text-[var(--accent-primary)] mr-2">$</span>
                    <span className="text-white animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .matrix-bg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%233b82f6' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"),
                          linear-gradient(to bottom, var(--code-window-bg), var(--code-editor-bg));
        }
      `}</style>
    </section>
  );
}
