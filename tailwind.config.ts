import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0a0f1e",
          card: "#0d1a2e",
          card2: "#111827",
          cyan: "#00d4ff",
          purple: "#7c3aed",
          green: "#10b981",
          amber: "#f59e0b",
          red: "#ef4444",
          border: "#1e3a5f",
          text: "#e2e8f0",
          muted: "#94a3b8",
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "blood-flow": "bloodFlow 3s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px #00d4ff, 0 0 20px #00d4ff33" },
          "50%": { boxShadow: "0 0 20px #00d4ff, 0 0 60px #00d4ff55" },
        },
        bloodFlow: {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
