"use client";

import { useD3 } from "./useD3";
import * as d3 from "d3";

/**
 * Process Discovery: scattered log rows animate into a clean process graph.
 * D3 draws the nodes, edges, and animates path drawing.
 */
export function DiscoveryDiagram() {
  const ref = useD3((svg) => {
    const w = 520, h = 240;
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    // ── Palette ──
    const ink = "#1F2937";
    const muted = "#9CA3AF";
    const border = "#D1D5DB";
    const emerald = "#047A55";
    const amber = "#F59E0B";
    const amberDark = "#92400E";
    const amberBg = "#FEF3C7";

    // ── Left side: log lines ──
    const logGroup = svg.append("g").attr("transform", "translate(20, 30)");

    logGroup.append("text")
      .attr("x", 50).attr("y", -8)
      .attr("text-anchor", "middle")
      .attr("fill", muted)
      .attr("font-size", 9).attr("font-weight", 500)
      .attr("letter-spacing", "0.08em")
      .text("EVENT LOGS");

    const logLines = [
      { w: 80, shade: 0 }, { w: 60, shade: 1 }, { w: 90, shade: 0 },
      { w: 50, shade: 1 }, { w: 75, shade: 0 }, { w: 85, shade: 1 },
      { w: 55, shade: 0 }, { w: 70, shade: 1 }, { w: 65, shade: 0 },
      { w: 80, shade: 1 },
    ];

    logLines.forEach((l, i) => {
      logGroup.append("rect")
        .attr("x", 0).attr("y", i * 16)
        .attr("width", 0).attr("height", 7)
        .attr("rx", 2)
        .attr("fill", l.shade ? "#E5E7EB" : border)
        .transition()
        .delay(i * 60)
        .duration(400)
        .ease(d3.easeCubicOut)
        .attr("width", l.w);
    });

    // ── Center: arrow ──
    const arrowGroup = svg.append("g").attr("transform", `translate(145, ${h / 2})`);

    const arrowLine = arrowGroup.append("line")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", 0).attr("y2", 0)
      .attr("stroke", emerald).attr("stroke-width", 2);

    arrowLine.transition().delay(700).duration(500)
      .attr("x2", 55);

    arrowGroup.append("polygon")
      .attr("points", "60,0 52,-4 52,4")
      .attr("fill", emerald)
      .attr("opacity", 0)
      .transition().delay(1100).duration(200)
      .attr("opacity", 1);

    arrowGroup.append("text")
      .attr("x", 30).attr("y", -12)
      .attr("text-anchor", "middle")
      .attr("fill", emerald)
      .attr("font-size", 9).attr("font-weight", 600)
      .attr("letter-spacing", "0.06em")
      .attr("opacity", 0)
      .text("MINE")
      .transition().delay(900).duration(300)
      .attr("opacity", 1);

    // ── Right side: process graph ──
    const graphGroup = svg.append("g").attr("transform", "translate(230, 20)");

    graphGroup.append("text")
      .attr("x", 130).attr("y", 2)
      .attr("text-anchor", "middle")
      .attr("fill", emerald)
      .attr("font-size", 9).attr("font-weight", 500)
      .attr("letter-spacing", "0.08em")
      .attr("opacity", 0)
      .text("DISCOVERED PROCESS")
      .transition().delay(1200).duration(400)
      .attr("opacity", 1);

    const nodes = [
      { id: "start", label: "Start", x: 30, y: 50, color: ink },
      { id: "check", label: "Check", x: 130, y: 50, color: ink },
      { id: "ship", label: "Ship", x: 230, y: 50, color: ink },
      { id: "review", label: "Review", x: 130, y: 140, color: amberDark, bg: amberBg, stroke: amber },
      { id: "end", label: "End", x: 230, y: 140, color: ink },
    ];

    const edges = [
      { from: "start", to: "check", dash: false, color: border },
      { from: "check", to: "ship", dash: false, color: border, label: "66%" },
      { from: "check", to: "review", dash: true, color: amber, label: "34%" },
      { from: "review", to: "end", dash: false, color: border },
      { from: "ship", to: "end", dash: false, color: border },
    ];

    const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
    const r = 22;

    // Draw edges
    edges.forEach((e, i) => {
      const from = nodeMap[e.from], to = nodeMap[e.to];
      const dx = to.x - from.x, dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ux = dx / dist, uy = dy / dist;
      const x1 = from.x + ux * r, y1 = from.y + uy * r;
      const x2 = to.x - ux * r, y2 = to.y - uy * r;

      const line = graphGroup.append("line")
        .attr("x1", x1).attr("y1", y1)
        .attr("x2", x1).attr("y2", y1)
        .attr("stroke", e.color).attr("stroke-width", 1.5);

      if (e.dash) line.attr("stroke-dasharray", "6 4");

      line.transition().delay(1300 + i * 150).duration(400)
        .attr("x2", x2).attr("y2", y2);

      // Arrow head
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const ax = x2, ay = y2;
      const p1x = ax - 7 * Math.cos(angle - 0.4), p1y = ay - 7 * Math.sin(angle - 0.4);
      const p2x = ax - 7 * Math.cos(angle + 0.4), p2y = ay - 7 * Math.sin(angle + 0.4);

      graphGroup.append("polygon")
        .attr("points", `${ax},${ay} ${p1x},${p1y} ${p2x},${p2y}`)
        .attr("fill", e.color)
        .attr("opacity", 0)
        .transition().delay(1300 + i * 150 + 350).duration(150)
        .attr("opacity", 1);

      // Edge label
      if (e.label) {
        graphGroup.append("text")
          .attr("x", (x1 + x2) / 2 + (dy > 0 ? -14 : 0))
          .attr("y", (y1 + y2) / 2 + (dy > 0 ? 0 : -10))
          .attr("text-anchor", "middle")
          .attr("fill", e.dash ? amberDark : muted)
          .attr("font-size", 8).attr("font-weight", 500)
          .attr("opacity", 0)
          .text(e.label)
          .transition().delay(1300 + i * 150 + 200).duration(200)
          .attr("opacity", 1);
      }
    });

    // Draw nodes
    nodes.forEach((n, i) => {
      const g = graphGroup.append("g")
        .attr("transform", `translate(${n.x}, ${n.y})`)
        .attr("opacity", 0);

      g.append("circle")
        .attr("r", r)
        .attr("fill", n.bg || "white")
        .attr("stroke", n.stroke || border)
        .attr("stroke-width", 1.5);

      g.append("text")
        .attr("y", 4)
        .attr("text-anchor", "middle")
        .attr("fill", n.color)
        .attr("font-size", 10)
        .text(n.label);

      g.transition().delay(1200 + i * 100).duration(400)
        .attr("opacity", 1);
    });

    // Bottom caption
    svg.append("text")
      .attr("x", w / 2 + 60).attr("y", h - 10)
      .attr("text-anchor", "middle")
      .attr("fill", muted)
      .attr("font-size", 9)
      .attr("opacity", 0)
      .text("23 variants automatically discovered")
      .transition().delay(2000).duration(400)
      .attr("opacity", 1);

  }, []);

  return (
    <svg
      ref={ref}
      className="h-auto w-full"
      style={{ maxWidth: 520, margin: "0 auto", display: "block" }}
    />
  );
}
