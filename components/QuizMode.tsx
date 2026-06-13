"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/data/educationData";

export default function QuizMode() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[current];
  const isCorrect = selected === q.correct;
  const score = answers.filter((a, i) => a === quizQuestions[i].correct).length;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setAnswers(Array(quizQuestions.length).fill(null));
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="section-header">퀴즈 결과</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glow-card p-8 text-center mb-6"
        >
          <div className="text-6xl mb-4">
            {pct >= 80 ? "🏆" : pct >= 60 ? "👏" : "📚"}
          </div>
          <div className="text-5xl font-bold gradient-text mb-2">
            {score}/{quizQuestions.length}
          </div>
          <div className="text-[#94a3b8] text-lg mb-4">
            {pct}% 정답률
          </div>
          <p className="text-[#e2e8f0] text-sm">
            {pct >= 80
              ? "훌륭합니다! 만성질환의 근본 원인을 잘 이해하고 있습니다."
              : pct >= 60
              ? "좋은 시작입니다! 더 탐구해보면 더 깊이 이해할 수 있습니다."
              : "이 앱의 다른 섹션들을 더 탐구해보세요!"}
          </p>
        </motion.div>

        {/* Review */}
        <div className="space-y-3 mb-6">
          {quizQuestions.map((q, i) => (
            <div
              key={i}
              className="glow-card p-4"
              style={{ borderColor: answers[i] === q.correct ? "#10b981" : "#ef4444" }}
            >
              <div className="flex items-start gap-2">
                <span>{answers[i] === q.correct ? "✅" : "❌"}</span>
                <div>
                  <p className="text-[#e2e8f0] text-xs font-medium mb-1">{q.question}</p>
                  <p className="text-[#94a3b8] text-xs">
                    정답: {q.options[q.correct]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="w-full py-3 rounded-xl font-bold text-[#0a0f1e]"
          style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
        >
          다시 풀기
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">퀴즈 모드</h2>
        <p className="text-[#94a3b8] text-sm">배운 내용을 확인해보세요.</p>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-[#94a3b8] mb-2">
          <span>문제 {current + 1} / {quizQuestions.length}</span>
          <span>현재 점수: {score}점</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${((current) / quizQuestions.length) * 100}%`,
              background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
            }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glow-card p-5 mb-4">
            <div className="text-[#00d4ff] text-xs font-medium mb-2">Q{current + 1}</div>
            <h3 className="text-[#e2e8f0] font-semibold mb-4 leading-relaxed">{q.question}</h3>

            <div className="space-y-3">
              {q.options.map((opt, i) => {
                let borderColor = "#1e3a5f";
                let bg = "rgba(255,255,255,0.03)";
                let textColor = "#e2e8f0";

                if (showResult) {
                  if (i === q.correct) {
                    borderColor = "#10b981";
                    bg = "rgba(16,185,129,0.1)";
                    textColor = "#10b981";
                  } else if (i === selected && i !== q.correct) {
                    borderColor = "#ef4444";
                    bg = "rgba(239,68,68,0.1)";
                    textColor = "#ef4444";
                  } else {
                    textColor = "#64748b";
                  }
                } else if (selected === i) {
                  borderColor = "#00d4ff";
                  bg = "rgba(0,212,255,0.08)";
                }

                return (
                  <motion.button
                    key={i}
                    whileTap={{ scale: selected === null ? 0.98 : 1 }}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                    className="w-full text-left p-3 rounded-lg transition-all"
                    style={{ border: `1px solid ${borderColor}`, background: bg, color: textColor, cursor: selected !== null ? "default" : "pointer" }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                        style={{ background: `${borderColor}22`, border: `1px solid ${borderColor}` }}
                      >
                        {showResult && i === q.correct ? "✓" : showResult && i === selected ? "✗" : String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm">{opt}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glow-card p-4 mb-4"
              style={{ borderColor: isCorrect ? "#10b981" : "#f59e0b" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{isCorrect ? "🎉" : "📚"}</span>
                <span className="font-semibold text-sm" style={{ color: isCorrect ? "#10b981" : "#f59e0b" }}>
                  {isCorrect ? "정답입니다!" : "틀렸습니다."}
                </span>
              </div>
              <p className="text-[#94a3b8] text-xs leading-relaxed">{q.explanation}</p>
            </motion.div>
          )}

          {showResult && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="w-full py-3 rounded-xl font-bold text-[#0a0f1e]"
              style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
            >
              {current < quizQuestions.length - 1 ? "다음 문제 →" : "결과 보기 →"}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
