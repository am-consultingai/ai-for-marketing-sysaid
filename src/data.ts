/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Role, Layer, Project, AgendaBlock, ProcessCheckerExample, RoleId } from "./types";

export const ROLES: Role[] = [
  { id: "demand-gen", label: "Demand Gen" },
  { id: "sdr-bdr", label: "SDR/BDR" },
  { id: "content", label: "Content" },
  { id: "social", label: "Social" },
  { id: "pr-ar", label: "PR/AR" },
  { id: "events", label: "Events" },
  { id: "design", label: "Design" },
  { id: "web-email", label: "Web/Email" },
  { id: "influencer", label: "Influencer" },
  { id: "product-marketing", label: "Product Marketing" },
];

export const LAYERS: Layer[] = [
  {
    id: "lake",
    title: "Content Lake",
    subtitle: "The Foundation",
    description: "Everything that makes our marketing ours: our narratives, messaging, brand guidelines, and assets. The single source of truth every asset is built from.",
    roles: ["content", "design", "product-marketing"],
    whatYouDo: {
      "demand-gen": "Extracts winning performance patterns and feeds them back as rules.",
      "sdr-bdr": "Contributes raw feedback from prospect calls directly to client profiling guides.",
      "content": "Owns the core narratives, voice standards, and content blueprints inside the Lake.",
      "social": "Curates user-generated content signals and trends to enrich the creative assets.",
      "pr-ar": "Maintains key industry proof points, brand storylines, and messaging pillars.",
      "events": "Prepares presentation outlines, keynote logs, and speaker scripts.",
      "design": "Feeds design systems, templates, and high-fidelity assets to fuel visual outputs.",
      "web-email": "Maintains structural landing page guidelines and brand schemas.",
      "influencer": "Feeds brand alignment parameters and creator guidelines.",
      "product-marketing": "Maintains persona matrices, battlecards, and product positioning modules.",
    },
  },
  {
    id: "agent",
    title: "Agentic Layer",
    subtitle: "The Engine",
    description: "A functional team of AI agents that create, repurpose, and distribute marketing materials dynamically by running the processes you will author.",
    roles: ["demand-gen", "content", "social", "events", "influencer"],
    whatYouDo: {
      "demand-gen": "Builds and deploys analytical narrative agents and hook matrices.",
      "sdr-bdr": "Runs Account Intel and messaging matchers to map client profiles to campaigns.",
      "content": "Authors scripts, repurposing recipes, outlines, and cross-channel rewrite frameworks.",
      "social": "Controls hook variants generators and UGC script formats.",
      "pr-ar": "Deploys repurposing models to generate briefings and channel-specific summaries.",
      "events": "Configures webinar transcript summary tools and follow-up sequences.",
      "design": "Sets prompts and layout templates for the Creative Engine formats.",
      "web-email": "Configures automated readouts and live performance dashboards.",
      "influencer": "Authors prompt formulas for specific creator brief variants.",
      "product-marketing": "Maintains account-level custom messaging matching agents.",
    },
  },
  {
    id: "activation",
    title: "Activation",
    subtitle: "The Deliverable",
    description: "You, running real-world campaign experiments, pushing outputs live, and feeding back what works to keep our entire system smart and aligned.",
    roles: ["demand-gen", "sdr-bdr", "social", "pr-ar", "web-email", "product-marketing"],
    whatYouDo: {
      "demand-gen": "Launches UGC campaigns, checks live ROI, and optimizes hook performance.",
      "sdr-bdr": "Sends hyper-tailored email sequences directly to key account prospects.",
      "content": "Distributes multi-channel collateral across blog platforms and client funnels.",
      "social": "Publishes hook variations and manages social interaction signals.",
      "pr-ar": "Pushes on-brand outreach packets to analysts and media publications.",
      "events": "Funnels package deliverables directly to registered attendees.",
      "design": "Monitors creative performance and polishes live high-value UI templates.",
      "web-email": "Launches and updates interactive performance readouts and funnels.",
      "influencer": "Coordinates video creatives with external influencer partners.",
      "product-marketing": "Reviews tailored battlecards and adjusts real-world sales pitches.",
    },
  },
];

export const PROJECTS: Project[] = [
  {
    id: "creative-engine",
    name: "Creative Engine",
    emoji: "🎬",
    subtitle: "Turn a campaign brief into ready-to-shoot video creative in minutes.",
    forYou: "Demand Gen, Social, Influencer, Content, Design.",
    roles: ["demand-gen", "social", "influencer", "content", "design"],
    chain: [
      { stepNumber: 1, name: "Brief Intake & Angle Extraction", input: "Raw campaign brief + brand voice guidelines", output: "Structured brief with specific personas, main pain points, 3 distinct creative angles, and CTAs" },
      { stepNumber: 2, name: "Script Generation", input: "Structured brief from Step 1", output: "3 distinct UGC video script options (~20s duration each) matching angles" },
      { stepNumber: 3, name: "Hook Multiplication", input: "Selected UGC script option", output: "5 alternative high-converting opening hooks for multi-variant A/B testing" },
      { stepNumber: 4, name: "Format-for-Tool", input: "Final script + hook variations", output: "Make-UGC ready document (line/scene breakdown, visual notes, voice directions)" },
      { stepNumber: 5, name: "Generate & Polish", input: "Formatted script document", output: "Finished high-converting UGC video variants on brand" },
    ],
    payoff: "A $10k, month-long vendor video — done in 15 minutes, on brand, with variants to test.",
    tools: ["Claude", "Make UGC", "Opus", "Figma"],
  },
  {
    id: "repurposing-machine",
    name: "Repurposing Machine",
    emoji: "♻️",
    subtitle: "Drop in one asset. Walk out with a week of channel-native content.",
    forYou: "Content, PR, Events, AR, Social, BDR enablement.",
    roles: ["content", "pr-ar", "events", "social", "sdr-bdr"],
    chain: [
      { stepNumber: 1, name: "Source Intake & Clean-up", input: "Webinar video / Gong sales call / blog post transcript", output: "Cleaned transcript, removed filler words, added session metadata" },
      { stepNumber: 2, name: "Insight Extraction", input: "Cleaned source transcript", output: "Structured outline: high-value quote logs, key insights, raw metrics, narrative arcs" },
      { stepNumber: 3, name: "Channel Fan-out", input: "Insight outline + channel blueprint templates", output: "Pre-polished drafts: LinkedIn posts, X threads, customer newsletters, campaign blurbs" },
      { stepNumber: 4, name: "On-Brand Pass", input: "Raw channel-specific drafts + brand voice parameters", output: "Polished, on-brand, channel-native assets tailored for target audience" },
      { stepNumber: 5, name: "Package & Route", input: "Tuned brand assets", output: "Organized files automatically populated into Asana, Google Docs, or Slack" },
    ],
    payoff: "One webinar → a LinkedIn post, an X thread, a nurture email, a one-pager, and a blurb. Every time.",
    tools: ["Claude", "Asana", "Google Docs", "Slack", "Zoom", "Gong"],
  },
  {
    id: "account-intelligence",
    name: "Account & Customer Intelligence",
    emoji: "🎯",
    subtitle: "Turn one sales call into a tailored outreach kit — and a customer story.",
    forYou: "SDR/BDR, ABM, PR/AR, Product Marketing.",
    roles: ["sdr-bdr", "demand-gen", "pr-ar", "product-marketing"],
    chain: [
      { stepNumber: 1, name: "Signal Extraction", input: "Gong call / notes + Salesforce context", output: "Comprehensive account profile: pain points, signals, objections, key stakeholders" },
      { stepNumber: 2, name: "Message Matching", input: "Account profile + core messaging library", output: "Matched custom value propositions + supporting data proof points" },
      { stepNumber: 3, name: "Outreach Build", input: "Matched messaging + profile variables", output: "Hyper-personalized 3-email sequence draft + specific caller prep summary" },
      { stepNumber: 4, name: "Story-Angle Harvest", input: "Account profile + call quote logs", output: "Case-study outline, problem-solution narrative, and direct marketer quotes" },
      { stepNumber: 5, name: "Personalize & Review", input: "Sequence drafts + story template", output: "Human-tuned, production-ready sales outreach kit + marketing customer story seed" },
    ],
    payoff: "Hours of prospect prep down to minutes — and marketing gets a story from the same call.",
    tools: ["Claude", "Gong", "Salesforce", "Slack", "Google Workspace"],
  },
  {
    id: "performance-narrator",
    name: "Performance Narrator",
    emoji: "📊",
    subtitle: "Turn a messy export into a clear story of what worked — and a live dashboard.",
    forYou: "Demand Gen, Web/Email, Ops, anyone who loves data.",
    roles: ["demand-gen", "web-email"],
    chain: [
      { stepNumber: 1, name: "Data Intake & Normalization", input: "Campaign exports (GA, Mixpanel, CSV)", output: "Standardized, clean campaign performance dataset" },
      { stepNumber: 2, name: "Insight Extraction", input: "Cleaned dataset + core goals & benchmarks", output: "Statistical findings: winning creative, underperforming assets, anomalies" },
      { stepNumber: 3, name: "Narrative Generation", input: "Statistical findings log", output: "Exec read-out draft: TL;DR, top wins, top losses, immediate actions list" },
      { stepNumber: 4, name: "Dashboard Build", input: "Cleaned dataset + insights", output: "Interactive web analytics dashboard showing key visual charts" },
      { stepNumber: 5, name: "Feedback-Loop Note", input: "Insight readout summary", output: "Structured update package (winning hooks, messaging shifts) to guide Content Lake" },
    ],
    payoff: "A day of reporting becomes minutes — and the wins flow back into our messaging.",
    tools: ["Claude", "Google Analytics", "Mixpanel", "Windsor AI", "Recharts"],
  },
];

export const AGENDA: AgendaBlock[] = [
  { id: "welcome", time: "13:00 - 13:15", name: "Welcome & Cold-Open Live Build", duration: 15, type: "passive", description: "5-minute jaw-drop build, no slides; the $10k → 15min story of an automated UGC creative campaign.", details: ["Gaston (CMO) sets the high workshop stakes", "Avishay (AM Consulting) runs a live build showing a raw brief turning into script, hooks & formatted drafts", "No boring slides – just pure demonstration of workflow agency"] },
  { id: "alignment", time: "13:15 - 13:35", name: "Alignment Sprint", duration: 20, type: "passive", description: "Just-enough terminology (skill vs. connector vs. agent) and deep-dive into the Content Lake concept.", details: ["Demystifying terms: understanding process automation over code", "Learning the 5 core workshop guidelines", "Introducing SysAid's three-layer marketing machine"] },
  { id: "teams", time: "13:35 - 13:50", name: "Challenge Brief & Team Formation", duration: 15, type: "active", description: "Choosing projects, forming small multi-discipline groups, and getting paired with a floating champion mentor.", details: ["Review the 4 core workflow builders on cards", "Forming teams of 3-4 mixed disciplines (e.g. Content + Design + BDR)", "Assigning floating expert champions to teams"] },
  { id: "sprint1", time: "13:50 - 15:25", name: "Build Sprint 1: Manual First", duration: 95, type: "active", description: "Deconstructing your chosen process by hand; get the first 2-3 subprocesses working on actual campaign inputs.", details: ["Deconstructing chosen project briefs into discrete input-output sheets", "Mapping out the prompt-chains in Claude by hand", "Perfecting step-1 draft assets to build strong foundations"] },
  { id: "gallery1", time: "15:25 - 15:35", name: "Gallery Share #1", duration: 10, type: "active", description: "Brief team-level screen shares. We intentionally show broken, intermediate things to learn from each other.", details: ["3-4 quick screen shares of live prompt-chains", "Spotlight on useful 'failures' to learn debugging paths"] },
  { id: "lunch", time: "15:35 - 16:15", name: "Coffee & Tinker Break", duration: 40, type: "break", description: "Recharge. Informal tinkering and peer-mentoring are fully encouraged.", details: ["Recharge with quality team food & coffee", "Informal peer collaboration and coaching"] },
  { id: "sprint2", time: "16:15 - 17:50", name: "Build Sprint 2: Connecting the Chain", duration: 95, type: "active", description: "Connect all steps into a unified system. Implement templates, standard formats, and copy-paste guidelines.", details: ["Building steps 3, 4, and 5 of your project", "Enforcing strict on-brand criteria with custom directives", "Developing smooth handoffs where output A cleanly serves as input B"] },
  { id: "clinic", time: "17:50 - 18:00", name: "Unblock Clinic & Share", duration: 10, type: "active", description: "Facilitators and champions clear major blockers and share quick tricks.", details: ["Tackling systemic prompt issues (hallucinations, formatting bugs)", "Rapid resolution of pipeline bottlenecks"] },
  { id: "sprint3", time: "18:00 - 19:15", name: "Build Sprint 3: Finalize & Run", duration: 75, type: "active", description: "Polishing overall workflow quality, testing a complete clean run, and drafting the live demo.", details: ["Optimizing the overall narrative for brand consistency", "Frictionless full-run testing using completely new raw inputs", "Configuring mock dashboards or structured templates for showcase"] },
  { id: "prep", time: "19:15 - 19:30", name: "Presentation Prep", duration: 15, type: "active", description: "Scripting and rehearsing your 4-minute demo. Focusing on the process and live run.", details: ["Structuring your team's live demo under the 4-minute cap", "Testing inputs and selecting the primary crew members for presentation"] },
  { id: "presentations", time: "19:30 - 20:00", name: "Final Presentations Showcase", duration: 30, type: "active", description: "Every team runs a live demo on stage. No slides allowed: only real workflows on real inputs.", details: ["Live-run demo showcasing the authored subprocess", "Demonstrating the completed draft asset within a 4-minute limit", "Proving immediate value for upcoming Monday campaigns"] },
  { id: "close", time: "20:00 - 20:20", name: "Awards & Close", duration: 20, type: "passive", description: "Handing out process-craft awards and integrating built skills into the official Agentic Layer plans.", details: ["Gaston awards prizes: Most Reusable, Biggest Time-Saved, Best Process-Craft", "Defining how your skills feed into Phase 3 (Playground) and Phase 4 (Hackathon)"] },
];

export const CHECKER_EXAMPLES: ProcessCheckerExample[] = [
  {
    id: "ex1",
    name: "Writing a campaign recap email",
    verdict: "good",
    feedback: "✅ Perfect — it has clear steps (extracting performance data, summarizing narrative, writing specific layout drafts) and a real, concrete output (the email newsletter asset).",
  },
  {
    id: "ex2",
    name: "Be more creative",
    verdict: "not-yet",
    feedback: "⚠️ Too vague — 'creative' is a state of mind, not a repeatable workflow. Try naming the steps you actually take (e.g. find 3 competitor posts, deconstruct their hooks, draft 5 alternatives).",
  },
  {
    id: "ex3",
    name: "Pulling the weekly numbers into a deck",
    verdict: "good",
    feedback: "✅ Great — repetitive, has structured steps (pulling Windsor Analytics ETL, putting stats in a list, writing narrative bullets) + a defined output (the status slide deck).",
  },
  {
    id: "ex4",
    name: "Improve our product messaging",
    verdict: "not-yet",
    feedback: "⚠️ Too broad — this is a large strategic initiative. Break it down into discrete processes you do by hand (e.g. feed customer pain list into brand voice model, map personas, draft copy variations).",
  },
];
