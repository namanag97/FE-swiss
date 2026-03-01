"use client";

import { useD3 } from "./useD3";
import * as d3 from "d3";

/**
 * Analytics diagram: KPI cards on top, bar chart + variant distribution below.
 * D3 animates the bars growing and numbers counting up.
 */
export function AnalyticsDiagram() {
  const ref = useD3((svg) => {
    const w = 520, h = 260;
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const ink = "#1F2937";
    const muted = "#9CA3AF";
    const border = "#E5E7EB";
    const emerald = "#047A55";
    const amber = "#F59E0B";
    const red = "#EF4444";

    // ── KPI row ──
    const kpis = [
      { label: "CYCLE TIME", value: "4.2d", delta: "↓12%", x: 10 },
      { label: "THROUGHPUT", value: "847/d", delta: "↑8%", x: 135 },
      { label: "ON-TIME", value: "78%", delta: "↑5%", x: 260 },
      { label: "REWORK RATE", value: "12%", delta: "↓3%", x: 385 },
    ];

    kpis.forEach((kpi, i) => {
      const g = svg.append("g")
        .attr("transform", `translate(${kpi.x}, 8)`)
        .attr("opacity", 0);

      g.append("rect")
        .attr("width", 118).attr("height", 58).attr("rx", 5)
        .attr("fill", "white").attr("stroke", border).attr("stroke-width", 1);

      g.append("text")
        .attr("x", 14).attr("y", 24)
        .attr("fill", muted).attr("font-size", 7.5)
        .attr("font-weight", 500).attr("letter-spacing", "0.08em")
        .text(kpi.label);

      g.append("text")
        .attr("x", 14).attr("y", 48)
        .attr("fill", ink).attr("font-size", 18)
        .attr("font-weight", 300).attr("letter-spacing", "-0.02em")
        .text(kpi.value);

      g.append("text")
        .attr("x", 90).attr("y", 48)
        .attr("fill", emerald).attr("font-size", 10)
        .attr("font-weight", 500)
        .text(kpi.delta);

      g.transition().delay(i * 100).duration(500).attr("opacity", 1);
    });

    // ── Bar chart ──
    const chartG = svg.append("g").attr("transform", "translate(10, 80)");

    chartG.append("rect")
      .attr("width", 250).attr("height", 140).attr("rx", 5)
      .attr("fill", "white").attr("stroke", border).attr("stroke-width", 1);

    chartG.append("text")
      .attr("x", 16).attr("y", 22)
      .attr("fill", muted).attr("font-size", 7.5)
      .attr("font-weight", 500).attr("letter-spacing", "0.08em")
      .text("WEEKLY THROUGHPUT");

    const barData = [
      { label: "Mon", v: 38 }, { label: "Tue", v: 55 },
      { label: "Wed", v: 42 }, { label: "Thu", v: 70 },
      { label: "Fri", v: 62 }, { label: "Sat", v: 35 },
      { label: "Sun", v: 28 },
    ];
    const barW = 24, barGap = 6, barBase = 125, maxH = 80;

    barData.forEach((d, i) => {
      const barH = (d.v / 80) * maxH;
      const x = 20 + i * (barW + barGap);

      chartG.append("rect")
        .attr("x", x).attr("y", barBase)
        .attr("width", barW).attr("height", 0)
        .attr("rx", 3)
        .attr("fill", i === 3 ? emerald : border)
        .transition().delay(600 + i * 80).duration(500).ease(d3.easeCubicOut)
        .attr("y", barBase - barH)
        .attr("height", barH);

      chartG.append("text")
        .attr("x", x + barW / 2).attr("y", barBase + 12)
        .attr("text-anchor", "middle")
        .attr("fill", muted).attr("font-size", 7)
        .text(d.label);
    });

    // ── Variant distribution ──
    const varG = svg.append("g").attr("transform", "translate(270, 80)");

    varG.append("rect")
      .attr("width", 240).attr("height", 140).attr("rx", 5)
      .attr("fill", "white").attr("stroke", border).attr("stroke-width", 1);

    varG.append("text")
      .attr("x", 16).attr("y", 22)
      .attr("fill", muted).attr("font-size", 7.5)
      .attr("font-weight", 500).attr("letter-spacing", "0.08em")
      .text("VARIANT DISTRIBUTION");

    const variants = [
      { label: "Happy path", pct: 66, color: emerald },
      { label: "Manual review", pct: 24, color: amber },
      { label: "Rejected", pct: 10, color: red },
    ];

    variants.forEach((v, i) => {
      const y = 40 + i * 32;
      const barMaxW = 120;

      varG.append("text")
        .attr("x", 16).attr("y", y + 4)
        .attr("fill", ink).attr("font-size", 9)
        .text(v.label);

      // Track
      varG.append("rect")
        .attr("x", 16).attr("y", y + 10)
        .attr("width", barMaxW).attr("height", 6).attr("rx", 3)
        .attr("fill", "#F3F4F6");

      // Fill
      varG.append("rect")
        .attr("x", 16).attr("y", y + 10)
        .attr("width", 0).attr("height", 6).attr("rx", 3)
        .attr("fill", v.color)
        .transition().delay(800 + i * 150).duration(600).ease(d3.easeCubicOut)
        .attr("width", barMaxW * v.pct / 100);

      // Percentage
      varG.append("text")
        .attr("x", 145).attr("y", y + 4)
        .attr("fill", ink).attr("font-size", 10).attr("font-weight", 500)
        .attr("opacity", 0)
        .text(`${v.pct}%`)
        .transition().delay(1000 + i * 150).duration(300)
        .attr("opacity", 1);
    });

    // ── Bottom tagline ──
    svg.append("text")
      .attr("x", w / 2).attr("y", h - 6)
      .attr("text-anchor", "middle")
      .attr("fill", muted).attr("font-size", 9).attr("font-style", "italic")
      .attr("opacity", 0)
      .text("Every metric traced back to the process")
      .transition().delay(1800).duration(400).attr("opacity", 1);

  }, []);

  return (
    <svg
      ref={ref}
      className="h-auto w-full"
      style={{ maxWidth: 520, margin: "0 auto", display: "block" }}
    />
  );
}
