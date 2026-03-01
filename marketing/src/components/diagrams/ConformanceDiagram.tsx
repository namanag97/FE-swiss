"use client";

import { useD3 } from "./useD3";
import * as d3 from "d3";

/**
 * Conformance Checking: ideal path (green) vs actual path (gray) with
 * a deviation branch highlighted in amber. D3 animates the paths drawing in.
 */
export function ConformanceDiagram() {
  const ref = useD3((svg) => {
    const w = 520, h = 230;
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const emerald = "#047A55";
    const emeraldBg = "#ECFDF5";
    const ink = "#374151";
    const border = "#D1D5DB";
    const muted = "#9CA3AF";
    const amber = "#F59E0B";
    const amberDark = "#92400E";
    const amberBg = "#FEF3C7";

    const steps = ["Order", "Verify", "Approve", "Ship", "Invoice"];
    const gap = 92;
    const nodeW = 64, nodeH = 30, nodeR = 6;

    // ── Ideal path ──
    const idealG = svg.append("g").attr("transform", "translate(16, 20)");

    idealG.append("text")
      .attr("x", 0).attr("y", 0)
      .attr("fill", emerald).attr("font-size", 9)
      .attr("font-weight", 600).attr("letter-spacing", "0.1em")
      .text("IDEAL");

    steps.forEach((label, i) => {
      const x = i * gap;
      const g = idealG.append("g")
        .attr("transform", `translate(${x}, 14)`)
        .attr("opacity", 0);

      g.append("rect")
        .attr("width", nodeW).attr("height", nodeH).attr("rx", nodeR)
        .attr("fill", emeraldBg).attr("stroke", emerald).attr("stroke-width", 1.2);

      g.append("text")
        .attr("x", nodeW / 2).attr("y", nodeH / 2 + 4)
        .attr("text-anchor", "middle")
        .attr("fill", emerald).attr("font-size", 10)
        .text(label);

      g.transition().delay(i * 120).duration(400).attr("opacity", 1);

      // Connector
      if (i < steps.length - 1) {
        const line = idealG.append("line")
          .attr("x1", x + nodeW).attr("y1", 14 + nodeH / 2)
          .attr("x2", x + nodeW).attr("y2", 14 + nodeH / 2)
          .attr("stroke", emerald).attr("stroke-width", 1.2);

        line.transition().delay(i * 120 + 200).duration(300)
          .attr("x2", x + gap);

        idealG.append("polygon")
          .attr("points", `${x + gap},${14 + nodeH / 2} ${x + gap - 5},${14 + nodeH / 2 - 3} ${x + gap - 5},${14 + nodeH / 2 + 3}`)
          .attr("fill", emerald)
          .attr("opacity", 0)
          .transition().delay(i * 120 + 450).duration(150)
          .attr("opacity", 1);
      }
    });

    // ── Conformance label ──
    svg.append("text")
      .attr("x", w / 2).attr("y", 80)
      .attr("text-anchor", "middle")
      .attr("fill", muted).attr("font-size", 9)
      .attr("opacity", 0)
      .text("Conformance: 66%  ·  Fitness: 0.82")
      .transition().delay(1800).duration(400).attr("opacity", 1);

    // ── Actual path ──
    const actualG = svg.append("g").attr("transform", "translate(16, 100)");

    actualG.append("text")
      .attr("x", 0).attr("y", 0)
      .attr("fill", muted).attr("font-size", 9)
      .attr("font-weight", 600).attr("letter-spacing", "0.1em")
      .attr("opacity", 0)
      .text("ACTUAL")
      .transition().delay(700).duration(300).attr("opacity", 1);

    // Actual steps: Order → Verify → [branch] → Approve → Ship → Invoice
    const actualSteps = ["Order", "Verify", "Approve", "Ship", "Invoice"];
    actualSteps.forEach((label, i) => {
      const x = i * gap;
      const g = actualG.append("g")
        .attr("transform", `translate(${x}, 14)`)
        .attr("opacity", 0);

      g.append("rect")
        .attr("width", nodeW).attr("height", nodeH).attr("rx", nodeR)
        .attr("fill", "white").attr("stroke", border).attr("stroke-width", 1.2);

      g.append("text")
        .attr("x", nodeW / 2).attr("y", nodeH / 2 + 4)
        .attr("text-anchor", "middle")
        .attr("fill", ink).attr("font-size", 10)
        .text(label);

      g.transition().delay(800 + i * 120).duration(400).attr("opacity", 1);

      // Connectors (skip the Verify→Approve link — that splits)
      if (i < actualSteps.length - 1 && i !== 1) {
        const line = actualG.append("line")
          .attr("x1", x + nodeW).attr("y1", 14 + nodeH / 2)
          .attr("x2", x + nodeW).attr("y2", 14 + nodeH / 2)
          .attr("stroke", border).attr("stroke-width", 1.2);

        line.transition().delay(800 + i * 120 + 200).duration(300)
          .attr("x2", x + gap);

        actualG.append("polygon")
          .attr("points", `${x + gap},${14 + nodeH / 2} ${x + gap - 5},${14 + nodeH / 2 - 3} ${x + gap - 5},${14 + nodeH / 2 + 3}`)
          .attr("fill", border)
          .attr("opacity", 0)
          .transition().delay(800 + i * 120 + 450).duration(150)
          .attr("opacity", 1);
      }
    });

    // ── Split at Verify ──
    const splitX = 1 * gap + nodeW; // end of Verify
    const splitY = 14 + nodeH / 2;

    // 66% straight to Approve
    actualG.append("line")
      .attr("x1", splitX).attr("y1", splitY)
      .attr("x2", splitX).attr("y2", splitY)
      .attr("stroke", border).attr("stroke-width", 1.2)
      .transition().delay(1100).duration(300)
      .attr("x2", 2 * gap);

    actualG.append("text")
      .attr("x", splitX + 16).attr("y", splitY - 8)
      .attr("fill", muted).attr("font-size", 8).attr("font-weight", 500)
      .attr("opacity", 0)
      .text("66%")
      .transition().delay(1300).duration(200).attr("opacity", 1);

    // 34% deviation down
    const devMidY = splitY + 48;

    actualG.append("line")
      .attr("x1", splitX + 14).attr("y1", splitY)
      .attr("x2", splitX + 14).attr("y2", splitY)
      .attr("stroke", amber).attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "6 4")
      .transition().delay(1200).duration(400)
      .attr("y2", devMidY);

    actualG.append("text")
      .attr("x", splitX + 26).attr("y", splitY + 28)
      .attr("fill", amberDark).attr("font-size", 8).attr("font-weight", 500)
      .attr("opacity", 0)
      .text("34%")
      .transition().delay(1400).duration(200).attr("opacity", 1);

    // Manual Review node
    const reviewG = actualG.append("g")
      .attr("transform", `translate(${splitX - 26}, ${devMidY})`)
      .attr("opacity", 0);

    reviewG.append("rect")
      .attr("width", 90).attr("height", 30).attr("rx", nodeR)
      .attr("fill", amberBg).attr("stroke", amber).attr("stroke-width", 1.5);

    reviewG.append("text")
      .attr("x", 45).attr("y", 19)
      .attr("text-anchor", "middle")
      .attr("fill", amberDark).attr("font-size", 9).attr("font-weight", 500)
      .text("Manual Review");

    reviewG.transition().delay(1500).duration(400).attr("opacity", 1);

    // +4.2 days badge
    const badgeG = actualG.append("g")
      .attr("transform", `translate(${splitX + 70}, ${devMidY + 4})`)
      .attr("opacity", 0);

    badgeG.append("rect")
      .attr("width", 62).attr("height", 18).attr("rx", 9)
      .attr("fill", amberBg).attr("stroke", amber).attr("stroke-width", 0.8);

    badgeG.append("text")
      .attr("x", 31).attr("y", 13)
      .attr("text-anchor", "middle")
      .attr("fill", amberDark).attr("font-size", 8).attr("font-weight", 600)
      .text("+4.2 days");

    badgeG.transition().delay(1700).duration(300).attr("opacity", 1);

    // Rejoin arc from Manual Review → Approve
    const rejoinPath = actualG.append("path")
      .attr("d", `M ${splitX + 64} ${devMidY + 15} C ${splitX + 90} ${devMidY + 15}, ${2 * gap} ${devMidY - 10}, ${2 * gap} ${splitY + 15}`)
      .attr("fill", "none")
      .attr("stroke", amber).attr("stroke-width", 1.2)
      .attr("stroke-dasharray", "6 4");

    const totalLen = rejoinPath.node()!.getTotalLength();
    rejoinPath
      .attr("stroke-dashoffset", totalLen)
      .attr("stroke-dasharray", totalLen)
      .transition().delay(1800).duration(600).ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0)
      .on("end", function() {
        d3.select(this).attr("stroke-dasharray", "6 4");
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
