/* eslint-disable react/forbid-dom-props */

import { C } from "@/lib/colors";

export function SecurityArchSvg() {
  const lx = 24;
  const rw = 472;
  const layers = [
    { label: "CLIENT LAYER", detail: "TLS 1.3 · CSP · HSTS · SRI", fill: C.white },
    { label: "API GATEWAY", detail: "Rate limiting · JWT · RBAC", fill: C.white },
    { label: "APPLICATION LAYER", detail: "Isolated VPC · WAF · IDS", fill: C.greenLight },
    { label: "DATA LAYER", detail: "AES-256 at rest · TLS in transit · Customer-managed keys", fill: C.white },
    { label: "INFRASTRUCTURE", detail: "AWS · SOC 2 controls · Multi-AZ · Automated backups", fill: C.bg },
  ];

  return (
    <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Security architecture: client layer with TLS, API gateway with RBAC, application layer with VPC, data layer with AES-256, and AWS infrastructure" style={{ width: "100%", height: "auto" }}>
      {/* Title */}
      <text x={260} y={20} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1.5}>SECURITY ARCHITECTURE</text>

      {/* Shield icon */}
      <rect x={240} y={28} width={40} height={36} rx={2} fill={C.greenLight} stroke={C.green} />
      <text x={260} y={50} textAnchor="middle" fontSize={16} fill={C.green}>🛡</text>

      {/* Layers */}
      {layers.map((layer, i) => {
        const y = 76 + i * 48;
        const isGreen = i === 2;
        return (
          <g key={layer.label}>
            <rect x={lx} y={y} width={rw} height={40} rx={2} fill={layer.fill} stroke={isGreen ? C.green : C.border} strokeWidth={isGreen ? 1.5 : 1} />
            <text x={lx + 16} y={y + 18} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={isGreen ? C.green : C.muted} letterSpacing={1}>{layer.label}</text>
            <text x={lx + 16} y={y + 32} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>{layer.detail}</text>
            {i < layers.length - 1 && (
              <line x1={260} y1={y + 40} x2={260} y2={y + 48} stroke={C.muted} strokeWidth={1} />
            )}
          </g>
        );
      })}
    </svg>
  );
}
