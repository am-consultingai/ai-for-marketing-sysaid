/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ *
 * 2D exploded robot — agent = robot, skills = its parts.
 * Flat PNG layers (pre-rendered front view, in /public/layers) are
 * stacked and slid apart along an even radial ring. Pure SVG + a tiny
 * requestAnimationFrame loop — no animation library, no 3D.
 * ------------------------------------------------------------------ */

const W = 1100;
const H = 1400;
const CENTER: [number, number] = [550, 700];
const MX = 560; // horizontal viewBox margin — labels fan out widest to the sides
const MY = 190; // vertical viewBox margin — tight, trims the dead bands top & bottom
const R = 600; // ring radius the parts explode out to
const STAGGER = 0.32;
const LABEL_CLEAR = 215;
const k = 0.7071;

// even radial layout (clock positions) — echoes anatomy: head up,
// arms upper, hands sides, legs lower, torso bottom
const RING_DIR: Record<string, [number, number]> = {
  head: [0, -1],
  armL: [k, -k],
  handL: [1, 0],
  legL: [k, k],
  torso: [0, 1],
  legR: [-k, k],
  handR: [-1, 0],
  armR: [-k, -k],
};

type Part = {
  key: string;
  label: string;
  color: string;
  cell: [number, number];
  dir: [number, number];
  file: string;
  delay: number;
};

// paint order (back-to-front); head drawn last so it sits on top
const RAW: Omit<Part, "dir" | "delay">[] = [
  { key: "legL", label: "Language", color: "#d65b96", cell: [708, 1104], file: "/layers/legL.png" },
  { key: "legR", label: "Planning", color: "#c8902f", cell: [370, 1104], file: "/layers/legR.png" },
  { key: "torso", label: "Memory", color: "#9b5fd6", cell: [541, 748], file: "/layers/torso.png" },
  { key: "armL", label: "Tool Use", color: "#2fa87b", cell: [734, 762], file: "/layers/armL.png" },
  { key: "armR", label: "Web Search", color: "#2f7fd6", cell: [339, 754], file: "/layers/armR.png" },
  { key: "handL", label: "Code Exec", color: "#6fa520", cell: [850, 996], file: "/layers/handL.png" },
  { key: "handR", label: "Vision", color: "#2fa3c0", cell: [248, 1022], file: "/layers/handR.png" },
  { key: "head", label: "Reasoning", color: "#e0562c", cell: [528, 353], file: "/layers/head.png" },
];

// assign ring direction + a cascade delay (closer to centre leaves first)
const PARTS: Part[] = (() => {
  const withDir = RAW.map((p) => ({ ...p, dir: RING_DIR[p.key] || [0, -1] }));
  const order = [...withDir]
    .map((p, i) => ({ i, d: Math.hypot(p.cell[0] - CENTER[0], p.cell[1] - CENTER[1]) }))
    .sort((a, b) => a.d - b.d);
  const delays: Record<number, number> = {};
  order.forEach((o, rank) => (delays[o.i] = (rank / (order.length - 1)) * STAGGER));
  return withDir.map((p, i) => ({ ...p, delay: delays[i] }));
})();

const smoother = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
// power2.inOut, matching the original timeline feel
const inOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

// loop timeline -> overall explosion progress t in [0,1]
const LOOP = 5.6;
function progressAt(time: number) {
  const u = time % LOOP;
  if (u < 0.9) return 0; // hold assembled
  if (u < 2.5) return inOut((u - 0.9) / 1.6); // explode
  if (u < 4.0) return 1; // hold apart
  return 1 - inOut((u - 4.0) / 1.6); // reassemble
}

export default function RobotExplosion() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRefs = useRef<(SVGGElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const labelRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let clock = 0;
    let last = performance.now();
    let visible = true;

    const apply = (t: number) => {
      PARTS.forEach((g, i) => {
        const e = smoother(clamp01((t - g.delay) / (1 - STAGGER)));
        const tgX = CENTER[0] + g.dir[0] * R;
        const tgY = CENTER[1] + g.dir[1] * R;
        const tx = (tgX - g.cell[0]) * e;
        const ty = (tgY - g.cell[1]) * e;

        const img = imgRefs.current[i];
        if (img) img.setAttribute("transform", `translate(${tx.toFixed(2)} ${ty.toFixed(2)})`);

        const line = lineRefs.current[i];
        if (line) {
          line.setAttribute("x2", (g.cell[0] + tx).toFixed(2));
          line.setAttribute("y2", (g.cell[1] + ty).toFixed(2));
          line.style.opacity = (e * 0.45).toFixed(3);
        }
        const lab = labelRefs.current[i];
        if (lab) {
          lab.setAttribute(
            "transform",
            `translate(${(tx + g.dir[0] * LABEL_CLEAR).toFixed(2)} ${(ty + g.dir[1] * LABEL_CLEAR).toFixed(2)})`
          );
          lab.style.opacity = clamp01((e - 0.45) / 0.4).toFixed(3);
        }
      });
    };

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (visible) clock += Math.min(dt, 0.05); // advance only when on screen
      apply(progressAt(clock));
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    apply(0);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="the-anatomy"
      className="relative overflow-hidden py-6 md:py-8 border-b border-brand-line/45 bg-gradient-to-b from-[#EFF4FF] to-brand-surface"
      aria-labelledby="the-anatomy-title"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow */}
        <span className="text-xs font-mono uppercase tracking-widest text-brand-primary font-bold px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/25">
          The Anatomy
        </span>

        {/* Section title */}
        <h2
          id="the-anatomy-title"
          className="text-2xl md:text-4xl font-extrabold font-display tracking-tight text-brand-ink mt-4 leading-tight"
        >
          One agent. <span className="text-brand-primary">Many skills.</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans">
          An agent is a robot built from composable skills. Are you ready to build yours?
        </p>

        {/* The exploded robot */}
        <div className="mt-3 mx-auto max-w-xl">
          <svg
            viewBox={`${-MX} ${-MY} ${W + 2 * MX} ${H + 2 * MY}`}
            preserveAspectRatio="xMidYMid meet"
            className="block w-full h-auto"
            role="img"
            aria-label="A robot agent exploding into eight labelled skill modules"
          >
            <defs>
              <filter id="re-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#0B1E3A" floodOpacity="0.28" />
              </filter>
            </defs>

            {/* leader lines: core -> part */}
            {PARTS.map((g, i) => (
              <line
                key={"l" + g.key}
                ref={(el) => (lineRefs.current[i] = el)}
                x1={CENTER[0]}
                y1={CENTER[1]}
                x2={g.cell[0]}
                y2={g.cell[1]}
                stroke={g.color}
                strokeWidth="4"
                strokeDasharray="4 12"
                strokeLinecap="round"
                style={{ opacity: 0 }}
              />
            ))}

            {/* flat image layers */}
            {PARTS.map((g, i) => (
              <g key={"i" + g.key} ref={(el) => (imgRefs.current[i] = el)} filter="url(#re-shadow)">
                <image href={g.file} x="0" y="0" width={W} height={H} />
              </g>
            ))}

            {/* labels */}
            {PARTS.map((g, i) => {
              const anchor = g.dir[0] < -0.25 ? "end" : g.dir[0] > 0.25 ? "start" : "middle";
              const dotDX = anchor === "end" ? 22 : anchor === "start" ? -22 : 0;
              return (
                <g key={"t" + g.key} ref={(el) => (labelRefs.current[i] = el)} style={{ opacity: 0 }}>
                  <g transform={`translate(${g.cell[0]} ${g.cell[1]})`}>
                    <circle cx={dotDX} cy="-17" r="12" fill={g.color} />
                    <text
                      x="0"
                      y="0"
                      textAnchor={anchor}
                      fontFamily="var(--font-display, sans-serif)"
                      fontSize="58"
                      fontWeight="700"
                      fill="#0B1E3A"
                      stroke="#FBFDFF"
                      strokeWidth="8"
                      paintOrder="stroke"
                    >
                      {g.label}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
