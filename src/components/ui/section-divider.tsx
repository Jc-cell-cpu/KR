interface SectionDividerProps {
  label: string;
}

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      <span className="flex-1 h-px bg-border/50" />
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">
        {label}
      </span>
      <span className="flex-1 h-px bg-border/50" />
    </div>
  );
}
