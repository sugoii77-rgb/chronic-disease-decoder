"use client";
import { motion } from "framer-motion";

const conventional = [
  { icon: "📉", text: "혈압 수치를 목표 이하로 낮추기" },
  { icon: "📊", text: "LDL 콜레스테롤 수치 감소" },
  { icon: "💊", text: "임상적 기준에 따른 약물 치료" },
  { icon: "🔬", text: "정기적 혈액 검사로 수치 모니터링" },
  { icon: "✅", text: "검증된 치료 가이드라인 따르기" },
];

const rootCause = [
  { icon: "🎯", text: "인슐린 감수성 개선" },
  { icon: "🔥", text: "만성 염증 원인 탐색 및 감소" },
  { icon: "🩸", text: "혈관 내피 기능 및 탄성 개선" },
  { icon: "😴", text: "수면, 운동, 영양, 스트레스 종합 최적화" },
  { icon: "💪", text: "대사 복원력과 장기적 건강 향상" },
];

export default function DualView() {
  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">두 가지 관점 비교</h2>
        <p className="text-[#94a3b8] text-sm">
          두 접근법은 서로 배타적이지 않습니다. 함께 이해하는 것이 중요합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Conventional */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glow-card p-5"
          style={{ borderColor: "#00d4ff" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🏥</span>
            <h3 className="font-bold text-[#00d4ff]">기존 의학적 접근</h3>
          </div>
          <ul className="space-y-3">
            {conventional.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="text-[#94a3b8] text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
          <div
            className="mt-4 rounded-lg p-3"
            style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}
          >
            <p className="text-[#00d4ff] text-xs font-medium">강점:</p>
            <p className="text-[#94a3b8] text-xs">
              근거 기반 치료, 즉각적 위험 감소, 검증된 프로토콜로 많은 환자의 생명을 보호합니다.
            </p>
          </div>
        </motion.div>

        {/* Root Cause */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glow-card p-5"
          style={{ borderColor: "#10b981" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔍</span>
            <h3 className="font-bold text-[#10b981]">근본 원인 접근</h3>
          </div>
          <ul className="space-y-3">
            {rootCause.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="text-[#94a3b8] text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
          <div
            className="mt-4 rounded-lg p-3"
            style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}
          >
            <p className="text-[#10b981] text-xs font-medium">강점:</p>
            <p className="text-[#94a3b8] text-xs">
              질병의 원인을 다루어 장기적 건강을 개선하고, 약물 의존도를 낮출 가능성을 탐구합니다.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bridge message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl p-5 mb-5"
        style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08))", border: "1px solid rgba(0,212,255,0.2)" }}
      >
        <div className="text-center">
          <div className="text-3xl mb-3">🤝</div>
          <h3 className="text-[#e2e8f0] font-bold mb-2">두 접근법은 함께 중요합니다</h3>
          <p className="text-[#94a3b8] text-sm leading-relaxed">
            응급 위험 관리(약물치료)와 근본 원인 개선(생활습관)은 서로를 배제하지 않습니다.
            좋은 의사는 이 두 가지를 함께 논의합니다.
            약물로 위험을 관리하면서, 동시에 생활습관을 개선하여 장기적으로 약물 부담을 줄이는 가능성을 탐구하는 것이 이상적인 접근일 수 있습니다.
          </p>
        </div>
      </motion.div>

      {/* Timeline comparison */}
      <div className="glow-card p-5">
        <h3 className="text-[#e2e8f0] font-semibold mb-4 text-sm">시간 관점에서의 비교</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#00d4ff]">기존 접근 (단기 효과)</span>
              <span className="text-[#94a3b8]">즉각적</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: "rgba(0,212,255,0.3)", width: "90%" }} />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#10b981]">근본 원인 접근 (장기 효과)</span>
              <span className="text-[#94a3b8]">수개월~수년</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.2), rgba(16,185,129,0.8))", width: "70%" }} />
          </div>
          <p className="text-[#64748b] text-xs">
            * 생활습관 변화는 즉각적 효과는 작지만, 시간이 지날수록 복리처럼 쌓입니다.
          </p>
        </div>
      </div>

      {/* Key message */}
      <div className="mt-5 rounded-xl p-4" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}>
        <p className="text-[#10b981] text-sm font-medium text-center">
          "숫자도 중요하지만, 그 숫자의 근본 원인을 이해하는 것도 중요합니다.<br />
          약물 결정은 전문가와 함께, 생활습관은 지금 바로 시작할 수 있습니다."
        </p>
      </div>
    </div>
  );
}
