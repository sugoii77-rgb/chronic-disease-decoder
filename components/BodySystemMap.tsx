"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bodySystemNodes } from "@/data/educationData";

export default function BodySystemMap() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedNode = bodySystemNodes.find((n) => n.id === selected);

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="section-header">신체 시스템 지도</h2>
        <p className="text-[#94a3b8] text-sm">
          각 장기나 시스템을 클릭하면 혈압·콜레스테롤과의 연관성을 볼 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {bodySystemNodes.map((node) => (
          <motion.button
            key={node.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(selected === node.id ? null : node.id)}
            className={`glow-card p-3 text-center transition-all cursor-pointer ${
              selected === node.id ? "glow-card-active" : ""
            }`}
          >
            <div className="text-2xl mb-1">{node.icon}</div>
            <div
              className="text-xs font-medium"
              style={{ color: selected === node.id ? node.highlight : "#e2e8f0" }}
            >
              {node.label}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="glow-card p-5"
            style={{ borderColor: selectedNode.highlight }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedNode.icon}</span>
              <div>
                <h3 className="font-bold text-lg" style={{ color: selectedNode.highlight }}>
                  {selectedNode.title}
                </h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${selectedNode.highlight}22`,
                    color: selectedNode.highlight,
                    border: `1px solid ${selectedNode.highlight}44`,
                  }}
                >
                  {selectedNode.relation}
                </span>
              </div>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              {selectedNode.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && (
        <div className="glow-card p-5 text-center">
          <div className="text-3xl mb-2">👆</div>
          <p className="text-[#94a3b8] text-sm">위의 장기/시스템을 클릭해 자세히 알아보세요</p>
        </div>
      )}

      {/* Connection diagram */}
      <div className="mt-6 glow-card p-5">
        <h4 className="text-[#00d4ff] font-semibold mb-3 text-sm">🔗 핵심 연결고리</h4>
        <div className="space-y-2">
          {[
            { from: "췌장/인슐린", arrow: "→", to: "신장", desc: "인슐린이 나트륨 저류 유발" },
            { from: "지방조직", arrow: "→", to: "혈관", desc: "염증 사이토카인 → 혈관 손상" },
            { from: "뇌/신경계", arrow: "→", to: "심장+혈관", desc: "교감신경 → 혈압 상승" },
            { from: "간", arrow: "→", to: "혈관", desc: "콜레스테롤 생산 및 수리 반응" },
          ].map((link, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs"
              style={{
                background: "rgba(0,212,255,0.04)",
                borderRadius: 8,
                padding: "8px 12px",
              }}
            >
              <span className="text-[#00d4ff] font-medium">{link.from}</span>
              <span className="text-[#64748b]">{link.arrow}</span>
              <span className="text-[#7c3aed] font-medium">{link.to}</span>
              <span className="text-[#64748b] ml-1">: {link.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
