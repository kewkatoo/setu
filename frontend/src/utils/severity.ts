import type { Severity } from "@/types";

export const severityConfig: Record<
  Severity,
  { label: string; text: string; bg: string; ring: string; dot: string }
> = {
  critical: {
    label: "Critical",
    text: "text-severity-critical",
    bg: "bg-severity-critical/10",
    ring: "ring-severity-critical/30",
    dot: "bg-severity-critical",
  },
  medium: {
    label: "Medium",
    text: "text-severity-medium",
    bg: "bg-severity-medium/10",
    ring: "ring-severity-medium/30",
    dot: "bg-severity-medium",
  },
  info: {
    label: "Info",
    text: "text-severity-info",
    bg: "bg-severity-info/10",
    ring: "ring-severity-info/30",
    dot: "bg-severity-info",
  },
  unknown: {
    label: "Unknown",
    text: "text-severity-unknown",
    bg: "bg-severity-unknown/10",
    ring: "ring-severity-unknown/30",
    dot: "bg-severity-unknown",
  },
};

export function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "--:--";
  }
}

export function formatRelative(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}
