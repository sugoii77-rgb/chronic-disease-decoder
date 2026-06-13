"use client";
import { motion } from "framer-motion";

const systems = [
  "혈관 탄성과 내피세포 기능",
  "심장 박출량과 혈압 조절",
  "간의 콜레스테롤 합성",
  "췌장/인슐린 시스템",
  "신장의 수분·나트륨 균형",
  "뇌/자율신경계 스트레스 반응",
  "지방조직의 염증 신호",
];

const rootCauses = [
  "인슐린 저항성과 고인슐린혈증",
  "내장지방과 만성 염증",
  "운동 부족과 혈관 경직",
  "영양소 결핍 (마그네슘, 칼륨, 비타민 K2 등)",
  "만성 스트레스와 교감신경 과활성화",
  "수면 부족과 코르티솔 상승",
];

const bestHabits = [
  { icon: "🏃", habit: "규칙적인 유산소 + 근력 운동" },
  { icon: "🥗", habit: "정제 탄수화물·초가공식품 줄이기" },
  { icon: "😴", habit: "7-9시간 질 좋은 수면" },
  { icon: "🧘", habit: "스트레스 관리 (명상, 호흡, 자연)" },
  { icon: "☀️", habit: "햇빛 노출로 비타민 D·산화질소" },
  { icon: "⚖️", habit: "건강한 체중 유지" },
];

const doctorQuestions = [
  "제 절대적 위험도(ARR)는 얼마인가요? (상대적 위험 감소만 아닌)",
  "제 중성지방/HDL 비율과 HDL/총콜레스테롤 비율은 어떤가요?",
  "인슐린 저항성이나 당뇨 전단계의 징후가 있나요? (공복 인슐린, HbA1c 확인)",
  "생활습관 개선으로 시간이 지나면서 약물 용량을 조정할 가능성이 있나요?",
  "스타틴 복용 중이라면 CoQ10, 혈당, 간 효소, 근육 증상을 모니터링해야 하나요?",
  "제 혈압의 원인이 무엇인지 — 혈액량, 혈관 탄성, 스트레스 중 어느 쪽인지 알 수 있을까요?",
];

export default function FinalReport() {
  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">나의 학습 보고서</h2>
        <p className="text-[#94a3b8] text-sm">
          이 앱에서 배운 핵심 내용을 정리해드립니다.
        </p>
      </div>

      {/* Completion badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-6 p-6 rounded-xl"
        style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))", border: "1px solid rgba(0,212,255,0.3)" }}
      >
        <div className="text-5xl mb-3 animate-float">🔬</div>
        <h3 className="text-2xl font-bold gradient-text mb-1">만성질환 탐색 완료!</h3>
        <p className="text-[#94a3b8] text-sm">이제 의사와 더 깊은 대화를 나눌 준비가 되었습니다</p>
      </motion.div>

      <div className="space-y-4">
        {/* Systems learned */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glow-card p-5"
        >
          <h3 className="text-[#00d4ff] font-semibold mb-3">✅ 학습한 핵심 시스템</h3>
          <ul className="space-y-2">
            {systems.map((s, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                  style={{ background: "rgba(0,212,255,0.15)", color: "#00d4ff" }}>✓</span>
                {s}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Root causes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glow-card p-5"
        >
          <h3 className="text-[#7c3aed] font-semibold mb-3">🔍 탐구한 주요 근본 원인</h3>
          <ul className="space-y-2">
            {rootCauses.map((c, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                  style={{ background: "rgba(124,58,237,0.15)", color: "#7c3aed" }}>{i + 1}</span>
                {c}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Best habits */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glow-card p-5"
        >
          <h3 className="text-[#10b981] font-semibold mb-3">🌿 지금 시작할 수 있는 습관</h3>
          <div className="grid grid-cols-2 gap-2">
            {bestHabits.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg text-xs"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <span>{h.icon}</span>
                <span className="text-[#94a3b8]">{h.habit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Medication note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="disclaimer-box"
        >
          <h3 className="text-[#f59e0b] font-semibold mb-2">⚠️ 약물 관련 핵심 요약</h3>
          <ul className="space-y-1 text-xs text-[#e2e8f0]">
            <li>• 고혈압약과 스타틴은 임상적으로 검증된 치료제입니다.</li>
            <li>• 약을 임의로 중단하거나 변경하지 마세요 — 반드시 의사와 상의하세요.</li>
            <li>• 부작용이 의심되면 즉시 의사에게 알리세요.</li>
            <li>• 생활습관 개선으로 약물 필요성이 줄어들 가능성을 의사와 함께 탐구하세요.</li>
          </ul>
        </motion.div>

        {/* Doctor questions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glow-card p-5"
          style={{ borderColor: "#00d4ff" }}
        >
          <h3 className="text-[#00d4ff] font-semibold mb-3">💬 의사에게 꼭 물어보세요</h3>
          <ul className="space-y-3">
            {doctorQuestions.map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-2 p-3 rounded-lg text-xs"
                style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.12)" }}
              >
                <span className="text-[#00d4ff] font-bold flex-shrink-0">Q{i + 1}.</span>
                <span className="text-[#94a3b8] leading-relaxed">{q}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Key message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl p-5 text-center"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(16,185,129,0.1))", border: "1px solid rgba(16,185,129,0.3)" }}
        >
          <div className="text-3xl mb-3">💡</div>
          <p className="text-[#10b981] font-bold mb-2">이 앱의 핵심 메시지</p>
          <p className="text-[#94a3b8] text-sm leading-relaxed">
            "숫자도 중요합니다. 그리고 그 숫자의 <span className="text-[#e2e8f0]">근본 원인을 이해하는 것</span>도 중요합니다.<br />
            <span className="text-[#00d4ff]">약을 끊으라는 게 아니라,</span> 더 좋은 질문을 할 수 있게 하는 앱입니다."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
