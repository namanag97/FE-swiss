import { C } from "@/lib/colors";
import { scaleBand, scaleLinear } from "@visx/scale";

export interface HBarDatum {
  label: string;
  value: number;
  displayValue?: string;
  color?: string;
}

interface HBarChartProps {
  data: HBarDatum[];
  formatValue?: (v: number) => string;
  maxValue?: number;
}

const MONO = "'Geist Mono', monospace";
const LABEL_W = 160;
const VALUE_W = 70;
const BAR_W = 340;

export function HBarChart({ data, formatValue, maxValue }: HBarChartProps) {
  const totalW = LABEL_W + BAR_W + VALUE_W;
  const rowH = 36;
  const totalH = data.length * rowH + 8;
  const pad = 0.38;

  const yScale = scaleBand({
    domain: data.map((d) => d.label),
    range: [4, totalH - 4],
    padding: pad,
  });

  const max = maxValue ?? Math.max(...data.map((d) => d.value));
  const xScale = scaleLinear({ domain: [0, max], range: [0, BAR_W] });
  const fmt = formatValue ?? ((v: number) => String(v));

  return (
    <svg
      viewBox={`0 0 ${totalW} ${totalH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Horizontal bar chart"
      className="h-auto w-full"
    >
      {data.map((d) => {
        const y = yScale(d.label) ?? 0;
        const bh = yScale.bandwidth();
        const bw = xScale(d.value);
        const fill = d.color ?? C.emerald;

        return (
          <g key={d.label}>
            <text
              x={LABEL_W - 12}
              y={y + bh / 2 + 1}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={9.5}
              fontFamily={MONO}
              fontWeight={400}
              fill={C.inkMid}
              letterSpacing="0.02em"
            >
              {d.label}
            </text>

            <rect
              x={LABEL_W}
              y={y}
              width={BAR_W}
              height={bh}
              rx={1}
              fill={C.bg}
              stroke={C.border}
              strokeWidth={0.5}
            />

            <rect
              x={LABEL_W}
              y={y}
              width={Math.max(bw, 2)}
              height={bh}
              rx={1}
              fill={fill}
              opacity={0.75}
            />

            <text
              x={LABEL_W + BAR_W + 8}
              y={y + bh / 2 + 1}
              textAnchor="start"
              dominantBaseline="middle"
              fontSize={10}
              fontFamily={MONO}
              fontWeight={400}
              fill={C.ink}
              letterSpacing="0.01em"
            >
              {d.displayValue ?? fmt(d.value)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
