import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  description?: string;
}

export default function Section({ title, children, description }: SectionProps) {
  return (
    <section
      className="bg-surface border border-border rounded-[16px] overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(139,69,19,0.06)' }}
    >
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
        <span className="w-[6px] h-[6px] bg-primary rounded-full shrink-0" />
        <h2
          className="text-lg font-extrabold text-heading tracking-[-0.01em]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {title}
        </h2>
      </div>
      <div className="p-6">
        {description && (
          <p className="text-sm text-muted mb-4">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
