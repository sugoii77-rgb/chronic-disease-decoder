"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hypertensionFactors } from "@/data/educationData";

export default function HypertensionSimulator() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliders, setSliders] = useState<Record<string, number>>({
    volume: 50,
    elasticity: 50,
    diameter: 50,
    cardiac: 50,
  });
  const [showMed, setShowMed] = useState(false);

  const factor = hypertensionFactors[activeTab];

  const computeBP = () => {
    const v = sliders.volume / 100;
    const e = 1 - sliders.elasticity / 100;
    const d = sliders.diameter / 100;
    const c = sliders.cardiac / 100;
    const systolic = Math.round(100 + v * 30 + e * 30 + d * 20 + c * 20);
    const diastolic = Math.round(65 + v * 15 + e * 15 + d * 10 + c * 10);
    return { systolic, diastolic };
  };

  const bp = computeBP();
  const bpColor =
    bp.systolic >= 140
      ? "#ef4444"
      : bp.systolic >= 130
      ? "#f59e0b"
      : "#10b981";

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">혈압 시뮬레이터</h2>
        <p className="text-[#94a3b8] text-sm">
          혈압에 영향을 주는 4가지 핵심 요소를 탐구해보세요.
        </p>
      </div>

      {/* BP Display */}
      <div className="glow-card p-5 mb-5 text-center animate-pulse-glow">
        <p className="text-[#94a3b8] text-xs mb-1">현재 시뮬레이션 혈압</p>
        <div className="text-5xl font-bold" style={{ color: bpColor }}>
          {bp.systolic}
          <span className="text-2xl text-[#94a3b8]"> / </span>
          {bp.diastolic}
        </div>
        <p className="text-xs mt-1" style={{ color: bpColor }}>
          {bp.systolic >= 140
            ? "🔴 고혈압 범위"
            : bp.systolic >= 130
            ? "🟡 주의 범위"
            : "🟢 정상 범위"}{" "}
          (교육용 시뮬레이션)
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {hypertensionFactors.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setActiveTab(i)}
            className={`tab-btn ${activeTab === i ? "active" : ""}`}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={factor.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="glow-card p-5 mb-4">
            <h3 className="text-[#00d4ff] font-bold mb-2">{factor.title}</h3>
            <p className="text-[#94a3b8] text-sm mb-4">{factor.description}</p>

            {/* Slider */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-[#64748b] mb-2">
                <span>낮음</span>
                <span className="text-[#e2e8f0] font-medium">
                  {factor.label}: {sliders[factor.id]}%
                </span>
                <span>높음</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={sliders[factor.id]}
                onChange={(e) =>
                  setSliders((prev) => ({
                    ...prev,
                    [factor.id]: Number(e.target.value),
                  }))
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Mechanism */}
            <div
              className="rounded-lg p-3 mb-4 text-xs leading-relaxed"
              style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              <span className="text-[#00d4ff] font-medium">메커니즘: </span>
              <span className="text-[#94a3b8]">{factor.mechanism}</span>
            </div>

            {/* Lifestyle */}
            <div className="mb-3">
              <p className="text-[#10b981] text-xs font-semibold mb-2">🌿 생활습관 요인</p>
              <div className="flex flex-wrap gap-2">
                {factor.lifestyleFactors.map((f, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      color: "#10b981",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Medications toggle */}
            <button
              onClick={() => setShowMed(!showMed)}
              className="text-xs text-[#7c3aed] underline hover:no-underline"
            >
              {showMed ? "▲ 약물 정보 숨기기" : "▼ 관련 약물 보기 (교육용)"}
            </button>

            <AnimatePresence>
              {showMed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2">
                    {factor.medications.map((med, i) => (
                      <div
                        key={i}
                        className="text-xs p-2 rounded"
                        style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}
                      >
                        <span className="text-[#7c3aed]">💊 </span>
                        <span className="text-[#e2e8f0]">{med}</span>
                      </div>
                    ))}
                    <div
                      className="text-xs p-2 rounded"
                      style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
                    >
                      <span className="text-[#f59e0b]">⚠️ 부작용 가능성: </span>
                      <span className="text-[#94a3b8]">{factor.medicationNote}</span>
                    </div>
                    <p className="text-[#64748b] text-xs italic">
                      * 약물 관련 결정은 반드시 의료 전문가와 상담하세요.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Visual vessel animation */}
      <div className="glow-card p-5">
        <p className="text-[#94a3b8] text-xs mb-3">혈관 상태 시각화 (교육용)</p>
        <div className="relative h-12 flex items-center">
          <div
            className="w-full rounded-full relative overflow-hidden"
            style={{
              height: `${Math.max(16, 48 - sliders.diameter * 0.3)}px`,
              background: "rgba(239,68,68,0.15)",
              border: "2px solid rgba(239,68,68,0.4)",
              transition: "height 0.4s ease",
            }}
          >
            {[0, 0.5, 1].map((delay, i) => (
              <div
                key={i}
                className="blood-particle absolute rounded-full"
                style={{
                  width: 10,
                  height: 10,
                  background: "#ef4444",
                  top: "50%",
                  transform: "translateY(-50%)",
                  animationDelay: `${delay}s`,
                  animationDuration: `${Math.max(0.8, 2 - sliders.cardiac / 80)}s`,
                }}
              />
            ))}
          </div>
        </div>
        <p className="text-[#64748b] text-xs mt-2 text-center">
          슬라이더를 움직이면 혈압 수치와 혈관 상태가 변합니다
        </p>
      </div>
    </div>
  );
}
