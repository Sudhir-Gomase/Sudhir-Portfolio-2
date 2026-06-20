"use client";

const skills = [
  "Node.js",
  "Fastify",
  "TypeScript",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Prisma",
  "AWS",
  "Docker",
  "BullMQ",
  "REST APIs",
  "Microservices",
  "Swagger",
  "Knex.js",
  "React",
  "JWT Auth",
];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-mask overflow-hidden py-3">
      <div className={`marquee-track flex w-max gap-3 ${reverse ? "marquee-reverse" : ""}`}>
        {doubled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="shrink-0 rounded-full border border-line bg-surface/80 px-5 py-2 text-sm font-medium text-ink-muted backdrop-blur-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillFocus() {
  const rowA = skills.slice(0, 8);
  const rowB = skills.slice(8);

  return (
    <section id="skills" aria-label="Tech stack" className="border-b border-line bg-canvas-muted/50 py-4">
      <MarqueeRow items={rowA} />
      <MarqueeRow items={rowB.length ? rowB : rowA} reverse />
    </section>
  );
}
