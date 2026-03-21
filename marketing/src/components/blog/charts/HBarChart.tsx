import { C } from "@/lib/colors";
import { scaleBand, scaleLinear } from "@visx/scale";

export interface HBarDatum {
  label: string;
  value: number;
  displayValue?: string;
  color?: string;
  annotation?: string;
}

interface HBarChartProps {
  data: HBarDatum[];
  formatValue?: (v: number) => string;
  maxValue?: number;
  height?: number;
}

const FONT = "Inter, system-ui, sans-serif";
const LABEL_WIDTH = 160;
const VALUE_WIDTH = 70;
const BAR_PADDING = 0.4;

export function HBarChart({ data, formatValue, maxValue, height }: HBarChartProps) {
  const barAreaWidth = 400;
  const totalWidth = LABEL_WIDTH + barAreaWidth + VALUE_WIDTH;
  const barHeight = 28;
  const rowHeight = barHeight + barHeight * BAR_PADDING;
  const totalHeight = height ?? data.length * rowHeight + 8;

  const yScale = scaleBand({
    domain: data.map((d) => d.label),
    range: [4, totalHeight - 4],
    padding: BAR_PADDING,
  });

  const max = maxValue ?? Math.max(...data.map((d) => d.value));
  const xScale = scaleLinear({
    domain: [0, max],
    range: [0, barAreaWidth],
  });

  const fmt = formatValue ?? ((v: number) => String(v));

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Horizontal bar chart"
      style={{ width: "100%", height: "auto" }}
    >
      {data.map((d) => {
        const y = yScale(d.label) ?? 0;
        const bh = yScale.bandwidth();
        const bw = xScale(d.value);
        const fill = d.color ?? C.emerald;

        return (
          <g key={d.label}>
            {/* Label */}
            <text
              x={LABEL_WIDTH - 12}
              y={y + bh / 2 + 1}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={11}
              fontFamily={FONT}
              fontWeight={400}
              fill={C.ink}
            >
              {d.label}
            </text>

            {/* Bar background */}
            <rect
              x={LABEL_WIDTH}
              y={y}
              width={barAreaWidth}
              height={bh}
              rx={1}
              fill={C.bg}
              stroke={C.border}
              strokeWidth={0.5}
            />

            {/* Bar fill */}
            <rect
              x={LABEL_WIDTH}
              y={y}
              width={bw}
              height={bh}
              rx={1}
              fill={fill}
              opacity={0.8}
            />

            {/* Value label */}
            <text
              x={LABEL_WIDTH + barAreaWidth + 8}
              y={y + bh / 2 + 1}
              textAnchor="start"
              dominantBaseline="middle"
              fontSize={11}
              fontFamily={FONT}
              fontWeight={500}
              fill={C.ink}
            >
              {d.displayValue ?? fmt(d.value)}
            </text>

            {/* Annotation */}
            {d.annotation && (
              <text
                x={LABEL_WIDTH + bw + 6}
                y={y + bh / 2 + 1}
                dominantBaseline="middle"
                fontSize={9}
                fontFamily={FONT}
                fontWeight={400}
                fill={C.muted}
              >
                {d.annotation}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
