import { ReactNode } from "react";

interface SectionProps {
  icon: string;
  title: string;
  children: ReactNode;
  description?: string;
}

export default function Section({ icon, title, children, description }: SectionProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm mb-5 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6">
        {description && (
          <p className="text-sm text-gray-400 mb-3">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
