"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nutrients } from "@/data/educationData";

export default function NutrientExplorer() {
  const [selected, setSelected] = useState<string | null>(null);

  const nutrient = nutrients.find((n) => n.id === selected);

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">영양소 & 식품 탐색기</h2>
        <p className="text-[#94a3b8] text-sm">
          혈압, 콜레스테롤, 혈관 건강에 관련된 핵심 영양소들을 알아보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {nutrients.map((n) => (
          <motion.button
            key={n.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(selected === n.id ? null : n.id)}
            className={`glow-card p-4 text-center transition-all cursor-pointer ${
              selected === n.id ? "glow-card-active" : ""
            }`}
            style={selected === n.id ? { borderColor: n.color } : {}}
          >
            <div className="text-3xl mb-2">{n.icon}</div>
            <div
              className="text-xs font-medium leading-tight"
              style={{ color: selected === n.id ? n.color : "#e2e8f0" }}
            >
              {n.title}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {nutrient && (
          <motion.div
            key={nutrient.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="glow-card p-5" style={{ borderColor: nutrient.color }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{nutrient.icon}</span>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: nutrient.color }}>
                    {nutrient.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg p-3" style={{ background: `${nutrient.color}0d`, border: `1px solid ${nutrient.color}33` }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: nutrient.color }}>주요 역할</p>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{nutrient.role}</p>
                </div>

                <div className="rounded-lg p-3" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <p className="text-[#10b981] text-xs font-semibold mb-1">🥗 음식 공급원</p>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{nutrient.foods}</p>
                </div>

                <div className="rounded-lg p-3" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}>
                  <p className="text-[#00d4ff] text-xs font-semibold mb-1">🔗 혈압·혈관 연관성</p>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{nutrient.connection}</p>
                </div>

                <div className="rounded-lg p-3" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <p className="text-[#f59e0b] text-xs font-semibold mb-1">⚠️ 주의사항</p>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{nutrient.caution}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && (
        <div className="glow-card p-5 text-center">
          <div className="text-3xl mb-2">☝️</div>
          <p className="text-[#94a3b8] text-sm">위의 영양소 카드를 클릭해 자세한 정보를 확인하세요</p>
        </div>
      )}

      <div className="mt-6 disclaimer-box">
        <p className="text-[#f59e0b] text-xs">
          ⚠️ 영양소 보충제 복용 전에 반드시 의료 전문가와 상담하세요. 기존 약물과 상호작용이 있을 수 있습니다.
        </p>
      </div>
    </div>
  );
}
