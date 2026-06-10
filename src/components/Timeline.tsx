/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Clock, BookOpen, AlertCircle, HelpCircle, Flame, CheckSquare, Award } from "lucide-react";
import { AGENDA } from "../data";
import { AgendaBlock } from "../types";

export default function Timeline() {
  const [activeBlockId, setActiveBlockId] = useState<string>("welcome");
  
  // Calculate hands-on stats
  const totalMinutes = AGENDA.reduce((acc, curr) => acc + curr.duration, 0);
  const activeMinutesOnly = AGENDA
    .filter(b => b.id === "sprint1" || b.id === "sprint2" || b.id === "sprint3" || b.id === "prep" || b.id === "presentations")
    .reduce((acc, curr) => acc + curr.duration, 0);

  // Cumulative active percentage up to the selected block to animate the hands-on meter
  const getCumulativeActivePercent = (uptoId: string) => {
    let cumulativeActive = 0;
    let cumulativeTotal = 0;
    
    for (const b of AGENDA) {
      cumulativeTotal += b.duration;
      if (b.id === "sprint1" || b.id === "sprint2" || b.id === "sprint3" || b.id === "prep" || b.id === "presentations" || b.id === "teams" || b.id === "gallery1" || b.id === "clinic") {
        cumulativeActive += b.duration;
      }
      if (b.id === uptoId) {
        break;
      }
    }
    
    // We compute percent relative to the total working day (400 minutes, excluding lunch)
    const workingDayTotal = totalMinutes - 40; // 400m
    const percent = (cumulativeActive / workingDayTotal) * 100;
    return Math.min(Math.round(percent), 86); // bounds it at active participation max
  };

  const currentPercent = getCumulativeActivePercent(activeBlockId);
  const focusedBlock = AGENDA.find(b => b.id === activeBlockId) || AGENDA[0];

  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-surface border-b border-brand-line/45" 
      id="how-the-day-flows"
      aria-labelledby="how-the-day-flows-h2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">The Rhythm</span>
          <h2 id="how-the-day-flows-h2" className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-brand-ink mt-4 leading-tight">
            The rhythm: build, share, build.
          </h2>
          <p className="mt-4 text-base text-gray-500 font-sans">
            This is the agenda of the day.
          </p>
        </div>

        {/* Interactive Split Grid: Timeline Nav / Expandable Block */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Panel: Vertical Navigation Stack (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-brand-line/50 rounded-3xl p-6 shadow-sm">
            <div>
              {/* Dynamic Hands-On Meter Blended Inside Card */}
              <div className="mb-6 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <span className="text-[10px] font-mono text-brand-primary uppercase tracking-wider block font-bold">
                      LIVE HANDS-ON METRIC PROOF
                    </span>
                    <h4 className="text-xs font-bold text-brand-ink font-sans">
                      Active Participation Rate
                    </h4>
                  </div>
                  {/* The Badge */}
                  <div className="shrink-0 bg-brand-primary/10 text-brand-primary border border-brand-primary/15 px-2 py-1 rounded-lg text-[10px] font-semibold font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
                    <span>{currentPercent}% Active Build Time</span>
                  </div>
                </div>

                {/* Progress container bar */}
                <div className="mt-3 w-full bg-gray-200/60 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brand-primary via-brand-primary to-brand-accent h-full transition-all duration-1000 ease-out"
                    style={{ width: `${currentPercent}%` }}
                  />
                </div>
              </div>

              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold block mb-4">Interactive Agenda Beats</span>
              
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
                {AGENDA.map((block) => {
                  const isActive = activeBlockId === block.id;
                  const isPassive = block.type === "passive";
                  const isBreak = block.type === "break";

                  return (
                    <button
                      key={block.id}
                      onClick={() => setActiveBlockId(block.id)}
                      className={`w-full text-left rounded-xl p-3.5 border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isActive
                          ? "bg-brand-primary/5 border-brand-primary ring-2 ring-brand-primary/5 translate-x-1"
                          : "bg-white border-brand-line/60 hover:border-brand-primary/20 hover:bg-gray-50/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold leading-none shrink-0 ${
                          isActive
                            ? "bg-brand-primary text-white shadow-sm"
                            : isPassive
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : isBreak
                            ? "bg-gray-50 text-gray-400 border border-gray-200"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        }`}>
                          {block.duration}m
                        </div>
                        <div>
                          <p className={`text-xs font-mono text-gray-400 ${isActive ? "text-brand-primary font-bold" : ""}`}>{block.time}</p>
                          <h4 className={`text-sm font-bold tracking-tight mt-0.5 ${isActive ? "text-brand-primary" : "text-brand-ink"}`}>
                            {block.name}
                          </h4>
                        </div>
                      </div>

                      {/* Pill showing categorization */}
                      <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded shrink-0 uppercase border ${
                        isPassive
                          ? "bg-blue-50 text-blue-500 border-blue-100"
                          : isBreak
                          ? "bg-gray-50 text-gray-400 border-gray-200"
                          : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      }`}>
                        {block.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-line/45 text-[10px] font-mono text-gray-400 flex items-center justify-between">
              <span>ACTIVE SCHEDULE INTEGRAL</span>
              <span>TOTAL DURATION: {totalMinutes}m (~6.5 HOURS)</span>
            </div>
          </div>

          {/* Right Panel: Focused Block Details Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-brand-ink text-gray-100 rounded-3xl p-6 md:p-8 border border-gray-800 shadow-xl min-h-[460px]">
            <div>
              {/* Card Meta Indicator */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                <span className="text-[10px] font-mono text-brand-accent tracking-wider uppercase font-bold">Selected Schedule Detail</span>
                <span className="text-[10px] font-mono bg-gray-800 text-gray-300 px-2 py-0.5 rounded capitalize">
                  {focusedBlock.type} segment
                </span>
              </div>

              {/* Time Frame Block */}
              <div className="flex items-center gap-2 text-brand-accent mb-1 bg-brand-primary/10 border border-brand-primary/30 w-fit px-2.5 py-0.5 rounded font-mono text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{focusedBlock.time} ({focusedBlock.duration} mins)</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight leading-tight mt-2.5">
                {focusedBlock.name}
              </h3>
              
              <p className="text-xs text-gray-300 leading-relaxed font-sans mt-3">
                {focusedBlock.description}
              </p>

              {/* Special final presentations structure expansion */}
              {focusedBlock.id === "presentations" ? (
                <div className="mt-6 space-y-3 bg-gray-800/40 p-4 border border-gray-800 rounded-2xl">
                  <span className="text-[9px] font-mono text-brand-accent font-bold uppercase tracking-wider block">
                    REQUIRED 4-PART SHOWCASE STRUCTURE
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-300">
                    <div className="bg-gray-900/60 p-2 rounded border border-gray-800">
                      <span className="text-brand-accent font-extrabold block">Part 1</span>
                      <span>The Process (45s)</span>
                    </div>
                    <div className="bg-gray-900/60 p-2 rounded border border-gray-800">
                      <span className="text-brand-accent font-extrabold block">Part 2</span>
                      <span>Live Run (2m)</span>
                    </div>
                    <div className="bg-gray-900/60 p-2 rounded border border-gray-800">
                      <span className="text-brand-accent font-extrabold block">Part 3</span>
                      <span>The Payoff (45s)</span>
                    </div>
                    <div className="bg-gray-900/60 p-2 rounded border border-gray-800">
                      <span className="text-brand-accent font-extrabold block">Part 4</span>
                      <span>What's Next (30s)</span>
                    </div>
                  </div>
                </div>
              ) : focusedBlock.details ? (
                <div className="mt-6 space-y-2">
                  <span className="text-[9px] font-mono text-gray-450 uppercase tracking-widest block mb-1">Agenda Key Focus beats:</span>
                  {focusedBlock.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 font-sans">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              ) : null}

            </div>

            <div className="mt-8 pt-4 border-t border-gray-800 text-[10px] font-mono text-gray-500 flex items-center justify-between">
              <span>CUMULATIVE STATED WEIGHT: {focusedBlock.duration}m</span>
              <span>INDEX: {AGENDA.findIndex(b => b.id === focusedBlock.id) + 1} / {AGENDA.length}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
