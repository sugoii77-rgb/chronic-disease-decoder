"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rootCauses } from "@/data/educationData";

export default function RootCauseExplorer() {
  const [selected, setSelected] = useState<string | null>(null);

  const cause = rootCauses.find((c) => c.id === selected);

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">근본 원인 탐색기</h2>
        <p className="text-[#94a3b8] text-sm">
          고혈압의 가능한 근본 원인들을 탐구해보세요. 카드를 클릭하면 메커니즘을 볼 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {rootCauses.map((c) => (
          <motion.button
            key={c.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(selected === c.id ? null : c.id)}
            className={`glow-card p-4 text-left transition-all cursor-pointer ${
              selected === c.id ? "glow-card-active" : ""
            }`}
            style={selected === c.id ? { borderColor: c.color } : {}}
          >
            <div className="text-2xl mb-2">{c.icon}</div>
            <div
              className="text-xs font-semibold leading-tight"
              style={{ color: selected === c.id ? c.color : "#e2e8f0" }}
            >
              {c.title}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {cause && (
          <motion.div
            key={cause.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="glow-card p-5" style={{ borderColor: cause.color }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{cause.icon}</span>
                <h3 className="font-bold text-lg" style={{ color: cause.color }}>
                  {cause.title}
                </h3>
              </div>
              <p className="text-[#e2e8f0] text-sm mb-4">{cause.summary}</p>

              <div
                className="rounded-lg p-3 mb-4"
                style={{
                  background: `${cause.color}0d`,
                  border: `1px solid ${cause.color}33`,
                }}
              >
                <p className="text-xs font-semibold mb-1" style={{ color: cause.color }}>
                  🔬 메커니즘 (간단히)
                </p>
                <p className="text-[#94a3b8] text-xs leading-relaxed">
                  {cause.mechanism}
                </p>
              </div>

              <div className="rounded-lg p-3 mb-4" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-xs font-semibold text-[#e2e8f0] mb-1">
                  💬 쉽게 이해하기
                </p>
                <p className="text-[#94a3b8] text-xs leading-relaxed">
                  {cause.plainLanguage}
                </p>
              </div>

              <div>
                <p className="text-[#10b981] text-xs font-semibold mb-2">
                  ✅ 도움이 될 수 있는 습관
                </p>
                <ul className="space-y-1">
                  {cause.habits.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs text-[#94a3b8]"
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                        style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}
                      >
                        {i + 1}
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="disclaimer-box text-xs text-[#f59e0b]">
              ⚠️ 이 내용은 교육 목적입니다. 생활습관 변화는 의료 전문가와 상의하여 진행하세요.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && (
        <div className="glow-card p-5 text-center">
          <div className="text-3xl mb-2">👆</div>
          <p className="text-[#94a3b8] text-sm">카드를 클릭해서 각 원인의 메커니즘을 알아보세요</p>
        </div>
      )}
    </div>
  );
}
