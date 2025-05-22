"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const universities = [
  {
    name: "American University of Phnom Penh",
    degree: "Bachelor of Computer Science",
    years: "2020 - 2024",
    logo:"/aupp.png",
    description: "Studying Computer Science with a focus on software development and web technologies.",
    highlights: ["Software Development", "Web Technologies", "Data Structures", "Algorithms"]
  },
  {
    name: "Forthay State University",
    degree: "Bachelor of Information Technology", 
    years: "2020 - 2024",
    logo: "/forthay.png",
    description: "Specializing in Information Technology with emphasis on network systems and cloud computing.",
    highlights: ["Network Systems", "Cloud Computing", "System Administration", "IT Security"]
  }
];

export default function Education() {
  return (
    <section className="py-20 relative bg-[var(--code-window-bg)]">
      <div className="absolute inset-0 matrix-bg opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 mb-6">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-secondary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-primary)]"></span>
              </span>
              <span className="text-[var(--accent-primary)] text-sm">education.load()</span>
            </div>
            
            <motion.h2 
              className="text-4xl font-bold text-[var(--accent-primary)] mb-4 glitch-text"
              data-text="Education.compile()"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Education.compile()
            </motion.h2>
            
            <div className="bg-[var(--code-editor-bg)]/50 p-4 rounded-lg max-w-2xl mx-auto border border-[var(--card-border)] mb-6">
              <code className="text-sm text-left block overflow-x-auto">
                <span className="text-[var(--accent-primary)]">const</span> <span className="text-[var(--accent-secondary)]">learningPath</span> = <span className="text-[var(--accent-primary)]">async</span>() =&gt; &#123;<br/>
                &nbsp;&nbsp;<span className="text-[var(--accent-primary)]">await</span> <span className="text-green-400">education</span>.<span className="text-[var(--accent-secondary)]">acquire</span>();<br/>
                &nbsp;&nbsp;<span className="text-[var(--accent-primary)]">return</span> <span className="text-purple-400">skills.improve()</span>;<br/>
                &#125;
              </code>
            </div>
            
            <motion.div 
              className="h-1 w-32 bg-[var(--accent-primary)] rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {universities.map((uni, index) => (
              <motion.div
                key={uni.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[var(--code-editor-bg)] rounded-lg overflow-hidden shadow-xl border border-[var(--card-border)] hover:border-[var(--accent-primary)] transition-all duration-300"
              >
                {/* Code editor header */}
                <div className="bg-[var(--code-window-bg)] px-4 py-2 flex items-center border-b border-[var(--card-border)]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-sm text-[var(--text-secondary)] flex-1">
                    {uni.name.split(' ').join('').toLowerCase()}.edu
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className="w-20 h-20 bg-[var(--code-window-bg)] rounded-lg flex items-center justify-center p-3 border border-[var(--card-border)]"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                    >
                      <Image 
                        src={uni.logo}
                        alt={`${uni.name} Logo`}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--accent-primary)]">
                        {uni.degree}
                      </h3>
                      <p className="text-[var(--text-primary)]">{uni.name}</p>
                      <div className="text-[var(--text-muted)] text-sm flex items-center gap-2 mt-1">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                        {uni.years}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[var(--code-window-bg)] p-4 rounded border border-[var(--card-border)] mb-6">
                    <div className="text-xs text-[var(--code-comment)] mb-2">// DESCRIPTION</div>
                    <p className="text-[var(--text-primary)] font-mono">{uni.description}</p>
                  </div>
                  
                  <div>
                    <div className="text-xs text-[var(--text-secondary)] mb-3">
                      <span className="text-[var(--accent-primary)]">const</span> <span className="text-[var(--accent-secondary)]">keySkills</span> = [
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2 pl-4">
                      {uni.highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded border border-[var(--accent-primary)]/30 text-sm font-mono
                            hover:bg-[var(--accent-primary)]/20 transition-colors cursor-pointer"
                        >
                          "{highlight}"
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      ];
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <motion.div
              className="inline-block bg-[var(--code-editor-bg)] px-4 py-2 rounded border border-[var(--card-border)]"
              whileHover={{ y: -5 }}
            >
              <code className="text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--accent-secondary)]">continue</span>.<span className="text-[var(--accent-primary)]">learning</span>() <span className="text-[var(--code-comment)]">// lifelong learner</span>
              </code>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <style jsx global>{`
        .matrix-bg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%233b82f6' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"),
                          linear-gradient(to bottom, var(--code-window-bg), var(--code-editor-bg));
        }
        
        .glitch-text {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                      -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        }
      `}</style>
    </section>
  );
}
