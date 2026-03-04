import { C } from "@/lib/colors";
import { SvgNode, SvgArrow } from "@/components/svg/SvgPrimitives";

export function PatientSvg() {
  return (
    <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Patient journey from referral through triage, lab tests, diagnosis, treatment plan, and follow-up" style={{ width: "100%", height: "auto" }}>
      <text x={240} y={16} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>PATIENT JOURNEY</text>

      {/* Top row */}
      <SvgNode x={40} y={36} label="Referral" />
      <SvgArrow x1={120} y1={51} x2={160} y2={51} />
      <SvgNode x={160} y={36} label="Intake" />
      <SvgArrow x1={240} y1={51} x2={280} y2={51} />
      <SvgNode x={280} y={36} label="Triage" accent />

      {/* Branch */}
      <line x1={320} y1={66} x2={320} y2={88} stroke={C.muted} strokeWidth={1} />
      <line x1={160} y1={88} x2={400} y2={88} stroke={C.muted} strokeWidth={1} />

      <SvgArrow x1={160} y1={88} x2={160} y2={108} />
      <SvgNode x={120} y={108} label="Lab Tests" />

      <SvgArrow x1={400} y1={88} x2={400} y2={108} />
      <SvgNode x={360} y={108} label="Consult" />

      {/* Merge */}
      <line x1={160} y1={138} x2={160} y2={156} stroke={C.muted} strokeWidth={1} />
      <line x1={400} y1={138} x2={400} y2={156} stroke={C.muted} strokeWidth={1} />
      <line x1={160} y1={156} x2={400} y2={156} stroke={C.muted} strokeWidth={1} />
      <SvgArrow x1={280} y1={156} x2={280} y2={176} />

      <SvgNode x={240} y={176} label="Diagnosis" accent />
      <SvgArrow x1={280} y1={206} x2={280} y2={226} />
      <SvgNode x={230} y={226} w={100} h={30} label="Treatment Plan" />
      <SvgArrow x1={280} y1={256} x2={280} y2={276} />
      <SvgNode x={240} y={276} label="Follow-Up" accent />
    </svg>
  );
}
