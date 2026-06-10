/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Slack } from "lucide-react";

export default function ProcessChecker() {
  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-b from-brand-surface to-white border-b border-brand-line/45" 
      id="come-prepared"
      aria-labelledby="come-prepared-h2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Segment */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">The Pre-Work Homework</span>
          <h2 id="come-prepared-h2" className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-brand-ink mt-4 leading-tight">
            Two things to bring. That's it.
          </h2>
        </div>

        {/* The Two Core Requirements Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
          
          {/* Item 1 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-line/60 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary/30" />
            <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center font-bold font-mono text-sm mb-4">
              1
            </div>
            <h3 className="text-lg font-bold font-display text-brand-ink">
              Two or three processes you do by hand.
            </h3>
            <p className="text-xs text-brand-primary font-mono mt-1 font-semibold uppercase tracking-wider">
              Repetitive Campaign Task
            </p>
            <p className="text-sm text-gray-500 font-sans leading-relaxed mt-3">
              Anything repetitive: how you build a campaign brief, qualify a lead, write a recap. Don't think "AI." Think <strong className="text-brand-ink font-semibold">"the steps I take — A, then B, then C."</strong>
            </p>
          </div>

          {/* Item 2 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-brand-line/60 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary/30" />
            <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center font-bold font-mono text-sm mb-4">
              2
            </div>
            <h3 className="text-lg font-bold font-display text-brand-ink">
              One real input to build on.
            </h3>
            <p className="text-xs text-brand-primary font-mono mt-1 font-semibold uppercase tracking-wider">
              Actual Fuel Asset
            </p>
            <p className="text-sm text-gray-500 font-sans leading-relaxed mt-3">
              A real campaign brief, a Zoom call recording, a webinar transcript, last month's raw performance numbers, or similar outputs. Having real data ensures your automated skill launches with high-quality performance.
            </p>
          </div>

        </div>

        {/* Secondary requirements callout strip */}
        <div className="max-w-3xl mx-auto bg-brand-ink text-white p-6 rounded-2xl border border-gray-800 text-center flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-left">
            <span className="text-[9px] font-mono bg-brand-primary/20 text-brand-accent px-2 py-0.5 rounded font-bold uppercase tracking-widest border border-brand-primary/40">
              System Verification Setup
            </span>
            <p className="text-sm font-sans text-gray-200 mt-1.5 leading-snug">
              Make sure Claude is your default and your connectors are active.
            </p>
          </div>
          <a
            href="https://slack.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#4A154B] text-white hover:bg-[#3F1240] rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-102 cursor-pointer shrink-0"
            aria-label="Connect to workspace Slack channel"
          >
            <Slack className="w-4 h-4 fill-white text-white" />
            <span>Join #ai-workshop Warmup</span>
          </a>
        </div>

      </div>
    </section>
  );
}
