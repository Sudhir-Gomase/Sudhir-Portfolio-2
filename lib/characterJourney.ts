export type CharacterSide = "left" | "right";

export type CharacterJourneySection = {
  id: string;
  side: CharacterSide;
  /** Base scale at this section */
  scale: number;
  /** Horizontal offset from viewport center (vw) */
  xVw: number;
};

/** Scroll journey — avatar alternates sides via x offset from center */
export const CHARACTER_JOURNEY_SECTIONS: CharacterJourneySection[] = [
  { id: "hero", side: "right", scale: 1, xVw: 21 },
  { id: "skills", side: "left", scale: 0.78, xVw: -21 },
  { id: "about", side: "right", scale: 0.82, xVw: 21 },
  { id: "expertise", side: "left", scale: 0.8, xVw: -21 },
  { id: "projects", side: "right", scale: 0.82, xVw: 21 },
  { id: "contact", side: "left", scale: 0.76, xVw: -21 },
];

export function getSectionConfig(index: number): CharacterJourneySection {
  return CHARACTER_JOURNEY_SECTIONS[index] ?? CHARACTER_JOURNEY_SECTIONS[0];
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/** Smoothstep for section transitions */
export function easeSectionBlend(t: number) {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
}

export type SectionBlend = {
  from: number;
  to: number;
  t: number;
};

/** Which two sections to blend between based on viewport anchor */
export function getSectionBlend(anchorRatio = 0.42): SectionBlend {
  const anchor = window.innerHeight * anchorRatio;
  const centers = CHARACTER_JOURNEY_SECTIONS.map((cfg) => {
    const el = document.getElementById(cfg.id);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return rect.top + rect.height * 0.5;
  });

  for (let i = 0; i < centers.length - 1; i++) {
    const a = centers[i];
    const b = centers[i + 1];
    if (a == null || b == null) continue;

    const min = Math.min(a, b);
    const max = Math.max(a, b);
    if (anchor >= min && anchor <= max) {
      const t = (anchor - a) / (b - a || 1);
      return { from: i, to: i + 1, t: clamp(t, 0, 1) };
    }
  }

  let closest = 0;
  let minDist = Infinity;
  centers.forEach((c, i) => {
    if (c == null) return;
    const d = Math.abs(c - anchor);
    if (d < minDist) {
      minDist = d;
      closest = i;
    }
  });

  return { from: closest, to: closest, t: 0 };
}
