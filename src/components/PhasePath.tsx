/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelpCircle, Pin, CheckCircle2 } from "lucide-react";

interface Phase {
  label: string;
  subtitle: string;
  status: "completed" | "active" | "incoming";
}

const PHASES: Phase[] = [
  { label: "1. Prep & Focus", subtitle: "Claude Connectors active", status: "completed" },
  { label: "2. The Workshop", subtitle: "The 30th (You are here!)", status: "active" },
  { label: "3. Playground", subtitle: "3 Weeks of free building", status: "incoming" },
  { label: "4. Agentic Hackathon", subtitle: "Official layer deploy", status: "incoming" },
];

export default function PhasePath() {
  return (
    <div className="w-full max-w-4xl mx-auto my-12" id="phase-path-stepper">
      <div className="relative">
        
        {/* Connection Connecting Line */}
        <div className="absolute top-5 left-10 right-10 h-[2px] bg-brand-line/40 hidden md:block">
          {/* Animated fill-in progress overlay */}
          <div className="absolute left-0 top-0 bottom-0 bg-brand-primary w-[38%] rounded-full" />
        </div>

        {/* Four stop rendering */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 text-center md:text-left">
          {PHASES.map((ph, idx) => {
            const isCompleted = ph.status === "completed";
            const isActive = ph.status === "active";

            return (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
                {/* Node circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border relative shrink-0 ${
                  isActive
                    ? "bg-brand-primary text-white border-brand-primary shadow-lg ring-4 ring-brand-primary/20 scale-102"
                    : isCompleted
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-gray-400 border-brand-line/60"
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  
                  {/* Floating active pinpoint pin */}
                  {isActive && (
                    <span className="absolute -top-7 px-2 py-0.5 bg-brand-primary text-white text-[9px] font-mono font-bold tracking-widest rounded uppercase shadow-md flex items-center gap-0.5">
                      <Pin className="w-2.5 h-2.5 fill-white text-white" />
                      <span>CURRENT</span>
                    </span>
                  )}
                </div>

                {/* Info titles */}
                <h4 className={`text-sm font-bold tracking-tight mt-4 ${isActive ? "text-brand-primary font-extrabold" : "text-brand-ink"}`}>
                  {ph.label}
                </h4>
                <p className="text-[11px] font-mono text-gray-500 mt-1 leading-normal">
                  {ph.subtitle}
                </p>
                <span className={`text-[9px] font-mono uppercase tracking-wider font-bold mt-2 px-1.5 py-0.5 rounded ${
                  isActive 
                    ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                    : isCompleted 
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                    : "bg-gray-50 text-gray-400 border-gray-100"
                }`}>
                  {ph.status}
                </span>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
