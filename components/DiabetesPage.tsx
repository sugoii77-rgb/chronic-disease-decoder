"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  insulinResistanceLoop,
  diabetesBodyOrgans,
  mealOrders,
  labTestCards,
  diabetesMeds,
  workerTips,
} from "@/data/diabetesData";

const TABS = [
  { id: "key", label: "인슐린 열쇠" },
  { id: "compare", label: "비교분석" },
  { id: "loop", label: "악순환 루프" },
  { id: "pancreas", label: "췌장 피로" },
  { id: "body", label: "전신 영향" },
  { id: "complications", label: "합병증" },
  { id: "meal", label: "식사 순서" },
  { id: "walk", label: "식후 걷기" },
  { id: "fast", label: "단식" },
  { id: "labs", label: "검사 지표" },
  { id: "meds", label: "당뇨약" },
  { id: "tips", label: "직장인 팁" },
];

export default function DiabetesPage() {
  const [activeTab, setActiveTab] = useState("key");

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <h2 className="section-header">🍬 당뇨·인슐린 저항성 교육</h2>
        <p className="text-[#94a3b8] text-sm">
          인슐린 저항성의 원리부터 합병증, 치료까지 — 몸이 어떻게 작동하는지 이해해보세요.
        </p>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-1 overflow-x-auto mb-6 pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`tab-btn flex-shrink-0 ${activeTab === t.id ? "active" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "key" && <InsulinKeyTab />}
          {activeTab === "compare" && <CompareTab />}
          {activeTab === "loop" && <LoopTab />}
          {activeTab === "pancreas" && <PancreasTab />}
          {activeTab === "body" && <BodyTab />}
          {activeTab === "complications" && <ComplicationsTab />}
          {activeTab === "meal" && <MealTab />}
          {activeTab === "walk" && <WalkTab />}
          {activeTab === "fast" && <FastTab />}
          {activeTab === "labs" && <LabsTab />}
          {activeTab === "meds" && <MedsTab />}
          {activeTab === "tips" && <TipsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Tab 1: Insulin Key Simulator ───────────────────────────────────────────
function InsulinKeyTab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [level, setLevel] = useState(20);

  const stage = level < 25 ? 0 : level < 50 ? 1 : level < 75 ? 2 : 3;
  const stageLabels = ["정상", "초기 저항성", "중등도 저항성", "심한 저항성"];
  const stageColors = ["#10b981", "#f59e0b", "#ef4444", "#7c3aed"];
  const bloodGlucose = Math.round(80 + level * 1.6);
  const insulinLevel = Math.round(5 + level * 0.95);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const t = Date.now() / 1000;
    const resistance = level / 100;

    // Background
    ctx.fillStyle = "#0d1a2e";
    ctx.fillRect(0, 0, W, H);

    // Cell (center)
    const cx = W / 2;
    const cy = H / 2 + 10;
    const cr = 70;

    // Cell glow
    const grd = ctx.createRadialGradient(cx, cy, cr * 0.3, cx, cy, cr * 1.5);
    grd.addColorStop(0, `rgba(16,185,129,${0.15 - resistance * 0.1})`);
    grd.addColorStop(1, "rgba(16,185,129,0)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, cr * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Cell body
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(13,26,46,0.9)`;
    ctx.fill();
    ctx.strokeStyle = `rgba(16,185,129,${1 - resistance * 0.7})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Cell label
    ctx.fillStyle = `rgba(16,185,129,${1 - resistance * 0.6})`;
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("세포", cx, cy - 8);
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("포도당 흡수", cx, cy + 8);

    // Receptor slots on cell membrane (4 receptors)
    const numReceptors = 4;
    for (let i = 0; i < numReceptors; i++) {
      const angle = (Math.PI / (numReceptors + 1)) * (i + 1) - Math.PI / 2;
      const rx = cx + Math.cos(angle) * cr;
      const ry = cy + Math.sin(angle) * cr;

      const receptorAlpha = Math.max(0.2, 1 - resistance * 0.8);
      ctx.beginPath();
      ctx.arc(rx, ry, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124,58,237,${receptorAlpha})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(200,160,255,${receptorAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Lock icon for resistant receptors
      if (resistance > 0.4) {
        ctx.fillStyle = `rgba(239,68,68,${(resistance - 0.4) * 1.5})`;
        ctx.font = "8px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("🔒", rx, ry + 3);
      }
    }

    // Glucose particles (yellow hexagons) — more if level is high
    const numGlucose = Math.round(3 + resistance * 12);
    for (let i = 0; i < numGlucose; i++) {
      const phase = (t * 0.6 + i * 0.7) % 1;
      const startX = W * 0.05 + (i % 3) * 20;
      const startY = 30 + (i % 4) * 30;

      let px: number, py: number;
      if (resistance > 0.5 || phase > 0.6) {
        // Stuck in blood — drift
        px = startX + Math.sin(t + i) * 15 + phase * (cx - startX - cr - 20);
        py = startY + Math.cos(t * 0.7 + i) * 10 + phase * (cy - startY);
        if (phase > 0.6) {
          px = cx - cr - 20 + Math.sin(t * 1.2 + i * 2) * 25;
          py = cy + (i % 5 - 2) * 20 + Math.cos(t + i) * 8;
        }
      } else {
        // Enters cell
        px = startX + phase * (cx - startX);
        py = startY + phase * (cy - startY);
      }

      drawHexagon(ctx, px, py, 6, "#f59e0b", `rgba(245,158,11,${0.7 + Math.sin(t + i) * 0.2})`);
    }

    // Insulin keys (purple) coming from above
    const numInsulin = Math.round(2 + resistance * 5);
    for (let i = 0; i < numInsulin; i++) {
      const phase = (t * 0.5 + i * 1.1) % 1;
      const startX = W * 0.2 + i * (W * 0.15);
      const targetAngle = (Math.PI / (numReceptors + 1)) * ((i % numReceptors) + 1) - Math.PI / 2;
      const targetX = cx + Math.cos(targetAngle) * cr;
      const targetY = cy + Math.sin(targetAngle) * cr;

      const kx = startX + phase * (targetX - startX);
      const ky = -20 + phase * (targetY + 20);

      if (ky > targetY - 5 && ky < targetY + 5 && resistance > 0.5) {
        // Key blocked — bounce
      } else {
        drawKey(ctx, kx, ky, resistance);
      }
    }

    // Fat particles on right side if high resistance
    if (resistance > 0.3) {
      const numFat = Math.round((resistance - 0.3) * 20);
      for (let i = 0; i < numFat; i++) {
        const fx = W * 0.75 + Math.sin(t * 0.3 + i) * 20 + (i % 4) * 15;
        const fy = H * 0.2 + Math.cos(t * 0.4 + i * 0.9) * 15 + (i % 5) * 20;
        ctx.beginPath();
        ctx.arc(fx, fy, 5 + (i % 3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${0.5 + Math.sin(t + i) * 0.2})`;
        ctx.fill();
        ctx.strokeStyle = "rgba(249,115,22,0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.fillStyle = "#f97316";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("지방 축적", W * 0.82, H * 0.85);
    }

    animRef.current = requestAnimationFrame(draw);
  }, [level]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div>
      <div className="disclaimer-box mb-4">
        <p className="text-xs text-[#94a3b8]">교육 목적 시뮬레이션입니다. 실제 세포 반응은 훨씬 복잡합니다.</p>
      </div>
      <div className="glow-card p-5 mb-4">
        <h3 className="text-[#00d4ff] font-semibold mb-1">인슐린 열쇠 시뮬레이터</h3>
        <p className="text-[#94a3b8] text-xs mb-4">당 섭취 빈도가 높을수록 세포 수용체가 둔감해집니다</p>

        <canvas
          ref={canvasRef}
          width={460}
          height={240}
          className="w-full rounded-xl mb-4"
          style={{ border: "1px solid #1e3a5f", maxHeight: 240 }}
        />

        <div className="mb-4">
          <div className="flex justify-between text-xs text-[#94a3b8] mb-1">
            <span>당 섭취 빈도</span>
            <span style={{ color: stageColors[stage] }}>{stageLabels[stage]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-[#64748b] mt-1">
            <span>낮음</span><span>보통</span><span>높음</span><span>매우 높음</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <GaugeBar label="혈당 수치" value={bloodGlucose} max={280} unit="mg/dL"
            color={bloodGlucose > 180 ? "#ef4444" : bloodGlucose > 120 ? "#f59e0b" : "#10b981"} />
          <GaugeBar label="인슐린 수치" value={insulinLevel} max={100} unit="μIU/mL"
            color={insulinLevel > 60 ? "#ef4444" : insulinLevel > 30 ? "#f59e0b" : "#10b981"} />
        </div>
      </div>

      <div className="glow-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{stage === 0 ? "✅" : stage === 1 ? "⚠️" : "🚨"}</span>
          <h4 className="font-semibold" style={{ color: stageColors[stage] }}>{stageLabels[stage]}</h4>
        </div>
        <p className="text-[#94a3b8] text-xs leading-relaxed">
          {stage === 0 && "세포가 인슐린 신호에 잘 반응합니다. 포도당이 세포 안으로 효율적으로 흡수되어 혈당이 정상 범위를 유지합니다."}
          {stage === 1 && "세포 수용체가 조금씩 둔감해지기 시작합니다. 췌장이 더 많은 인슐린을 분비하여 보상하려 합니다. 이 단계에서 생활습관 개선이 가장 효과적입니다."}
          {stage === 2 && "인슐린 저항성이 상당히 진행되었습니다. 포도당이 세포에 잘 흡수되지 못하고 혈액에 쌓입니다. 지방 저장도 증가합니다."}
          {stage === 3 && "심한 인슐린 저항성 상태입니다. 췌장이 과부하 상태이며 장기적으로 베타세포가 손상될 수 있습니다. 의사와 상담이 필요합니다."}
        </p>
      </div>
    </div>
  );
}

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, stroke: string, fill: string) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const px = x + r * Math.cos(a);
    const py = y + r * Math.sin(a);
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawKey(ctx: CanvasRenderingContext2D, x: number, y: number, resistance: number) {
  const alpha = 0.8 - resistance * 0.3;
  ctx.save();
  ctx.translate(x, y);
  // Key circle
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
  ctx.lineWidth = 2;
  ctx.stroke();
  // Key stem
  ctx.beginPath();
  ctx.moveTo(4, 0);
  ctx.lineTo(12, 0);
  ctx.lineTo(12, 3);
  ctx.lineTo(10, 3);
  ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

function GaugeBar({ label, value, max, unit, color }: { label: string; value: number; max: number; unit: string; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1e3a5f" }}>
      <div className="text-xs text-[#94a3b8] mb-1">{label}</div>
      <div className="text-lg font-bold mb-2" style={{ color }}>{value} <span className="text-xs">{unit}</span></div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// ─── Tab 2: Compare ──────────────────────────────────────────────────────────
function CompareTab() {
  const normalData = [
    { t: "0분", bg: 80 }, { t: "15분", bg: 100 }, { t: "30분", bg: 120 },
    { t: "45분", bg: 130 }, { t: "60분", bg: 125 }, { t: "90분", bg: 110 },
    { t: "2시간", bg: 95 }, { t: "3시간", bg: 85 },
  ];
  const resistData = [
    { t: "0분", bg: 110 }, { t: "15분", bg: 145 }, { t: "30분", bg: 180 },
    { t: "45분", bg: 195 }, { t: "60분", bg: 190 }, { t: "90분", bg: 165 },
    { t: "2시간", bg: 145 }, { t: "3시간", bg: 130 },
  ];
  const combined = normalData.map((d, i) => ({ t: d.t, 정상: d.bg, 인슐린저항성: resistData[i].bg }));

  const normalSteps = [
    { step: "식사", desc: "탄수화물 섭취 시작" },
    { step: "흡수", desc: "포도당이 혈액으로 흡수됨" },
    { step: "인슐린 분비", desc: "췌장이 적정량 인슐린 분비" },
    { step: "세포 반응", desc: "세포가 인슐린에 즉각 반응" },
    { step: "포도당 흡수", desc: "포도당이 세포 안으로 효율적 흡수" },
    { step: "혈당 정상화", desc: "2시간 내 혈당이 정상 범위로 복귀" },
  ];
  const resistSteps = [
    { step: "식사", desc: "탄수화물 섭취 시작" },
    { step: "흡수", desc: "포도당이 혈액으로 빠르게 흡수" },
    { step: "인슐린 과다 분비", desc: "췌장이 과도한 인슐린 분비" },
    { step: "세포 둔감 반응", desc: "세포가 인슐린 신호 무시" },
    { step: "포도당 정체", desc: "포도당이 혈액에 장시간 잔류" },
    { step: "혈당 지연 복귀", desc: "3시간 후에도 혈당 높게 유지" },
  ];

  return (
    <div>
      <div className="glow-card p-5 mb-4">
        <h3 className="text-[#00d4ff] font-semibold mb-3">식후 혈당 곡선 비교</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={combined} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="t" tick={{ fill: "#64748b", fontSize: 10 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} domain={[70, 210]} />
            <Tooltip contentStyle={{ background: "#0d1a2e", border: "1px solid #1e3a5f", borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="정상" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="인슐린저항성" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glow-card p-4" style={{ borderColor: "#10b981" }}>
          <h4 className="text-[#10b981] font-semibold mb-3 text-sm">✅ 정상 인슐린 감수성</h4>
          <div className="space-y-2">
            {normalSteps.map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold"
                  style={{ background: "rgba(16,185,129,0.2)", color: "#10b981" }}>{i + 1}</span>
                <div>
                  <div className="text-[#e2e8f0] text-xs font-medium">{s.step}</div>
                  <div className="text-[#64748b] text-xs">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glow-card p-4" style={{ borderColor: "#ef4444" }}>
          <h4 className="text-[#ef4444] font-semibold mb-3 text-sm">⚠️ 인슐린 저항성</h4>
          <div className="space-y-2">
            {resistSteps.map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold"
                  style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>{i + 1}</span>
                <div>
                  <div className="text-[#e2e8f0] text-xs font-medium">{s.step}</div>
                  <div className="text-[#64748b] text-xs">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3: Loop ─────────────────────────────────────────────────────────────
function LoopTab() {
  const [selected, setSelected] = useState<number | null>(null);
  const n = insulinResistanceLoop.length;
  const cx = 150, cy = 150, r = 110;

  return (
    <div>
      <div className="glow-card p-5 mb-4">
        <h3 className="text-[#00d4ff] font-semibold mb-1">인슐린 저항성 악순환 루프</h3>
        <p className="text-[#94a3b8] text-xs mb-4">노드를 클릭하면 자세한 설명을 볼 수 있습니다</p>

        <div className="flex justify-center">
          <svg width="300" height="300" viewBox="0 0 300 300">
            {/* Arrows */}
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="rgba(0,212,255,0.5)" />
              </marker>
            </defs>
            {insulinResistanceLoop.map((_, i) => {
              const a1 = (2 * Math.PI * i) / n - Math.PI / 2;
              const a2 = (2 * Math.PI * ((i + 1) % n)) / n - Math.PI / 2;
              const x1 = cx + (r - 18) * Math.cos(a1);
              const y1 = cy + (r - 18) * Math.sin(a1);
              const x2 = cx + (r - 18) * Math.cos(a2);
              const y2 = cy + (r - 18) * Math.sin(a2);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(0,212,255,0.3)" strokeWidth="1.5"
                  markerEnd="url(#arrow)" />
              );
            })}

            {insulinResistanceLoop.map((node, i) => {
              const angle = (2 * Math.PI * i) / n - Math.PI / 2;
              const nx = cx + r * Math.cos(angle);
              const ny = cy + r * Math.sin(angle);
              const isSelected = selected === i;

              return (
                <g key={node.id} onClick={() => setSelected(isSelected ? null : i)} style={{ cursor: "pointer" }}>
                  <circle cx={nx} cy={ny} r={18}
                    fill={isSelected ? "rgba(0,212,255,0.25)" : "rgba(13,26,46,0.9)"}
                    stroke={isSelected ? "#00d4ff" : "rgba(30,58,95,0.8)"}
                    strokeWidth={isSelected ? 2 : 1} />
                  <text x={nx} y={ny + 5} textAnchor="middle" fontSize="14" fill="white">{node.icon}</text>
                </g>
              );
            })}

            {/* Center label */}
            <text x={cx} y={cy - 8} textAnchor="middle" fontSize="11" fill="#00d4ff" fontWeight="bold">악순환</text>
            <text x={cx} y={cy + 8} textAnchor="middle" fontSize="10" fill="#64748b">루프</text>
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glow-card p-4"
            style={{ borderColor: "#00d4ff" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{insulinResistanceLoop[selected].icon}</span>
              <h4 className="text-[#00d4ff] font-semibold">{insulinResistanceLoop[selected].label}</h4>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed">{insulinResistanceLoop[selected].desc}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {selected === null && (
        <div className="glow-card p-4">
          <p className="text-[#64748b] text-xs text-center">위 원형 그래프의 노드를 클릭하여 설명을 확인하세요</p>
        </div>
      )}
    </div>
  );
}

// ─── Tab 4: Pancreas Fatigue ─────────────────────────────────────────────────
function PancreasTab() {
  const [months, setMonths] = useState(24);

  const stages = [
    { label: "초기 보상", color: "#10b981", range: [0, 24], desc: "췌장이 인슐린 저항성을 극복하기 위해 더 많은 인슐린을 분비합니다. 혈당은 정상처럼 보이지만 인슐린 분비가 과도합니다." },
    { label: "과부하 단계", color: "#f59e0b", range: [24, 60], desc: "지속적인 과부하로 베타세포가 스트레스를 받기 시작합니다. 공복 혈당이 조금씩 상승하기 시작할 수 있습니다." },
    { label: "기능 저하", color: "#ef4444", range: [60, 120], desc: "베타세포 기능이 50% 이하로 저하됩니다. 이 시점부터 혈당 조절이 급격히 어려워지고 당뇨 진단을 받을 수 있습니다." },
    { label: "심각한 손상", color: "#7c3aed", range: [120, 180], desc: "베타세포 기능이 크게 손상되어 인슐린 분비가 불충분해집니다. 인슐린 주사가 필요해질 수 있습니다." },
    { label: "베타세포 소진", color: "#94a3b8", range: [180, 240], desc: "베타세포의 기능이 매우 낮아집니다. 이 단계에서는 인슐린 치료가 필수적입니다." },
  ];

  const currentStage = stages.find(s => months >= s.range[0] && months < s.range[1]) || stages[stages.length - 1];
  const betaFunction = Math.max(10, 100 - (months / 240) * 90);
  const insulinSecretion = months < 60 ? 100 + (months / 60) * 80 : Math.max(20, 180 - ((months - 60) / 180) * 160);

  const chartData = Array.from({ length: 24 }, (_, i) => {
    const m = (i / 23) * 240;
    return {
      month: Math.round(m) + "개월",
      베타세포기능: Math.max(10, 100 - (m / 240) * 90),
      인슐린분비: m < 60 ? 100 + (m / 60) * 80 : Math.max(20, 180 - ((m - 60) / 180) * 160),
    };
  });

  return (
    <div>
      <div className="glow-card p-5 mb-4">
        <h3 className="text-[#00d4ff] font-semibold mb-1">췌장 피로도 시뮬레이터</h3>
        <p className="text-[#94a3b8] text-xs mb-4">인슐린 저항성이 지속될 때 췌장에 어떤 일이 일어나는지 봅니다</p>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-[#94a3b8] mb-1">
            <span>인슐린 저항성 지속 기간</span>
            <span style={{ color: currentStage.color }}>{months}개월 ({currentStage.label})</span>
          </div>
          <input type="range" min={0} max={240} value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-cyan-400" />
          <div className="flex justify-between text-xs text-[#64748b] mt-1">
            <span>0개월</span><span>5년</span><span>10년</span><span>15년</span><span>20년</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <GaugeBar label="베타세포 기능" value={Math.round(betaFunction)} max={100} unit="%"
            color={betaFunction > 70 ? "#10b981" : betaFunction > 40 ? "#f59e0b" : "#ef4444"} />
          <GaugeBar label="인슐린 분비량" value={Math.round(insulinSecretion)} max={180} unit="상대값"
            color={insulinSecretion > 150 ? "#f59e0b" : insulinSecretion > 80 ? "#10b981" : "#ef4444"} />
        </div>

        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 9 }} interval={5} />
            <YAxis tick={{ fill: "#64748b", fontSize: 9 }} />
            <Tooltip contentStyle={{ background: "#0d1a2e", border: "1px solid #1e3a5f", borderRadius: 8, fontSize: 11 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="베타세포기능" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="인슐린분비" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glow-card p-4 mb-3" style={{ borderColor: currentStage.color }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ background: currentStage.color }} />
          <h4 className="font-semibold text-sm" style={{ color: currentStage.color }}>{currentStage.label}</h4>
        </div>
        <p className="text-[#94a3b8] text-xs leading-relaxed">{currentStage.desc}</p>
      </div>

      {/* Stage timeline */}
      <div className="glow-card p-4">
        <h4 className="text-[#e2e8f0] text-sm font-semibold mb-3">단계별 타임라인</h4>
        <div className="flex gap-1">
          {stages.map((s) => (
            <div key={s.label} className="flex-1 h-3 rounded-full"
              style={{ background: s.color, opacity: currentStage.label === s.label ? 1 : 0.3 }} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#64748b] mt-1">
          {stages.map((s) => (
            <span key={s.label} style={{ color: currentStage.label === s.label ? s.color : "#64748b" }}>
              {s.label.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 5: Body Map ─────────────────────────────────────────────────────────
function BodyTab() {
  const [selected, setSelected] = useState<string | null>(null);
  const organ = diabetesBodyOrgans.find(o => o.id === selected);

  return (
    <div>
      <div className="glow-card p-4 mb-4">
        <h3 className="text-[#00d4ff] font-semibold mb-1">당뇨·인슐린 저항성의 전신 영향</h3>
        <p className="text-[#94a3b8] text-xs">장기를 클릭하면 자세한 정보를 볼 수 있습니다</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
        {diabetesBodyOrgans.map((o) => (
          <motion.button
            key={o.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(selected === o.id ? null : o.id)}
            className="p-3 rounded-xl flex flex-col items-center gap-1 transition-all"
            style={{
              background: selected === o.id ? `${o.color}22` : "rgba(255,255,255,0.03)",
              border: `1px solid ${selected === o.id ? o.color : "#1e3a5f"}`,
            }}
          >
            <span className="text-2xl">{o.icon}</span>
            <span className="text-xs" style={{ color: selected === o.id ? o.color : "#94a3b8" }}>{o.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {organ && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glow-card p-5"
            style={{ borderColor: organ.color }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{organ.icon}</span>
              <h4 className="text-xl font-bold" style={{ color: organ.color }}>{organ.label}</h4>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1e3a5f" }}>
                <div className="text-xs font-medium text-[#f59e0b] mb-1">무슨 일이 일어나나요?</div>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{organ.what}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <div className="text-xs font-medium text-[#ef4444] mb-1">왜 위험한가요?</div>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{organ.why}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <div className="text-xs font-medium text-[#10b981] mb-1">생활습관 전략</div>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{organ.lifestyle}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tab 6: Complications ────────────────────────────────────────────────────
function ComplicationsTab() {
  const micro = [
    { icon: "👁️", name: "당뇨 망막병증", desc: "망막 미세혈관 손상으로 시력 저하, 심하면 실명. 초기 증상이 없어 정기 검진 필수.", risk: "성인 실명의 주요 원인" },
    { icon: "🫘", name: "당뇨 신증", desc: "신사구체 손상으로 단백뇨, 만성신질환 진행. 투석 환자의 절반 이상이 당뇨 관련.", risk: "만성신질환 1위 원인" },
    { icon: "⚡", name: "당뇨 신경병증", desc: "말초신경 손상으로 손발 저림·통증·감각 소실. 자율신경 손상 시 소화·심박수 이상.", risk: "당뇨발 절단의 주요 원인" },
  ];
  const macro = [
    { icon: "💔", name: "심근경색", desc: "동맥경화 + 혈전으로 관상동맥 막힘. 당뇨 환자는 심근경색 위험이 2-4배 높음.", risk: "당뇨 주요 사망 원인 1위" },
    { icon: "🧠", name: "뇌졸중", desc: "뇌혈관 막힘 또는 출혈. 당뇨+고혈압+흡연 복합 시 위험 급증.", risk: "당뇨 환자 뇌졸중 위험 2-3배" },
    { icon: "🦶", name: "당뇨발", desc: "신경병증+혈관장애 → 작은 상처가 잘 낫지 않음 → 궤양 → 절단.", risk: "비외상성 절단 1위 원인" },
  ];

  return (
    <div>
      <div className="disclaimer-box mb-4">
        <p className="text-xs text-[#e2e8f0]">합병증은 무서워 보이지만, 조기 혈당 관리로 대부분 예방하거나 진행을 늦출 수 있습니다.</p>
      </div>

      <div className="mb-4">
        <h3 className="text-[#7c3aed] font-semibold mb-3 text-sm">🔬 미세혈관 합병증 (소혈관)</h3>
        <div className="space-y-2">
          {micro.map((c) => (
            <div key={c.name} className="glow-card p-4" style={{ borderColor: "#7c3aed" }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{c.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[#e2e8f0] font-semibold text-sm">{c.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(124,58,237,0.2)", color: "#7c3aed" }}>{c.risk}</span>
                  </div>
                  <p className="text-[#94a3b8] text-xs">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-[#ef4444] font-semibold mb-3 text-sm">🩸 대혈관 합병증 (대혈관)</h3>
        <div className="space-y-2">
          {macro.map((c) => (
            <div key={c.name} className="glow-card p-4" style={{ borderColor: "#ef4444" }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{c.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[#e2e8f0] font-semibold text-sm">{c.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>{c.risk}</span>
                  </div>
                  <p className="text-[#94a3b8] text-xs">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glow-card p-4" style={{ borderColor: "#10b981" }}>
        <h4 className="text-[#10b981] font-semibold mb-2">💡 조기 관리가 중요한 이유</h4>
        <ul className="space-y-1.5 text-xs text-[#94a3b8]">
          <li>• HbA1c를 1% 낮추면 미세혈관 합병증 위험이 약 25-35% 감소합니다 (UKPDS 연구)</li>
          <li>• 혈당 조절이 좋을수록 신경병증·망막병증 진행 속도가 현저히 느려집니다</li>
          <li>• 당뇨 진단 후 첫 10년이 합병증 예방의 골든타임입니다</li>
          <li>• 정기 검진(눈, 신장, 발)으로 조기 발견 시 대부분 치료 가능합니다</li>
        </ul>
      </div>
    </div>
  );
}

// ─── Tab 7: Meal Order ───────────────────────────────────────────────────────
function MealTab() {
  const [selected, setSelected] = useState(0);
  const meal = mealOrders[selected];

  const chartData = meal.curve.map((bg, i) => ({
    time: `${i * 15}분`,
    혈당: bg,
  }));

  return (
    <div>
      <div className="glow-card p-4 mb-4">
        <h3 className="text-[#00d4ff] font-semibold mb-1">식사 순서 시뮬레이터</h3>
        <p className="text-[#94a3b8] text-xs mb-4">같은 음식도 먹는 순서에 따라 혈당 반응이 크게 달라집니다</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {mealOrders.map((m, i) => (
            <button key={m.id} onClick={() => setSelected(i)}
              className="p-2 rounded-xl text-center transition-all"
              style={{
                background: selected === i ? `${m.color}22` : "rgba(255,255,255,0.03)",
                border: `1px solid ${selected === i ? m.color : "#1e3a5f"}`,
              }}
            >
              <div className="text-xl mb-1">{m.icon}</div>
              <div className="text-xs" style={{ color: selected === i ? m.color : "#94a3b8" }}>{m.label}</div>
            </button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} domain={[70, 220]} />
            <Tooltip contentStyle={{ background: "#0d1a2e", border: "1px solid #1e3a5f", borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="혈당" stroke={meal.color} strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glow-card p-4 mb-3" style={{ borderColor: meal.color }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{meal.icon}</span>
          <h4 className="font-semibold" style={{ color: meal.color }}>{meal.label}</h4>
        </div>
        <p className="text-[#94a3b8] text-xs leading-relaxed mb-3">{meal.desc}</p>

        <div className="grid grid-cols-3 gap-2">
          <MiniGauge label="최고 혈당" value={meal.peak} max={220} unit="mg/dL"
            color={meal.peak > 160 ? "#ef4444" : "#10b981"} />
          <MiniGauge label="인슐린 분비" value={meal.insulin} max={100} unit="%"
            color={meal.insulin > 70 ? "#ef4444" : "#10b981"} />
          <MiniGauge label="지방 저장 신호" value={meal.fatStorage} max={100} unit="%"
            color={meal.fatStorage > 60 ? "#ef4444" : "#10b981"} />
        </div>
      </div>

      <div className="glow-card p-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <p className="text-xs text-[#94a3b8]">
            채소 → 단백질 → 탄수화물 순서로 먹으면 식이섬유가 장 점막에 막을 형성하여 당 흡수 속도를 늦춥니다.
            식후 혈당 피크를 최대 40%까지 낮출 수 있다는 연구도 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

function MiniGauge({ label, value, max, unit, color }: { label: string; value: number; max: number; unit: string; color: string }) {
  return (
    <div className="p-2 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1e3a5f" }}>
      <div className="text-xs text-[#64748b] mb-1">{label}</div>
      <div className="text-sm font-bold" style={{ color }}>{value}</div>
      <div className="text-xs text-[#64748b]">{unit}</div>
    </div>
  );
}

// ─── Tab 8: Post-meal Walk ───────────────────────────────────────────────────
function WalkTab() {
  const [walkMin, setWalkMin] = useState(0);
  const [glut4Active, setGlut4Active] = useState(false);

  const baseCurve = [80, 130, 165, 180, 170, 155, 140, 125, 110, 100];
  const walkReduction = { 0: 0, 5: 0.12, 10: 0.22, 15: 0.32 } as Record<number, number>;
  const reduction = walkReduction[walkMin] || 0;

  const chartData = baseCurve.map((bg, i) => ({
    time: `${i * 15}분`,
    "걷기 없음": bg,
    [`걷기 ${walkMin}분`]: walkMin > 0 ? Math.round(bg - (bg - 80) * reduction) : undefined,
  }));

  const handleWalk = (min: number) => {
    setWalkMin(min);
    if (min > 0) {
      setGlut4Active(true);
      setTimeout(() => setGlut4Active(false), 3000);
    }
  };

  return (
    <div>
      <div className="glow-card p-5 mb-4">
        <h3 className="text-[#00d4ff] font-semibold mb-1">식후 걷기 시뮬레이터</h3>
        <p className="text-[#94a3b8] text-xs mb-4">근육 수축이 GLUT4 수송체를 활성화하여 혈당을 낮춥니다</p>

        <div className="flex gap-2 mb-4">
          {[0, 5, 10, 15].map((min) => (
            <button key={min} onClick={() => handleWalk(min)}
              className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: walkMin === min ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${walkMin === min ? "#00d4ff" : "#1e3a5f"}`,
                color: walkMin === min ? "#00d4ff" : "#94a3b8",
              }}
            >
              {min === 0 ? "걷기 없음" : `${min}분 걷기`}
            </button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} domain={[70, 200]} />
            <Tooltip contentStyle={{ background: "#0d1a2e", border: "1px solid #1e3a5f", borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="걷기 없음" stroke="#ef4444" strokeWidth={2} dot={false} />
            {walkMin > 0 && (
              <Line type="monotone" dataKey={`걷기 ${walkMin}분`} stroke="#10b981" strokeWidth={2.5} dot={false} />
            )}
          </LineChart>
        </ResponsiveContainer>

        {walkMin > 0 && (
          <div className="mt-3 p-3 rounded-lg text-center" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <span className="text-[#10b981] font-bold text-sm">혈당 최고점 약 {Math.round(reduction * 100)}% 감소</span>
          </div>
        )}
      </div>

      {/* GLUT4 visualization */}
      <div className="glow-card p-4 mb-3">
        <h4 className="text-[#e2e8f0] font-semibold text-sm mb-3">GLUT4 수송체 메커니즘</h4>
        <div className="flex items-center gap-3 p-3 rounded-lg transition-all" style={{
          background: glut4Active ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${glut4Active ? "#10b981" : "#1e3a5f"}`,
        }}>
          <span className="text-3xl">{glut4Active ? "💪✨" : "💪"}</span>
          <div>
            <div className="text-xs font-medium" style={{ color: glut4Active ? "#10b981" : "#94a3b8" }}>
              {glut4Active ? "GLUT4 활성화됨! 포도당 흡수 중..." : "GLUT4 대기 상태"}
            </div>
            <div className="text-xs text-[#64748b] mt-1">
              근육 수축 → AMP 증가 → AMPK 활성화 → GLUT4 세포막 이동 → 인슐린 없이도 포도당 흡수
            </div>
          </div>
        </div>
      </div>

      <div className="glow-card p-3">
        <p className="text-xs text-[#94a3b8] leading-relaxed">
          식사 후 30분 이내가 가장 효과적입니다. 걸을 수 없다면 식후 10분 스트레칭, 계단 오르기, 제자리 걷기도 효과가 있습니다.
          당뇨 환자가 아니더라도 식후 혈당 관리에 도움이 됩니다.
        </p>
      </div>
    </div>
  );
}

// ─── Tab 9: Fasting ──────────────────────────────────────────────────────────
function FastTab() {
  const [hours, setHours] = useState(12);

  const insulinDrop = hours <= 4 ? 100 : hours <= 8 ? 85 : hours <= 12 ? 65 : hours <= 14 ? 50 : hours <= 16 ? 38 : 25;
  const receptorSensitivity = hours <= 4 ? 40 : hours <= 8 ? 50 : hours <= 12 ? 65 : hours <= 14 ? 75 : hours <= 16 ? 82 : 90;
  const ketones = hours <= 12 ? 0 : hours <= 16 ? 20 : 45;

  const chartData = Array.from({ length: 20 }, (_, i) => {
    const h = i + 1;
    return {
      hour: `${h}h`,
      인슐린: h <= 4 ? 100 : h <= 8 ? 85 : h <= 12 ? 65 : h <= 14 ? 50 : h <= 16 ? 38 : 25,
      수용체감수성: h <= 4 ? 40 : h <= 8 ? 50 : h <= 12 ? 65 : h <= 14 ? 75 : h <= 16 ? 82 : 90,
    };
  });

  return (
    <div>
      <div className="disclaimer-box mb-4" style={{ borderColor: "#ef4444" }}>
        <h4 className="text-[#ef4444] font-bold text-sm mb-1">⚠️ 당뇨약/인슐린 복용자 필독</h4>
        <p className="text-xs text-[#e2e8f0]">
          설폰요소제, 인슐린 등 저혈당 유발 약물 복용 중인 분은 단식 전 반드시 의사와 상담하세요.
          공복 상태에서 이런 약을 복용하면 위험한 저혈당이 발생할 수 있습니다.
        </p>
      </div>

      <div className="glow-card p-5 mb-4">
        <h3 className="text-[#00d4ff] font-semibold mb-1">간헐적 단식 인슐린 시뮬레이터</h3>
        <p className="text-[#94a3b8] text-xs mb-4">공복 시간이 길어질수록 인슐린 수치가 낮아지고 세포 감수성이 회복됩니다</p>

        <div className="flex gap-2 mb-4">
          {[12, 14, 16, 18].map((h) => (
            <button key={h} onClick={() => setHours(h)}
              className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: hours === h ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${hours === h ? "#00d4ff" : "#1e3a5f"}`,
                color: hours === h ? "#00d4ff" : "#94a3b8",
              }}
            >
              {h}:8
            </button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="hour" tick={{ fill: "#64748b", fontSize: 9 }} interval={3} />
            <YAxis tick={{ fill: "#64748b", fontSize: 9 }} />
            <Tooltip contentStyle={{ background: "#0d1a2e", border: "1px solid #1e3a5f", borderRadius: 8, fontSize: 11 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="인슐린" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="수용체감수성" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <GaugeBar label="인슐린 수치" value={insulinDrop} max={100} unit="상대값"
            color={insulinDrop > 70 ? "#ef4444" : "#10b981"} />
          <GaugeBar label="수용체 감수성" value={receptorSensitivity} max={100} unit="%"
            color={receptorSensitivity > 70 ? "#10b981" : "#f59e0b"} />
          <GaugeBar label="케톤 생성" value={ketones} max={100} unit="상대값"
            color={ketones > 30 ? "#f59e0b" : "#00d4ff"} />
        </div>
      </div>

      <div className="glow-card p-4">
        <h4 className="text-[#e2e8f0] font-semibold text-sm mb-2">단식 시간대별 변화</h4>
        <div className="space-y-2 text-xs">
          {[
            { h: "0-4시간", icon: "🍽️", desc: "소화 및 흡수. 인슐린 분비 활발.", color: "#ef4444" },
            { h: "4-8시간", icon: "⏰", desc: "혈당 정상화. 인슐린 점차 감소.", color: "#f59e0b" },
            { h: "8-12시간", icon: "🌙", desc: "간 글리코겐 사용 시작. 인슐린 낮아짐.", color: "#f59e0b" },
            { h: "12-16시간", icon: "✨", desc: "지방 연소 본격화. 인슐린 낮고 감수성 회복.", color: "#10b981" },
            { h: "16시간+", icon: "🔥", desc: "케톤 생성. 세포 오토파지 활성화.", color: "#10b981" },
          ].map((s) => (
            <div key={s.h} className="flex items-start gap-2 p-2 rounded-lg"
              style={{ background: hours >= parseInt(s.h) ? `${s.color}10` : "rgba(255,255,255,0.02)", border: `1px solid ${hours >= parseInt(s.h) ? s.color : "#1e3a5f"}22` }}>
              <span>{s.icon}</span>
              <div>
                <span className="font-medium" style={{ color: s.color }}>{s.h} </span>
                <span className="text-[#94a3b8]">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 10: Labs ────────────────────────────────────────────────────────────
function LabsTab() {
  const [selected, setSelected] = useState<string | null>(null);
  const lab = labTestCards.find(l => l.id === selected);

  return (
    <div>
      <div className="glow-card p-4 mb-4">
        <h3 className="text-[#00d4ff] font-semibold mb-1">당뇨·인슐린 저항성 검사 지표</h3>
        <p className="text-[#94a3b8] text-xs">카드를 클릭하면 상세 설명을 볼 수 있습니다. 교육 목적이며 진단 기준은 의사와 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {labTestCards.map((l) => (
          <motion.button
            key={l.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(selected === l.id ? null : l.id)}
            className="p-4 rounded-xl text-left transition-all"
            style={{
              background: selected === l.id ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${selected === l.id ? "#00d4ff" : "#1e3a5f"}`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{l.icon}</span>
              <div>
                <div className="text-sm font-semibold text-[#e2e8f0]">{l.label}</div>
                <div className="text-xs text-[#64748b]">{l.unit}</div>
              </div>
            </div>
            <div className="flex gap-1">
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>정상: {l.normal}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lab && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glow-card p-5"
            style={{ borderColor: "#00d4ff" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{lab.icon}</span>
              <h4 className="text-[#00d4ff] font-bold">{lab.label} ({lab.unit})</h4>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "정상", value: lab.normal, color: "#10b981" },
                { label: "전단계", value: lab.prediabetes, color: "#f59e0b" },
                { label: "당뇨 의심", value: lab.diabetes, color: "#ef4444" },
              ].map((s) => (
                <div key={s.label} className="p-2 rounded-lg text-center"
                  style={{ background: `${s.color}10`, border: `1px solid ${s.color}44` }}>
                  <div className="text-xs font-medium mb-1" style={{ color: s.color }}>{s.label}</div>
                  <div className="text-xs text-[#e2e8f0]">{s.value}</div>
                </div>
              ))}
            </div>

            <p className="text-[#94a3b8] text-xs leading-relaxed mb-3">{lab.desc}</p>
            <div className="p-2 rounded-lg" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}>
              <span className="text-[#00d4ff] text-xs font-medium">💡 Tip: </span>
              <span className="text-[#94a3b8] text-xs">{lab.tip}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tab 11: Meds ────────────────────────────────────────────────────────────
function MedsTab() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const severityColor = { mild: "#10b981", moderate: "#f59e0b", severe: "#ef4444" };
  const severityLabel = { mild: "경미", moderate: "주의", severe: "중요" };

  return (
    <div>
      <div className="disclaimer-box mb-4">
        <p className="text-xs text-[#e2e8f0]">약물 정보는 교육 목적입니다. 복용·변경·중단은 반드시 담당 의사와 상담하세요.</p>
      </div>

      <div className="space-y-2">
        {diabetesMeds.map((med) => (
          <div key={med.id} className="glow-card overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === med.id ? null : med.id)}
              className="w-full p-4 text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>💊</div>
                <div>
                  <div className="text-[#e2e8f0] font-semibold">{med.name}</div>
                  <div className="text-[#64748b] text-xs">{med.brands}</div>
                </div>
              </div>
              <span className="text-[#64748b] text-lg">{expanded === med.id ? "▲" : "▼"}</span>
            </button>

            <AnimatePresence>
              {expanded === med.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3">
                    <div className="text-xs text-[#64748b] italic">{med.english}</div>

                    <div className="p-3 rounded-lg" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}>
                      <div className="text-[#00d4ff] text-xs font-medium mb-1">작용 기전</div>
                      <p className="text-[#94a3b8] text-xs leading-relaxed">{med.action}</p>
                    </div>

                    <div>
                      <div className="text-[#10b981] text-xs font-medium mb-2">장점</div>
                      <div className="flex flex-wrap gap-1">
                        {med.pros.map((p, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}>{p}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[#f59e0b] text-xs font-medium mb-2">부작용 주의사항</div>
                      <div className="space-y-1">
                        {med.sideEffects.map((se, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                              style={{ background: `${severityColor[se.severity]}20`, color: severityColor[se.severity] }}>
                              {severityLabel[se.severity]}
                            </span>
                            <span className="text-[#94a3b8] text-xs">{se.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-2 rounded-lg" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                      <span className="text-[#f59e0b] text-xs font-medium">📌 </span>
                      <span className="text-[#94a3b8] text-xs">{med.note}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 12: Worker Tips ─────────────────────────────────────────────────────
function TipsTab() {
  return (
    <div>
      <div className="glow-card p-4 mb-4">
        <h3 className="text-[#00d4ff] font-semibold mb-1">직장인을 위한 혈당 관리 실전 팁</h3>
        <p className="text-[#94a3b8] text-xs">회식, 야근, 스트레스 속에서도 실천 가능한 전략들입니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {workerTips.map((tip, i) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glow-card p-4"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{tip.icon}</span>
              <div>
                <h4 className="text-[#e2e8f0] font-semibold text-sm mb-1">{tip.title}</h4>
                <p className="text-[#94a3b8] text-xs leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glow-card p-4 mt-4" style={{ borderColor: "#10b981" }}>
        <h4 className="text-[#10b981] font-semibold mb-2 text-sm">🎯 오늘부터 딱 하나만 시작한다면?</h4>
        <p className="text-[#94a3b8] text-xs leading-relaxed">
          점심 식사 후 10-15분 걷기. 가장 쉽고, 효과가 즉각적이며, 동료와 함께 할 수 있습니다.
          혈당 스파이크를 줄이는 것 외에도 스트레스 호르몬 감소, 소화 개선, 오후 집중력 향상에도 도움이 됩니다.
        </p>
      </div>

      <div className="disclaimer-box mt-3">
        <p className="text-xs text-[#94a3b8]">당뇨 진단을 받으셨거나 약을 복용 중이라면 생활습관 변화 전 의사와 상담하세요. 특히 식이 변화는 혈당약 용량 조정이 필요할 수 있습니다.</p>
      </div>
    </div>
  );
}
