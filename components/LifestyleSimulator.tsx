"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { lifestyleHabits } from "@/data/educationData";

const metrics = [
  { id: "insulin", label: "인슐린 저항성", icon: "📊", invertLabel: true },
  { id: "inflammation", label: "염증 수준", icon: "🔥", invertLabel: true },
  { id: "triglycerides", label: "중성지방", icon: "💛", invertLabel: true },
  { id: "vascular", label: "혈관 유연성", icon: "🔄", invertLabel: false },
  { id: "bp", label: "혈압 부하", icon: "❤️", invertLabel: true },
  { id: "metabolic", label: "대사 건강 점수", icon: "⭐", invertLabel: false },
];

export default function LifestyleSimulator() {
  const [activeHabits, setActiveHabits] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setActiveHabits((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const scores = useMemo(() => {
    const base: Record<string, number> = {
      insulin: 0, inflammation: 0, triglycerides: 0,
      vascular: 0, bp: 0, metabolic: 0,
    };
    lifestyleHabits.forEach((h) => {
      if (activeHabits.has(h.id)) {
        Object.entries(h.effects).forEach(([k, v]) => {
          base[k] = Math.min(100, (base[k] || 0) + v);
        });
      }
    });
    return base;
  }, [activeHabits]);

  const totalScore = Math.round(scores.metabolic);

  const getBarColor = (id: string, value: number) => {
    const isGoodHigh = ["vascular", "metabolic"].includes(id);
    if (isGoodHigh) {
      if (value >= 60) return "#10b981";
      if (value >= 30) return "#f59e0b";
      return "#ef4444";
    } else {
      if (value >= 60) return "#ef4444";
      if (value >= 30) return "#f59e0b";
      return "#10b981";
    }
  };

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">생활습관 시뮬레이터</h2>
        <p className="text-[#94a3b8] text-sm">
          습관을 활성화하면 건강 지표가 어떻게 변하는지 시각적으로 확인해보세요.
        </p>
      </div>

      {/* Score circle */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="60" fill="none" stroke="#1e3a5f" strokeWidth="12" />
            <circle
              cx="70" cy="70" r="60"
              fill="none"
              stroke={totalScore >= 60 ? "#10b981" : totalScore >= 30 ? "#f59e0b" : "#ef4444"}
              strokeWidth="12"
              strokeDasharray={`${(totalScore / 100) * 377} 377`}
              strokeDashoffset="94"
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.6s ease, stroke 0.6s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="text-3xl font-bold"
              style={{ color: totalScore >= 60 ? "#10b981" : totalScore >= 30 ? "#f59e0b" : "#64748b" }}
            >
              {totalScore}
            </div>
            <div className="text-[#94a3b8] text-xs">대사 건강</div>
          </div>
        </div>
      </div>

      {/* Habits */}
      <div className="glow-card p-5 mb-5">
        <h3 className="text-[#e2e8f0] font-semibold mb-3 text-sm">
          습관 선택 ({activeHabits.size}/{lifestyleHabits.length})
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {lifestyleHabits.map((h) => {
            const active = activeHabits.has(h.id);
            return (
              <motion.button
                key={h.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggle(h.id)}
                className="p-3 rounded-xl text-center transition-all cursor-pointer text-xs"
                style={{
                  background: active ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active ? "#00d4ff" : "#1e3a5f"}`,
                  color: active ? "#00d4ff" : "#94a3b8",
                }}
              >
                <div className="text-xl mb-1">{h.icon}</div>
                <div className="leading-tight font-medium">{h.label}</div>
                {active && <div className="text-xs mt-1">✓</div>}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Metrics */}
      <div className="glow-card p-5">
        <h3 className="text-[#e2e8f0] font-semibold mb-4 text-sm">건강 지표 변화</h3>
        <div className="space-y-4">
          {metrics.map((m) => {
            const value = scores[m.id] || 0;
            const barColor = getBarColor(m.id, value);
            const isGoodHigh = !m.invertLabel;
            return (
              <div key={m.id}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{m.icon}</span>
                    <span className="text-[#e2e8f0] text-xs font-medium">{m.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: barColor }}>
                      {isGoodHigh ? (value >= 60 ? "좋음" : value >= 30 ? "보통" : "낮음") :
                        (value >= 60 ? "높음 ⚠️" : value >= 30 ? "보통" : "좋음")}
                    </span>
                    <span className="text-[#64748b] text-xs w-8 text-right">
                      {value > 0 ? `+${value}` : "-"}
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: barColor }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 disclaimer-box">
        <p className="text-[#f59e0b] text-xs">
          ⚠️ 이 시뮬레이션은 교육적 패턴을 보여주기 위한 것입니다. 실제 건강 변화는 개인차가 크며, 생활습관 변화는 의료 전문가와 상의하여 진행하세요.
        </p>
      </div>
    </div>
  );
}
