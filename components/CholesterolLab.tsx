"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  { icon: "🧠", title: "뇌·신경 지지", desc: "뇌 건조 중량의 약 60%가 지방이며, 콜레스테롤은 신경세포 절연체(미엘린)의 핵심 성분입니다." },
  { icon: "🔲", title: "세포막 구조", desc: "모든 세포막은 콜레스테롤을 포함하여 막의 유동성과 구조를 유지합니다." },
  { icon: "⚗️", title: "호르몬 생산", desc: "에스트로겐, 테스토스테론, 코르티솔, 비타민 D... 모두 콜레스테롤에서 만들어집니다." },
  { icon: "🟡", title: "담즙 생산", desc: "간은 콜레스테롤로 담즙을 만들어 지방 소화를 돕습니다. 콜레스테롤 제거의 주요 경로이기도 합니다." },
  { icon: "🩹", title: "혈관 수리 반응", desc: "혈관 내막이 손상되면 콜레스테롤이 수리 재료로 보내질 수 있습니다. '수리대'가 아니라 '왜 손상됐는지'가 핵심 질문입니다." },
];

export default function CholesterolLab() {
  const [activeRole, setActiveRole] = useState<number | null>(null);
  const [showAnalogy, setShowAnalogy] = useState(false);

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">콜레스테롤 교육 실험실</h2>
        <p className="text-[#94a3b8] text-sm">
          콜레스테롤은 단순히 낮춰야 할 숫자가 아닙니다. 생명에 필수적인 물질입니다.
        </p>
      </div>

      {/* Analogy */}
      <motion.div
        className="glow-card p-5 mb-6 cursor-pointer"
        onClick={() => setShowAnalogy(!showAnalogy)}
        whileTap={{ scale: 0.99 }}
        style={{ borderColor: showAnalogy ? "#f59e0b" : undefined }}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[#f59e0b] font-bold">🛣️ 도로 수리 비유</h3>
          <span className="text-[#64748b] text-sm">{showAnalogy ? "▲" : "▼"}</span>
        </div>
        <p className="text-[#94a3b8] text-sm">
          콜레스테롤은 마치 <strong className="text-[#e2e8f0]">손상된 도로에 보내는 수리 재료</strong>와 같습니다.
        </p>
        <AnimatePresence>
          {showAnalogy && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3">
                {/* Road animation */}
                <div
                  className="relative h-16 rounded-lg overflow-hidden"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                  <div className="absolute inset-0 flex items-center px-4">
                    <div className="text-xs text-[#ef4444] font-medium">손상된 혈관 내막</div>
                  </div>
                  {/* Cholesterol particles moving toward damage */}
                  {[0, 0.7, 1.4].map((delay, i) => (
                    <div
                      key={i}
                      className="blood-particle absolute"
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "#f59e0b",
                        top: "50%",
                        transform: "translateY(-50%)",
                        animationDelay: `${delay}s`,
                        animationDuration: "2s",
                      }}
                    />
                  ))}
                </div>
                <p className="text-[#94a3b8] text-xs leading-relaxed">
                  진짜 질문: <span className="text-[#00d4ff]">왜 도로(혈관)가 손상되고 있는가?</span><br />
                  만성 염증, 산화 스트레스, 고혈당이 혈관 내막을 손상시키고 → LDL이 그 틈으로 들어가 → 산화되면 → 면역세포가 제거하려 하지만 → 이 과정이 플라크를 형성합니다.
                </p>
                <div
                  className="rounded-lg p-3"
                  style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}
                >
                  <p className="text-[#00d4ff] text-xs font-semibold">
                    💡 핵심 통찰: LDL 수치를 낮추는 것과 혈관이 손상되지 않도록 하는 것, 두 가지 모두 중요할 수 있습니다.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Essential Roles */}
      <div className="mb-6">
        <h3 className="text-[#e2e8f0] font-semibold mb-3 text-sm">콜레스테롤의 필수 역할 5가지</h3>
        <div className="space-y-3">
          {roles.map((role, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveRole(activeRole === i ? null : i)}
              className={`w-full glow-card p-4 text-left transition-all ${
                activeRole === i ? "glow-card-active" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{role.icon}</span>
                <div className="flex-1">
                  <div className="text-[#e2e8f0] text-sm font-medium">{role.title}</div>
                  <AnimatePresence>
                    {activeRole === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-[#94a3b8] text-xs mt-2 leading-relaxed overflow-hidden"
                      >
                        {role.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-[#64748b] text-xs">{activeRole === i ? "▲" : "▼"}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* LDL vs HDL */}
      <div className="glow-card p-5">
        <h3 className="text-[#00d4ff] font-semibold mb-4">LDL vs HDL — 운반체 이야기</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg p-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
            <div className="text-2xl mb-2">🚚</div>
            <div className="text-[#ef4444] font-medium text-sm mb-1">LDL</div>
            <div className="text-[#94a3b8] text-xs">간 → 조직으로 콜레스테롤 운반. 작고 산화된 LDL 입자가 특히 문제가 될 수 있음.</div>
          </div>
          <div className="rounded-lg p-3" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}>
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-[#10b981] font-medium text-sm mb-1">HDL</div>
            <div className="text-[#94a3b8] text-xs">조직 → 간으로 콜레스테롤 회수. '청소차' 역할. 높을수록 일반적으로 유리.</div>
          </div>
        </div>
        <div
          className="mt-3 rounded-lg p-3 text-xs"
          style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}
        >
          <span className="text-[#00d4ff] font-medium">💡 최신 관점:</span>
          <span className="text-[#94a3b8]"> 총 LDL 숫자보다 중성지방/HDL 비율, 소립자 LDL 비율, 염증 지표(CRP 등)가 위험도를 더 잘 반영할 수 있다는 연구들이 있습니다.</span>
        </div>
        <p className="text-[#64748b] text-xs mt-2 italic">* 이 내용은 의학적 진단이 아닌 교육용입니다.</p>
      </div>
    </div>
  );
}
