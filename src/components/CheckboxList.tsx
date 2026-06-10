/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const WALKAWAY_LIST = [
  { title: "A working skill", text: "you'll reuse on Monday. An fully running process built around raw campaign briefs or customer signal transcript logs." },
  { title: "A process you own", text: "— and can rebuild from scratch. Gain absolute mastery of configuring, detailing, and debugging prompt models in Claude." },
  { title: "Your build, showcased", text: "to the whole team. A 4-minute presentation detailing the subprocess, live output, and immediate performance gains." },
  { title: "A running start", text: "into the Phase 3 Playground. Fully prepared for the 3-week experimentation sandbox containing 4 blocked hours per week." },
];

export default function CheckboxList() {
  const [useStatic, setUseStatic] = useState(false);
  const [reachedIndex, setReachedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduction
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setUseStatic(true);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && reachedIndex === -1 && !media.matches) {
          // Trigger staggered sequence
          let current = 0;
          const interval = setInterval(() => {
            setReachedIndex(current);
            current++;
            if (current >= WALKAWAY_LIST.length) {
              clearInterval(interval);
            }
          }, 350); // pace entry
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [reachedIndex]);

  return (
    <section 
      className="py-16 md:py-24 bg-white border-b border-brand-line/45" 
      id="what-you-walk-away-with"
      aria-labelledby="what-you-walk-away-with-h2"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">The Payoff</span>
          <h2 id="what-you-walk-away-with-h2" className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-brand-ink mt-4 leading-tight">
            What you'll have by the end of the day.
          </h2>
          <p className="mt-4 text-sm text-gray-500 font-sans">
            Clear, tangible outcomes you will walk away with to upgrade your team's workflow efficiency.
          </p>
        </div>

        {/* The List of Takeaways */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {WALKAWAY_LIST.map((item, index) => {
            const isRevealed = useStatic || index <= reachedIndex;

            return (
              <div 
                key={index}
                className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-500 text-left ${
                  isRevealed 
                    ? "bg-emerald-50/20 border-emerald-100 opacity-100 translate-y-0" 
                    : "bg-white border-transparent opacity-0 translate-y-4"
                }`}
              >
                {/* Visual Check Indicator icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 ${
                  isRevealed ? "bg-emerald-500 text-white scale-100" : "bg-gray-100 text-gray-300 scale-90"
                }`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                
                <div>
                  <h3 className="text-base md:text-lg font-bold font-display text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-sans leading-relaxed mt-1">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
