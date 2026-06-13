"use client";
import { useState } from "react";
import { motion } from "framer-motion";

function getRatio1Color(ratio: number) {
  if (ratio >= 0.24) return { color: "#10b981", label: "양호", icon: "🟢" };
  if (ratio >= 0.18) return { color: "#f59e0b", label: "주의", icon: "🟡" };
  return { color: "#ef4444", label: "위험", icon: "🔴" };
}

function getRatio2Color(ratio: number) {
  if (ratio < 2) return { color: "#10b981", label: "양호", icon: "🟢" };
  if (ratio < 4) return { color: "#f59e0b", label: "보통", icon: "🟡" };
  if (ratio < 6) return { color: "#ef4444", label: "주의", icon: "🔴" };
  return { color: "#ef4444", label: "매우 주의", icon: "🔴" };
}

export default function RatioCalculator() {
  const [total, setTotal] = useState("");
  const [hdl, setHdl] = useState("");
  const [tg, setTg] = useState("");
  const [calculated, setCalculated] = useState(false);

  const totalN = parseFloat(total);
  const hdlN = parseFloat(hdl);
  const tgN = parseFloat(tg);

  const ratio1 = hdlN / totalN;
  const ratio2 = tgN / hdlN;

  const valid = !isNaN(totalN) && !isNaN(hdlN) && !isNaN(tgN) && hdlN > 0 && totalN > 0;

  const r1 = valid ? getRatio1Color(ratio1) : null;
  const r2 = valid ? getRatio2Color(ratio2) : null;

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">비율 계산기</h2>
        <p className="text-[#94a3b8] text-sm">
          콜레스테롤 수치를 입력하면 교육용 비율 지표를 계산해드립니다.
        </p>
      </div>

      <div className="disclaimer-box mb-5">
        <p className="text-[#f59e0b] text-xs">
          ⚠️ 이 계산기는 <strong>교육용 지표</strong>만 제공합니다. 의학적 진단이나 치료 결정을 위한 도구가 아닙니다. 결과는 반드시 의료 전문가와 상담하여 해석하세요.
        </p>
      </div>

      <div className="glow-card p-5 mb-5">
        <h3 className="text-[#00d4ff] font-semibold mb-4">수치 입력 (mg/dL)</h3>
        <div className="space-y-4">
          {[
            { label: "총 콜레스테롤", value: total, setter: setTotal, placeholder: "예: 200" },
            { label: "HDL 콜레스테롤", value: hdl, setter: setHdl, placeholder: "예: 55" },
            { label: "중성지방 (트리글리세라이드)", value: tg, setter: setTg, placeholder: "예: 120" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-[#e2e8f0] text-sm font-medium block mb-1">
                {field.label}
              </label>
              <input
                type="number"
                value={field.value}
                onChange={(e) => {
                  field.setter(e.target.value);
                  setCalculated(false);
                }}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-lg text-[#e2e8f0] text-sm outline-none focus:border-[#00d4ff]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid #1e3a5f",
                  fontFamily: "Noto Sans KR, sans-serif",
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setCalculated(true)}
          disabled={!valid}
          className="mt-5 w-full py-3 rounded-lg font-bold text-[#0a0f1e] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: valid ? "linear-gradient(135deg, #00d4ff, #7c3aed)" : "#1e3a5f" }}
        >
          계산하기
        </button>
      </div>

      {calculated && valid && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Ratio 1 */}
          <div className="glow-card p-5" style={{ borderColor: r1!.color }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-[#e2e8f0]">HDL / 총 콜레스테롤 비율</h4>
                <p className="text-[#94a3b8] text-xs">0.24 이상이 일반적으로 양호</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold" style={{ color: r1!.color }}>
                  {ratio1.toFixed(3)}
                </div>
                <div className="text-xs" style={{ color: r1!.color }}>
                  {r1!.icon} {r1!.label}
                </div>
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (ratio1 / 0.4) * 100)}%`,
                  background: r1!.color,
                }}
              />
            </div>
            <p className="text-[#94a3b8] text-xs mt-2">
              이 비율이 높을수록 HDL이 총 콜레스테롤 중 더 높은 비중을 차지한다는 의미입니다.
            </p>
          </div>

          {/* Ratio 2 */}
          <div className="glow-card p-5" style={{ borderColor: r2!.color }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-[#e2e8f0]">중성지방 / HDL 비율</h4>
                <p className="text-[#94a3b8] text-xs">2 미만 양호, 4 이상 주의, 6 이상 위험</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold" style={{ color: r2!.color }}>
                  {ratio2.toFixed(2)}
                </div>
                <div className="text-xs" style={{ color: r2!.color }}>
                  {r2!.icon} {r2!.label}
                </div>
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (ratio2 / 6) * 100)}%`,
                  background: r2!.color,
                }}
              />
            </div>
            <p className="text-[#94a3b8] text-xs mt-2">
              이 비율이 높으면 인슐린 저항성 및 대사 이상의 징후일 수 있습니다.
            </p>
          </div>

          {/* Summary */}
          <div className="glow-card p-5">
            <h4 className="text-[#00d4ff] font-semibold mb-3">📋 의사에게 물어볼 질문</h4>
            <ul className="space-y-2 text-xs text-[#94a3b8]">
              <li>• 제 중성지방/HDL 비율이 인슐린 저항성의 징후일 수 있나요?</li>
              <li>• 총 LDL 수치 외에 LDL 입자 크기나 ox-LDL도 확인할 수 있나요?</li>
              <li>• 이 비율을 개선하기 위해 어떤 생활습관 변화가 도움이 될까요?</li>
            </ul>
          </div>

          <div className="disclaimer-box text-xs text-[#f59e0b]">
            ⚠️ 이 결과는 교육용 지표이며 전문적인 의학적 진단을 대체하지 않습니다.
          </div>
        </motion.div>
      )}

      {/* Reference Table */}
      <div className="glow-card p-5 mt-5">
        <h3 className="text-[#e2e8f0] font-semibold mb-3 text-sm">📊 교육용 참고표</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center py-2 border-b border-[#1e3a5f]">
            <span className="text-[#94a3b8]">HDL/총콜레스테롤</span>
            <div className="flex gap-3">
              <span style={{ color: "#10b981" }}>0.24↑ 양호</span>
              <span style={{ color: "#f59e0b" }}>0.18~0.24 보통</span>
              <span style={{ color: "#ef4444" }}>0.18↓ 주의</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[#94a3b8]">중성지방/HDL</span>
            <div className="flex gap-3">
              <span style={{ color: "#10b981" }}>2↓ 양호</span>
              <span style={{ color: "#f59e0b" }}>2~4 보통</span>
              <span style={{ color: "#ef4444" }}>4↑ 주의</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
