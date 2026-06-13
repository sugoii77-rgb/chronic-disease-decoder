"use client";
import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

export default function IntroSection({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 cyber-grid relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className="text-5xl mb-4">🔬</div>
        <h1 className="text-4xl font-bold mb-3 gradient-text">
          만성질환 디코더
        </h1>
        <p className="text-xl text-[#94a3b8] mb-2">
          혈압과 콜레스테롤, 숫자 너머의 진실
        </p>
        <p className="text-sm text-[#64748b]">Chronic Disease Decoder</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="disclaimer-box max-w-xl w-full mb-8"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-[#f59e0b] font-semibold mb-1 text-sm">교육 목적 안내</p>
            <p className="text-[#e2e8f0] text-sm leading-relaxed">
              이 앱은 <strong>교육 목적으로만</strong> 제공됩니다. 약을 시작, 중단,
              변경하려면 반드시 담당 의사나 약사와 상담하십시오. 개인 의학적 조언을
              제공하지 않습니다.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full mb-10"
      >
        {[
          {
            icon: "📊",
            title: "숫자만으로는 부족합니다",
            desc: "혈압 140/90, LDL 160... 이 숫자들은 무엇을 의미할까요? 숫자 뒤에 숨겨진 이야기가 있습니다.",
            color: "#00d4ff",
          },
          {
            icon: "🔍",
            title: "근본 원인을 탐구하세요",
            desc: "고혈압과 고콜레스테롤은 단독 문제가 아닐 수 있습니다. 인슐린 저항성, 염증, 영양, 수면이 연결되어 있습니다.",
            color: "#7c3aed",
          },
          {
            icon: "💬",
            title: "더 좋은 질문을 하세요",
            desc: "약을 끊으라는 앱이 아닙니다. 의사와 더 심층적인 대화를 나눌 수 있도록 돕는 교육 앱입니다.",
            color: "#10b981",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.15 }}
            className="glow-card p-5"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3
              className="font-semibold mb-2 text-sm"
              style={{ color: card.color }}
            >
              {card.title}
            </h3>
            <p className="text-[#94a3b8] text-xs leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center"
      >
        <button
          onClick={onStart}
          className="animate-pulse-glow px-10 py-4 rounded-xl font-bold text-[#0a0f1e] text-lg transition-transform hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
        >
          학습 시작하기 →
        </button>
        <p className="text-[#64748b] text-xs mt-4">
          모든 내용은 교육용이며 의학적 진단이 아닙니다
        </p>
      </motion.div>
    </div>
  );
}
