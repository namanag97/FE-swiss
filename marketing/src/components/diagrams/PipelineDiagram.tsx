"use client";

import { useD3 } from "./useD3";
import * as d3 from "d3";

/**
 * Pipeline: Extract → Mine → Analyze → Act
 * Clean horizontal flow with numbered circles and animated connectors.
 */
export function PipelineDiagram() {
  const ref = useD3((svg) => {
    const w = 500, h = 80;
    svg.attr("viewBox", `0 0 ${w} ${h}`);

    const ink = "#1F2937";
    const muted = "#9CA3AF";
    const border = "#D1D5DB";
    const emerald = "#047A55";

    const steps = [
      { label: "Extract", sub: "event logs", num: "01" },
      { label: "Mine", sub: "discovery", num: "02" },
      { label: "Analyze", sub: "conformance", num: "03" },
      { label: "Act", sub: "automation", num: "04" },
    ];
    const gap = 130;

    steps.forEach((step, i) => {
      const cx = 40 + i * gap;
      const isLast = i === steps.length - 1;

      // Node
      const g = svg.append("g")
        .attr("transform", `translate(${cx}, 30)`)
        .attr("opacity", 0);

      g.append("circle")
        .attr("r", 20)
        .attr("fill", "white")
        .attr("stroke", isLast ? emerald : ink)
        .attr("stroke-width", 1.5);

      g.append("text")
        .attr("y", 4).attr("text-anchor", "middle")
        .attr("fill", isLast ? emerald : ink)
        .attr("font-size", 10).attr("font-weight", 500)
        .text(step.num);

      g.append("text")
        .attr("y", 36).attr("text-anchor", "middle")
        .attr("fill", ink).attr("font-size", 10).attr("font-weight", 500)
        .text(step.label);

      g.append("text")
        .attr("y", 48).attr("text-anchor", "middle")
        .attr("fill", muted).attr("font-size", 8)
        .text(step.sub);

      g.transition().delay(i * 180).duration(400).attr("opacity", 1);

      // Connector
      if (i < steps.length - 1) {
        const x1 = cx + 22, x2 = cx + gap - 22;

        svg.append("line")
          .attr("x1", x1).attr("y1", 30)
          .attr("x2", x1).attr("y2", 30)
          .attr("stroke", border).attr("stroke-width", 1.3)
          .transition().delay(i * 180 + 200).duration(300)
          .attr("x2", x2);

        svg.append("polygon")
          .attr("points", `${x2 + 2},30 ${x2 - 4},27 ${x2 - 4},33`)
          .attr("fill", border)
          .attr("opacity", 0)
          .transition().delay(i * 180 + 450).duration(150)
          .attr("opacity", 1);
      }
    });

  }, []);

  return (
    <svg
      ref={ref}
      className="h-auto w-full"
      style={{ maxWidth: 540, margin: "0 auto", display: "block" }}
    />
  );
}
