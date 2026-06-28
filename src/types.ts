/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RoleId =
  | "demand-gen"
  | "sdr-bdr"
  | "content"
  | "social"
  | "pr-ar"
  | "events"
  | "design"
  | "web-email"
  | "influencer"
  | "product-marketing";

export interface Role {
  id: RoleId;
  label: string;
}

export type LayerId = "lake" | "agent" | "activation";

export interface Layer {
  id: LayerId;
  title: string;
  subtitle: string;
  description: string;
  roles: RoleId[];
  whatYouDo: Record<RoleId, string>;
}

export interface Subprocess {
  stepNumber: number;
  name: string;
  inputTool: string; // the tool the input artifact comes from
  input: string; // the input artifact
  prompt: string; // the user prompt added at this step
  outputTool: string; // the tool the output lands in (= next step's inputTool)
  output: string; // the output artifact (becomes the next step's input)
}

export interface Project {
  id: string;
  name: string;
  emoji: string;
  subtitle: string;
  forYou: string;
  roles: RoleId[];
  chain: Subprocess[];
  payoff: string;
  tools: string[];
}

export interface AgendaBlock {
  id: string;
  time: string;
  name: string;
  duration: number; // in minutes
  type: "active" | "passive" | "break";
  description: string;
  details?: string[];
}

export interface ProcessCheckerExample {
  id: string;
  name: string;
  verdict: "good" | "not-yet";
  feedback: string;
}
