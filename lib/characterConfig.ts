/** Hero companion scroll — used by CharacterCompanion + HeroDevVisual */
export const characterConfig = {
  scroll: {
    zoomStart: 0,
    zoomEnd: 1,
  },
} as const;

export function getScrollZoomProgress(raw: number): number {
  const { zoomStart, zoomEnd } = characterConfig.scroll;
  const t = Math.min(1, Math.max(0, (raw - zoomStart) / (zoomEnd - zoomStart)));
  return t * t * (3 - 2 * t);
}
