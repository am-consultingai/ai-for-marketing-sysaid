/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import type { ReactNode, ReactElement, ComponentType } from "react";
import { motion } from "motion/react";
import {
  Zap,
  AlignCenter,
  Workflow,
  Hammer,
  MonitorPlay,
  Coffee,
  Link2,
  Wrench,
  PlayCircle,
  Timer,
  Presentation,
  ArrowRight,
} from "lucide-react";

/**
 * A small, self-running "essence" animation for each agenda block, shown at the
 * top of the focused-detail card. Each scene is a looping SVG vignette that
 * captures the spirit of its segment (e.g. the Builder Mindset scene fires a
 * beam from one sub-process box to the next).
 *
 * Honors prefers-reduced-motion by falling back to a static lucide glyph.
 */

const PRIMARY = "#2F63FF";
const ACCENT = "#38BDF8";
const EMER = "#34d399";
const RED = "#f87171";
const TRACK = "#334155";
const DIM = "#475569";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  return reduced;
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full h-24 rounded-2xl bg-gray-900/50 border border-gray-800 overflow-hidden mb-5">
      {children}
    </div>
  );
}

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 300 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
    {children}
  </svg>
);

const loop = (duration: number, extra: Record<string, unknown> = {}) => ({
  duration,
  repeat: Infinity,
  ease: "easeInOut" as const,
  ...extra,
});

/* ── 1. Welcome — cold-open live build: a play pulse emitting rings ── */
function WelcomeScene() {
  return (
    <Svg>
      {[0, 1].map((i) => (
        <motion.circle
          key={i}
          cx={150}
          cy={45}
          fill="none"
          stroke={ACCENT}
          strokeWidth={1.5}
          initial={{ opacity: 0 }}
          animate={{ r: [14, 44], opacity: [0.7, 0] }}
          transition={loop(2.2, { delay: i * 1.1, ease: "easeOut" })}
        />
      ))}
      <motion.path
        d="M143 33 L143 57 L165 45 Z"
        fill={ACCENT}
        style={{ transformOrigin: "150px 45px" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={loop(2.2)}
      />
    </Svg>
  );
}

/* ── 2. Alignment — scattered bars snap onto a shared baseline ── */
function AlignmentScene() {
  const ys = [18, 52, 26, 58, 22];
  return (
    <Svg>
      <line x1={20} y1={52} x2={280} y2={52} stroke={DIM} strokeWidth={1} strokeDasharray="3 4" />
      {ys.map((y, i) => (
        <motion.rect
          key={i}
          x={36 + i * 48}
          width={24}
          height={14}
          rx={3}
          fill={i % 2 ? PRIMARY : ACCENT}
          animate={{ y: [y, 38, 38, y] }}
          transition={loop(3.2, { times: [0, 0.4, 0.78, 1] })}
        />
      ))}
    </Svg>
  );
}

/* ── 3. Builder Mindset — a beam fires from one sub-process to the next ── */
function BuilderMindsetScene() {
  const centers = [50, 150, 250];
  const boxes = centers.map((cx) => ({ x: cx - 30 }));
  // beam dwells in each box, then darts to the next
  const cxKeys = [50, 50, 150, 150, 250, 250];
  const cxTimes = [0, 0.12, 0.42, 0.54, 0.84, 1];
  // when each box is "hot" (beam present)
  const hotWindows = [
    [0, 0.16],
    [0.4, 0.56],
    [0.82, 1],
  ];
  return (
    <Svg>
      {/* static connectors */}
      <line x1={80} y1={45} x2={120} y2={45} stroke={TRACK} strokeWidth={2.5} />
      <line x1={180} y1={45} x2={220} y2={45} stroke={TRACK} strokeWidth={2.5} />
      {/* energized connectors as the beam crosses */}
      <motion.line
        x1={80}
        y1={45}
        x2={120}
        y2={45}
        stroke={ACCENT}
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={loop(3, { times: [0.12, 0.3, 0.42, 0.46] })}
      />
      <motion.line
        x1={180}
        y1={45}
        x2={220}
        y2={45}
        stroke={ACCENT}
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={loop(3, { times: [0.54, 0.72, 0.84, 0.88] })}
      />
      {/* sub-process boxes */}
      {boxes.map((b, i) => (
        <g key={i}>
          <motion.rect
            x={b.x}
            y={25}
            width={60}
            height={40}
            rx={9}
            fill="#0b1220"
            stroke={DIM}
            strokeWidth={1.5}
            animate={{
              stroke: [DIM, ACCENT, DIM],
              strokeWidth: [1.5, 2.5, 1.5],
            }}
            transition={loop(3, { times: [hotWindows[i][0], (hotWindows[i][0] + hotWindows[i][1]) / 2, hotWindows[i][1]] })}
          />
          <text
            x={centers[i]}
            y={49}
            textAnchor="middle"
            fontSize={11}
            fontFamily="ui-monospace, monospace"
            fill="#cbd5e1"
          >
            in→out
          </text>
        </g>
      ))}
      {/* the travelling beam (glow + core) */}
      <motion.circle
        cy={45}
        r={9}
        fill={ACCENT}
        opacity={0.25}
        animate={{ cx: cxKeys }}
        transition={loop(3, { times: cxTimes })}
      />
      <motion.circle
        cy={45}
        r={4}
        fill="#e0f2fe"
        animate={{ cx: cxKeys }}
        transition={loop(3, { times: cxTimes })}
      />
    </Svg>
  );
}

/* ── 4. Build Sprint 1 — manual first: pieces assemble bottom-up ── */
function AssembleScene() {
  const ys = [56, 40, 24];
  return (
    <Svg>
      {ys.map((y, i) => (
        <motion.rect
          key={i}
          x={113}
          y={y}
          width={74}
          height={13}
          rx={3}
          fill={i === ys.length - 1 ? ACCENT : PRIMARY}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scaleX: [0.5, 1, 1, 0.5] }}
          style={{ transformOrigin: "150px center" }}
          transition={loop(3, { times: [0, 0.2, 0.85, 1], delay: i * 0.35 })}
        />
      ))}
    </Svg>
  );
}

/* ── 5. Gallery Share — screens light up in turn ── */
function GalleryScene() {
  const xs = [36, 120, 204];
  return (
    <Svg>
      {xs.map((x, i) => (
        <g key={i}>
          <rect x={x} y={26} width={60} height={38} rx={5} fill="#0b1220" stroke={DIM} strokeWidth={1.5} />
          <motion.rect
            x={x + 5}
            y={31}
            width={50}
            height={28}
            rx={3}
            fill={ACCENT}
            animate={{ opacity: [0.12, 0.12, 0.85, 0.12] }}
            transition={loop(3.6, { times: [0, i * 0.28, i * 0.28 + 0.12, 1] })}
          />
        </g>
      ))}
    </Svg>
  );
}

/* ── 6. Coffee & Tinker Break — a cup with rising steam ── */
function CoffeeScene() {
  return (
    <Svg>
      {[126, 150, 174].map((x, i) => (
        <motion.path
          key={i}
          d={`M${x} 40 q -6 -7 0 -14 q 6 -7 0 -14`}
          fill="none"
          stroke={ACCENT}
          strokeWidth={2}
          strokeLinecap="round"
          animate={{ opacity: [0, 0.8, 0], y: [4, -8, -16] }}
          transition={loop(2.4, { delay: i * 0.4, ease: "easeOut" })}
        />
      ))}
      <path d="M120 44 h60 v14 a14 14 0 0 1 -14 14 h-32 a14 14 0 0 1 -14 -14 Z" fill={PRIMARY} />
      <path d="M180 48 h8 a9 9 0 0 1 0 18 h-4" fill="none" stroke={PRIMARY} strokeWidth={3} />
    </Svg>
  );
}

/* ── 7. Build Sprint 2 — two chain links close and a pulse crosses ── */
function ChainScene() {
  return (
    <Svg>
      <line x1={40} y1={45} x2={260} y2={45} stroke={TRACK} strokeWidth={2} />
      <motion.g
        animate={{ x: [-26, 0, 0, -26] }}
        transition={loop(3, { times: [0, 0.35, 0.8, 1] })}
      >
        <rect x={108} y={31} width={42} height={28} rx={14} fill="none" stroke={ACCENT} strokeWidth={4} />
      </motion.g>
      <motion.g
        animate={{ x: [26, 0, 0, 26] }}
        transition={loop(3, { times: [0, 0.35, 0.8, 1] })}
      >
        <rect x={150} y={31} width={42} height={28} rx={14} fill="none" stroke={PRIMARY} strokeWidth={4} />
      </motion.g>
      <motion.circle
        cy={45}
        r={4}
        fill="#e0f2fe"
        animate={{ cx: [60, 240], opacity: [0, 1, 1, 0] }}
        transition={loop(3, { times: [0.4, 0.55, 0.85, 0.95] })}
      />
    </Svg>
  );
}

/* ── 8. Unblock Clinic — a blocker is cleared and flow resumes ── */
function UnblockScene() {
  return (
    <Svg>
      <line x1={36} y1={45} x2={264} y2={45} stroke={TRACK} strokeWidth={2.5} />
      {/* the blocker */}
      <motion.g
        style={{ transformOrigin: "150px 45px" }}
        animate={{ rotate: [0, -8, 8, -8, 0, 0], scale: [1, 1, 1, 1, 0, 0], opacity: [1, 1, 1, 1, 0, 0] }}
        transition={loop(3, { times: [0, 0.12, 0.18, 0.24, 0.36, 1] })}
      >
        <rect x={138} y={33} width={24} height={24} rx={4} fill={RED} />
      </motion.g>
      {/* travelling dot, green once through */}
      <motion.circle
        cy={45}
        r={5}
        animate={{ cx: [40, 132, 132, 264], fill: [PRIMARY, PRIMARY, EMER, EMER] }}
        transition={loop(3, { times: [0, 0.3, 0.42, 0.9] })}
      />
    </Svg>
  );
}

/* ── 9. Build Sprint 3 — a clean run: progress fills, check pops ── */
function RunScene() {
  return (
    <Svg>
      <rect x={50} y={40} width={160} height={11} rx={5.5} fill="#0b1220" stroke={DIM} strokeWidth={1} />
      <motion.rect
        x={50}
        y={40}
        height={11}
        rx={5.5}
        fill={EMER}
        animate={{ width: [0, 160, 160, 0] }}
        transition={loop(3, { times: [0, 0.55, 0.9, 1] })}
      />
      <motion.path
        d="M226 45 l5 6 l10 -13"
        fill="none"
        stroke={EMER}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
        transition={loop(3, { times: [0, 0.55, 0.72, 0.9, 1] })}
      />
    </Svg>
  );
}

/* ── 10. Presentation Prep — a 4-minute timer ring drains ── */
function PrepScene() {
  const R = 26;
  const C = 2 * Math.PI * R;
  return (
    <Svg>
      <circle cx={150} cy={45} r={R} fill="none" stroke={DIM} strokeWidth={5} />
      <motion.circle
        cx={150}
        cy={45}
        r={R}
        fill="none"
        stroke={ACCENT}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={C}
        transform="rotate(-90 150 45)"
        animate={{ strokeDashoffset: [0, C] }}
        transition={loop(4, { ease: "linear" })}
      />
      <text x={150} y={49} textAnchor="middle" fontSize={13} fontFamily="ui-monospace, monospace" fill="#e2e8f0" fontWeight="700">
        4:00
      </text>
    </Svg>
  );
}

/* ── 11. Final Presentations — a stage spotlight sweeps, LIVE blinks ── */
function PresentScene() {
  return (
    <Svg>
      <line x1={40} y1={74} x2={260} y2={74} stroke={DIM} strokeWidth={2} />
      <motion.polygon
        points="150,12 120,72 180,72"
        fill={ACCENT}
        opacity={0.18}
        style={{ transformOrigin: "150px 12px" }}
        animate={{ rotate: [-22, 22, -22] }}
        transition={loop(3.4)}
      />
      <circle cx={150} cy={66} r={6} fill={ACCENT} />
      <motion.circle
        cx={246}
        cy={20}
        r={5}
        fill={RED}
        animate={{ opacity: [1, 0.2, 1] }}
        transition={loop(1.4)}
      />
    </Svg>
  );
}

/* ── 12. Wrap & What's Next — a pulse advances to the next phase ── */
function NextScene() {
  const xs = [60, 120, 180, 240];
  return (
    <Svg>
      <line x1={60} y1={45} x2={240} y2={45} stroke={TRACK} strokeWidth={2} />
      {xs.map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={45}
          r={i === xs.length - 1 ? 9 : 6}
          fill={i === xs.length - 1 ? ACCENT : "#0b1220"}
          stroke={i === xs.length - 1 ? ACCENT : DIM}
          strokeWidth={2}
          animate={i === xs.length - 1 ? { opacity: [0.5, 1, 0.5], r: [8, 10, 8] } : {}}
          transition={i === xs.length - 1 ? loop(1.6) : undefined}
        />
      ))}
      <motion.circle
        cy={45}
        r={4}
        fill="#e0f2fe"
        animate={{ cx: [60, 240], opacity: [0, 1, 1, 0] }}
        transition={loop(2.6, { times: [0, 0.1, 0.85, 1], ease: "easeInOut" })}
      />
    </Svg>
  );
}

const SCENES: Record<string, () => ReactElement> = {
  welcome: WelcomeScene,
  alignment: AlignmentScene,
  teams: BuilderMindsetScene,
  sprint1: AssembleScene,
  gallery1: GalleryScene,
  lunch: CoffeeScene,
  sprint2: ChainScene,
  clinic: UnblockScene,
  sprint3: RunScene,
  prep: PrepScene,
  presentations: PresentScene,
  close: NextScene,
};

const STATIC_ICON: Record<string, ComponentType<{ className?: string }>> = {
  welcome: Zap,
  alignment: AlignCenter,
  teams: Workflow,
  sprint1: Hammer,
  gallery1: MonitorPlay,
  lunch: Coffee,
  sprint2: Link2,
  clinic: Wrench,
  sprint3: PlayCircle,
  prep: Timer,
  presentations: Presentation,
  close: ArrowRight,
};

export default function AgendaAnimation({ blockId }: { blockId: string }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    const Icon = STATIC_ICON[blockId] ?? Workflow;
    return (
      <Frame>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-8 h-8 text-brand-accent" />
        </div>
      </Frame>
    );
  }

  const Scene = SCENES[blockId] ?? BuilderMindsetScene;
  // key remounts the scene when the selected block changes, restarting the loop
  return (
    <Frame>
      <Scene key={blockId} />
    </Frame>
  );
}
