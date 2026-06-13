"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  { icon: "🧠", title: "뇌·신경 지지", desc: "뇌 건조 중량의 약 60%가 지방이며, 콜레스테롤은 신경세포 절연체(미엘린)의 핵심 성분입니다." },
  { icon: "🔲", title: "세포막 구조", desc: "모든 세포막은 콜레스테롤을 포함하여 막의 유동성과 구조를 유지합니다." },
  { icon: "⚗️", title: "호르몬 생산", desc: "에스트로겐, 테스토스테론, 코르티솔, 비타민 D... 모두 콜레스테롤에서 만들어집니다." },
  { icon: "🟡", title: "담즙 생산", desc: "간은 콜레스테롤로 담즙을 만들어 지방 소화를 돕습니다. 콜레스테롤 제거의 주요 경로이기도 합니다." },
  { icon: "🩹", title: "혈관 수리 반응", desc: "혈관 내막이 손상되면 콜레스테롤이 수리 재료로 보내질 수 있습니다. '수리대'가 아니라 '왜 손상됐는지'가 핵심 질문입니다." },
];

// ─── Canvas 혈관 애니메이션 ───────────────────────────────────────────────────
type Phase = "ldl-approach" | "repair" | "hdl-return";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: Phase;
  progress: number; // 0→1
  repaired: boolean;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

function VesselAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  const VESSEL_Y = 90;      // center-line of vessel
  const VESSEL_H = 44;      // inner height
  const DAMAGE_X = 200;     // damage crack x position
  const DAMAGE_W = 30;      // crack width

  const spawnParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    return {
      x: -16,
      y: VESSEL_Y + (Math.random() - 0.5) * (VESSEL_H * 0.5),
      vx: 1.1 + Math.random() * 0.6,
      vy: 0,
      r: 7 + Math.random() * 3,
      phase: "ldl-approach",
      progress: 0,
      repaired: false,
      opacity: 1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.04 + Math.random() * 0.03,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    let spawnTimer = 0;

    const draw = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, W, H);

      // ── Vessel walls ──────────────────────────────────
      const wallTop = VESSEL_Y - VESSEL_H / 2 - 10;
      const wallBot = VESSEL_Y + VESSEL_H / 2 + 10;

      // outer glow
      const gradient = ctx.createLinearGradient(0, wallTop - 4, 0, wallBot + 4);
      gradient.addColorStop(0, "rgba(239,68,68,0)");
      gradient.addColorStop(0.3, "rgba(239,68,68,0.35)");
      gradient.addColorStop(0.7, "rgba(239,68,68,0.35)");
      gradient.addColorStop(1, "rgba(239,68,68,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, wallTop - 4, W, wallBot - wallTop + 8);

      // inner channel (blood)
      const inner = ctx.createLinearGradient(0, VESSEL_Y - VESSEL_H / 2, 0, VESSEL_Y + VESSEL_H / 2);
      inner.addColorStop(0, "rgba(20,5,10,0.9)");
      inner.addColorStop(0.5, "rgba(40,10,15,0.8)");
      inner.addColorStop(1, "rgba(20,5,10,0.9)");
      ctx.fillStyle = inner;
      ctx.fillRect(0, VESSEL_Y - VESSEL_H / 2, W, VESSEL_H);

      // wall lines (top + bottom)
      ctx.strokeStyle = "rgba(239,68,68,0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      // top wall — break at damage
      ctx.moveTo(0, VESSEL_Y - VESSEL_H / 2);
      ctx.lineTo(DAMAGE_X - 4, VESSEL_Y - VESSEL_H / 2);
      ctx.moveTo(DAMAGE_X + DAMAGE_W + 4, VESSEL_Y - VESSEL_H / 2);
      ctx.lineTo(W, VESSEL_Y - VESSEL_H / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, VESSEL_Y + VESSEL_H / 2);
      ctx.lineTo(W, VESSEL_Y + VESSEL_H / 2);
      ctx.stroke();

      // ── Damage crack ──────────────────────────────────
      // Count repaired particles near damage
      const repairedCount = particlesRef.current.filter(
        (p) => p.repaired && Math.abs(p.x - DAMAGE_X) < DAMAGE_W * 2
      ).length;

      ctx.save();
      // crack zigzag
      ctx.strokeStyle = `rgba(239,68,68,${Math.max(0.1, 0.8 - repairedCount * 0.15)})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(DAMAGE_X, VESSEL_Y - VESSEL_H / 2 - 6);
      ctx.lineTo(DAMAGE_X + 8, VESSEL_Y - VESSEL_H / 2 + 4);
      ctx.lineTo(DAMAGE_X + DAMAGE_W / 2, VESSEL_Y - VESSEL_H / 2 + 2);
      ctx.lineTo(DAMAGE_X + DAMAGE_W, VESSEL_Y - VESSEL_H / 2 - 6);
      ctx.stroke();

      // patch fill (yellowish) as particles repair it
      if (repairedCount > 0) {
        const patchAlpha = Math.min(0.7, repairedCount * 0.14);
        ctx.fillStyle = `rgba(245,158,11,${patchAlpha})`;
        ctx.beginPath();
        ctx.moveTo(DAMAGE_X - 2, VESSEL_Y - VESSEL_H / 2 - 6);
        ctx.lineTo(DAMAGE_X + DAMAGE_W + 2, VESSEL_Y - VESSEL_H / 2 - 6);
        ctx.lineTo(DAMAGE_X + DAMAGE_W + 2, VESSEL_Y - VESSEL_H / 2 + 8);
        ctx.lineTo(DAMAGE_X - 2, VESSEL_Y - VESSEL_H / 2 + 8);
        ctx.closePath();
        ctx.fill();

        // repaired glow
        if (repairedCount >= 3) {
          ctx.strokeStyle = `rgba(16,185,129,${Math.min(0.8, (repairedCount - 2) * 0.15)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(DAMAGE_X, VESSEL_Y - VESSEL_H / 2);
          ctx.lineTo(DAMAGE_X + DAMAGE_W, VESSEL_Y - VESSEL_H / 2);
          ctx.stroke();
        }
      }
      ctx.restore();

      // ── Particles ─────────────────────────────────────
      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0.02);

      for (const p of particlesRef.current) {
        p.wobble += p.wobbleSpeed;
        p.vy = Math.sin(p.wobble) * 0.5;

        if (p.phase === "ldl-approach") {
          p.x += p.vx;
          p.y += p.vy;

          // clamp inside vessel
          const top = VESSEL_Y - VESSEL_H / 2 + p.r + 2;
          const bot = VESSEL_Y + VESSEL_H / 2 - p.r - 2;
          if (p.y < top) p.y = top;
          if (p.y > bot) p.y = bot;

          // Reach damage zone → repair
          if (p.x >= DAMAGE_X - 10 && p.x <= DAMAGE_X + DAMAGE_W + 10) {
            const others = particlesRef.current.filter(
              (o) => o !== p && o.repaired && Math.abs(o.x - DAMAGE_X) < DAMAGE_W + 10
            ).length;
            if (others < 5 && !p.repaired) {
              p.phase = "repair";
              p.vx = 0;
            }
          }
        } else if (p.phase === "repair") {
          // drift toward damage top
          const targetY = VESSEL_Y - VESSEL_H / 2 + 6;
          p.y += (targetY - p.y) * 0.08;
          p.x += (DAMAGE_X + DAMAGE_W / 2 - p.x) * 0.04;

          if (Math.abs(p.y - targetY) < 4) {
            p.repaired = true;
            p.phase = "hdl-return";
            p.vx = -(1.4 + Math.random() * 0.5);
            p.vy = 0;
            // become HDL: grow slightly
            p.r = Math.min(p.r + 3, 13);
          }
        } else if (p.phase === "hdl-return") {
          // move left (back to liver)
          p.x += p.vx;
          p.y += p.vy;

          const top = VESSEL_Y - VESSEL_H / 2 + p.r + 2;
          const bot = VESSEL_Y + VESSEL_H / 2 - p.r - 2;
          if (p.y < top) p.y = top;
          if (p.y > bot) p.y = bot;

          if (p.x < -20) p.opacity = 0;
        }

        // ── Draw particle ─────────────────────────────
        const isHDL = p.repaired;
        const color = isHDL
          ? `rgba(16,185,129,${p.opacity})`        // HDL = green
          : `rgba(245,158,11,${p.opacity})`;       // LDL = amber

        const glowColor = isHDL
          ? `rgba(16,185,129,${p.opacity * 0.4})`
          : `rgba(245,158,11,${p.opacity * 0.4})`;

        // glow
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = glowColor;

        // body
        const grad = ctx.createRadialGradient(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.1, p.x, p.y, p.r);
        grad.addColorStop(0, isHDL ? `rgba(100,255,180,${p.opacity})` : `rgba(255,220,80,${p.opacity})`);
        grad.addColorStop(1, color);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // ring
        ctx.strokeStyle = isHDL
          ? `rgba(16,185,129,${p.opacity * 0.8})`
          : `rgba(200,120,0,${p.opacity * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // label dot inside
        ctx.fillStyle = isHDL ? `rgba(0,80,40,${p.opacity})` : `rgba(100,50,0,${p.opacity})`;
        ctx.font = `bold ${Math.round(p.r * 0.85)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(isHDL ? "H" : "L", p.x, p.y);

        ctx.restore();
      }

      // ── Labels ────────────────────────────────────────
      // "간 (출발)" left
      ctx.fillStyle = "rgba(148,163,184,0.7)";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("간 →", 6, VESSEL_Y + VESSEL_H / 2 + 22);

      // "간 (회수)" left arrow for HDL
      ctx.fillStyle = "rgba(16,185,129,0.6)";
      ctx.textAlign = "right";
      ctx.fillText("← 간 회수", W - 6, VESSEL_Y + VESSEL_H / 2 + 22);

      // damage label
      ctx.fillStyle = "rgba(239,68,68,0.8)";
      ctx.textAlign = "center";
      ctx.font = "10px sans-serif";
      ctx.fillText("손상부위", DAMAGE_X + DAMAGE_W / 2, VESSEL_Y - VESSEL_H / 2 - 14);

      // Spawn
      spawnTimer++;
      if (spawnTimer > 75 && particlesRef.current.filter((p) => p.phase === "ldl-approach").length < 4) {
        particlesRef.current.push(spawnParticle(canvas));
        spawnTimer = 0;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [spawnParticle]);

  return (
    <canvas
      ref={canvasRef}
      width={420}
      height={160}
      style={{ width: "100%", height: "auto", borderRadius: 10 }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CholesterolLab() {
  const [activeRole, setActiveRole] = useState<number | null>(null);
  const [showAnalogy, setShowAnalogy] = useState(true);

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">콜레스테롤 교육 실험실</h2>
        <p className="text-[#94a3b8] text-sm">
          콜레스테롤은 단순히 낮춰야 할 숫자가 아닙니다. 생명에 필수적인 물질입니다.
        </p>
      </div>

      {/* Analogy */}
      <motion.div
        className="glow-card p-5 mb-6"
        style={{ borderColor: "#f59e0b" }}
      >
        <div
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => setShowAnalogy(!showAnalogy)}
        >
          <h3 className="text-[#f59e0b] font-bold">🛣️ 혈관 수리 시각화</h3>
          <span className="text-[#64748b] text-sm">{showAnalogy ? "▲" : "▼"}</span>
        </div>

        <AnimatePresence initial={false}>
          {showAnalogy && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {/* Legend */}
              <div className="flex gap-4 mb-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full inline-block" style={{ background: "radial-gradient(circle at 35% 35%, #ffe080, #f59e0b)", border: "1.5px solid #c97800" }} />
                  <span className="text-[#f59e0b] font-medium">LDL</span>
                  <span className="text-[#64748b]">— 가볍고 지방 많음, 수리 재료 운반</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full inline-block" style={{ background: "radial-gradient(circle at 35% 35%, #64ffb4, #10b981)", border: "1.5px solid #10b981" }} />
                  <span className="text-[#10b981] font-medium">HDL</span>
                  <span className="text-[#64748b]">— 수리 후 무거워져 간으로 회수</span>
                </div>
              </div>

              {/* Canvas animation */}
              <div className="rounded-xl overflow-hidden mb-3" style={{ background: "rgba(10,15,30,0.8)", border: "1px solid rgba(239,68,68,0.25)" }}>
                <VesselAnimation />
              </div>

              {/* Step explanation */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { step: "①", color: "#f59e0b", label: "LDL 접근", desc: "간에서 만들어진 가벼운 LDL이 혈관을 따라 흐름" },
                  { step: "②", color: "#ef4444", label: "손상 부위 수리", desc: "손상된 내막에 콜레스테롤이 달라붙어 틈을 메움" },
                  { step: "③", color: "#10b981", label: "HDL로 귀환", desc: "지방을 흡수해 무거워진 HDL이 간으로 되돌아감" },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="rounded-lg p-2 text-center"
                    style={{ background: `${s.color}0d`, border: `1px solid ${s.color}30` }}
                  >
                    <div className="font-bold mb-1" style={{ color: s.color, fontSize: 13 }}>
                      {s.step} {s.label}
                    </div>
                    <div className="text-[#94a3b8] text-xs leading-tight">{s.desc}</div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-lg p-3 mb-3"
                style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}
              >
                <p className="text-[#94a3b8] text-xs leading-relaxed">
                  <span className="text-[#00d4ff] font-semibold">진짜 질문: </span>
                  왜 혈관이 계속 손상되고 있는가?<br />
                  만성 염증 · 산화 스트레스 · 고혈당이 내막을 손상 → LDL이 틈으로 침투 → 산화 → 플라크 형성.
                  LDL 수치를 낮추는 것과 <strong className="text-[#e2e8f0]">혈관이 손상되지 않도록 하는 것</strong>, 두 가지가 모두 중요합니다.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Essential Roles */}
      <div className="mb-6">
        <h3 className="text-[#e2e8f0] font-semibold mb-3 text-sm">콜레스테롤의 필수 역할 5가지</h3>
        <div className="space-y-3">
          {roles.map((role, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveRole(activeRole === i ? null : i)}
              className={`w-full glow-card p-4 text-left transition-all ${
                activeRole === i ? "glow-card-active" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{role.icon}</span>
                <div className="flex-1">
                  <div className="text-[#e2e8f0] text-sm font-medium">{role.title}</div>
                  <AnimatePresence>
                    {activeRole === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-[#94a3b8] text-xs mt-2 leading-relaxed overflow-hidden"
                      >
                        {role.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-[#64748b] text-xs">{activeRole === i ? "▲" : "▼"}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* LDL vs HDL */}
      <div className="glow-card p-5">
        <h3 className="text-[#00d4ff] font-semibold mb-4">LDL vs HDL — 운반체 이야기</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg p-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
            <div className="text-2xl mb-2">🚚</div>
            <div className="text-[#ef4444] font-medium text-sm mb-1">LDL</div>
            <div className="text-[#94a3b8] text-xs">간 → 조직으로 콜레스테롤 운반. 작고 산화된 LDL 입자가 특히 문제가 될 수 있음.</div>
          </div>
          <div className="rounded-lg p-3" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}>
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-[#10b981] font-medium text-sm mb-1">HDL</div>
            <div className="text-[#94a3b8] text-xs">조직 → 간으로 콜레스테롤 회수. '청소차' 역할. 높을수록 일반적으로 유리.</div>
          </div>
        </div>
        <div
          className="mt-3 rounded-lg p-3 text-xs"
          style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)" }}
        >
          <span className="text-[#00d4ff] font-medium">💡 최신 관점:</span>
          <span className="text-[#94a3b8]"> 총 LDL 숫자보다 중성지방/HDL 비율, 소립자 LDL 비율, 염증 지표(CRP 등)가 위험도를 더 잘 반영할 수 있다는 연구들이 있습니다.</span>
        </div>
        <p className="text-[#64748b] text-xs mt-2 italic">* 이 내용은 의학적 진단이 아닌 교육용입니다.</p>
      </div>
    </div>
  );
}
