import { Plan, Role, AgentAutonomy } from "@prisma/client";

// ─── Auth ─────────────────────────────────────────────────
export interface AuthUser {
  id:    string;
  name:  string | null;
  email: string;
  image: string | null;
  role:  Role;
  plan:  Plan;
}

// ─── Agent ────────────────────────────────────────────────
export interface AgentConfig {
  id:           string;
  slug:         string;
  name:         string;
  category:     string;
  description:  string;
  avatar:       string | null;
  capabilities: string[];
  powerUps:     string[];
  autonomy:     AgentAutonomy;
  model:        string;
  temperature:  number;
  credits:      number;
  minPlan:      Plan;
}

// ─── Chat ─────────────────────────────────────────────────
export interface ChatMessage {
  id:        string;
  role:      "user" | "assistant" | "system";
  content:   string;
  model?:    string;
  credits?:  number;
  createdAt: Date;
}

// ─── Model ────────────────────────────────────────────────
export interface ModelOption {
  slug:       string;
  name:       string;
  provider:   string;
  category:   string;
  credits:    number;
  creditUnit: string;
  isPremium:  boolean;
  minPlan:    Plan;
}

// ─── Generation ───────────────────────────────────────────
export interface GenerationResult {
  id:       string;
  type:     string;
  url?:     string;
  content?: string;
  credits:  number;
  model:    string;
}

// ─── API responses ────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?:   T;
  error?:  string;
}

export interface PaginatedResponse<T> {
  items:   T[];
  total:   number;
  page:    number;
  limit:   number;
  hasMore: boolean;
}
