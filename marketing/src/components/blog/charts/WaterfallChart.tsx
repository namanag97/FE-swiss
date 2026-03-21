import { C } from "@/lib/colors";
import { scaleBand, scaleLinear } from "@visx/scale";

export interface WaterfallDatum {
  label: string;
  value: number;
  displayValue?: string;
  isTotal?: boolean;
  color?: string;
}

interface WaterfallChartProps {
  data: WaterfallDatum[];
  formatValue?: (v: number) => string;
}

const FONT = "Inter, system-ui, sans-serif";
const TOP_PAD = 28;
const BOTTOM_PAD = 48;
const SIDE_PAD = 16;

export function WaterfallChart({ data, formatValue }: WaterfallChartProps) {
  const width = 560;
  const height = 280;
  const chartHeight = height - TOP_PAD - BOTTOM_PAD;

  const fmt = formatValue ?? ((v: number) => String(v));

  // Calculate cumulative positions
  let cumulative = 0;
  const bars = data.map((d) => {
    if (d.isTotal) {
      const bar = { ...d, start: 0, end: cumulative, barHeight: cumulative };
      return bar;
    }
    const start = cumulative;
    cumulative += d.value;
    return { ...d, start, end: cumulative, barHeight: d.value };
  });

  const maxVal = Math.max(...bars.map((b) => Math.max(b.start, b.end)));

  const xScale = scaleBand({
    domain: data.map((d) => d.label),
    range: [SIDE_PAD, width - SIDE_PAD],
    padding: 0.35,
  });

  const yScale = scaleLinear({
    domain: [0, maxVal * 1.15],
    range: [chartHeight, 0],
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Waterfall chart"
      style={{ width: "100%", height: "auto" }}
    >
      {/* Baseline */}
      <line
        x1={SIDE_PAD}
        y1={TOP_PAD + chartHeight}
        x2={width - SIDE_PAD}
        y2={TOP_PAD + chartHeight}
        stroke={C.border}
        strokeWidth={1}
      />

      {bars.map((bar, i) => {
        const x = xScale(bar.label) ?? 0;
        const bw = xScale.bandwidth();
        const yTop = yScale(Math.max(bar.start, bar.end));
        const yBot = yScale(Math.min(bar.start, bar.end));
        const barH = yBot - yTop;

        const fill = bar.isTotal
          ? C.ink
          : bar.color ?? C.emerald;

        // Connector line to next bar
        const nextBar = bars[i + 1];
        const connectorY = TOP_PAD + yScale(bar.end);

        return (
          <g key={bar.label}>
            {/* Bar */}
            <rect
              x={x}
              y={TOP_PAD + yTop}
              width={bw}
              height={Math.max(barH, 1)}
              rx={1}
              fill={fill}
              opacity={bar.isTotal ? 0.9 : 0.75}
            />

            {/* Value label above bar */}
            <text
              x={x + bw / 2}
              y={TOP_PAD + yTop - 6}
              textAnchor="middle"
              fontSize={10}
              fontFamily={FONT}
              fontWeight={500}
              fill={bar.isTotal ? C.ink : C.muted}
            >
              {bar.displayValue ?? fmt(bar.barHeight)}
            </text>

            {/* X-axis label */}
            <text
              x={x + bw / 2}
              y={TOP_PAD + chartHeight + 14}
              textAnchor="middle"
              fontSize={9}
              fontFamily={FONT}
              fontWeight={400}
              fill={C.muted}
            >
              {bar.label.length > 12
                ? bar.label.split(" ").map((word, wi) => (
                    <tspan
                      key={wi}
                      x={x + bw / 2}
                      dy={wi === 0 ? 0 : 11}
                    >
                      {word}
                    </tspan>
                  ))
                : bar.label}
            </text>

            {/* Connector line */}
            {nextBar && !bar.isTotal && (
              <line
                x1={x + bw}
                y1={connectorY}
                x2={(xScale(nextBar.label) ?? 0)}
                y2={connectorY}
                stroke={C.border}
                strokeWidth={1}
                strokeDasharray="3,2"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
