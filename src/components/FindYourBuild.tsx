/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { X, Sparkles, Filter, Check, ArrowRight } from "lucide-react";
import { PROJECTS, ROLES } from "../data";
import { RoleId, Project } from "../types";

function TypedText({ text, speed = 55, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    
    if (!text) {
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      const currentLength = index + 1;
      if (currentLength > text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
        return;
      }
      setDisplayedText(text.substring(0, currentLength));
      index++;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="relative">
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse font-extrabold text-brand-primary ml-0.5">|</span>
      )}
    </span>
  );
}

export default function FindYourBuild() {
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(PROJECTS[0]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [phase, setPhase] = useState<'input' | 'beam' | 'output' | 'done'>('input');

  // Filter project logic
  const handleRoleSelect = (roleId: RoleId) => {
    if (selectedRole === roleId) {
      setSelectedRole(null); // click again to clear
    } else {
      setSelectedRole(roleId);
      // Auto focus on the first project fitting this role if any
      const matchingProjects = PROJECTS.filter(p => p.roles.includes(roleId));
      if (matchingProjects.length > 0) {
        setActiveProject(matchingProjects[0]);
      }
    }
  };

  const handleProjectSelect = (project: Project) => {
    setActiveProject(project);
    setCurrentStep(1);
    setPhase('input');
    setIsModalOpen(true);
  };

  // Reset phase when active project or current step changes
  useEffect(() => {
    setPhase('input');
  }, [activeProject, currentStep, isModalOpen]);

  // Handle high-performance central beam timing sequence
  useEffect(() => {
    if (phase !== 'beam') return;

    // Beam conveying phase runs for 1.4 seconds before initiating output typing cascade
    const timer = setTimeout(() => {
      setPhase('output');
    }, 1400);

    return () => clearTimeout(timer);
  }, [phase]);

  // Handle post-output rest timing sequence before moving automatically to the next step
  useEffect(() => {
    if (phase !== 'done' || !isModalOpen) return;

    // Keep completed state visible for 2.2 seconds, then step forward
    const timer = setTimeout(() => {
      setCurrentStep((prev) => {
        if (prev >= 5) return 1;
        return prev + 1;
      });
    }, 2200);

    return () => clearTimeout(timer);
  }, [phase, isModalOpen]);

  return (
    <section 
      className="py-16 md:py-24 bg-white border-b border-brand-line/45" 
      id="find-your-build"
      aria-labelledby="find-your-build-h2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">The Centerpiece</span>
          <h2 id="find-your-build-h2" className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-brand-ink mt-4 leading-tight">
            Four builds. Pick yours.
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 font-sans leading-relaxed">
            Choose a campaign challenge based on your Monday objectives. Click any card to load the real-time automated workflow simulator frame & toolchain.
          </p>
        </div>

        {/* The four cards split matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="workflow-cards-container">
          {PROJECTS.map((project) => {
            return (
              <div
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className="flex flex-col justify-between rounded-3xl p-6 border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group bg-white border-brand-line/60 hover:border-brand-primary/50 hover:shadow-lg scale-100 hover:scale-[1.01]"
              >
                {/* Visual hover indicator top line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-brand-primary transition-colors" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-display">{project.emoji}</span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-brand-primary/10 text-brand-primary">
                      CHALLENGE
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold font-display tracking-tight mt-4 text-brand-ink">
                    {project.name}
                  </h3>
                  
                  <p className="text-xs mt-2 leading-relaxed text-gray-500">
                    {project.subtitle}
                  </p>

                  {/* Explicit Tools List */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <span className="text-[9px] font-mono tracking-wider font-bold text-gray-400 block mb-1.5">
                      🛠️ WORKFLOW TOOLCHAIN:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {project.tools.map((tool) => (
                        <span key={tool} className="text-[10px] font-mono font-bold bg-[#EFF4FF] text-brand-primary px-2 py-0.5 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-line/20">
                  <span className="text-[10px] font-mono tracking-wider block text-gray-450 uppercase">
                    FOR YOU IF:
                  </span>
                  <span className="text-xs font-semibold block mt-1 text-brand-ink">
                    {project.forYou}
                  </span>
                  <span className="text-[11px] font-bold text-brand-primary mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Click to Simulate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Overlay Mapping Frame */}
        {isModalOpen && activeProject && (
          <div className="fixed inset-0 bg-brand-ink/70 backdrop-blur-xs z-50 flex items-center justify-center p-4" id="mapping-modal-overlay">
            {/* Modal Body */}
            <div className="bg-white w-full max-w-4xl rounded-3xl border border-brand-line/80 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
              
              {/* Header block inside modal */}
              <div className="p-6 border-b border-brand-line flex items-center justify-between bg-gray-50/50">
                <div className="text-left">
                  <span className="text-[10px] font-mono text-brand-primary uppercase tracking-widest font-bold bg-brand-primary/10 px-2 py-0.5 rounded border border-brand-primary/15">
                    Live Simulator active
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-display tracking-tight text-brand-ink mt-1.5 flex items-center gap-2">
                    <span>Mapping the {activeProject.name} Workflow</span>
                  </h3>
                </div>
                
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-150 text-gray-500 hover:text-brand-ink flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal frame"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Container Content */}
              <div className="p-6 md:p-8 overflow-y-auto text-left flex-1 space-y-6">
                {/* Elevated Tool Stack & Toolchain block */}
                <div className="bg-brand-ink/5 border-2 border-brand-primary/20 rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-white via-brand-primary/5 to-white shadow-xs">
                  <div className="absolute top-0 right-0 p-3 text-2xl opacity-10 select-none font-mono font-black pointer-events-none">
                    STACK
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-brand-primary animate-ping" />
                        <span className="text-[11px] font-mono text-brand-primary uppercase tracking-widest font-black">
                          THE WORK STACK & INTEGRATIONS
                        </span>
                      </div>
                      <h4 className="text-sm md:text-base font-extrabold text-brand-ink tracking-tight font-display">
                        The Real Production Tools We'll Be Using On Monday
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
                        You will configure, run, and test real-world agent automation loops integrating these official industry platforms. No mock systems or simulations.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 items-start justify-start md:justify-end md:max-w-[44%]">
                      {activeProject.tools.map((tool) => (
                        <div 
                          key={tool} 
                          className="flex items-center gap-1.5 bg-white border-2 border-brand-primary/30 text-brand-ink font-bold px-3 py-1.5 rounded-xl shadow-xs text-xs font-sans tracking-tight hover:border-brand-primary hover:shadow-md transition-all duration-200 select-none"
                        >
                          <span className="text-xs">⚡</span>
                          <span className="font-mono text-xs">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subprocess progress navigation flow beats - Autoplays */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {activeProject.chain.map((step) => {
                    const isActive = currentStep === step.stepNumber;
                    const isPassed = step.stepNumber < currentStep;

                    return (
                      <button
                        key={step.stepNumber}
                        onClick={() => {
                          setCurrentStep(step.stepNumber);
                          setPhase('input');
                        }}
                        className={`rounded-xl p-3 border text-left transition-all relative cursor-pointer ${
                          isActive
                            ? "bg-brand-primary/10 border-brand-primary ring-2 ring-brand-primary/10"
                            : isPassed
                            ? "bg-emerald-50 border-emerald-250 hover:bg-emerald-100"
                            : "bg-white border-gray-100 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                            isActive ? "text-brand-primary" : isPassed ? "text-emerald-700" : "text-gray-400"
                          }`}>
                            Step {step.stepNumber}
                          </span>
                          {isPassed && <span className="text-[8px] font-mono text-emerald-600 font-bold">✓ PAST</span>}
                          {isActive && <span className="text-[8px] font-mono text-brand-primary font-bold animate-pulse">● ACTIVE</span>}
                        </div>
                        <p className={`text-[11px] font-bold mt-1 truncate ${isActive ? "text-brand-ink" : "text-gray-500"}`}>
                          {step.name}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Active step detail simulation boxes with strict sequential trigger flow */}
                <div className="relative pt-4">
                  <style>{`
                    @keyframes slideBeam {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(300%); }
                    }
                    .animate-beam-flow {
                      animation: slideBeam 0.6s infinite linear;
                    }
                  `}</style>

                  {(() => {
                    const inputText = activeProject.chain[currentStep - 1]?.input || "";
                    const outputText = activeProject.chain[currentStep - 1]?.output || "";
                    const isInputTyping = phase === 'input';
                    const isBeamActive = phase === 'beam';
                    const isOutputTyping = phase === 'output';
                    const isDone = phase === 'done';

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-2 items-stretch">
                        
                        {/* Inbound Artifact Box (Left side) */}
                        <div className={`md:col-span-5 bg-white rounded-2xl p-5 border shadow-sm relative flex flex-col justify-between transition-all duration-350 ${
                          isInputTyping 
                            ? "border-red-400 ring-4 ring-red-400/10 scale-[1.01]" 
                            : "border-brand-line/70"
                        }`}>
                          <div>
                            <span className={`absolute -top-3 left-6 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm transition-colors duration-300 ${
                              isInputTyping ? "bg-red-400 text-white" : "bg-gray-100 text-gray-400"
                            }`}>
                              Artifact Going In (Input)
                            </span>
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5 leading-none mt-1">Source Fuel</span>
                            <h4 className="text-sm font-bold text-brand-ink mb-3 truncate">
                              {activeProject.chain[currentStep - 1]?.name} Ingestion
                            </h4>
                          </div>
                          <div className={`p-4 rounded-xl border bg-gradient-to-br font-mono text-xs min-h-[100px] flex items-center justify-center text-center transition-all duration-300 ${
                            isInputTyping 
                              ? "bg-red-50/40 border-red-200 text-brand-ink font-semibold" 
                              : "bg-gray-50 border-gray-150 text-gray-500"
                          }`}>
                            {isInputTyping ? (
                              <span>
                                "<TypedText 
                                  text={inputText} 
                                  speed={20} 
                                  onComplete={() => {
                                    setPhase('beam');
                                  }} 
                                />"
                              </span>
                            ) : (
                              <span>"{inputText}"</span>
                            )}
                          </div>
                        </div>

                        {/* Central Converting Flow Block / Conveyor Arrow */}
                        <div className="md:col-span-2 flex flex-col items-center justify-center py-6 md:py-0 relative z-10 select-none">
                          <div className={`rounded-full p-4 border transition-all duration-300 relative z-10 ${
                            isBeamActive 
                              ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/25 scale-110" 
                              : "bg-gray-100 text-gray-400 border-gray-200"
                          }`}>
                            <ArrowRight className={`w-6 h-6 md:rotate-0 rotate-90 transform transition-transform duration-500 ${
                              isBeamActive ? "translate-x-1" : ""
                            }`} />
                            
                            {/* Pulse orbits */}
                            {isBeamActive && (
                              <span className="absolute inset-x-0 inset-y-0 rounded-full border-2 border-brand-primary/40 animate-ping" />
                            )}
                          </div>
                          
                          <span className={`text-[10px] font-mono font-black uppercase mt-3 tracking-widest text-center transition-colors duration-300 ${
                            isBeamActive ? "text-brand-primary animate-pulse" : "text-gray-400"
                          }`}>
                            {isBeamActive ? "⚡ CONVERTING..." : "CONVEYING"}
                          </span>

                          {/* Fast glowing beam indicator */}
                          <div className="w-full max-w-[100px] h-2 bg-gray-100 rounded-full mt-3 relative overflow-hidden hidden md:block border border-gray-200 shadow-inner">
                            {isBeamActive && (
                              <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary rounded-full animate-beam-flow" />
                            )}
                          </div>
                        </div>

                        {/* Outbound Artifact Box (Right side) */}
                        <div className={`md:col-span-5 bg-white rounded-2xl p-5 border shadow-sm relative flex flex-col justify-between transition-all duration-350 ${
                          isOutputTyping
                            ? "border-emerald-500 ring-4 ring-emerald-500/15 scale-[1.01]" 
                            : isDone
                            ? "border-emerald-400 shadow-md bg-emerald-50/10" 
                            : "border-brand-line/60"
                        }`}>
                          <div>
                            <span className={`absolute -top-3 left-6 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm transition-colors duration-300 ${
                              isOutputTyping || isDone ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"
                            }`}>
                              Artifact Coming Out (Output)
                            </span>
                            <span className="text-[10px] font-mono text-brand-primary uppercase tracking-widest block mb-1.5 leading-none mt-1">Target Result</span>
                            <h4 className="text-sm font-bold text-brand-primary mb-3 truncate">
                              Completed Step {currentStep} Deliverable
                            </h4>
                          </div>
                          <div className={`p-4 rounded-xl border bg-gradient-to-br font-mono text-xs min-h-[100px] flex items-center justify-center text-center transition-all duration-300 ${
                            isOutputTyping || isDone
                              ? "bg-brand-primary/5 border-emerald-250 text-emerald-900 font-semibold"
                              : "bg-gray-50 border-gray-150 text-gray-300 italic"
                          }`}>
                            {isOutputTyping ? (
                              <span>
                                "<TypedText
                                  text={outputText}
                                  speed={20}
                                  onComplete={() => {
                                    setPhase('done');
                                  }}
                                />"
                              </span>
                            ) : isDone ? (
                              <span>"{outputText}"</span>
                            ) : (
                              <span>(Waiting for ingestion transformation...)</span>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })()}
                </div>

                {/* Payoff Block inside modal */}
                <div className="bg-brand-ink text-white rounded-2xl p-5 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[9px] font-mono bg-emerald-500 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                      ESTIMATED BUILD PAYOFF
                    </span>
                    <h4 className="text-base font-extrabold font-display tracking-tight text-white mt-1 leading-tight">
                      {activeProject.payoff}
                    </h4>
                  </div>
                  <span className="text-xs text-gray-400 font-mono italic shrink-0">
                    Looping dynamic steps automated by Claude
                  </span>
                </div>

              </div>

              {/* Modal footer controls */}
              <div className="p-4 border-t border-brand-line/50 flex items-center justify-end bg-gray-50/40">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-brand-ink text-white hover:bg-gray-800 text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  Close Workflow Simulation
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
