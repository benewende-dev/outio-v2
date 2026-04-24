"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Bot, User, ChevronDown, Sparkles,
  Square, Copy, Check, Plus, Zap,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────── */
type Role    = "user" | "assistant";
type Message = { id: string; role: Role; content: string; model?: string };

/* ── Models catalog ────────────────────────────────────── */
const MODELS = [
  { id: "deepseek-v4",          label: "DeepSeek V4",       credits: 1,  tier: "budget"   },
  { id: "gemini-3-1-flash",     label: "Gemini 3.1 Flash",  credits: 2,  tier: "budget"   },
  { id: "llama-4-maverick",     label: "Llama 4 Maverick",  credits: 3,  tier: "budget"   },
  { id: "mistral-large",        label: "Mistral Large",     credits: 4,  tier: "budget"   },
  { id: "grok-4",               label: "Grok 4",            credits: 5,  tier: "mid"      },
  { id: "gemini-3-0-pro",       label: "Gemini 3.0 Pro",    credits: 8,  tier: "mid"      },
  { id: "haiku-4-6",            label: "Claude Haiku 4.6",  credits: 4,  tier: "mid"      },
  { id: "sonnet-4-6",           label: "Claude Sonnet 4.6", credits: 12, tier: "mid"      },
  { id: "gpt-5-5",              label: "GPT-5.5",           credits: 15, tier: "premium"  },
  { id: "gemini-ultra",         label: "Gemini Ultra",      credits: 18, tier: "premium"  },
  { id: "opus-4-6",             label: "Claude Opus 4.6",   credits: 75, tier: "premium"  },
  { id: "opus-4-7",             label: "Claude Opus 4.7",   credits: 100, tier: "top"     },
];

const TIER_COLORS: Record<string, string> = {
  budget:  "#6B9080",
  mid:     "#5a9e8a",
  premium: "#4a7d6e",
  top:     "#A4C3B2",
};

/* ── Helpers ───────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2);

/* ── Component ─────────────────────────────────────────── */
export default function ChatPage() {
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [modelId, setModelId]     = useState("sonnet-4-6");
  const [modelOpen, setModelOpen] = useState(false);
  const [copied, setCopied]       = useState<string | null>(null);

  const bottomRef    = useRef<HTMLDivElement>(null);
  const textareaRef  = useRef<HTMLTextAreaElement>(null);
  const modelBtnRef  = useRef<HTMLDivElement>(null);

  const model = MODELS.find((m) => m.id === modelId) ?? MODELS[7];

  /* Scroll to bottom on new message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Close model dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modelBtnRef.current && !modelBtnRef.current.contains(e.target as Node))
        setModelOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Auto-resize textarea */
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  /* Send message */
  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const userMsg: Message = { id: uid(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const assistantId = uid();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", model: model.label }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })), model: modelId }),
      });

      if (!res.ok || !res.body) throw new Error("Stream error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content ?? "";
            full += delta;
            setMessages((prev) => prev.map((m) =>
              m.id === assistantId ? { ...m, content: full } : m
            ));
          } catch { /* skip */ }
        }
      }
    } catch {
      /* Simulated response when API not connected */
      const demo = `Je suis **${model.label}** via Outio. La connexion au backend OpenWebUI n'est pas encore configurée. Configurez \`OPENWEBUI_URL\` dans vos variables d'environnement pour activer le streaming réel.`;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setMessages((prev) => prev.map((m) =>
          m.id === assistantId ? { ...m, content: demo.slice(0, i * 3) } : m
        ));
        if (i * 3 >= demo.length) clearInterval(interval);
      }, 18);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  /* ── Render ─────────────────────────────────────────── */
  return (
    <div className="flex flex-col h-full" style={{ background: "var(--bg)" }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <div className="flex items-center gap-3">
          <Sparkles size={17} style={{ color: "var(--accent)" }} />
          <span className="font-bold text-sm" style={{ color: "var(--text)" }}>Chat IA</span>
        </div>

        {/* Model selector */}
        <div ref={modelBtnRef} className="relative">
          <button
            onClick={() => setModelOpen(!modelOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:border-[var(--border-strong)]"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text)" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: TIER_COLORS[model.tier] }} />
            {model.label}
            <span className="text-xs px-1.5 py-0.5 rounded-full ml-1"
              style={{ background: "var(--bg-card)", color: "var(--accent)" }}>
              {model.credits} cr
            </span>
            <ChevronDown size={13} style={{ color: "var(--text-muted)" }} />
          </button>

          <AnimatePresence>
            {modelOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 z-50 rounded-2xl overflow-hidden border shadow-xl w-72"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                {["budget", "mid", "premium", "top"].map((tier) => {
                  const group = MODELS.filter((m) => m.tier === tier);
                  if (!group.length) return null;
                  return (
                    <div key={tier} className="py-2">
                      <div className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest"
                        style={{ color: "var(--text-subtle)" }}>
                        {tier === "budget" ? "Budget" : tier === "mid" ? "Mid-tier" : tier === "premium" ? "Premium" : "Top"}
                      </div>
                      {group.map((m) => (
                        <button key={m.id}
                          onClick={() => { setModelId(m.id); setModelOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--bg-surface)] transition-colors text-left"
                          style={{ color: m.id === modelId ? "var(--accent)" : "var(--text)" }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TIER_COLORS[tier] }} />
                          <span className="flex-1">{m.label}</span>
                          <span className="text-xs font-semibold" style={{ color: "var(--text-subtle)" }}>
                            {m.credits} cr
                          </span>
                          {m.id === modelId && <Check size={12} style={{ color: "var(--accent)" }} />}
                        </button>
                      ))}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setMessages([])}
          className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <Plus size={13} /> Nouvelle conversation
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full gap-4 py-24 text-center">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center"
              style={{ background: "var(--bg-surface)" }}>
              <Bot size={28} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <p className="font-black text-lg mb-1" style={{ color: "var(--text)" }}>
                Commencez une conversation
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Modèle actif : <strong style={{ color: "var(--accent)" }}>{model.label}</strong> · {model.credits} crédit{model.credits > 1 ? "s" : ""} / message
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 max-w-sm w-full">
              {["Rédige un email professionnel", "Explique-moi le deep learning", "Génère 5 idées de contenu", "Traduis en anglais"].map((s) => (
                <button key={s}
                  onClick={() => { setInput(s); textareaRef.current?.focus(); }}
                  className="text-xs px-3 py-2.5 rounded-xl border text-left transition-all hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>

              {/* Avatar */}
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: msg.role === "user" ? "var(--accent)" : "var(--bg-surface)" }}>
                {msg.role === "user"
                  ? <User size={14} color="white" />
                  : <Bot size={14} style={{ color: "var(--accent)" }} />}
              </div>

              {/* Bubble */}
              <div className="group relative flex flex-col gap-1">
                {msg.role === "assistant" && msg.model && (
                  <span className="text-[10px] font-bold px-2" style={{ color: "var(--text-subtle)" }}>
                    {msg.model}
                  </span>
                )}
                <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[640px] whitespace-pre-wrap"
                  style={msg.role === "user"
                    ? { background: "var(--accent)", color: "#fff" }
                    : { background: "var(--bg-card)", color: "var(--text)", border: "1px solid var(--border)" }}>
                  {msg.content || (loading && msg.role === "assistant" && (
                    <span className="flex gap-1 items-center py-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--accent)" }} />
                      ))}
                    </span>
                  ))}
                </div>

                {/* Copy button */}
                {msg.content && msg.role === "assistant" && (
                  <button
                    onClick={() => copyText(msg.id, msg.content)}
                    className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg"
                    style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>
                    {copied === msg.id ? <Check size={11} style={{ color: "var(--accent)" }} /> : <Copy size={11} />}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-5 pt-3 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border flex items-end gap-3 p-3 transition-all focus-within:border-[var(--accent)]"
            style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleInput}
              onKeyDown={onKeyDown}
              placeholder="Écrivez votre message... (Entrée pour envoyer, Maj+Entrée pour sauter une ligne)"
              className="flex-1 bg-transparent outline-none resize-none text-sm leading-relaxed min-h-[24px]"
              style={{ color: "var(--text)" }}
            />
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-semibold" style={{ color: "var(--text-subtle)" }}>
                <Zap size={10} className="inline mr-0.5" />{model.credits} cr
              </span>
              <button
                onClick={loading ? undefined : send}
                disabled={!input.trim() && !loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                style={{ background: loading ? "var(--bg-surface)" : "var(--accent)" }}>
                {loading
                  ? <Square size={12} style={{ color: "var(--accent)" }} />
                  : <Send size={14} color="white" />}
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] mt-2" style={{ color: "var(--text-subtle)" }}>
            Outio peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </div>
      </div>
    </div>
  );
}
