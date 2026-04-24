import { Plan } from "@prisma/client";

// ─── Credit limits per plan ───────────────────────────────
export const PLAN_CREDITS: Record<Plan, number> = {
  free:     500,
  starter:  3000,
  pro:      15000,
  business: 50000,
};

// ─── Max model tier (credits/action) per plan ─────────────
export const PLAN_MAX_MODEL_TIER: Record<Plan, number> = {
  free:     5,   // budget models only
  starter:  20,  // up to mid-tier
  pro:      75,  // up to Opus 4.6
  business: 100, // all models including Opus 4.7
};

// ─── Model credit costs ───────────────────────────────────
export const MODEL_CREDITS: Record<string, number> = {
  // Text — Budget
  "deepseek-v4":              1,
  "llama-4-scout":            1,
  "qwq":                      1,
  "gemini-3-1-flash-lite":    2,
  "qwen-3-5":                 2,
  "qwen-3-6-plus":            2,
  "mistral-small-3-1":        2,
  "deepseek-v3":              3,
  "grok-4-1-fast":            3,
  "haiku-4-5":                3,
  "gpt-4o":                   4,
  "haiku-4-6":                4,
  "kimi-k2-5":                5,
  "mistral-medium-3":         5,
  "glm-5":                    5,
  "ernie-5":                  6,
  "doubao-2":                 6,
  // Text — Mid
  "gemini-3-1-pro":           8,
  "mistral-large-3":          8,
  "sonnet-4-5":               10,
  "sonnet-4-6":               12,
  "grok-4":                   15,
  "gpt-5-4":                  18,
  "kimi-k2-6":                20,
  "gpt-5-5":                  30,
  // Text — Premium
  "opus-4-5":                 50,
  "opus-4-6":                 75,
  "opus-4-7":                 100,
  // Images
  "stable-diffusion-xl":      2,
  "flux-schnell":              3,
  "stable-diffusion-3-5":     5,
  "ideogram-3":               5,
  "cogview-4":                6,
  "recraft-v4":               8,
  "flux-1-1-pro":             10,
  "gpt-image-2-standard":     10,
  "flux-2-pro":               15,
  "imagen-3":                 15,
  "gpt-image-2-hd":           35,
  "midjourney-v7":            50,
  // Video (per second)
  "cogvideox":                10,
  "kling-1-6":                15,
  "hailuo-2-3":               18,
  "pika-2-5":                 20,
  "wan":                      20,
  "kling-3-0":                25,
  "seedance-2-0":             25,
  "luma-ray2":                25,
  "runway-gen-4-5":           35,
  "sora-2":                   40,
  "luma-ray3":                45,
  "veo-3":                    50,
  // TTS (per 1K chars)
  "openai-tts-1":             2,
  "openai-tts-1-hd":          3,
  "elevenlabs-flash":         5,
  "elevenlabs-turbo-2-5":     5,
  "gemini-3-1-flash-tts":     8,
  "elevenlabs-multilingual-2":10,
  "elevenlabs-v3":            15,
  // STT (per minute)
  "whisper-v3":               1,
  "assemblyai-universal-2":   1,
  "assemblyai-universal-3":   2,
  "elevenlabs-scribe-v2":     2,
  // Music (per track)
  "udio-v1-5":                8,
  "suno-v5":                  10,
  "suno-v5-5":                15,
};

export function getModelCredits(modelSlug: string): number {
  return MODEL_CREDITS[modelSlug] ?? 5;
}

export function canUseModel(plan: Plan, modelSlug: string): boolean {
  const cost = getModelCredits(modelSlug);
  return cost <= PLAN_MAX_MODEL_TIER[plan];
}

export function hasEnoughCredits(userCredits: number, modelSlug: string): boolean {
  return userCredits >= getModelCredits(modelSlug);
}

export function formatCredits(amount: number): string {
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K`;
  return amount.toString();
}
