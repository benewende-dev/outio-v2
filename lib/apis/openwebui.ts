/**
 * Outio v2 — Open WebUI Backend Client
 * Routes all LLM calls through open-webui-bdev
 */

const OPENWEBUI_BASE = process.env.OPENWEBUI_URL ?? "http://localhost:3000";
const OPENWEBUI_KEY  = process.env.OPENWEBUI_API_KEY ?? "";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatOptions {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}

// ─── Base fetch ───────────────────────────────────────────

async function owFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${OPENWEBUI_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENWEBUI_KEY}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`OpenWebUI error ${res.status}: ${error}`);
  }

  return res;
}

// ─── Chat (streaming) ─────────────────────────────────────

export async function chatStream(opts: ChatOptions): Promise<ReadableStream> {
  const res = await owFetch("/api/chat/completions", {
    method: "POST",
    body: JSON.stringify({ ...opts, stream: true }),
  });
  return res.body!;
}

// ─── Chat (non-streaming) ─────────────────────────────────

export async function chat(opts: ChatOptions): Promise<string> {
  const res = await owFetch("/api/chat/completions", {
    method: "POST",
    body: JSON.stringify({ ...opts, stream: false }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

// ─── List available models ────────────────────────────────

export async function listModels(): Promise<string[]> {
  const res = await owFetch("/api/models");
  const data = await res.json();
  return (data.data ?? []).map((m: { id: string }) => m.id);
}

// ─── Image generation ─────────────────────────────────────

export async function generateImage(prompt: string, model: string, size = "1024x1024") {
  const res = await owFetch("/api/images/generations", {
    method: "POST",
    body: JSON.stringify({ prompt, model, size, n: 1 }),
  });
  const data = await res.json();
  return data.data?.[0]?.url ?? null;
}

// ─── Embeddings (for RAG) ─────────────────────────────────

export async function embed(text: string, model = "text-embedding-3-small") {
  const res = await owFetch("/api/embeddings", {
    method: "POST",
    body: JSON.stringify({ input: text, model }),
  });
  const data = await res.json();
  return data.data?.[0]?.embedding ?? [];
}

// ─── Health check ─────────────────────────────────────────

export async function healthCheck(): Promise<boolean> {
  try {
    await owFetch("/health");
    return true;
  } catch {
    return false;
  }
}
