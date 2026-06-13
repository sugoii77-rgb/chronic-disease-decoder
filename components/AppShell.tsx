"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroSection from "./IntroSection";
import BodySystemMap from "./BodySystemMap";
import HypertensionSimulator from "./HypertensionSimulator";
import RootCauseExplorer from "./RootCauseExplorer";
import CholesterolLab from "./CholesterolLab";
import RatioCalculator from "./RatioCalculator";
import StatinPathwayExplorer from "./StatinPathwayExplorer";
import StatisticsMiniGame from "./StatisticsMiniGame";
import LifestyleSimulator from "./LifestyleSimulator";
import NutrientExplorer from "./NutrientExplorer";
import DualView from "./DualView";
import QuizMode from "./QuizMode";
import FinalReport from "./FinalReport";

const tabs = [
  { id: "intro", label: "🏠 홈" },
  { id: "body", label: "🫀 신체지도" },
  { id: "bp", label: "💧 혈압" },
  { id: "rootcause", label: "🔍 근본원인" },
  { id: "chol", label: "🔬 콜레스테롤" },
  { id: "ratio", label: "📊 비율계산" },
  { id: "statin", label: "💊 스타틴" },
  { id: "stats", label: "🎮 통계게임" },
  { id: "lifestyle", label: "🌿 생활습관" },
  { id: "nutrient", label: "🥗 영양소" },
  { id: "dual", label: "⚖️ 두관점" },
  { id: "quiz", label: "❓ 퀴즈" },
  { id: "report", label: "📋 보고서" },
];

export default function AppShell() {
  const [activeTab, setActiveTab] = useState("intro");
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setActiveTab("body");
  };

  if (!started || activeTab === "intro") {
    return (
      <div className="min-h-screen">
        {started && (
          <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        <IntroSection onStart={handleStart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Disclaimer bar */}
      <div
        className="text-center py-1.5 text-xs"
        style={{
          background: "rgba(245,158,11,0.08)",
          borderBottom: "1px solid rgba(245,158,11,0.2)",
          color: "#f59e0b",
        }}
      >
        ⚠️ 교육 목적 앱 — 약 복용·중단·변경은 반드시 의료 전문가와 상담하세요
      </div>

      <main className="flex-1 pb-8 cyber-grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "body" && <BodySystemMap />}
            {activeTab === "bp" && <HypertensionSimulator />}
            {activeTab === "rootcause" && <RootCauseExplorer />}
            {activeTab === "chol" && <CholesterolLab />}
            {activeTab === "ratio" && <RatioCalculator />}
            {activeTab === "statin" && <StatinPathwayExplorer />}
            {activeTab === "stats" && <StatisticsMiniGame />}
            {activeTab === "lifestyle" && <LifestyleSimulator />}
            {activeTab === "nutrient" && <NutrientExplorer />}
            {activeTab === "dual" && <DualView />}
            {activeTab === "quiz" && <QuizMode />}
            {activeTab === "report" && <FinalReport />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom nav for mobile */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

function NavBar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(10,15,30,0.95)",
        borderBottom: "1px solid #1e3a5f",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl">🔬</span>
          <span className="font-bold text-sm gradient-text whitespace-nowrap">
            만성질환 디코더
          </span>
        </div>

        {/* Desktop tabs - scrollable */}
        <nav className="flex gap-1 overflow-x-auto flex-1 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

const mobileNavTabs = [
  { id: "body", label: "신체", icon: "🫀" },
  { id: "bp", label: "혈압", icon: "💧" },
  { id: "chol", label: "콜레", icon: "🔬" },
  { id: "lifestyle", label: "생활", icon: "🌿" },
  { id: "quiz", label: "퀴즈", icon: "❓" },
];

function BottomNav({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-50 flex"
      style={{
        background: "rgba(10,15,30,0.98)",
        borderTop: "1px solid #1e3a5f",
        backdropFilter: "blur(10px)",
      }}
    >
      {mobileNavTabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTab(t.id)}
          className="flex-1 py-3 flex flex-col items-center gap-0.5 transition-all"
          style={{
            color: activeTab === t.id ? "#00d4ff" : "#64748b",
            fontSize: "10px",
          }}
        >
          <span className="text-xl">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
