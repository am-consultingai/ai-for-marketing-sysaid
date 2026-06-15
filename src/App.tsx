/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Sparkles, Send, ArrowDown, ExternalLink, ArrowRight, Linkedin } from "lucide-react";
import ProgressRail from "./components/ProgressRail";
import TheShift from "./components/TheShift";
import WhereYouFit from "./components/WhereYouFit";
import FindYourBuild from "./components/FindYourBuild";
import Timeline from "./components/Timeline";
import CheckboxList from "./components/CheckboxList";
import ProcessChecker from "./components/ProcessChecker";
import PhasePath from "./components/PhasePath";
import Countdown from "./components/Countdown";
import TypingEffect from "./components/TypingEffect";
import RobotExplosion from "./components/RobotExplosion";

const SECTIONS = [
  { id: "hero", label: "Header" },
  { id: "the-anatomy", label: "The Anatomy" },
  { id: "find-your-build", label: "Four Builds" },
  { id: "the-shift", label: "It's a Build Sprint" },
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

      {/* 0 · TOP LOGO BAR — AM Consulting × SysAid (always visible) */}
      <div className="w-full border-b border-brand-line/60 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="https://www.amconsultingai.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AM Consulting — Tech Strategy Made Easy"
              className="shrink-0 transition-opacity hover:opacity-80"
            >
              <img src="/am-logo.png" alt="AM Consulting" className="h-7 sm:h-9 w-auto" />
            </a>
            <span className="h-7 w-px bg-brand-line" aria-hidden="true" />
            <div className="flex items-center rounded-xl bg-brand-ink px-3 py-2 shadow-sm">
              <img src="/sysaid-logo.svg" alt="SysAid" className="h-5 sm:h-6 w-auto" />
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-brand-primary font-bold px-3 py-1.5 bg-brand-primary/10 rounded-full border border-brand-primary/25">
            For SysAid Employees
          </span>
        </div>
      </div>

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

        </div>
      </header>

      {/* 1.5 · THE ANATOMY OF AN AGENT (exploded robot) */}
      <RobotExplosion />

      {/* 2 · FOUR BUILDS */}
      <FindYourBuild />

      {/* 3 · IT'S A BUILD SPRINT. YOU'LL BUILD, NOT WATCH */}
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

      {/* 9 · YOUR FACILITATOR */}
      <section
        id="about"
        className="relative py-20 md:py-24 overflow-hidden bg-brand-ink text-white border-t border-brand-line/45"
        role="contentinfo"
      >
        {/* Decorative center line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative z-10">
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full border-2 border-brand-accent/40 p-2 mb-6 shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all hover:border-brand-accent/70 group">
              <img
                src="/avishay.png"
                alt="Avishay Meron"
                className="w-full h-full object-cover rounded-full bg-slate-800 grayscale transition-all group-hover:grayscale-0"
              />
            </div>
            <h3 className="text-2xl font-extrabold font-display mb-1">Avishay Meron</h3>
            <p className="text-slate-300 font-bold text-xs uppercase tracking-widest font-mono mb-6">CEO &amp; Founder, AM Consulting</p>
            <a
              href="https://www.linkedin.com/in/avishay-meron/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-all bg-white/5 border border-white/10 px-5 py-2.5 rounded-lg uppercase tracking-widest font-mono hover:bg-white/10"
            >
              <Linkedin className="w-4 h-4 text-brand-accent" />
              LinkedIn
            </a>
          </div>

          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 font-mono mb-4">Your Facilitator</div>

            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Avishay Meron has been "taming" Artificial Intelligence for over a decade, bringing rich and unique experience to the forefront of technology. As the CEO and Founder of AM Consulting, Avishay guides organizations through the adoption and implementation of AI solutions.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              With over 10 patents in the field of AI, he specializes in making complex AI concepts accessible to any audience, transforming technology into a practical everyday work partner.
            </p>
            <a
              href="mailto:office@amconsultingai.com?subject=Request%20for%20a%20tailored%20keynote/workshop&body=Hi%20AM%20Consulting%20team%2C%0A%0AI'd%20love%20to%20hop%20on%20a%20brief%20call%20to%20provide%20more%20context%20on%20my%20specific%20needs%20and%20explore%20potential%20collaboration.%0A%0ACould%20you%20please%20suggest%20three%20available%20time%20slots%20for%20a%20Zoom%20call%20sometime%20next%20week%3F%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"
              className="inline-flex items-center gap-2 text-brand-accent hover:text-white font-bold transition-all group text-sm tracking-wide"
            >
              Request a tailored keynote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Footer credit */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <a
            href="https://www.amconsultingai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
            aria-label="AM Consulting"
          >
            <img src="/am-logo.png" alt="AM Consulting" className="h-7 brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] font-mono">
            © 2026 AM Consulting Group
          </div>
        </div>
      </section>

    </div>
  );
}
