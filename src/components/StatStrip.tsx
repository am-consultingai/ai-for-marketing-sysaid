/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Zap, HelpCircle, Users, Award, Clock, Compass, Target } from "lucide-react";

export default function StatStrip() {
  const [hasVisited, setHasVisited] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [builders, setBuilders] = useState(0);
  const [challenges, setChallenges] = useState(0);
  const [day, setDay] = useState(0);
  const [demos, setDemos] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasVisited) {
          setHasVisited(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [hasVisited]);

  useEffect(() => {
    if (hasVisited) {
      // Fast count ups
      const intervalBuilders = setInterval(() => {
        setBuilders((v) => {
          if (v >= 20) { clearInterval(intervalBuilders); return 20; }
          return v + 1;
        });
      }, 40);

      const intervalChallenges = setInterval(() => {
        setChallenges((v) => {
          if (v >= 4) { clearInterval(intervalChallenges); return 4; }
          return v + 1;
        });
      }, 100);

      const intervalDay = setInterval(() => {
        setDay((v) => {
          if (v >= 1) { clearInterval(intervalDay); return 1; }
          return v + 1;
        });
      }, 250);

      const intervalDemos = setInterval(() => {
        setDemos((v) => {
          if (v >= 6) { clearInterval(intervalDemos); return 6; }
          return v + 1;
        });
      }, 80);

      const intervalDuration = setInterval(() => {
        setDuration((v) => {
          if (v >= 4) { clearInterval(intervalDuration); return 4; }
          return v + 1;
        });
      }, 120);

      return () => {
        clearInterval(intervalBuilders);
        clearInterval(intervalChallenges);
        clearInterval(intervalDay);
        clearInterval(intervalDemos);
        clearInterval(intervalDuration);
      };
    }
  }, [hasVisited]);

  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-b from-brand-surface to-white border-b border-brand-line/45" 
      id="the-day"
      aria-labelledby="the-day-h2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        
        {/* Header split block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">The Workshop Format</span>
            <h2 id="the-day-h2" className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-brand-ink mt-4 leading-tight">
              It's a build sprint. You'll build, not watch.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-gray-500 font-sans leading-relaxed">
              No long slides. Around <strong className="text-brand-ink font-bold">70% of the day is hands-on</strong>. You'll work in small mixed teams, pick a challenge, and build a working flow on real inputs. In the last 30 minutes, every team demos what they made — <strong className="text-brand-primary font-bold">4 minutes, live.</strong>
            </p>
          </div>
        </div>

        {/* Five Stat count-up strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          
          {/* Builders stat */}
          <div className="bg-white p-6 rounded-2xl border border-brand-line/40 shadow-sm transition-all hover:shadow-md duration-300">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-primary">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold font-display text-brand-ink tracking-tight">
              {hasVisited ? builders : "20"}
            </div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 mt-2">
              Builders
            </div>
          </div>

          {/* Challenges stat */}
          <div className="bg-white p-6 rounded-2xl border border-brand-line/40 shadow-sm transition-all hover:shadow-md duration-300">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-primary">
              <Target className="w-5 h-5" />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold font-display text-brand-ink tracking-tight">
              {hasVisited ? challenges : "4"}
            </div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 mt-2">
              Challenges
            </div>
          </div>

          {/* Days stat */}
          <div className="bg-white p-6 rounded-2xl border border-brand-line/40 shadow-sm transition-all hover:shadow-md duration-300">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-primary">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold font-display text-brand-ink tracking-tight">
              {hasVisited ? day : "1"}
            </div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 mt-2">
              Day
            </div>
          </div>

          {/* Demos stat */}
          <div className="bg-white p-6 rounded-2xl border border-brand-line/40 shadow-sm transition-all hover:shadow-md duration-300 col-span-1">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-primary">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold font-display text-brand-ink tracking-tight">
              ~{hasVisited ? demos : "6"}
            </div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 mt-2">
              Demos
            </div>
          </div>

          {/* Duration stat */}
          <div className="bg-white p-6 rounded-2xl border border-brand-line/40 shadow-sm transition-all hover:shadow-md duration-300 col-span-2 md:col-span-1">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-primary">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold font-display text-brand-ink tracking-tight">
              {hasVisited ? duration : "4"} min
            </div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 mt-2">
              Presentation Limit
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
