import type { CharacterSide } from "@/lib/characterJourney";

export const characterScroll = {
  /** 0–1 progress inside the active section (hero pin uses this for zoom) */
  progress: 0,
  sectionIndex: 0,
  side: "right" as CharacterSide,
  /** Fade out near footer */
  opacity: 1,
};
