/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ArrowRight, HelpCircle, Flame, Check, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import UgcAdReveal from "./UgcAdReveal";

const FIVE_RULES = [
  { text: "Do it twice, make it a skill", highlight: true },
  { text: "Manual first", highlight: false },
  { text: "Good in, good out", highlight: false },
  { text: "Plan before prompt", highlight: false },
  { text: "Ship something broken", highlight: true },
];

export default function TheShift() {
  const [activeTab, setActiveTab] = useState<"old" | "build">("build");
  const [minCount, setMinCount] = useState(0);
  const [variantCount, setVariantCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Trigger count-up on switching to 'build'
  useEffect(() => {
    if (activeTab === "build") {
      setMinCount(0);
      setVariantCount(0);
      
      const minTimer = setInterval(() => {
        setMinCount((prev) => {
          if (prev >= 15) {
            clearInterval(minTimer);
            return 15;
          }
          return prev + 1;
        });
      }, 35); // quick count up

      const varTimer = setInterval(() => {
        setVariantCount((prev) => {
          if (prev >= 6) {
            clearInterval(varTimer);
            return 6;
          }
          return prev + 1;
        });
      }, 70);

      return () => {
        clearInterval(minTimer);
        clearInterval(varTimer);
      };
    }
  }, [activeTab]);

  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-b from-brand-surface to-white border-y border-brand-line/40 relative" 
      id="the-shift"
      aria-labelledby="the-shift-h2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">Active Action</span>
          <h2 id="the-shift-h2" className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-brand-ink mt-4 leading-tight">
            It's a hackathon. You'll build, not watch.
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 font-sans leading-relaxed">
            We're not here to watch slides or passive product demos. You teach Claude a process you already do manually today, compile it once, and it runs for you over and over.
          </p>
        </div>

        {/* Highlight Pull-quote block */}
        <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-brand-primary/10 to-brand-accent/5 p-6 md:p-8 rounded-2xl border border-brand-line/50 shadow-sm relative">
          <div className="absolute -top-3.5 left-8 bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Flame className="w-3 h-3 fill-white" />
            <span>Core Mindset</span>
          </div>
          <p className="text-lg md:text-xl font-display font-medium text-brand-ink italic tracking-tight leading-relaxed">
            "An agent is just a process you already do, written down well enough that Claude can run it."
          </p>
        </div>

        {/* Toggle Mode Control Container */}
        <div className="max-w-4xl mx-auto">
          
          {/* Custom Switch Center */}
          <div className="flex flex-col items-center justify-center gap-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Active Paradigm</span>
            <div className="bg-gray-100 p-1.5 rounded-full flex items-center gap-1 border border-brand-line">
              <button
                onClick={() => setActiveTab("old")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "old" 
                    ? "bg-white text-brand-ink shadow-md" 
                    : "text-gray-500 hover:text-brand-ink"
                }`}
                aria-label="Toggle Old Way overview"
              >
                The Old Way (Generic Usage)
              </button>
              <button
                onClick={() => setActiveTab("build")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "build" 
                    ? "bg-brand-primary text-white shadow-md" 
                    : "text-gray-500 hover:text-brand-ink"
                }`}
                aria-label="Toggle Build Way overview"
              >
                The Build Way (Structured Process)
              </button>
            </div>
            
            {/* Interactive info button */}
            <button 
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-xs text-brand-primary font-medium hover:underline flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" />
              <span>What defines this shift?</span>
            </button>
            <AnimatePresence>
              {showExplanation && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-brand-primary/5 border border-brand-line p-4 rounded-xl text-xs max-w-lg text-brand-ink font-sans leading-relaxed text-center"
                >
                  When you build structured templates, specific prompts, and sequential input-output steps, you move away from typing vague questions. You are creating micro-software tools (skills) that perform high-quality marketing actions predictably.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Side-by-side dynamic display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
            
            {/* Old Way Column */}
            <div className={`rounded-3xl p-6 md:p-8 flex flex-col justify-between border transition-all duration-300 ${
              activeTab === "old" 
                ? "bg-white border-gray-300 shadow-xl scale-102 z-10" 
                : "bg-gray-50/60 border-brand-line/20 opacity-60 pointer-events-none md:pointer-events-auto md:opacity-80"
            }`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-gray-500 uppercase">Interactive Column (1)</span>
                  <span className="text-xs font-bold text-gray-500 bg-gray-150 px-2 py-0.5 rounded">Manual Flow</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-brand-ink">Make a UGC Ad — Old Way</h3>
                <p className="text-xs text-gray-400 mt-1 font-mono uppercase">Generic Agency Process</p>
                
                <div className="my-8 space-y-4">
                  <div className="pb-3 border-b border-brand-line/45">
                    <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">Method Category</span>
                    <span className="text-base font-semibold text-brand-ink font-sans">Brief an outside agency & wait</span>
                  </div>
                  <div className="pb-3 border-b border-brand-line/45">
                    <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider font-bold">Estimated Cost</span>
                    <span className="text-2xl font-extrabold text-red-600 font-sans">$10,000 USD <span className="text-xs font-normal text-gray-400">per wave</span></span>
                  </div>
                  <div className="pb-3 border-b border-brand-line/45">
                    <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider font-bold">Cycle Speed</span>
                    <span className="text-base font-semibold text-brand-ink font-sans">1 Months Production</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider font-bold">Total Inbound Volume</span>
                    <span className="text-base font-semibold text-brand-ink font-sans">1 Single Final Video</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-brand-line/30 flex items-center justify-between text-xs text-gray-500">
                <span>Requires external coordinators</span>
                <span className="text-red-500 font-semibold">• High Friction</span>
              </div>
            </div>

            {/* Build Way Column (Active on load or click) */}
            <div className={`rounded-3xl p-6 md:p-8 flex flex-col justify-between border transition-all duration-300 relative ${
              activeTab === "build" 
                ? "bg-white border-brand-primary shadow-2xl scale-102 ring-4 ring-brand-primary/5 z-10" 
                : "bg-gray-50/60 border-brand-line/20 opacity-60 pointer-events-none md:pointer-events-auto md:opacity-80"
            }`}>
              {/* Highlight Ribbon */}
              <div className="absolute -top-3 right-6 bg-brand-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest shadow-md">
                Recommended
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">Interactive Column (2)</span>
                  <span className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">Autonomous Skill</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-brand-ink">Make a UGC Ad — Agent Way</h3>
                <p className="text-xs text-brand-primary mt-1 font-mono uppercase font-semibold">Author a repeatable skill</p>
                
                <div className="my-8 space-y-4">
                  <div className="pb-3 border-b border-brand-line/45">
                    <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">Method Category</span>
                    <span className="text-base font-semibold text-brand-primary font-sans">Deploy Creative Engine workflow</span>
                  </div>
                  <div className="pb-3 border-b border-brand-line/45">
                    <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider font-bold">Estimated Cost</span>
                    <span className="text-2xl font-extrabold text-brand-primary font-sans">
                      $0 <span className="text-xs font-normal text-gray-400">(using tools you already have)</span>
                    </span>
                  </div>
                  <div className="pb-3 border-b border-brand-line/45">
                    <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider font-bold">Cycle Speed</span>
                    <span className="text-2xl font-extrabold text-brand-primary font-sans">
                      {activeTab === "build" ? minCount : "15"} <span className="text-xs font-normal text-gray-400">Minutes In-House</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider font-bold">Total Inbound Volume</span>
                    <span className="text-2xl font-extrabold text-brand-primary font-sans">
                      {activeTab === "build" ? variantCount : "6"} <span className="text-xs font-normal text-gray-400">Finished video variants</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-brand-line/30 flex items-center justify-between text-xs text-brand-primary">
                <span>Runs infinite times, predictably</span>
                <span className="text-brand-primary font-bold uppercase tracking-wider flex items-center gap-1">
                  ✓ 100% In-House
                </span>
              </div>
            </div>

          </div>

          {/* Prompt → Beam → UGC video variants signature demo */}
          <UgcAdReveal />

          {/* Five Rules List */}
          <div className="mt-16 pt-12 border-t border-brand-line/50">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-center text-gray-500 mb-6">
              The Five Rules Teased for the Day
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {FIVE_RULES.map((rule, idx) => (
                <div 
                  key={idx}
                  className={`px-4 py-2.5 rounded-full border text-xs font-medium flex items-center gap-2 transition-all hover:border-brand-primary/40 text-brand-ink ${
                    rule.highlight 
                      ? "bg-brand-primary/5 border-brand-primary/30" 
                      : "bg-white border-brand-line"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                  <span>{rule.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
