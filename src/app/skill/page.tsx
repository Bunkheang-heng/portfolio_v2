"use client";

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('@/app/components/nav'), { ssr: false })

// Define interfaces for our data
interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface Skills {
  languages: Skill[];
  frontend: Skill[];
  backend: Skill[];
  database: Skill[];
  devops: Skill[];
  cybersecurity: Skill[];
}

interface Job {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

interface Hackathon {
  id: number;
  name: string;
  year: string;
  result: string;
  description: string;
  technologies: string[];
}

interface Volunteer {
  id: number;
  role: string;
  organization: string;
  description: string;
  achievements: string[];
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  achievements: string[];
}

interface DataState {
  skills: Skills;
  experience: Job[];
  hackathons: Hackathon[];
  volunteer: Volunteer[];
  education: Education[];
}

export default function Knowledge() {
  const [activeSection, setActiveSection] = useState('skills');
  const [data, setData] = useState<DataState>({
    skills: {
      languages: [],
      frontend: [],
      backend: [],
      database: [],
      devops: [],
      cybersecurity: []
    },
    experience: [],
    hackathons: [],
    volunteer: [],
    education: []
  });
  
  useEffect(() => {
    // Fetch data from JSON file
    const fetchData = async () => {
      try {
        const response = await fetch('/data/skill.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching skill data:', error);
      }
    };
    
    fetchData();
  }, []);
  
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
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 mb-4">
                <span className="text-[var(--accent-primary)]">~/knowledge</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--accent-primary)] mb-6 glitch-text" data-text="brain.map()">
                brain.map()
              </h1>
              
              <div className="bg-[var(--code-editor-bg)]/50 p-4 rounded-lg max-w-3xl mx-auto border border-[var(--card-border)] mb-8">
                <code className="text-sm sm:text-base text-left block overflow-x-auto whitespace-pre">
                  <span className="text-[var(--accent-primary)]">function</span> <span className="text-[var(--accent-secondary)]">developSoftware</span>() &#123;<br/>
                  &nbsp;&nbsp;<span className="text-green-400">return</span> &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;skills: <span className="text-purple-400">['Problem Solving', 'Clean Code', 'Architecture']</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;passion: <span className="text-orange-400">true</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;caffeine: <span className="text-orange-400">Infinity</span><br/>
                  &nbsp;&nbsp;&#125;;<br/>
                  &#125;
                </code>
              </div>
              
              {/* Navigation tabs */}
              <div className="flex justify-center mb-12 flex-wrap gap-2">
                {['skills', 'experience', 'hackathons', 'volunteer', 'education'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      activeSection === section 
                        ? 'bg-[var(--accent-primary)] text-white' 
                        : 'bg-[var(--code-editor-bg)] text-[var(--text-secondary)] hover:bg-[var(--code-window-bg)]'
                    }`}
                  >
                    {section === 'skills' ? '.skills()' : 
                     section === 'experience' ? '.experience()' : 
                     section === 'hackathons' ? '.hackathons()' :
                     section === 'volunteer' ? '.volunteer()' :
                     '.education()'}
                  </button>
                ))}
              </div>
            </motion.div>
            
            {/* Skills Section */}
            {activeSection === 'skills' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-10"
              >
                {Object.entries(data.skills).map(([category, items]: [string, Skill[]], index: number) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[var(--code-editor-bg)] rounded-lg p-6 border border-[var(--card-border)]"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-2 h-6 bg-[var(--accent-primary)] mr-3"></div>
                      <h2 className="text-xl font-bold text-[var(--text-primary)]">
                        <span className="text-[var(--accent-primary)]">const</span> {category} = <span className="text-[var(--accent-secondary)]">{'['}</span>
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((skill: Skill, i: number) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.03 }}
                          className="bg-[var(--code-window-bg)] rounded-lg p-4 border border-[var(--card-border)]"
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 mr-3 flex-shrink-0 p-1">
                              {skill.icon ? (
                                <Image src={skill.icon} width={24} height={24} alt={skill.name} className="w-full h-full object-contain" />
                              ) : (
                                <div className="w-full h-full bg-[var(--accent-primary)]/20 rounded-full"></div>
                              )}
                            </div>
                            <h3 className="font-medium text-[var(--accent-primary)]">{skill.name}</h3>
                          </div>
                          
                          <div className="w-full bg-[var(--card-border)] rounded-full h-2.5">
                            <div 
                              className="bg-[var(--accent-primary)] h-2.5 rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <div className="text-right text-xs text-[var(--text-secondary)] mt-1">
                            proficiency: {skill.level}%
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-[var(--text-secondary)] text-right">
                      <span className="text-[var(--accent-secondary)]">{']'}</span>;
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Experience Section */}
            {activeSection === 'experience' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex mb-6 items-center">
                  <div className="w-2 h-6 bg-[var(--accent-primary)] mr-3"></div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    <span className="text-[var(--accent-primary)]">const</span> experience = <span className="text-[var(--accent-secondary)]">[</span>
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {data.experience.map((job: Job, index: number) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-[var(--code-editor-bg)] rounded-lg p-6 border border-[var(--card-border)]"
                    >
                      <div className="bg-[var(--code-window-bg)] px-4 py-2 rounded-t-lg mb-4 -mt-6 -mx-6 border-b border-[var(--card-border)] flex justify-between items-center">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-[var(--text-secondary)] text-sm">{job.company}.js</span>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:justify-between mb-4">
                        <h3 className="text-xl font-bold text-[var(--accent-primary)] mb-1">{job.role}</h3>
                        <div className="text-green-400 font-mono text-sm">{job.period}</div>
                      </div>
                      
                      <div className="text-[var(--text-primary)] mb-4">{job.description}</div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-[var(--text-secondary)] mb-2">// Stack</div>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech: string, i: number) => (
                            <span 
                              key={i}
                              className="px-2 py-1 bg-[var(--code-window-bg)] text-xs rounded text-[var(--accent-primary)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-[var(--text-secondary)] mb-2">// Achievements</div>
                        <ul className="list-disc pl-5 space-y-1 text-[var(--text-primary)]">
                          {job.achievements.map((achievement: string, i: number) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-right text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-secondary)]">]</span>;
                </div>
              </motion.div>
            )}
            
            {/* Hackathons Section */}
            {activeSection === 'hackathons' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex mb-6 items-center">
                  <div className="w-2 h-6 bg-[var(--accent-primary)] mr-3"></div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    <span className="text-[var(--accent-primary)]">const</span> hackathons = <span className="text-[var(--accent-secondary)]">[</span>
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {data.hackathons.map((hackathon: Hackathon, index: number) => (
                    <motion.div
                      key={hackathon.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-[var(--code-editor-bg)] rounded-lg p-6 border border-[var(--card-border)]"
                    >
                      <div className="bg-[var(--code-window-bg)] px-4 py-2 rounded-t-lg mb-4 -mt-6 -mx-6 border-b border-[var(--card-border)] flex justify-between items-center">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-[var(--text-secondary)] text-sm">{hackathon.name}.js</span>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:justify-between mb-4">
                        <h3 className="text-xl font-bold text-[var(--accent-primary)] mb-1">{hackathon.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--text-secondary)] font-mono text-sm">{hackathon.year}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            hackathon.result.includes('Winner') ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {hackathon.result}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-[var(--text-primary)] mb-4">{hackathon.description}</div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-[var(--text-secondary)] mb-2">// Technologies</div>
                        <div className="flex flex-wrap gap-2">
                          {hackathon.technologies.map((tech: string, i: number) => (
                            <span 
                              key={i}
                              className="px-2 py-1 bg-[var(--code-window-bg)] text-xs rounded text-[var(--accent-primary)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-right text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-secondary)]">]</span>;
                </div>
              </motion.div>
            )}
            
            {/* Volunteer Section */}
            {activeSection === 'volunteer' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex mb-6 items-center">
                  <div className="w-2 h-6 bg-[var(--accent-primary)] mr-3"></div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    <span className="text-[var(--accent-primary)]">const</span> volunteer = <span className="text-[var(--accent-secondary)]">[</span>
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {data.volunteer.map((vol: Volunteer, index: number) => (
                    <motion.div
                      key={vol.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-[var(--code-editor-bg)] rounded-lg p-6 border border-[var(--card-border)]"
                    >
                      <div className="bg-[var(--code-window-bg)] px-4 py-2 rounded-t-lg mb-4 -mt-6 -mx-6 border-b border-[var(--card-border)] flex justify-between items-center">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-[var(--text-secondary)] text-sm">{vol.organization}.js</span>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:justify-between mb-4">
                        <h3 className="text-xl font-bold text-[var(--accent-primary)] mb-1">{vol.role}</h3>
                        <div className="text-blue-400 font-mono text-sm">{vol.organization}</div>
                      </div>
                      
                      <div className="text-[var(--text-primary)] mb-4">{vol.description}</div>
                      
                      <div>
                        <div className="text-sm text-[var(--text-secondary)] mb-2">// Contributions</div>
                        <ul className="list-disc pl-5 space-y-1 text-[var(--text-primary)]">
                          {vol.achievements.map((achievement: string, i: number) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-right text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-secondary)]">]</span>;
                </div>
              </motion.div>
            )}
            
            {/* Education Section */}
            {activeSection === 'education' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex mb-6 items-center">
                  <div className="w-2 h-6 bg-[var(--accent-primary)] mr-3"></div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    <span className="text-[var(--accent-primary)]">const</span> education = <span className="text-[var(--accent-secondary)]">[</span>
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {data.education.map((edu: Education, index: number) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-[var(--code-editor-bg)] rounded-lg p-6 border border-[var(--card-border)]"
                    >
                      <div className="bg-[var(--code-window-bg)] -mx-6 -mt-6 p-4 border-b border-[var(--card-border)] flex items-center gap-3">
                        <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-full flex items-center justify-center text-white font-bold">
                          {edu.id}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--accent-primary)]">{edu.degree}</h3>
                          <div className="text-[var(--text-secondary)]">{edu.institution} | {edu.period}</div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="text-[var(--text-primary)] mb-4">{edu.description}</div>
                        
                        <div>
                          <div className="text-sm text-[var(--text-secondary)] mb-2">// Achievements</div>
                          <div className="bg-[var(--code-window-bg)] p-4 rounded-lg border border-[var(--card-border)]">
                            <code className="text-sm">
                              <span className="text-[var(--accent-primary)]">achievements</span>.<span className="text-[var(--accent-secondary)]">forEach</span>(item =&gt; &#123;<br/>
                              &nbsp;&nbsp;<span className="text-[var(--accent-primary)]">console</span>.<span className="text-green-400">log</span>(item);<br/>
                              &#125;);
                            </code>
                            <ul className="list-disc pl-8 pt-3 space-y-1 text-[var(--text-primary)]">
                              {edu.achievements.map((achievement: string, i: number) => (
                                <li key={i}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-right text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-secondary)]">]</span>;
                </div>
              </motion.div>
            )}
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
