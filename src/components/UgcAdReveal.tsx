/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Zap, ExternalLink, Play } from "lucide-react";
import { motion } from "motion/react";

const MAKEUGC_URL = "https://makeugc.ai/";

/**
 * PROTOTYPE assets — hotlinked from makeugc.ai's CloudFront.
 * Replace with our own licensed vertical (9:16) clips in /public before shipping.
 */
const CLIPS = [1, 2, 3, 4, 5, 6].map(
  (n) => `https://d2j3503r68l9dj.cloudfront.net/assets/videos-compressed/image-hero-loop-${n}_mp4.mp4`
);

const PROMPT =
  'Make a UGC ad for SysAid DeX → IT leaders, "time-saved" angle. Generate 6 on-brand variants.';

type Phase = "type" | "beam" | "reveal";

/**
 * A self-running signature demo: a prompt is typed, a beam fires, and it zaps
 * to a row of finished UGC video variants. Loops continuously.
 */
export default function UgcAdReveal() {
  const [phase, setPhase] = useState<Phase>("type");
  const [typed, setTyped] = useState("");
  const [reduced, setReduced] = useState(false);

  // Honor reduced-motion: skip straight to the revealed end state.
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);

  // 1 · Type the prompt
  useEffect(() => {
    if (reduced) {
      setTyped(PROMPT);
      setPhase("reveal");
      return;
    }
    if (phase !== "type") return;
    setTyped("");
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setTyped(PROMPT.slice(0, i));
      if (i >= PROMPT.length) {
        window.clearInterval(id);
        window.setTimeout(() => setPhase("beam"), 450);
      }
    }, 32);
    return () => window.clearInterval(id);
  }, [phase, reduced]);

  // 2 · Fire the beam, then 3 · zap to the videos
  useEffect(() => {
    if (reduced || phase !== "beam") return;
    const t = window.setTimeout(() => setPhase("reveal"), 1100);
    return () => window.clearTimeout(t);
  }, [phase, reduced]);

  // 4 · Hold on the result, then loop
  useEffect(() => {
    if (reduced || phase !== "reveal") return;
    const t = window.setTimeout(() => setPhase("type"), 4800);
    return () => window.clearTimeout(t);
  }, [phase, reduced]);

  const beamActive = phase === "beam";
  const revealed = phase === "reveal";

  return (
    <div className="mt-16 pt-12 border-t border-brand-line/50">
      <style>{`
        @keyframes ugcBeamTravel { 0% { transform: translateY(-120%); } 100% { transform: translateY(420%); } }
        .animate-ugc-beam { animation: ugcBeamTravel 0.7s linear infinite; }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">
            Live Signature Demo
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-brand-ink mt-4">
            One prompt → a beam → six on-brand variants.
          </h3>
        </div>

        {/* 1 · Prompt terminal */}
        <div className="max-w-2xl mx-auto">
          <div
            className={`bg-gray-900 rounded-2xl p-4 md:p-5 border shadow-xl transition-colors duration-300 ${
              beamActive ? "border-brand-primary" : "border-gray-800"
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800 text-[11px] font-mono text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2">claude · creative-engine.skill</span>
              </div>
              <span className="bg-brand-primary/20 text-brand-accent px-2 py-0.5 rounded border border-brand-primary/40 font-semibold uppercase tracking-widest text-[9px]">
                UGC AGENT
              </span>
            </div>
            <div className="font-mono text-xs md:text-sm text-gray-100 leading-relaxed min-h-[44px]">
              <span className="text-brand-accent">&gt; </span>
              {typed}
              {phase === "type" && (
                <span className="animate-pulse font-bold text-brand-primary">▌</span>
              )}
            </div>
          </div>
        </div>

        {/* 2 · Beam connector */}
        <div className="relative h-16 flex items-center justify-center">
          <div className="w-[3px] h-full bg-gradient-to-b from-brand-primary/30 via-brand-primary/20 to-brand-accent/10 rounded-full relative overflow-hidden">
            {beamActive && (
              <div className="absolute inset-x-0 top-0 h-7 bg-brand-accent rounded-full blur-[2px] animate-ugc-beam" />
            )}
          </div>
          <div
            className={`absolute rounded-full p-2 border transition-all duration-300 ${
              beamActive
                ? "bg-brand-primary text-white border-brand-primary scale-110 shadow-lg shadow-brand-primary/30"
                : revealed
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-gray-100 text-gray-400 border-gray-200"
            }`}
          >
            <Zap className={`w-4 h-4 ${beamActive ? "fill-white" : ""}`} />
            {beamActive && (
              <span className="absolute inset-0 rounded-full border-2 border-brand-primary/40 animate-ping" />
            )}
          </div>
        </div>

        {/* 3 · The videos — zapped into view */}
        <div className="relative">
          {/* zap flash */}
          {revealed && !reduced && (
            <motion.div
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute inset-0 z-10 bg-white rounded-2xl"
            />
          )}

          <div className="flex gap-2.5 md:gap-3 justify-start md:justify-center overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            {CLIPS.map((src, i) => (
              <motion.div
                key={src}
                initial={false}
                animate={
                  revealed
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0.15, y: 14, filter: "blur(6px)" }
                }
                transition={{ duration: 0.28, delay: revealed ? i * 0.06 : 0 }}
                className="group relative w-[82px] sm:w-[96px] aspect-[9/16] rounded-xl overflow-hidden border border-brand-primary/40 bg-black shrink-0 shadow-lg"
                aria-label={`UGC variant ${i + 1} — generated with makeugc.ai`}
              >
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40" />
                {/* variant index */}
                <span className="absolute top-1.5 left-1.5 text-[8px] font-mono font-bold text-white bg-black/55 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                  V{i + 1}
                </span>
                {/* makeugc.ai attribution badge (label only — not a link) */}
                <span className="absolute bottom-1.5 inset-x-1.5 flex items-center justify-center text-[7px] font-mono font-bold text-white bg-black/55 px-1.5 py-0.5 rounded-full text-center backdrop-blur-sm">
                  makeugc.ai
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Attribution line — only "makeugc.ai" is a link */}
        <div className="text-center mt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500">
            <Play className="w-3 h-3" />
            <span>
              Sample ad creatives generated with{" "}
              <a
                href={MAKEUGC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand-primary hover:underline inline-flex items-center gap-0.5"
              >
                makeugc.ai
                <ExternalLink className="w-3 h-3" />
              </a>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
