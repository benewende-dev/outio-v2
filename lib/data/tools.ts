"use client";

import {
  MessageSquare, Bot, ImageIcon, Video, Mic, Share2,
  Megaphone, GalleryHorizontal, BookOpen, Search,
  Compass, BarChart3, type LucideIcon,
} from "lucide-react";

export const TOOL_ICONS: Record<string, LucideIcon> = {
  MessageSquare, Bot, ImageIcon, Video, Mic, Share2,
  Megaphone, GalleryHorizontal, BookOpen, Search, Compass, BarChart3,
};

export type ToolConfig = {
  id: string;
  iconName: string;
  label: string;
  desc: string;
  tag: string;
  visible: boolean;
  order: number;
};

export const DEFAULT_TOOLS: ToolConfig[] = [
  { id: "chat",     iconName: "MessageSquare",    label: "Chat IA",      desc: "30+ modèles, streaming temps réel.",         tag: "Core",       visible: true, order: 0 },
  { id: "agents",   iconName: "Bot",              label: "Agents",       desc: "Des experts IA qui travaillent pour vous.",   tag: "Puissant",   visible: true, order: 1 },
  { id: "images",   iconName: "ImageIcon",        label: "Images",       desc: "Flux, Midjourney, DALL-E, Ideogram.",         tag: "Créatif",    visible: true, order: 2 },
  { id: "videos",   iconName: "Video",            label: "Vidéos",       desc: "Sora 2, Kling 3, Veo 3, Runway Gen-4.",      tag: "Cinéma",     visible: true, order: 3 },
  { id: "audio",    iconName: "Mic",              label: "Audio",        desc: "Voix, musique, transcription.",               tag: "Son",        visible: true, order: 4 },
  { id: "social",   iconName: "Share2",           label: "Social Media", desc: "5 réseaux, planification & publication.",     tag: "Growth",     visible: true, order: 5 },
  { id: "campaign", iconName: "Megaphone",        label: "Campagnes",    desc: "Brand DNA, moodboards, photoshoots IA.",      tag: "Marketing",  visible: true, order: 6 },
  { id: "gallery",  iconName: "GalleryHorizontal",label: "Galerie",      desc: "Toutes vos créations, un seul endroit.",      tag: "Stockage",   visible: true, order: 7 },
  { id: "prompts",  iconName: "BookOpen",         label: "Prompts",      desc: "Bibliothèque de prompts pro prêts à l'emploi.",tag: "Ressources", visible: true, order: 8 },
  { id: "research", iconName: "Search",           label: "Deep Research",desc: "Synthèse web, rapports approfondis.",         tag: "Analyse",    visible: true, order: 9 },
  { id: "explore",  iconName: "Compass",          label: "Explorer",     desc: "Découvrez la communauté Outio.",              tag: "Communauté", visible: true, order: 10 },
  { id: "analytics",iconName: "BarChart3",        label: "Analytics",    desc: "Crédits, générations, performances.",         tag: "Données",    visible: true, order: 11 },
];

const STORAGE_KEY = "outio:tools-config";

export function loadTools(): ToolConfig[] {
  if (typeof window === "undefined") return DEFAULT_TOOLS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TOOLS;
    return JSON.parse(raw) as ToolConfig[];
  } catch {
    return DEFAULT_TOOLS;
  }
}

export function saveTools(tools: ToolConfig[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
}
