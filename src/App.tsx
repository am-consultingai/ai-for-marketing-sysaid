/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Sparkles, Send, ArrowDown, ExternalLink } from "lucide-react";
import ProgressRail from "./components/ProgressRail";
import HeroMorph from "./components/HeroMorph";
import TheShift from "./components/TheShift";
import WhereYouFit from "./components/WhereYouFit";
import FindYourBuild from "./components/FindYourBuild";
import Timeline from "./components/Timeline";
import CheckboxList from "./components/CheckboxList";
import ProcessChecker from "./components/ProcessChecker";
import PhasePath from "./components/PhasePath";
import Countdown from "./components/Countdown";
import TypingEffect from "./components/TypingEffect";

const SECTIONS = [
  { id: "hero", label: "Header" },
  { id: "find-your-build", label: "Four Builds" },
  { id: "the-shift", label: "It's a Hackathon" },
  { id: "how-the-day-flows", label: "The Rhythm" },
  { id: "what-you-walk-away-with", label: "The Payoff" },
  { id: "come-prepared", label: "Two Things to Bring" },
  { id: "where-you-fit", label: "Three-Layer Architecture" },
  { id: "beyond-close", label: "Something Bigger" },
];

export default function App() {
  const jumpToMain = () => {
    const el = document.getElementById("the-shift");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen Selection:bg-brand-primary/20 bg-brand-surface text-brand-ink relative">
      
      {/* Side Dot Progress Rail */}
      <ProgressRail sections={SECTIONS} />

      {/* 1 · HERO SECTION */}
      <header 
        className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-brand-line/45 bg-gradient-to-b from-[#EFF4FF] to-brand-surface" 
        id="hero"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow */}
          <span className="text-xs font-mono uppercase tracking-widest text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/25">
            SysAid Marketing · The 30th
          </span>

          {/* H1 Title Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-brand-ink mt-6 max-w-4xl mx-auto leading-tight md:leading-none">
            You're not here to <span className="text-brand-primary italic">use</span> AI. <br className="hidden sm:inline" />
            You're here to <TypingEffect phrases={["build with it.", "create with it.", "author with it."]} />
          </h1>

          {/* H1 Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans">
            One day. Your processes. The tools you already have. By the end, you'll have built something you'll actually use on Monday.
          </p>

          {/* Countdown timer component */}
          <Countdown />

          {/* Headline CTA triggers */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={jumpToMain}
              className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-deep text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 tracking-wide"
              aria-label="Begin learning about the paradigm shift"
            >
              <span>Explore The Shift</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
            <a 
              href="#come-prepared"
              className="px-6 py-3 bg-white hover:bg-gray-50 text-brand-ink text-xs font-bold rounded-xl border border-brand-line shadow-sm transition-all flex items-center gap-2"
              aria-label="Scroll immediately to pre-work checker"
            >
              <span>Run Pre-Work Checker</span>
            </a>
          </div>

          {/* First Meta Microline */}
          <div className="mt-12 text-[10px] font-mono tracking-wider text-gray-400 capitalize max-w-md mx-auto py-1 px-4 bg-white/40 border border-brand-line/50 rounded-full shadow-sm">
            🛡️ Everything you're looking at was built with the tools you'll use on the 30th.
          </div>

          {/* Signature 1: Hero Prompt to Output morph box */}
          <HeroMorph />

        </div>
      </header>

      {/* 2 · FOUR BUILDS */}
      <FindYourBuild />

      {/* 3 · IT'S A HACKATHON. YOU'LL BUILD, NOT WATCH */}
      <TheShift />

      {/* 4 · THE RHYTHM: BUILD, SHARE, BUILD */}
      <Timeline />

      {/* 5 · WHAT YOU'LL HAVE BY THE END OF THE DAY */}
      <CheckboxList />

      {/* 6 · TWO THINGS TO BRING. THAT'S IT */}
      <ProcessChecker />

      {/* 7 · THE THREE-LAYER ARCHITECTURE */}
      <WhereYouFit />

      {/* 8 · THIS IS DAY ONE OF SOMETHING BIGGER (BEYOND & CLOSE) */}
      <div 
        className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-[#EFF4FF] border-t border-brand-line/45 text-center" 
        id="beyond-close"
        role="complementary"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Heading H2 */}
          <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">
            The Roadmap Beyond
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-brand-ink mt-4 leading-tight">
            This is day one of something bigger.
          </h2>

          <p className="mt-6 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans">
            After the workshop: three weeks of <strong className="text-brand-ink font-bold">Playground</strong> — four hours a week, on the calendar, to experiment with no agenda. Then the <strong className="text-brand-ink font-bold">Hackathon</strong>, where we build the real agent families together. The point was never a tool. It's this: <span className="text-brand-primary font-semibold">to make sure you're the most valuable marketer in any room — a year from now, and the year after.</span>
          </p>

          {/* Phase dynamic path indicator */}
          <PhasePath />

          {/* Ultimate CTA */}
          <div className="mt-12 bg-white rounded-3xl p-6 md:p-10 border border-brand-line/60 shadow-xl max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-brand-primary to-brand-accent" />
            <h3 className="text-xl md:text-2xl font-black font-display tracking-tight text-brand-ink">
              See you on the 30th.
            </h3>
            <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-normal">
              Warm up is already happening. Join your colleagues on Slack and preview trial briefs before the session.
            </p>
            <div className="mt-6">
              <a
                href="https://slack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary-deep text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-102 cursor-pointer"
                aria-label="Direct join link for team slack channel"
              >
                <span>Join The Slack Channel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Second Meta Microline (Repeat) */}
          <div className="mt-12 text-[10px] font-mono tracking-wider text-gray-450 capitalize max-w-sm mx-auto py-1 px-4 bg-white/50 border border-brand-line/45 rounded-full shadow-sm">
            🔗 Built with the tools you'll use on the 30th.
          </div>

        </div>
      </div>

    </div>
  );
}
