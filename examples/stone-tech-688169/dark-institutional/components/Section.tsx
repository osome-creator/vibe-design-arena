import { ReactNode } from "react";

interface SectionProps {
  icon: string;
  title: string;
  children: ReactNode;
  description?: string;
}

export default function Section({ icon, title, children, description }: SectionProps) {
  return (
    <section className="bg-[#161b22] border border-[#30363d] rounded-[6px] mb-5 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#30363d]">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold text-[#e6edf3]">{title}</h2>
      </div>
      <div className="p-6">
        {description && (
          <p className="text-sm text-[#8b949e] mb-3">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
