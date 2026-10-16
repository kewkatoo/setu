/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        mist: "#F5F7FA",
        signal: {
          DEFAULT: "#0EA5A0",
          light: "#5EEAD4",
          dark: "#0B7A76",
        },
        bridge: {
          DEFAULT: "#4F46E5",
          light: "#818CF8",
        },
        severity: {
          critical: "#E11D48",
          medium: "#D97706",
          info: "#2563EB",
          unknown: "#6B7280",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backdropBlur: { xs: "2px" },
      boxShadow: {
        glass: "0 8px 32px rgba(16, 24, 40, 0.08)",
        glow: "0 0 40px rgba(14, 165, 160, 0.25)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        waveform: {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
        waveform: "waveform 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
