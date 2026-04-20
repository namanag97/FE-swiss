import { Container } from "@/components/ui/Container";

export default function BlogPostLoading() {
  const lineWidths = ["w-[92%]", "w-[84%]", "w-[88%]", "w-[72%]", "w-[80%]", "w-[65%]", "w-[90%]", "w-[74%]", "w-[82%]", "w-[68%]", "w-[76%]", "w-[60%]"];
  const lineOpacity = ["opacity-100", "opacity-95", "opacity-90", "opacity-85", "opacity-80", "opacity-75", "opacity-70", "opacity-65", "opacity-60", "opacity-55", "opacity-50", "opacity-45"];

  return (
    <article className="gr">
      <Container size="wide" className="py-[var(--sp-7)]">
        {/* Back link */}
        <div className="h-4 w-20 rounded-sm bg-[var(--border)]" />

        {/* Tags */}
        <div className="mt-8 flex gap-1.5">
          <div className="h-[22px] w-20 rounded-sm bg-[var(--border)]" />
          <div className="h-[22px] w-16 rounded-sm bg-[var(--border)]" />
        </div>

        {/* Title */}
        <div className="mt-[var(--sp-3)]">
          <div className="h-7 w-4/5 rounded-sm bg-[var(--border)]" />
          <div className="mt-2 h-7 w-1/2 rounded-sm bg-[var(--border)]" />
        </div>

        {/* Meta */}
        <div className="mt-[var(--sp-3)] flex gap-[var(--sp-3)]">
          <div className="h-3.5 w-[100px] rounded-sm bg-[var(--border)]" />
          <div className="h-3.5 w-20 rounded-sm bg-[var(--border)]" />
          <div className="h-3.5 w-[60px] rounded-sm bg-[var(--border)]" />
        </div>

        <div className="divider-h my-8" />

        {/* Body lines */}
        <div className="flex max-w-[680px] flex-col gap-3">
          {lineWidths.map((width, i) => (
            <div key={width} className={`${width} ${lineOpacity[i]} h-3.5 rounded-sm bg-[var(--border)]`} />
          ))}
        </div>
      </Container>
    </article>
  );
}
