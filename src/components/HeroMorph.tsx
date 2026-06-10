/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { Play, RotateCcw, Video, FileText, Settings, Code, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Waypoint {
  key: "brief" | "script" | "format" | "deliverable";
  label: string;
}

const WAYPOINTS: Waypoint[] = [
  { key: "brief", label: "1. Prompt Brief" },
  { key: "script", label: "2. Generate Script" },
  { key: "format", label: "3. Structure Format" },
  { key: "deliverable", label: "4. Finished Asset" },
];

const EXAMPLES = [
  {
    brief: "Launch UGC ad for DeX — IT leaders, time-saved angle",
    script: {
      title: "DeX UGC Campaign Script v1.3",
      hook: "0:00 - 0:05 | Hook: [Frustrated IT Manager holding massive stack of printouts] 'Every Monday was the same database nightmare. Then we automated with DeX.'",
      body: "0:05 - 0:15 | Core Argument: [Manager smiles, gesturing to a clean, live dashboard] 'Our average ticket-to-resolution fell from 48 hours to 15 minutes flat.'",
      cta: "0:15 - 0:20 | Call to Action: [Logo reveal with clear click click animation] 'Build your automated IT flow in minutes today.'"
    },
    format: [
      { field: "Target", value: "IT Directors & Tech Managers" },
      { field: "Scene Specs", value: "Natural lighting, home-office backdrop" },
      { field: "Cues", value: "Upbeat electric background score overlay" },
      { field: "CTALink", value: "sysaid.com/dex-trial" }
    ],
    deliverable: {
      type: "video" as const,
      previewTitle: "ITSM Automation UGC (0:20s)",
      duration: "20s",
      aspect: "9:16",
      headline: "How DeX saved our entire IT team 15+ hours a week",
      comments: "98% Engagement Match"
    }
  },
  {
    brief: "Repurpose webinar story for LinkedIn & email newsletter",
    script: {
      title: "Core Insights Storyboard",
      hook: "Topic 1: Modernizing the IT Service Catalog",
      body: "Draft quote: 'We didn't just rebuild our platform; we redefined service speed' - James, VP Operations",
      cta: "Newsletter Bullet: Quick workflow templates you can clone directly"
    },
    format: [
      { field: "Platforms", value: "LinkedIn post, HTML Newsletter Body" },
      { field: "Theme Tone", value: "Thought leadership, high-contrast, data-heavy" },
      { field: "Hashtags", value: "#ITSM #Automation #SysAid #AI" },
      { field: "Newsletter", value: "Responsive table, off-white container" }
    ],
    deliverable: {
      type: "document" as const,
      previewTitle: "Repurposed Campaign Package",
      duration: "2 Assets",
      aspect: "Letter",
      headline: "The Autonomous IT Roadmap: Zero to One",
      comments: "100% On-Brand Score"
    }
  }
];

export default function HeroMorph() {
  const [useStaticFallback, setUseStaticFallback] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [currentWaypoint, setCurrentWaypoint] = useState<"brief" | "script" | "format" | "deliverable">("brief");
  const [typedBrief, setTypedBrief] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Read media query preference
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setUseStaticFallback(true);
    }
    const listener = (e: MediaQueryListEvent) => {
      setUseStaticFallback(e.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const activeExample = EXAMPLES[exampleIndex];

  // Typing effect simulation
  useEffect(() => {
    if (useStaticFallback) {
      setTypedBrief(activeExample.brief);
      setCurrentWaypoint("deliverable");
      return;
    }

    setTypedBrief("");
    setCurrentWaypoint("brief");
    setIsTyping(true);

    let idx = 0;
    const txt = activeExample.brief;
    const interval = setInterval(() => {
      setTypedBrief((prev) => prev + txt.charAt(idx));
      idx++;
      if (idx >= txt.length) {
        clearInterval(interval);
        setIsTyping(false);
        // Advance milestones automatically
        advanceWaypoints();
      }
    }, 75); // typing speed

    return () => clearInterval(interval);
  }, [exampleIndex, useStaticFallback]);

  const advanceWaypoints = useCallback(() => {
    let timeouts: number[] = [];

    // Script generation takes 1.5s
    const t1 = window.setTimeout(() => {
      setCurrentWaypoint("script");
    }, 1200);

    // Formatting takes 1.5s
    const t2 = window.setTimeout(() => {
      setCurrentWaypoint("format");
    }, 2800);

    // Finished asset takes 1.5s
    const t3 = window.setTimeout(() => {
      setCurrentWaypoint("deliverable");
    }, 4400);

    timeouts.push(t1, t2, t3);
    return () => {
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Auto-sequenced loop of examples
  useEffect(() => {
    if (currentWaypoint !== "deliverable" || useStaticFallback) return;

    const timer = setTimeout(() => {
      setExampleIndex((prev) => (prev + 1) % EXAMPLES.length);
    }, 5000); // stay on ready deliverable for 5s, then cycle

    return () => clearTimeout(timer);
  }, [currentWaypoint, useStaticFallback]);

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 bg-white/40 dark:bg-brand-ink/5 border border-brand-line/60 rounded-3xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-xl" id="hero-morph-container">
      {/* Decorative top pill */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-brand-primary/20 via-brand-primary to-brand-accent/20" />

      {/* Main split grid: Input / Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Pipeline Workflow Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-brand-ink/10 rounded-2xl p-5 border border-brand-line/50 shadow-sm min-h-[360px]">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pipeline Workflow</h4>
            
            {/* Visual Process Waypoint Stack - Preserving named steps to teach process */}
            <div className="space-y-4">
              {WAYPOINTS.map((wp) => {
                const isActive = currentWaypoint === wp.key;
                const isPassed = !useStaticFallback && (
                  (wp.key === "brief" && currentWaypoint !== "brief") ||
                  (wp.key === "script" && (currentWaypoint === "format" || currentWaypoint === "deliverable")) ||
                  (wp.key === "format" && currentWaypoint === "deliverable")
                );

                return (
                  <div 
                    key={wp.key}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                      isActive 
                        ? "bg-brand-primary/5 border-brand-primary/50 translate-x-1" 
                        : isPassed 
                        ? "bg-emerald-50/40 border-emerald-200" 
                        : "bg-transparent border-transparent"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive 
                        ? "bg-brand-primary text-white scale-110 shadow-md ring-4 ring-brand-primary/20" 
                        : isPassed 
                        ? "bg-emerald-500 text-white" 
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {isPassed ? <CheckCircle className="w-4 h-4" /> : wp.key === "brief" ? "1" : wp.key === "script" ? "2" : wp.key === "format" ? "3" : "4"}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isActive ? "text-brand-primary" : isPassed ? "text-emerald-800" : "text-gray-400"}`}>
                        {wp.label}
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono">
                        {wp.key === "brief" && "Type short raw campaign parameters"}
                        {wp.key === "script" && "Multi-angle copywriting script formulations"}
                        {wp.key === "format" && "Metadata structuring and asset specs formatting"}
                        {wp.key === "deliverable" && "High-quality client-ready production file"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-line/40">
            <span className="text-[10px] font-mono text-gray-400 block mb-1">PROMPT INGESTION:</span>
            <div className="bg-gray-50 dark:bg-brand-ink/20 p-3 rounded-lg border border-brand-line/30 font-mono text-xs text-brand-ink">
              {typedBrief}
              {isTyping && <span className="animate-pulse font-bold text-brand-primary">|</span>}
            </div>
          </div>
        </div>

        {/* Right Side: Morphing Screen Node (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-gray-900 text-gray-100 rounded-2xl p-6 shadow-xl relative min-h-[380px]">
          
          {/* Mock App Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-800 text-[11px] font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-2">SysAid_Automation_Agent.sh</span>
            </div>
            <span className="bg-brand-primary/20 text-brand-accent px-2 py-0.5 rounded border border-brand-primary/40 font-semibold uppercase tracking-widest text-[9px]">CLAUDE_ENGINE_V3</span>
          </div>

          {/* Morphing Box Body */}
          <div className="flex-1 py-6 flex flex-col justify-center">
            
            {/* Reduced motion static payload or waypoint routing */}
            {useStaticFallback ? (
              <div className="space-y-4">
                <div className="bg-gray-800/60 p-3.5 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-2 mb-2 text-brand-accent font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Structured Brief (Parsed)</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono">{activeExample.brief}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/50">
                    <span className="text-gray-400 block text-[10px] uppercase font-mono mb-1">Generated Output Script:</span>
                    <p className="font-sans text-gray-200 font-semibold line-clamp-3">{activeExample.script.hook}</p>
                  </div>
                  <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/50">
                    <span className="text-gray-400 block text-[10px] uppercase font-mono mb-1">Deliverable Asset Format:</span>
                    <p className="font-mono text-xs text-emerald-400">{activeExample.deliverable.previewTitle} ({activeExample.deliverable.duration})</p>
                  </div>
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {currentWaypoint === "brief" && (
                  <motion.div 
                    key="brief"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 text-center py-6"
                  >
                    <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/35 rounded-full flex items-center justify-center mx-auto mb-2 text-brand-primary">
                      <Code className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-brand-accent bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/30">Waypoint 1 Active</span>
                    <h5 className="text-lg font-bold font-display tracking-tight text-white mt-1">Interpreting Campaign Parameters</h5>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto font-sans leading-relaxed">Analyzing input fields and cross-references in the SysAid Content Lake repository...</p>
                  </motion.div>
                )}

                {currentWaypoint === "script" && (
                  <motion.div 
                    key="script"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/50 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-brand-accent" />
                        <span className="text-xs font-mono font-bold">{activeExample.script.title}</span>
                      </div>
                      <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-1.5 py-0.5 rounded font-mono">AUTOWRITING...</span>
                    </div>
                    <div className="space-y-2 text-xs font-mono leading-relaxed text-gray-300">
                      <p className="text-brand-accent font-semibold">{activeExample.script.hook}</p>
                      <p className="opacity-70">{activeExample.script.body}</p>
                      <p className="opacity-50 line-clamp-1">{activeExample.script.cta}</p>
                    </div>
                  </motion.div>
                )}

                {currentWaypoint === "format" && (
                  <motion.div 
                    key="format"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/50 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-brand-accent border-b border-gray-700 pb-2">
                      <Settings className="w-4 h-4 animate-spin text-brand-accent" />
                      <span className="text-xs font-mono font-bold">Waypoint 3 · Structure Standardization</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-gray-300">
                      {activeExample.format.map((f, i) => (
                        <div key={i} className="bg-gray-800/60 p-2.5 rounded border border-gray-700/45">
                          <span className="text-gray-500 block text-[9px] uppercase tracking-wider mb-0.5">{f.field}</span>
                          <span className="font-semibold text-gray-200">{f.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentWaypoint === "deliverable" && (
                  <motion.div 
                    key="deliverable"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-800 p-5 rounded-xl border border-brand-primary/45 shadow-2xl relative overflow-hidden"
                  >
                    {/* Glowing brand badge overlay */}
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 font-mono text-[9px] font-bold rounded-bl-lg uppercase tracking-widest shadow-sm">
                      Ready on Monday
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-primary/20 border border-brand-primary/40 rounded-xl flex items-center justify-center text-brand-primary shrink-0 transition-transform hover:scale-105 duration-300">
                        {activeExample.deliverable.type === "video" ? <Video className="w-6 h-6 text-brand-accent" /> : <FileText className="w-6 h-6 text-brand-accent" />}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-brand-accent bg-brand-primary/10 px-2 py-0.5 rounded border border-brand-primary/30 uppercase tracking-widest">
                          {activeExample.deliverable.previewTitle}
                        </span>
                        <h6 className="text-sm font-bold tracking-tight text-white mt-1 leading-snug">{activeExample.deliverable.headline}</h6>
                        <div className="flex items-center gap-3 pt-2 text-[10px] font-mono text-gray-500">
                          <span>Payload Specs: {activeExample.deliverable.duration}</span>
                          <span>Aspect Ratio: {activeExample.deliverable.aspect}</span>
                          <span className="text-emerald-400 font-bold">{activeExample.deliverable.comments}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Prompt footer marker */}
          <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-[10px] font-mono text-gray-500">
            <span>STAGES COMPLETE: 4 / 4</span>
            <span className="flex items-center gap-1 text-brand-accent">
              <Play className="w-2.5 h-2.5 fill-brand-accent" />
              <span>Pipeline Live Output Mode</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
