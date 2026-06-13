"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function StatisticsMiniGame() {
  const [total, setTotal] = useState(100);
  const [riskBefore, setRiskBefore] = useState(3);
  const [riskAfter, setRiskAfter] = useState(2);

  const arr = riskBefore - riskAfter;
  const rrr = riskBefore > 0 ? ((riskBefore - riskAfter) / riskBefore) * 100 : 0;
  const nnt = arr > 0 ? Math.round(100 / arr) : Infinity;

  const affectedBefore = Math.round((riskBefore / 100) * total);
  const affectedAfter = Math.round((riskAfter / 100) * total);
  const saved = affectedBefore - affectedAfter;

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">의학 통계 미니게임</h2>
        <p className="text-[#94a3b8] text-sm">
          같은 데이터가 어떻게 다르게 표현될 수 있는지 인터랙티브하게 배워보세요.
        </p>
      </div>

      {/* Controls */}
      <div className="glow-card p-5 mb-5">
        <h3 className="text-[#00d4ff] font-semibold mb-4">시나리오 설정</h3>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#94a3b8]">연구 참여자 수</span>
              <span className="text-[#e2e8f0] font-bold">{total}명</span>
            </div>
            <input type="range" min={50} max={1000} value={total} onChange={(e) => setTotal(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#94a3b8]">약 복용 전 위험도</span>
              <span className="text-[#ef4444] font-bold">{riskBefore}%</span>
            </div>
            <input type="range" min={1} max={30} value={riskBefore}
              onChange={(e) => { const v = Number(e.target.value); setRiskBefore(v); if (riskAfter >= v) setRiskAfter(Math.max(0, v - 1)); }}
              className="w-full accent-red-400 cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#94a3b8]">약 복용 후 위험도</span>
              <span className="text-[#10b981] font-bold">{riskAfter}%</span>
            </div>
            <input type="range" min={0} max={riskBefore - 1} value={riskAfter}
              onChange={(e) => setRiskAfter(Number(e.target.value))}
              className="w-full accent-green-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* People visualization */}
      <div className="glow-card p-5 mb-5">
        <h3 className="text-[#e2e8f0] font-semibold mb-3 text-sm">
          {total}명 중 실제 영향받는 사람
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[#ef4444] text-xs mb-2">약 복용 전: {affectedBefore}명 영향</p>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: Math.min(total, 50) }).map((_, i) => (
                <div
                  key={i}
                  className="text-xs"
                  style={{ color: i < Math.round((riskBefore / 100) * Math.min(total, 50)) ? "#ef4444" : "#1e3a5f" }}
                >
                  👤
                </div>
              ))}
              {total > 50 && <span className="text-[#64748b] text-xs">...총 {affectedBefore}명</span>}
            </div>
          </div>
          <div>
            <p className="text-[#10b981] text-xs mb-2">약 복용 후: {affectedAfter}명 영향</p>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: Math.min(total, 50) }).map((_, i) => (
                <div
                  key={i}
                  className="text-xs"
                  style={{ color: i < Math.round((riskAfter / 100) * Math.min(total, 50)) ? "#f59e0b" : "#1e3a5f" }}
                >
                  👤
                </div>
              ))}
              {total > 50 && <span className="text-[#64748b] text-xs">...총 {affectedAfter}명</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Results comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <motion.div
          className="glow-card p-4 text-center"
          style={{ borderColor: "#00d4ff" }}
          key={`arr-${arr}`}
          animate={{ scale: [1, 1.03, 1] }}
        >
          <div className="text-3xl font-bold text-[#00d4ff]">{arr.toFixed(1)}%</div>
          <div className="text-[#94a3b8] text-xs mt-1">절대적 위험 감소 (ARR)</div>
          <div className="text-[#64748b] text-xs mt-1">실제 위험도 차이</div>
        </motion.div>
        <motion.div
          className="glow-card p-4 text-center"
          style={{ borderColor: "#7c3aed" }}
          key={`rrr-${rrr}`}
          animate={{ scale: [1, 1.03, 1] }}
        >
          <div className="text-3xl font-bold text-[#7c3aed]">{rrr.toFixed(0)}%</div>
          <div className="text-[#94a3b8] text-xs mt-1">상대적 위험 감소 (RRR)</div>
          <div className="text-[#64748b] text-xs mt-1">비율로 표현 (더 크게 들림)</div>
        </motion.div>
        <motion.div
          className="glow-card p-4 text-center"
          style={{ borderColor: "#10b981" }}
          key={`nnt-${nnt}`}
          animate={{ scale: [1, 1.03, 1] }}
        >
          <div className="text-3xl font-bold text-[#10b981]">
            {nnt === Infinity ? "∞" : `${nnt}명`}
          </div>
          <div className="text-[#94a3b8] text-xs mt-1">치료 필요 수 (NNT)</div>
          <div className="text-[#64748b] text-xs mt-1">1명을 도우려면</div>
        </motion.div>
      </div>

      {/* Explanation */}
      <div className="glow-card p-5 mb-5">
        <h3 className="text-[#e2e8f0] font-semibold mb-3">이게 왜 중요한가요?</h3>
        <div
          className="rounded-lg p-4 mb-3"
          style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.25)" }}
        >
          <p className="text-[#94a3b8] text-sm">
            같은 약이 <span className="text-[#7c3aed] font-medium">"{rrr.toFixed(0)}% 위험 감소"</span>라고 말하면 매우 효과적으로 들립니다.
            하지만 같은 데이터를 <span className="text-[#00d4ff] font-medium">"{arr.toFixed(1)}% 절대적 감소, NNT {nnt}명"</span>으로 표현하면
            다르게 느껴집니다. 두 표현 모두 사실이지만, 어떤 맥락으로 받아들이느냐가 달라집니다.
          </p>
        </div>
      </div>

      {/* Statistical concepts */}
      <div className="space-y-3">
        {[
          {
            icon: "🍒",
            title: "체리피킹 (Cherry Picking)",
            desc: "연구자가 자신에게 유리한 결과만 선택적으로 보고하는 현상. '어떤 연구들은 왜 발표되지 않는가?'를 물어보세요.",
            color: "#ef4444",
          },
          {
            icon: "🏃",
            title: "런-인 기간 (Run-in Period)",
            desc: "임상시험 시작 전 부작용이 생기거나 반응이 없는 사람들을 미리 제외하는 기간. 이렇게 하면 '더 효과적으로' 보일 수 있습니다.",
            color: "#f59e0b",
          },
          {
            icon: "🎯",
            title: "대리 지표 vs 실제 결과",
            desc: "LDL 수치를 낮추는 것은 대리 지표입니다. 실제로 알고 싶은 것은 심근경색, 사망 위험이 줄어드는가입니다.",
            color: "#00d4ff",
          },
        ].map((concept) => (
          <div
            key={concept.icon}
            className="glow-card p-4"
            style={{ borderColor: `${concept.color}44` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{concept.icon}</span>
              <div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: concept.color }}>
                  {concept.title}
                </h4>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{concept.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
