"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pathwaySteps = [
  { id: "hmgcoa", label: "HMG-CoA", color: "#00d4ff", y: 0 },
  { id: "mev", label: "메발로네이트", color: "#7c3aed", y: 1 },
  { id: "ipp", label: "이소프레노이드", color: "#f59e0b", y: 2 },
];

const branches = [
  {
    id: "chol",
    icon: "🔵",
    label: "콜레스테롤",
    color: "#00d4ff",
    desc: "세포막, 호르몬, 담즙, 신경 기능에 필수. 스타틴은 이 생산을 억제합니다.",
    concern: null,
  },
  {
    id: "coq10",
    icon: "⚡",
    label: "CoQ10",
    color: "#10b981",
    desc: "미토콘드리아에서 에너지(ATP) 생산에 필수적인 조효소. 심장 근육, 뇌, 다른 에너지 수요가 높은 조직에 중요합니다.",
    concern: "스타틴이 CoQ10 합성도 일부 억제할 수 있다는 연구가 있습니다. 일부 환자는 근육통, 피로를 경험하며 이것이 CoQ10 감소와 연관될 수 있다고 합니다.",
  },
  {
    id: "dolichol",
    icon: "🔬",
    label: "도리콜",
    color: "#7c3aed",
    desc: "단백질 글리코실화(당 부착)에 필요한 물질. 세포 신호 전달, 인슐린 수용체 기능에 관여합니다.",
    concern: "도리콜 감소가 인슐린 수용체 기능에 영향을 줄 수 있다는 이론적 메커니즘이 있습니다. 스타틴이 혈당을 약간 올릴 수 있다는 연구 결과와 연관될 수 있습니다.",
  },
  {
    id: "gg",
    icon: "🔩",
    label: "게라닐게라닐",
    color: "#f59e0b",
    desc: "세포 내 단백질 기능 조절에 관여합니다. 세포 생존, 분화 신호에 영향을 줄 수 있습니다.",
    concern: "이론적으로 세포 기능에 영향을 줄 수 있으나, 임상적 의미는 아직 연구 중입니다.",
  },
];

const sideEffects = [
  { icon: "💪", label: "근육통/근육병증", desc: "가장 흔한 부작용 중 하나. 경미한 통증부터 드물지만 심각한 횡문근용해증까지 스펙트럼이 있습니다.", severity: "moderate" },
  { icon: "😴", label: "피로감", desc: "일부 환자들이 에너지 감소를 경험합니다. CoQ10 감소와 연관될 수 있다는 가설이 있습니다.", severity: "mild" },
  { icon: "🩺", label: "혈당 상승 위험", desc: "스타틴은 제2형 당뇨 위험을 약간 높일 수 있습니다. 기존에 당뇨 전단계인 경우 더 주의가 필요할 수 있습니다.", severity: "moderate" },
  { icon: "🧠", label: "인지 관련 불편", desc: "일부 환자들이 기억력 저하, 집중력 감소를 보고합니다. 인과관계는 아직 논쟁 중입니다.", severity: "mild" },
  { icon: "⚠️", label: "횡문근용해증 (희귀)", desc: "매우 드물지만 심각한 근육 손상. 근육통 + 갈색 소변 → 즉시 의사 연락.", severity: "severe" },
];

export default function StatinPathwayExplorer() {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [showSideEffects, setShowSideEffects] = useState(false);

  const branch = branches.find((b) => b.id === selectedBranch);

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">스타틴 경로 탐색기</h2>
        <p className="text-[#94a3b8] text-sm">
          스타틴이 어떻게 작용하는지, 그리고 연결된 대사 경로를 교육적으로 탐구합니다.
        </p>
      </div>

      <div className="disclaimer-box mb-5">
        <p className="text-[#f59e0b] text-xs">
          ⚠️ 이 내용은 스타틴이 해롭다는 주장이 아닙니다. 스타틴은 많은 환자에서 심혈관 위험 감소에 효과적입니다. 이 섹션은 메커니즘과 잠재적 고려사항을 교육적으로 이해하기 위한 것입니다. 약물 결정은 반드시 의사와 상담하세요.
        </p>
      </div>

      {/* Pathway Diagram */}
      <div className="glow-card p-5 mb-5">
        <h3 className="text-[#00d4ff] font-semibold mb-4">메발로네이트 경로</h3>

        {/* Statin block */}
        <div className="flex items-center gap-3 mb-4 p-3 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
          <span className="text-2xl">🚫</span>
          <div>
            <div className="text-[#ef4444] font-medium text-sm">스타틴 작용점</div>
            <div className="text-[#94a3b8] text-xs">HMG-CoA 환원효소 억제 → 메발로네이트 경로 전체 감소</div>
          </div>
        </div>

        {/* Pathway */}
        <div className="flex flex-col items-start gap-1 mb-4">
          {pathwaySteps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: `${step.color}22`, border: `1px solid ${step.color}55`, color: step.color }}
              >
                {step.label}
              </div>
              {i < pathwaySteps.length - 1 && (
                <span className="text-[#64748b] text-lg">↓</span>
              )}
            </div>
          ))}
          <div className="text-[#64748b] text-lg ml-2">↓</div>
          <div className="text-xs text-[#94a3b8] ml-2">여러 분기 경로</div>
        </div>

        {/* Branches */}
        <p className="text-[#94a3b8] text-xs mb-3">이 경로에서 여러 중요한 물질들이 만들어집니다:</p>
        <div className="grid grid-cols-2 gap-2">
          {branches.map((b) => (
            <motion.button
              key={b.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedBranch(selectedBranch === b.id ? null : b.id)}
              className={`p-3 rounded-lg text-left transition-all cursor-pointer ${
                selectedBranch === b.id ? "glow-card-active" : "glow-card"
              }`}
              style={selectedBranch === b.id ? { borderColor: b.color } : {}}
            >
              <div className="text-xl mb-1">{b.icon}</div>
              <div className="text-xs font-medium" style={{ color: b.color }}>
                {b.label}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {branch && (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glow-card p-5 mb-5"
            style={{ borderColor: branch.color }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{branch.icon}</span>
              <h4 className="font-bold" style={{ color: branch.color }}>{branch.label}</h4>
            </div>
            <p className="text-[#94a3b8] text-sm mb-3">{branch.desc}</p>
            {branch.concern && (
              <div className="rounded-lg p-3" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
                <p className="text-[#f59e0b] text-xs font-semibold mb-1">⚠️ 잠재적 고려사항</p>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{branch.concern}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Effects */}
      <div className="glow-card p-5">
        <button
          onClick={() => setShowSideEffects(!showSideEffects)}
          className="w-full flex justify-between items-center"
        >
          <h3 className="text-[#e2e8f0] font-semibold">보고된 부작용 및 우려사항</h3>
          <span className="text-[#64748b]">{showSideEffects ? "▲" : "▼"}</span>
        </button>

        <AnimatePresence>
          {showSideEffects && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3">
                {sideEffects.map((se, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-3"
                    style={{
                      background:
                        se.severity === "severe"
                          ? "rgba(239,68,68,0.1)"
                          : se.severity === "moderate"
                          ? "rgba(245,158,11,0.08)"
                          : "rgba(255,255,255,0.03)",
                      border: `1px solid ${
                        se.severity === "severe"
                          ? "rgba(239,68,68,0.3)"
                          : se.severity === "moderate"
                          ? "rgba(245,158,11,0.2)"
                          : "#1e3a5f"
                      }`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{se.icon}</span>
                      <span
                        className="text-sm font-medium"
                        style={{
                          color:
                            se.severity === "severe"
                              ? "#ef4444"
                              : se.severity === "moderate"
                              ? "#f59e0b"
                              : "#e2e8f0",
                        }}
                      >
                        {se.label}
                      </span>
                    </div>
                    <p className="text-[#94a3b8] text-xs leading-relaxed">{se.desc}</p>
                  </div>
                ))}
                <p className="text-[#64748b] text-xs italic">
                  * 이 목록은 모든 부작용을 의미하지 않으며, 발생 빈도와 개인차가 큽니다. 부작용이 의심되면 즉시 의사와 상담하세요.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
