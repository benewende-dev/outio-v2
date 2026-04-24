"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Bot, User, ChevronDown, Sparkles,
  Square, Copy, Check, Plus, Zap, Paperclip,
  FileText, Music, Film, ImageIcon, X, Mic,
  MicOff, Globe, Wand2,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────── */
type Role       = "user" | "assistant";
type FileType   = "image" | "audio" | "video" | "pdf" | "doc";
type Attachment = { id: string; name: string; kind: FileType; preview?: string };
type Message    = { id: string; role: Role; content: string; model?: string; attachments?: Attachment[] };

/* ── Models ────────────────────────────────────────────── */
const MODELS = [
  { id: "deepseek-v4",       label: "DeepSeek V4",       credits: 1,   tier: "budget",  caps: ["text"] },
  { id: "gemini-3-1-flash",  label: "Gemini 3.1 Flash",  credits: 2,   tier: "budget",  caps: ["text","image"] },
  { id: "haiku-4-6",         label: "Claude Haiku 4.6",  credits: 4,   tier: "mid",     caps: ["text","image","pdf"] },
  { id: "sonnet-4-6",        label: "Claude Sonnet 4.6", credits: 12,  tier: "mid",     caps: ["text","image","pdf","audio"] },
  { id: "gpt-5-5",           label: "GPT-5.5",           credits: 15,  tier: "premium", caps: ["text","image","audio","video"] },
  { id: "gemini-ultra",      label: "Gemini Ultra",      credits: 18,  tier: "premium", caps: ["text","image","audio","video","pdf"] },
  { id: "opus-4-6",          label: "Claude Opus 4.6",   credits: 75,  tier: "premium", caps: ["text","image","pdf","audio"] },
  { id: "opus-4-7",          label: "Claude Opus 4.7",   credits: 100, tier: "top",     caps: ["text","image","pdf","audio","video"] },
];

const TIER_DOT: Record<string, string> = {
  budget: "#6B9080", mid: "#5a9e8a", premium: "#4a7d6e", top: "#A4C3B2",
};

const FILE_ICONS: Record<FileType, typeof FileText> = {
  image: ImageIcon, audio: Music, video: Film, pdf: FileText, doc: FileText,
};

const SUGGESTIONS = [
  "Rédige un email de prospection percutant",
  "Analyse cette image et décris-la",
  "Génère 10 idées de contenu pour ma marque",
  "Traduis ce texte en anglais professionnel",
  "Explique-moi le machine learning simplement",
  "Crée un plan de business sur 90 jours",
];

const uid = () => Math.random().toString(36).slice(2, 10);

/* ── Component ─────────────────────────────────────────── */
export default function ChatPage() {
  const [messages, setMessages]       = useState<Message[]>([]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [modelId, setModelId]         = useState("sonnet-4-6");
  const [modelOpen, setModelOpen]     = useState(false);
  const [copied, setCopied]           = useState<string | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [recording, setRecording]     = useState(false);
  const [webSearch, setWebSearch]     = useState(false);

  const bottomRef   = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef     = useRef<HTMLInputElement>(null);
  const modelRef    = useRef<HTMLDivElement>(null);

  const model = MODELS.find((m) => m.id === modelId) ?? MODELS[3];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) setModelOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  /* File attach */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const mapped: Attachment[] = files.map((f) => {
      const kind: FileType = f.type.startsWith("image/") ? "image"
        : f.type.startsWith("audio/") ? "audio"
        : f.type.startsWith("video/") ? "video"
        : f.type === "application/pdf" ? "pdf" : "doc";
      const preview = kind === "image" ? URL.createObjectURL(f) : undefined;
      return { id: uid(), name: f.name, kind, preview };
    });
    setAttachments((prev) => [...prev, ...mapped]);
    e.target.value = "";
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  /* Send */
  const send = async () => {
    const text = input.trim();
    if ((!text && !attachments.length) || loading) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const userMsg: Message = { id: uid(), role: "user", content: text, attachments: [...attachments] };
    setAttachments([]);
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const assistantId = uid();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", model: model.label }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          model: modelId,
          webSearch,
        }),
      });

      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of dec.decode(value, { stream: true }).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const d = line.slice(6);
          if (d === "[DONE]") break;
          try {
            full += JSON.parse(d).choices?.[0]?.delta?.content ?? "";
            setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: full } : m));
          } catch { /**/ }
        }
      }
    } catch {
      const demo = `Bonjour ! Je suis **${model.label}**. Le backend OpenWebUI n'est pas encore connecté — configurez \`OPENWEBUI_URL\` dans les variables d'environnement pour activer le chat réel.${attachments.length ? `\n\nJ'ai bien reçu vos fichiers joints et je les analyserais dès que la connexion est établie.` : ""}`;
      let i = 0;
      const iv = setInterval(() => {
        i += 4;
        setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: demo.slice(0, i) } : m));
        if (i >= demo.length) clearInterval(iv);
      }, 15);
    } finally {
      setLoading(false);
    }
  };

  const copyMsg = (id: string, txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  /* ── Render ─────────────────────────────────────────── */
  return (
    <div className="flex flex-col h-full" style={{ background: "var(--bg)" }}>

      {/* Top bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b flex-shrink-0"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <Sparkles size={15} style={{ color: "var(--accent)" }} />
        <span className="font-bold text-sm flex-1" style={{ color: "var(--text)" }}>Chat IA</span>

        {/* Web search toggle */}
        <button
          onClick={() => setWebSearch(!webSearch)}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all"
          style={webSearch
            ? { background: "var(--bg-surface)", borderColor: "var(--border-strong)", color: "var(--accent)" }
            : { borderColor: "var(--border)", color: "var(--text-subtle)" }}>
          <Globe size={12} />
          Web
        </button>

        {/* Model selector */}
        <div ref={modelRef} className="relative">
          <button
            onClick={() => setModelOpen(!modelOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: TIER_DOT[model.tier] }} />
            {model.label}
            <span className="px-1.5 py-0.5 rounded-full" style={{ background: "var(--bg-card)", color: "var(--accent)", fontSize: 10 }}>
              {model.credits}cr
            </span>
            <ChevronDown size={11} />
          </button>

          <AnimatePresence>
            {modelOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.14 }}
                className="absolute right-0 top-10 z-50 rounded-2xl border shadow-xl overflow-hidden w-72"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                {["budget", "mid", "premium", "top"].map((tier) => {
                  const group = MODELS.filter((m) => m.tier === tier);
                  return (
                    <div key={tier} className="py-1.5">
                      <div className="px-4 py-1 text-[9px] font-black uppercase tracking-widest"
                        style={{ color: "var(--text-subtle)" }}>
                        {tier === "budget" ? "Budget" : tier === "mid" ? "Mid-tier" : tier === "premium" ? "Premium" : "Top"}
                      </div>
                      {group.map((m) => (
                        <button key={m.id}
                          onClick={() => { setModelId(m.id); setModelOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--bg-surface)] transition-colors text-left"
                          style={{ color: m.id === modelId ? "var(--accent)" : "var(--text)" }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TIER_DOT[tier] }} />
                          <span className="flex-1">{m.label}</span>
                          <div className="flex gap-1">
                            {m.caps.includes("image") && <ImageIcon size={9} style={{ color: "var(--text-subtle)" }} />}
                            {m.caps.includes("audio") && <Music size={9} style={{ color: "var(--text-subtle)" }} />}
                            {m.caps.includes("video") && <Film size={9} style={{ color: "var(--text-subtle)" }} />}
                          </div>
                          <span className="text-xs font-semibold" style={{ color: "var(--text-subtle)" }}>{m.credits}cr</span>
                          {m.id === modelId && <Check size={11} style={{ color: "var(--accent)" }} />}
                        </button>
                      ))}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button onClick={() => setMessages([])}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all hover:bg-[var(--bg-surface)]"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <Plus size={12} /> Nouveau
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full gap-5 py-20 text-center">
            <div className="w-14 h-14 rounded-3xl flex items-center justify-center"
              style={{ background: "var(--bg-surface)" }}>
              <Bot size={26} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <p className="font-black text-lg mb-1" style={{ color: "var(--text)" }}>Que voulez-vous créer ?</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {model.label} · {model.credits} cr/msg · {model.caps.join(", ")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
              {SUGGESTIONS.map((s) => (
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse max-w-2xl ml-auto" : "max-w-3xl"}`}>

              <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: msg.role === "user" ? "var(--accent)" : "var(--bg-surface)" }}>
                {msg.role === "user"
                  ? <User size={13} color="white" />
                  : <Bot size={13} style={{ color: "var(--accent)" }} />}
              </div>

              <div className="group relative flex flex-col gap-1 min-w-0">
                {msg.role === "assistant" && msg.model && (
                  <span className="text-[10px] font-bold px-1" style={{ color: "var(--text-subtle)" }}>{msg.model}</span>
                )}

                {/* Attachments preview (user messages) */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-1">
                    {msg.attachments.map((a) => {
                      const Icon = FILE_ICONS[a.kind];
                      return a.preview ? (
                        <img key={a.id} src={a.preview} alt={a.name}
                          className="w-32 h-24 object-cover rounded-xl border"
                          style={{ borderColor: "var(--border)" }} />
                      ) : (
                        <div key={a.id} className="flex items-center gap-2 px-3 py-2 rounded-xl border"
                          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                          <Icon size={13} style={{ color: "var(--accent)" }} />
                          <span className="text-xs truncate max-w-[120px]" style={{ color: "var(--text)" }}>{a.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Bubble */}
                {(msg.content || loading) && (
                  <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
                    style={msg.role === "user"
                      ? { background: "var(--accent)", color: "#fff" }
                      : { background: "var(--bg-card)", color: "var(--text)", border: "1px solid var(--border)" }}>
                    {msg.content || (loading && msg.role === "assistant" && (
                      <span className="flex gap-1 items-center py-0.5">
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
                )}

                {/* Copy */}
                {msg.content && msg.role === "assistant" && (
                  <button onClick={() => copyMsg(msg.id, msg.content)}
                    className="absolute -bottom-2 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg"
                    style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>
                    {copied === msg.id ? <Check size={10} style={{ color: "var(--accent)" }} /> : <Copy size={10} />}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="px-4 pb-4 pt-2 border-t flex-shrink-0"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <div className="max-w-3xl mx-auto">

          {/* Attachment chips */}
          <AnimatePresence>
            {attachments.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }} className="flex flex-wrap gap-2 mb-2">
                {attachments.map((a) => {
                  const Icon = FILE_ICONS[a.kind];
                  return (
                    <div key={a.id} className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 border text-xs"
                      style={{ background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text)" }}>
                      {a.preview
                        ? <img src={a.preview} alt="" className="w-5 h-5 rounded object-cover" />
                        : <Icon size={12} style={{ color: "var(--accent)" }} />}
                      <span className="max-w-[100px] truncate">{a.name}</span>
                      <button onClick={() => removeAttachment(a.id)} style={{ color: "var(--text-subtle)" }}>
                        <X size={11} />
                      </button>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input box */}
          <div className="rounded-2xl border flex items-end gap-2 p-2.5 transition-all focus-within:border-[var(--accent)]"
            style={{ background: "var(--bg)", borderColor: "var(--border)" }}>

            {/* Attach */}
            <input ref={fileRef} type="file" multiple
              accept="image/*,audio/*,video/*,.pdf,.doc,.docx"
              className="hidden" onChange={handleFile} />
            <button onClick={() => fileRef.current?.click()}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg-surface)] flex-shrink-0"
              style={{ color: "var(--text-subtle)" }} title="Joindre un fichier">
              <Paperclip size={15} />
            </button>

            {/* Textarea */}
            <textarea ref={textareaRef} rows={1} value={input}
              onChange={handleInput} onKeyDown={onKey}
              placeholder="Écrivez, collez un lien, joignez un fichier..."
              className="flex-1 bg-transparent outline-none resize-none text-sm leading-relaxed min-h-[24px]"
              style={{ color: "var(--text)" }} />

            {/* Actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Voice */}
              <button onClick={() => setRecording(!recording)}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg-surface)]"
                style={{ color: recording ? "#dc2626" : "var(--text-subtle)" }}
                title="Dicter">
                {recording ? <MicOff size={14} /> : <Mic size={14} />}
              </button>
              {/* AI suggest */}
              <button
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg-surface)]"
                style={{ color: "var(--text-subtle)" }} title="Améliorer le prompt">
                <Wand2 size={14} />
              </button>
              {/* Credit indicator */}
              <span className="text-[10px] font-semibold" style={{ color: "var(--text-subtle)" }}>
                <Zap size={9} className="inline" />{model.credits}
              </span>
              {/* Send */}
              <button onClick={loading ? undefined : send}
                disabled={!input.trim() && !attachments.length && !loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                style={{ background: loading ? "var(--bg-surface)" : "var(--accent)" }}>
                {loading ? <Square size={12} style={{ color: "var(--accent)" }} /> : <Send size={14} color="white" />}
              </button>
            </div>
          </div>

          <p className="text-center text-[9px] mt-1.5" style={{ color: "var(--text-subtle)" }}>
            Outio peut faire des erreurs · Images, audio, PDF, vidéo supportés
          </p>
        </div>
      </div>
    </div>
  );
}
