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
      { stepNumber: 1, name: "Brief Intake & Angle Extraction", inputTool: "Google Docs", input: "Raw campaign brief + brand voice guidelines", prompt: "Read this brief and our brand voice. Extract the target persona, top 3 pain points, 3 distinct creative angles, and matching CTAs.", outputTool: "Claude", output: "Structured brief — personas, pain points, 3 creative angles, CTAs" },
      { stepNumber: 2, name: "Script Generation", inputTool: "Claude", input: "Structured brief from Step 1", prompt: "Using the strongest angle, write 3 UGC video scripts (~20s each) in a natural spoken-word style.", outputTool: "Claude", output: "3 UGC video script options (~20s each) matching the angles" },
      { stepNumber: 3, name: "Hook Multiplication", inputTool: "Claude", input: "Selected UGC script from Step 2", prompt: "Generate 5 alternative opening hooks (first 3 seconds) optimized for A/B testing.", outputTool: "Claude", output: "5 high-converting opening hook variants" },
      { stepNumber: 4, name: "Format-for-Tool", inputTool: "Claude", input: "Final script + chosen hook from Step 3", prompt: "Reformat into a Make-UGC shoot sheet: scene-by-scene lines, visual notes, and voice direction.", outputTool: "Make UGC", output: "Make-UGC project populated with scenes, visuals & voice directions" },
      { stepNumber: 5, name: "Generate & Polish", inputTool: "Make UGC", input: "Make-UGC shoot project from Step 4", prompt: "Render the variants, then pick the top cuts and add branded captions & thumbnails.", outputTool: "Figma", output: "Finished on-brand UGC video variants, exported and ready to test" },
    ],
    payoff: "A $10k, month-long vendor video — done in 15 minutes, on brand, with variants to test.",
    tools: ["Google Docs", "Claude", "Make UGC", "Figma"],
  },
  {
    id: "repurposing-machine",
    name: "Repurposing Machine",
    emoji: "♻️",
    subtitle: "Drop in one asset. Walk out with a week of channel-native content.",
    forYou: "Content, PR, Events, AR, Social, BDR enablement.",
    roles: ["content", "pr-ar", "events", "social", "sdr-bdr"],
    chain: [
      { stepNumber: 1, name: "Source Intake & Clean-up", inputTool: "Zoom", input: "Webinar recording (or Gong sales call / blog transcript)", prompt: "Transcribe and clean this recording — strip filler, fix names, and add session metadata & timestamps.", outputTool: "Claude", output: "Cleaned, timestamped transcript" },
      { stepNumber: 2, name: "Insight Extraction", inputTool: "Claude", input: "Cleaned transcript from Step 1", prompt: "Pull the high-value quotes, key insights, hard metrics, and the main narrative arcs.", outputTool: "Claude", output: "Structured insight outline" },
      { stepNumber: 3, name: "Channel Fan-out", inputTool: "Claude", input: "Insight outline from Step 2", prompt: "Draft a LinkedIn post, an X thread, a nurture email, and a campaign blurb from these insights.", outputTool: "Claude", output: "Channel-native draft set" },
      { stepNumber: 4, name: "On-Brand Pass", inputTool: "Claude", input: "Channel draft set from Step 3", prompt: "Rewrite each draft to match our brand voice and each channel's best practices.", outputTool: "Google Docs", output: "Polished, on-brand assets collected in a shared doc" },
      { stepNumber: 5, name: "Package & Route", inputTool: "Google Docs", input: "Polished asset doc from Step 4", prompt: "Create a publishing task per asset, assign owners, and post the summary to the team channel.", outputTool: "Asana", output: "Publishing tasks created in Asana with owners assigned (Slack handoff)" },
    ],
    payoff: "One webinar → a LinkedIn post, an X thread, a nurture email, a one-pager, and a blurb. Every time.",
    tools: ["Zoom", "Claude", "Google Docs", "Asana"],
  },
  {
    id: "account-intelligence",
    name: "Account & Customer Intelligence",
    emoji: "🎯",
    subtitle: "Turn one sales call into a tailored outreach kit — and a customer story.",
    forYou: "SDR/BDR, ABM, PR/AR, Product Marketing.",
    roles: ["sdr-bdr", "demand-gen", "pr-ar", "product-marketing"],
    chain: [
      { stepNumber: 1, name: "Signal Extraction", inputTool: "Gong", input: "Gong sales call (+ Salesforce account context)", prompt: "From this call and the CRM context, extract pain points, buying signals, objections, and key stakeholders.", outputTool: "Claude", output: "Comprehensive account profile" },
      { stepNumber: 2, name: "Message Matching", inputTool: "Claude", input: "Account profile from Step 1", prompt: "Match our value propositions and proof points to this account's specific signals.", outputTool: "Claude", output: "Matched value props + supporting proof points" },
      { stepNumber: 3, name: "Outreach Build", inputTool: "Claude", input: "Matched messaging from Step 2", prompt: "Draft a hyper-personalized 3-email sequence plus a concise caller prep summary.", outputTool: "Claude", output: "3-email sequence draft + caller prep summary" },
      { stepNumber: 4, name: "Story-Angle Harvest", inputTool: "Claude", input: "Account profile + call quotes from Step 1", prompt: "From the same call, draft a case-study outline with a problem→solution narrative and real customer quotes.", outputTool: "Google Workspace", output: "Customer story seed doc" },
      { stepNumber: 5, name: "Personalize & Review", inputTool: "Google Workspace", input: "Outreach kit + story seed from Step 4", prompt: "Apply a final human edit, then load the sequence into the CRM and notify the AE.", outputTool: "Salesforce", output: "Production-ready outreach kit logged in Salesforce (+ marketing story seed)" },
    ],
    payoff: "Hours of prospect prep down to minutes — and marketing gets a story from the same call.",
    tools: ["Gong", "Claude", "Google Workspace", "Salesforce"],
  },
  {
    id: "performance-narrator",
    name: "Performance Narrator",
    emoji: "📊",
    subtitle: "Turn a messy export into a clear story of what worked — and a live dashboard.",
    forYou: "Demand Gen, Web/Email, Ops, anyone who loves data.",
    roles: ["demand-gen", "web-email"],
    chain: [
      { stepNumber: 1, name: "Data Intake & Normalization", inputTool: "Mixpanel", input: "Campaign & product data from Mixpanel (+ CSV exports)", prompt: "Pull the campaign events and normalize everything into one clean, de-duplicated dataset.", outputTool: "Google Workspace", output: "Standardized campaign performance dataset in Google Sheets" },
      { stepNumber: 2, name: "Insight Extraction", inputTool: "Google Workspace", input: "Standardized dataset from Step 1", prompt: "Find the winning creative, underperforming assets, and anomalies versus our benchmarks.", outputTool: "Claude", output: "Statistical findings log" },
      { stepNumber: 3, name: "Narrative Generation", inputTool: "Claude", input: "Findings log from Step 2", prompt: "Write an exec read-out: TL;DR, top wins, top losses, and an immediate actions list.", outputTool: "Claude", output: "Exec read-out draft" },
      { stepNumber: 4, name: "Dashboard Build", inputTool: "Claude", input: "Standardized dataset + insights from Steps 1–2", prompt: "Generate an interactive dashboard that visualizes the key metrics.", outputTool: "Claude", output: "Interactive dashboard artifact with key visual charts" },
      { stepNumber: 5, name: "Feedback-Loop Note", inputTool: "Claude", input: "Dashboard + read-out from Steps 3–4", prompt: "Summarize the winning hooks and messaging shifts to feed back into the Content Lake.", outputTool: "Claude", output: "Structured update package for the Content Lake" },
    ],
    payoff: "A day of reporting becomes minutes — and the wins flow back into our messaging.",
    tools: ["Mixpanel", "Google Workspace", "Claude"],
  },
  {
    id: "morning-briefing",
    name: "Morning Briefing",
    emoji: "☀️",
    subtitle: "A scheduled Cowork agent that reviews your calendar and Asana every morning and hands you a prepped daily brief.",
    forYou: "Anyone with a packed calendar — managers, team leads, and ICs juggling meetings + tasks.",
    roles: ["demand-gen", "sdr-bdr", "content", "social", "pr-ar", "events", "design", "web-email", "influencer", "product-marketing"],
    chain: [
      { stepNumber: 1, name: "Calendar Sweep", inputTool: "Google Workspace", input: "Today's Google Calendar — events, times, attendees, attached docs", prompt: "Pull today's meetings with start times, attendees, agendas, and any attached or linked docs.", outputTool: "Claude", output: "Structured list of today's meetings with context" },
      { stepNumber: 2, name: "Task Pull", inputTool: "Asana", input: "My Asana tasks (due today, overdue, in progress)", prompt: "Pull my tasks due today and overdue, with project, priority, due time, and status.", outputTool: "Claude", output: "Prioritized task list for today" },
      { stepNumber: 3, name: "Meeting Prep Research", inputTool: "Claude", input: "Today's meetings from Step 1 + related Asana work", prompt: "For each meeting, summarize the purpose, who's attending, the latest status of related tasks, and 2-3 talking points or decisions needed.", outputTool: "Claude", output: "Per-meeting prep notes" },
      { stepNumber: 4, name: "Brief Synthesis", inputTool: "Claude", input: "Prioritized task list + per-meeting prep notes", prompt: "Write a tight daily brief: today's top priorities, a time-ordered schedule, and a prep block for each meeting.", outputTool: "Claude", output: "Daily brief — priorities + schedule + meeting prep" },
      { stepNumber: 5, name: "Deliver Brief", inputTool: "Claude", input: "Finished daily brief", prompt: "Post the brief to my Slack DM every morning at 7:30 — this whole flow runs automatically on a Cowork schedule.", outputTool: "Slack", output: "Daily brief delivered to me each morning, automatically" },
    ],
    payoff: "Walk in already prepped — every morning, before you've finished your coffee.",
    tools: ["Google Workspace", "Asana", "Claude", "Slack"],
  },
];

export const AGENDA: AgendaBlock[] = [
  { id: "welcome", time: "13:00 - 13:15", name: "Welcome & Cold-Open Live Build", duration: 15, type: "passive", description: "5-minute jaw-drop build, no slides; the $10k → 15min story of an automated UGC creative campaign.", details: ["Gaston (CMO) sets the high workshop stakes", "Avishay (AM Consulting) runs a live build showing a raw brief turning into script, hooks & formatted drafts", "No boring slides – just pure demonstration of workflow agency"] },
  { id: "alignment", time: "13:15 - 13:45", name: "Alignment Sprint", duration: 30, type: "passive", description: "Just-enough terminology, a working tour of Co-work, the Content Lake concept, and how a Skill is actually built — so everyone starts on the same page.", details: ["Demystifying terms: skill vs. connector vs. agent — process automation over code", "Co-work orientation: chat vs. Co-work, the ecosystem, and when to stay in chat to save tokens", "Anatomy of a Skill: the .md file, project-level vs. user-level skills, and how you author one", "Introducing SysAid's three-layer marketing machine (Content Lake → Agentic → Activation)"] },
  { id: "teams", time: "13:45 - 14:15", name: "Challenge Brief & Builder Mindset", duration: 30, type: "active", description: "Step into the Builder Mindset: see your day-to-day work as sequential sub-processes — chains of inputs and outputs we learn to feed. We work through real examples together, then pick a project and form teams.", details: ["The Builder Mindset: every routine is a chain of Input → Output → Input → Output", "Worked examples — mapping a familiar marketing task into discrete sub-processes", "Our job is to feed those sub-processes, not to do each step by hand", "Pick one of the 4 builder cards and form teams of 3-4 mixed disciplines (e.g. Content + Design + BDR)", "Get paired with a floating champion mentor"] },
  { id: "sprint1", time: "14:15 - 15:35", name: "Build Sprint 1: Manual First", duration: 80, type: "active", description: "Deconstructing your chosen process by hand; get the first 2-3 subprocesses working on actual campaign inputs.", details: ["Deconstructing chosen project briefs into discrete input-output sheets", "Mapping out the prompt-chains in Claude by hand", "Perfecting step-1 draft assets to build strong foundations"] },
  { id: "gallery1", time: "15:35 - 15:45", name: "Gallery Share #1", duration: 10, type: "active", description: "Brief team-level screen shares. We intentionally show broken, intermediate things to learn from each other.", details: ["3-4 quick screen shares of live prompt-chains", "Spotlight on useful 'failures' to learn debugging paths"] },
  { id: "lunch", time: "15:45 - 16:25", name: "Coffee & Tinker Break", duration: 40, type: "break", description: "Recharge. Informal tinkering and peer-mentoring are fully encouraged.", details: ["Recharge with quality team food & coffee", "Informal peer collaboration and coaching"] },
  { id: "sprint2", time: "16:25 - 18:00", name: "Build Sprint 2: Connecting the Chain", duration: 95, type: "active", description: "Connect all steps into a unified system. Implement templates, standard formats, and copy-paste guidelines.", details: ["Building steps 3, 4, and 5 of your project", "Enforcing strict on-brand criteria with custom directives", "Developing smooth handoffs where output A cleanly serves as input B"] },
  { id: "clinic", time: "18:00 - 18:10", name: "Unblock Clinic & Share", duration: 10, type: "active", description: "Facilitators and champions clear major blockers and share quick tricks.", details: ["Tackling systemic prompt issues (hallucinations, formatting bugs)", "Rapid resolution of pipeline bottlenecks"] },
  { id: "sprint3", time: "18:10 - 19:25", name: "Build Sprint 3: Finalize & Run", duration: 75, type: "active", description: "Polishing overall workflow quality, testing a complete clean run, and drafting the live demo.", details: ["Optimizing the overall narrative for brand consistency", "Frictionless full-run testing using completely new raw inputs", "Configuring mock dashboards or structured templates for showcase"] },
  { id: "prep", time: "19:25 - 19:40", name: "Presentation Prep", duration: 15, type: "active", description: "Scripting and rehearsing your 4-minute demo. Focusing on the process and live run.", details: ["Structuring your team's live demo under the 4-minute cap", "Testing inputs and selecting the primary crew members for presentation"] },
  { id: "presentations", time: "19:40 - 20:10", name: "Final Presentations Showcase", duration: 30, type: "active", description: "Every team runs a live demo. The focus is the process and a real run on real inputs.", details: ["Live-run demo showcasing the authored subprocess", "Demonstrating the completed draft asset within a 4-minute limit", "Proving immediate value for upcoming Monday campaigns"] },
  { id: "close", time: "20:10 - 20:25", name: "Wrap & What's Next", duration: 15, type: "passive", description: "Closing reflections and mapping how the Skills you built feed into the bigger plan. (No prizes — the awards belong to the Hackathon later.)", details: ["Recap of the Skills and flows each team shipped", "How your Skills feed into Phase 3 (Playground) and Phase 4 (Hackathon)"] },
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
