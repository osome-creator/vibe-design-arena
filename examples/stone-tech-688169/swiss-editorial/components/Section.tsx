import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  description?: string;
}

export default function Section({ title, children, description }: SectionProps) {
  return (
    <section className="swiss-section">
      <h2 className="swiss-section-title">{title}</h2>
      <hr className="swiss-section-rule" />
      {description && <p className="swiss-section-desc">{description}</p>}
      {children}
    </section>
  );
}
