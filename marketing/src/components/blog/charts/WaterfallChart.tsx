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
}

const MONO = "'Geist Mono', monospace";
const TOP = 24;
const BOT = 52;
const SIDE = 12;

export function WaterfallChart({ data }: WaterfallChartProps) {
  const W = 520;
  const H = 260;
  const chartH = H - TOP - BOT;

  let cumulative = 0;
  const bars = data.map((d) => {
    if (d.isTotal) {
      return { ...d, start: 0, end: cumulative, barH: cumulative };
    }
    const start = cumulative;
    cumulative += d.value;
    return { ...d, start, end: cumulative, barH: d.value };
  });

  const maxVal = Math.max(...bars.map((b) => Math.max(b.start, b.end)));

  const xScale = scaleBand({
    domain: data.map((d) => d.label),
    range: [SIDE, W - SIDE],
    padding: 0.32,
  });

  const yScale = scaleLinear({
    domain: [0, maxVal * 1.18],
    range: [chartH, 0],
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Waterfall chart"
      className="h-auto w-full"
    >
      {/* Baseline */}
      <line
        x1={SIDE}
        y1={TOP + chartH}
        x2={W - SIDE}
        y2={TOP + chartH}
        stroke={C.border}
        strokeWidth={0.5}
      />

      {bars.map((bar, i) => {
        const x = xScale(bar.label) ?? 0;
        const bw = xScale.bandwidth();
        const yTop = yScale(Math.max(bar.start, bar.end));
        const yBot = yScale(Math.min(bar.start, bar.end));
        const barH = Math.max(yBot - yTop, 2);

        const fill = bar.isTotal ? C.ink : bar.color ?? C.emerald;
        const nextBar = bars[i + 1];
        const connY = TOP + yScale(bar.end);

        return (
          <g key={bar.label}>
            <rect
              x={x}
              y={TOP + yTop}
              width={bw}
              height={barH}
              rx={1}
              fill={fill}
              opacity={bar.isTotal ? 0.85 : 0.7}
            />

            {/* Value label */}
            <text
              x={x + bw / 2}
              y={TOP + yTop - 6}
              textAnchor="middle"
              fontSize={9}
              fontFamily={MONO}
              fontWeight={bar.isTotal ? 500 : 400}
              fill={bar.isTotal ? C.ink : C.inkMid}
              letterSpacing="0.02em"
            >
              {bar.displayValue ?? String(bar.barH)}
            </text>

            {/* X-axis label — wrap long labels */}
            {bar.label.includes(" ") ? (
              <text
                x={x + bw / 2}
                y={TOP + chartH + 12}
                textAnchor="middle"
                fontSize={8}
                fontFamily={MONO}
                fontWeight={400}
                fill={C.muted}
                letterSpacing="0.02em"
              >
                {bar.label.split(" ").map((word, wi) => (
                  <tspan key={wi} x={x + bw / 2} dy={wi === 0 ? 0 : 10}>
                    {word}
                  </tspan>
                ))}
              </text>
            ) : (
              <text
                x={x + bw / 2}
                y={TOP + chartH + 12}
                textAnchor="middle"
                fontSize={8}
                fontFamily={MONO}
                fontWeight={400}
                fill={C.muted}
                letterSpacing="0.02em"
              >
                {bar.label}
              </text>
            )}

            {/* Connector */}
            {nextBar && !bar.isTotal && (
              <line
                x1={x + bw}
                y1={connY}
                x2={xScale(nextBar.label) ?? 0}
                y2={connY}
                stroke={C.border}
                strokeWidth={0.5}
                strokeDasharray="2,2"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
