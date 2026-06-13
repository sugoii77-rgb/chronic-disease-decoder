"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hypertensionFactors, type MedicationDetail } from "@/data/educationData";

const severityConfig = {
  mild:     { color: "#94a3b8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)", label: "경미" },
  moderate: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)",  label: "주의" },
  severe:   { color: "#ef4444", bg: "rgba(239,68,68,0.10)",   border: "rgba(239,68,68,0.25)",  label: "중요" },
};

function MedCard({ med }: { med: MedicationDetail }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.06)" }}
    >
      {/* Header */}
      <button
        className="w-full flex items-start justify-between gap-3 p-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#7c3aed] text-sm font-bold">💊 {med.name}</span>
          </div>
          <p className="text-[#64748b] text-xs mt-0.5 truncate">{med.english}</p>
          <p className="text-[#f59e0b] text-xs mt-0.5">
            🏷️ <span className="text-[#94a3b8]">{med.brands}</span>
          </p>
        </div>
        <span className="text-[#64748b] text-xs flex-shrink-0 mt-1">{open ? "▲" : "▼"} 상세보기</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Action */}
              <div className="rounded-lg p-3" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}>
                <p className="text-[#00d4ff] text-xs font-semibold mb-1">⚙️ 작용 기전</p>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{med.action}</p>
              </div>

              {/* Side effects */}
              <div>
                <p className="text-[#f59e0b] text-xs font-semibold mb-2">⚠️ 부작용 가능성</p>
                <div className="space-y-1.5">
                  {med.sideEffects.map((se, i) => {
                    const cfg = severityConfig[se.severity];
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-lg px-3 py-2"
                        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                      >
                        <span
                          className="text-xs px-1.5 py-0.5 rounded flex-shrink-0 font-medium"
                          style={{ background: cfg.border, color: cfg.color }}
                        >
                          {cfg.label}
                        </span>
                        <span className="text-xs leading-relaxed" style={{ color: cfg.color }}>
                          {se.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Note */}
              {med.note && (
                <div className="rounded-lg p-3" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <p className="text-[#10b981] text-xs font-semibold mb-1">📌 임상 메모</p>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{med.note}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 나이 → 혈관 탄성 경직도 (0=완전탄력, 100=완전경직)
// 근거: 동맥경화·PWV 연구 기반 추정값 (교육용)
// 20대 평균 PWV ~6m/s → 경직도 낮음, 70대 ~12m/s → 경직도 높음
function ageToElasticity(age: number): number {
  if (age <= 20) return 10;
  if (age >= 80) return 85;
  // 20~80세: 선형 증가 (10 → 85)
  return Math.round(10 + ((age - 20) / 60) * 75);
}

function elasticityLabel(pct: number): string {
  if (pct <= 20) return "매우 탄력적 (젊은 혈관)";
  if (pct <= 35) return "탄력적";
  if (pct <= 50) return "약간 경직";
  if (pct <= 65) return "경직 (동맥경화 초기)";
  if (pct <= 78) return "상당히 경직";
  return "심한 경직 (동맥경화 진행)";
}

export default function HypertensionSimulator() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliders, setSliders] = useState<Record<string, number>>({
    volume: 50, diameter: 50, cardiac: 50,
  });
  const [age, setAge] = useState(45);
  const [showMed, setShowMed] = useState(false);

  const factor = hypertensionFactors[activeTab];
  const elasticity = ageToElasticity(age); // 0~100, 높을수록 경직

  const computeBP = () => {
    const v = sliders.volume / 100;
    const e = elasticity / 100;          // 경직도 직접 사용
    const d = sliders.diameter / 100;
    const c = sliders.cardiac / 100;
    return {
      systolic:  Math.round(100 + v * 30 + e * 30 + d * 20 + c * 20),
      diastolic: Math.round(65  + v * 15 + e * 15 + d * 10 + c * 10),
    };
  };

  const bp = computeBP();
  const bpColor = bp.systolic >= 140 ? "#ef4444" : bp.systolic >= 130 ? "#f59e0b" : "#10b981";

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">혈압 시뮬레이터</h2>
        <p className="text-[#94a3b8] text-sm">혈압에 영향을 주는 4가지 핵심 요소와 한국에서 처방되는 주요 약물을 탐구해보세요.</p>
      </div>

      {/* BP Display */}
      <div className="glow-card p-5 mb-5 text-center animate-pulse-glow">
        <p className="text-[#94a3b8] text-xs mb-1">현재 시뮬레이션 혈압</p>
        <div className="text-5xl font-bold" style={{ color: bpColor }}>
          {bp.systolic}<span className="text-2xl text-[#94a3b8]"> / </span>{bp.diastolic}
        </div>
        <p className="text-xs mt-1" style={{ color: bpColor }}>
          {bp.systolic >= 140 ? "🔴 고혈압 범위" : bp.systolic >= 130 ? "🟡 주의 범위" : "🟢 정상 범위"}{" "}
          (교육용 시뮬레이션)
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {hypertensionFactors.map((f, i) => (
          <button key={f.id} onClick={() => { setActiveTab(i); setShowMed(false); }}
            className={`tab-btn ${activeTab === i ? "active" : ""}`}>
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={factor.id}
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>

          <div className="glow-card p-5 mb-4">
            <h3 className="text-[#00d4ff] font-bold mb-2">{factor.title}</h3>
            <p className="text-[#94a3b8] text-sm mb-4">{factor.description}</p>

            {/* Slider / Age Input */}
            {factor.id === "elasticity" ? (
              <div className="mb-4">
                {/* Age input */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#64748b]">나이로 혈관 탄성 자동 계산</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setAge(a => Math.max(10, a - 1))}
                      className="w-7 h-7 rounded-full text-sm font-bold flex items-center justify-center"
                      style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}>−</button>
                    <span className="text-[#e2e8f0] font-bold text-xl w-14 text-center">{age}세</span>
                    <button onClick={() => setAge(a => Math.min(90, a + 1))}
                      className="w-7 h-7 rounded-full text-sm font-bold flex items-center justify-center"
                      style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}>+</button>
                  </div>
                </div>
                <input type="range" min={10} max={90} value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer mb-3" />
                {/* Result badge */}
                <div className="rounded-lg p-3 flex items-center justify-between"
                  style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.3)" }}>
                  <div>
                    <p className="text-[#7c3aed] text-xs font-semibold">📊 추정 혈관 탄성 (교육용)</p>
                    <p className="text-[#e2e8f0] text-sm font-bold mt-0.5">{elasticityLabel(elasticity)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#64748b]">경직도 지수</p>
                    <p className="text-[#7c3aed] font-bold text-lg">{elasticity}<span className="text-xs">/100</span></p>
                  </div>
                </div>
                <p className="text-[#64748b] text-xs mt-2">* 나이는 대표적인 예측 인자입니다. 운동·식단·흡연·당뇨에 따라 실제 혈관 나이는 크게 달라집니다.</p>
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-[#64748b] mb-2">
                  <span>낮음</span>
                  <span className="text-[#e2e8f0] font-medium">{factor.label}: {sliders[factor.id]}%</span>
                  <span>높음</span>
                </div>
                <input type="range" min={0} max={100} value={sliders[factor.id]}
                  onChange={(e) => setSliders((prev) => ({ ...prev, [factor.id]: Number(e.target.value) }))}
                  className="w-full accent-cyan-400 cursor-pointer" />
              </div>
            )}

            {/* Mechanism */}
            <div className="rounded-lg p-3 mb-4 text-xs leading-relaxed"
              style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <span className="text-[#00d4ff] font-medium">메커니즘: </span>
              <span className="text-[#94a3b8]">{factor.mechanism}</span>
            </div>

            {/* Lifestyle */}
            <div className="mb-4">
              <p className="text-[#10b981] text-xs font-semibold mb-2">🌿 생활습관 요인</p>
              <div className="flex flex-wrap gap-2">
                {factor.lifestyleFactors.map((lf, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}>
                    {lf}
                  </span>
                ))}
              </div>
            </div>

            {/* Medications toggle */}
            <button onClick={() => setShowMed(!showMed)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: showMed ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.35)", color: "#7c3aed" }}>
              <span>💊 관련 약물 상세 보기 (한국 처방 기준, 교육용)</span>
              <span>{showMed ? "▲" : "▼"} {factor.medications.length}종</span>
            </button>

            <AnimatePresence>
              {showMed && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="mt-3 space-y-3">
                    {(factor.medications as MedicationDetail[]).map((med, i) => (
                      <MedCard key={i} med={med} />
                    ))}
                    <div className="rounded-lg p-3" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                      <p className="text-[#f59e0b] text-xs">
                        ⚠️ 부작용 발생 빈도와 정도는 개인차가 큽니다. 이 내용은 교육용이며, 약물 결정은 반드시 담당 의사·약사와 상담하세요.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Visual vessel */}
      <div className="glow-card p-5">
        <p className="text-[#94a3b8] text-xs mb-3">혈관 상태 시각화 (교육용)</p>
        <div className="relative h-12 flex items-center">
          <div className="w-full rounded-full relative overflow-hidden"
            style={{ height: `${Math.max(16, 48 - sliders.diameter * 0.3)}px`,
              background: "rgba(239,68,68,0.15)", border: "2px solid rgba(239,68,68,0.4)", transition: "height 0.4s ease" }}>
            {[0, 0.5, 1].map((delay, i) => (
              <div key={i} className="blood-particle absolute rounded-full"
                style={{ width: 10, height: 10, background: "#ef4444", top: "50%", transform: "translateY(-50%)",
                  animationDelay: `${delay}s`, animationDuration: `${Math.max(0.8, 2 - sliders.cardiac / 80)}s` }} />
            ))}
          </div>
        </div>
        <p className="text-[#64748b] text-xs mt-2 text-center">슬라이더를 움직이면 혈압 수치와 혈관 상태가 변합니다</p>
      </div>
    </div>
  );
}
