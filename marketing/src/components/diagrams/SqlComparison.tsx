"use client";

import { useD3 } from "./useD3";
import * as d3 from "d3";

/**
 * SQL vs Process Mining: side-by-side comparison.
 * Left: flat SQL query → number. Right: process flow → root cause insight.
 */
export function SqlComparison() {
  const ref = useD3((svg) => {
    const w = 520, h = 220;
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const ink = "#1F2937";
    const muted = "#9CA3AF";
    const border = "#E5E7EB";
    const emerald = "#047A55";
    const emeraldBg = "#F0FDF4";
    const amber = "#F59E0B";
    const amberDark = "#92400E";
    const amberBg = "#FEF3C7";

    // ── Left panel: SQL ──
    const leftG = svg.append("g").attr("opacity", 0);

    leftG.append("rect")
      .attr("x", 0).attr("y", 0)
      .attr("width", 240).attr("height", h)
      .attr("rx", 8)
      .attr("fill", "white").attr("stroke", border).attr("stroke-width", 1);

    leftG.append("text")
      .attr("x", 120).attr("y", 26)
      .attr("text-anchor", "middle")
      .attr("fill", muted).attr("font-size", 9).attr("font-weight", 500)
      .attr("letter-spacing", "0.1em")
      .text("TRADITIONAL SQL");

    // Code block
    leftG.append("rect")
      .attr("x", 16).attr("y", 40)
      .attr("width", 208).attr("height", 72)
      .attr("rx", 4)
      .attr("fill", ink);

    const codeLines = [
      { parts: [{ t: "SELECT", c: "#6EE7B7" }, { t: " COUNT(*)", c: "#9CA3AF" }], y: 58 },
      { parts: [{ t: "FROM", c: "#6EE7B7" }, { t: " orders", c: "#9CA3AF" }], y: 74 },
      { parts: [{ t: "WHERE", c: "#6EE7B7" }, { t: " status = ", c: "#9CA3AF" }, { t: "'late'", c: "#FCD34D" }], y: 90 },
      { parts: [{ t: "→ 847 rows", c: "#6B7280" }], y: 104 },
    ];

    codeLines.forEach((line) => {
      let xPos = 28;
      line.parts.forEach((part) => {
        const t = leftG.append("text")
          .attr("x", xPos).attr("y", line.y)
          .attr("fill", part.c).attr("font-size", 9)
          .attr("font-family", "'SF Mono', 'Consolas', monospace")
          .text(part.t);
        xPos += t.node()!.getComputedTextLength() + 1;
      });
    });

    // Result
    leftG.append("text")
      .attr("x", 120).attr("y", 148)
      .attr("text-anchor", "middle")
      .attr("fill", ink).attr("font-size", 32).attr("font-weight", 300)
      .text("847");

    leftG.append("text")
      .attr("x", 120).attr("y", 166)
      .attr("text-anchor", "middle")
      .attr("fill", muted).attr("font-size", 10)
      .text("late orders");

    leftG.append("text")
      .attr("x", 120).attr("y", 194)
      .attr("text-anchor", "middle")
      .attr("fill", muted).attr("font-size", 9).attr("font-style", "italic")
      .text("Tells you what. Not why.");

    leftG.transition().duration(500).attr("opacity", 1);

    // ── VS circle ──
    const vsG = svg.append("g")
      .attr("transform", `translate(${w / 2}, ${h / 2})`)
      .attr("opacity", 0);

    vsG.append("circle")
      .attr("r", 16)
      .attr("fill", "#F3F4F6").attr("stroke", border);

    vsG.append("text")
      .attr("y", 4).attr("text-anchor", "middle")
      .attr("fill", muted).attr("font-size", 9).attr("font-weight", 600)
      .text("vs");

    vsG.transition().delay(400).duration(300).attr("opacity", 1);

    // ── Right panel: Process Mining ──
    const rightG = svg.append("g")
      .attr("transform", "translate(280, 0)")
      .attr("opacity", 0);

    rightG.append("rect")
      .attr("x", 0).attr("y", 0)
      .attr("width", 240).attr("height", h)
      .attr("rx", 8)
      .attr("fill", emeraldBg).attr("stroke", emerald).attr("stroke-width", 1);

    rightG.append("text")
      .attr("x", 120).attr("y", 26)
      .attr("text-anchor", "middle")
      .attr("fill", emerald).attr("font-size", 9).attr("font-weight", 500)
      .attr("letter-spacing", "0.1em")
      .text("PROCESS MINING");

    // Mini process flow
    const flowNodes = [
      { label: "Order", x: 30, y: 55 },
      { label: "Verify", x: 100, y: 55 },
      { label: "Ship", x: 170, y: 55 },
    ];

    flowNodes.forEach((n, i) => {
      rightG.append("circle")
        .attr("cx", n.x).attr("cy", n.y).attr("r", 14)
        .attr("fill", "white").attr("stroke", emerald).attr("stroke-width", 1);

      rightG.append("text")
        .attr("x", n.x).attr("y", n.y + 4)
        .attr("text-anchor", "middle")
        .attr("fill", emerald).attr("font-size", 7)
        .text(n.label);

      if (i < flowNodes.length - 1) {
        rightG.append("line")
          .attr("x1", n.x + 14).attr("y1", n.y)
          .attr("x2", flowNodes[i + 1].x - 14).attr("y2", n.y)
          .attr("stroke", emerald).attr("stroke-width", 0.8);
      }
    });

    // Bottleneck branch
    rightG.append("line")
      .attr("x1", 100).attr("y1", 69)
      .attr("x2", 100).attr("y2", 88)
      .attr("stroke", amber).attr("stroke-width", 1.2)
      .attr("stroke-dasharray", "4 3");

    rightG.append("rect")
      .attr("x", 65).attr("y", 88)
      .attr("width", 70).attr("height", 22).attr("rx", 11)
      .attr("fill", amberBg).attr("stroke", amber).attr("stroke-width", 1);

    rightG.append("text")
      .attr("x", 100).attr("y", 103)
      .attr("text-anchor", "middle")
      .attr("fill", amberDark).attr("font-size", 8).attr("font-weight", 500)
      .text("Bottleneck");

    // Insight text
    rightG.append("text")
      .attr("x", 120).attr("y", 135)
      .attr("text-anchor", "middle")
      .attr("fill", ink).attr("font-size", 11).attr("font-weight", 500)
      .text("847 late orders");

    rightG.append("text")
      .attr("x", 120).attr("y", 152)
      .attr("text-anchor", "middle")
      .attr("fill", emerald).attr("font-size", 10).attr("font-weight", 600)
      .text("Root cause: Manual Review");

    rightG.append("text")
      .attr("x", 120).attr("y", 170)
      .attr("text-anchor", "middle")
      .attr("fill", muted).attr("font-size", 9)
      .text("34% of cases · +4.2 days avg");

    rightG.append("text")
      .attr("x", 120).attr("y", 198)
      .attr("text-anchor", "middle")
      .attr("fill", emerald).attr("font-size", 9).attr("font-style", "italic").attr("font-weight", 500)
      .text("Shows you why. Actionable.");

    rightG.transition().delay(300).duration(500).attr("opacity", 1);

  }, []);

  return (
    <svg
      ref={ref}
      className="h-auto w-full"
      style={{ maxWidth: 540, margin: "0 auto", display: "block" }}
    />
  );
}
