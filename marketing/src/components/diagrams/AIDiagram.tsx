"use client";

import { useD3 } from "./useD3";
import * as d3 from "d3";

/**
 * AI Insights: a case flowing through a process, getting flagged by an AI model,
 * which triggers an automated response. Clean conceptual illustration.
 */
export function AIDiagram() {
  const ref = useD3((svg) => {
    const w = 520, h = 220;
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const ink = "#1F2937";
    const muted = "#9CA3AF";
    const border = "#E5E7EB";
    const emerald = "#047A55";
    const violet = "#7C3AED";
    const violetBg = "#F5F3FF";
    const red = "#EF4444";
    const redBg = "#FEE2E2";
    const redDark = "#991B1B";

    // ── Left: case with rework loop ──
    svg.append("text")
      .attr("x", 80).attr("y", 18)
      .attr("text-anchor", "middle")
      .attr("fill", muted).attr("font-size", 9).attr("font-weight", 500)
      .attr("letter-spacing", "0.08em")
      .text("LIVE CASE #4,821");

    const caseSteps = ["Create", "Review", "Review", "Review"];
    caseSteps.forEach((label, i) => {
      const x = 16 + i * 48;
      const isRework = i > 1;

      const g = svg.append("g")
        .attr("transform", `translate(${x}, 30)`)
        .attr("opacity", 0);

      g.append("circle")
        .attr("cx", 16).attr("cy", 16).attr("r", 16)
        .attr("fill", isRework ? redBg : "white")
        .attr("stroke", isRework ? red : border)
        .attr("stroke-width", 1.3);

      g.append("text")
        .attr("x", 16).attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("fill", isRework ? redDark : ink)
        .attr("font-size", 7)
        .text(label);

      g.transition().delay(i * 150).duration(400).attr("opacity", 1);

      if (i < 3) {
        svg.append("line")
          .attr("x1", x + 32).attr("y1", 46)
          .attr("x2", x + 32).attr("y2", 46)
          .attr("stroke", isRework ? "#FECACA" : border)
          .attr("stroke-width", 1)
          .transition().delay(i * 150 + 200).duration(200)
          .attr("x2", x + 64);
      }
    });

    // Rework loop arc
    const loopPath = svg.append("path")
      .attr("d", "M 192 62 C 192 82, 128 82, 128 62")
      .attr("fill", "none")
      .attr("stroke", red).attr("stroke-width", 1.2)
      .attr("stroke-dasharray", "5 3");

    const loopLen = loopPath.node()!.getTotalLength();
    loopPath
      .attr("stroke-dashoffset", loopLen)
      .attr("stroke-dasharray", loopLen)
      .transition().delay(600).duration(600)
      .attr("stroke-dashoffset", 0)
      .on("end", function() { d3.select(this).attr("stroke-dasharray", "5 3"); });

    svg.append("text")
      .attr("x", 160).attr("y", 96)
      .attr("text-anchor", "middle")
      .attr("fill", red).attr("font-size", 8).attr("font-weight", 500)
      .attr("opacity", 0)
      .text("rework loop ×3")
      .transition().delay(1000).duration(300).attr("opacity", 1);

    // ── Center: AI model ──
    const aiX = 260, aiY = 46;

    svg.append("line")
      .attr("x1", 210).attr("y1", aiY)
      .attr("x2", 210).attr("y2", aiY)
      .attr("stroke", border).attr("stroke-width", 1.2)
      .transition().delay(900).duration(400)
      .attr("x2", aiX - 28);

    const aiG = svg.append("g")
      .attr("transform", `translate(${aiX}, ${aiY})`)
      .attr("opacity", 0);

    aiG.append("circle")
      .attr("r", 28)
      .attr("fill", violetBg)
      .attr("stroke", violet).attr("stroke-width", 1.5);

    aiG.append("text")
      .attr("y", -4).attr("text-anchor", "middle")
      .attr("fill", violet).attr("font-size", 8)
      .attr("font-weight", 700).attr("letter-spacing", "0.06em")
      .text("AI");

    aiG.append("text")
      .attr("y", 10).attr("text-anchor", "middle")
      .attr("fill", violet).attr("font-size", 8)
      .text("Model");

    aiG.transition().delay(1100).duration(500).attr("opacity", 1);

    // Arrow from AI to prediction
    svg.append("line")
      .attr("x1", aiX + 28).attr("y1", aiY)
      .attr("x2", aiX + 28).attr("y2", aiY)
      .attr("stroke", border).attr("stroke-width", 1.2)
      .transition().delay(1400).duration(300)
      .attr("x2", 330);

    // ── Right: prediction card ──
    const cardG = svg.append("g")
      .attr("transform", "translate(335, 12)")
      .attr("opacity", 0);

    cardG.append("rect")
      .attr("width", 170).attr("height", 72).attr("rx", 6)
      .attr("fill", "white").attr("stroke", border).attr("stroke-width", 1);

    // Alert dot
    cardG.append("circle")
      .attr("cx", 18).attr("cy", 20).attr("r", 4)
      .attr("fill", red);

    cardG.append("text")
      .attr("x", 28).attr("y", 24)
      .attr("fill", redDark).attr("font-size", 9).attr("font-weight", 600)
      .text("SLA Breach: 87%");

    cardG.append("text")
      .attr("x", 18).attr("y", 42)
      .attr("fill", muted).attr("font-size", 9)
      .text("Est. delay: +2.1 days");

    cardG.append("text")
      .attr("x", 18).attr("y", 60)
      .attr("fill", emerald).attr("font-size", 9).attr("font-weight", 500)
      .text("→ Escalate to Senior AP");

    cardG.transition().delay(1500).duration(500).attr("opacity", 1);

    // ── Bottom: automated actions ──
    svg.append("line")
      .attr("x1", aiX).attr("y1", aiY + 28)
      .attr("x2", aiX).attr("y2", aiY + 28)
      .attr("stroke", violet).attr("stroke-width", 1.2)
      .attr("stroke-dasharray", "5 3")
      .transition().delay(1700).duration(400)
      .attr("y2", 120);

    svg.append("polygon")
      .attr("points", `${aiX},125 ${aiX - 4},119 ${aiX + 4},119`)
      .attr("fill", violet)
      .attr("opacity", 0)
      .transition().delay(2050).duration(200).attr("opacity", 1);

    svg.append("text")
      .attr("x", w / 2).attr("y", 142)
      .attr("text-anchor", "middle")
      .attr("fill", muted).attr("font-size", 9).attr("font-weight", 500)
      .attr("letter-spacing", "0.08em")
      .attr("opacity", 0)
      .text("AUTOMATED RESPONSE")
      .transition().delay(2000).duration(300).attr("opacity", 1);

    const actions = [
      { label: "Reassign", sub: "to senior team" },
      { label: "Alert", sub: "manager notified" },
      { label: "Log", sub: "audit trail" },
    ];

    actions.forEach((a, i) => {
      const x = 100 + i * 140;
      const g = svg.append("g")
        .attr("transform", `translate(${x}, 155)`)
        .attr("opacity", 0);

      g.append("rect")
        .attr("width", 120).attr("height", 44).attr("rx", 5)
        .attr("fill", violetBg).attr("stroke", violet).attr("stroke-width", 1);

      g.append("text")
        .attr("x", 60).attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#5B21B6").attr("font-size", 10).attr("font-weight", 500)
        .text(a.label);

      g.append("text")
        .attr("x", 60).attr("y", 35)
        .attr("text-anchor", "middle")
        .attr("fill", "#8B5CF6").attr("font-size", 8)
        .text(a.sub);

      g.transition().delay(2100 + i * 120).duration(400).attr("opacity", 1);

      if (i < 2) {
        svg.append("line")
          .attr("x1", x + 120).attr("y1", 177)
          .attr("x2", x + 120).attr("y2", 177)
          .attr("stroke", "#DDD6FE").attr("stroke-width", 1)
          .transition().delay(2200 + i * 120).duration(200)
          .attr("x2", x + 140);
      }
    });

  }, []);

  return (
    <svg
      ref={ref}
      className="h-auto w-full"
      style={{ maxWidth: 520, margin: "0 auto", display: "block" }}
    />
  );
}
