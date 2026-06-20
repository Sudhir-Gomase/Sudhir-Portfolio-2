export const characterConfig = {
  model: "/models/avatar.glb",
  /** Base avatar height in the 3D scene (lower = smaller at rest) */
  targetHeight: 1.05,
  scroll: {
    /** Scroll range where zoom kicks in (0–1 of hero pin progress) */
    zoomStart: 0.12,
    zoomEnd: 1,
    /** Avatar 3D scale at scroll start → end (hard cap on max size) */
    scaleMin: 1,
    scaleMax: 1.22,
    containerScaleMin: 1,
    containerScaleMax: 1.1,
    /** Camera pulls in on scroll */
    cameraZStart: 5.9,
    cameraZEnd: 4.05,
    cameraY: 0.72,
    lookAtY: 0.48,
    liftY: 0.12,
    rotateY: 0.55,
  },
} as const;

/** Maps raw scroll progress (0–1) to eased zoom progress (0–1), capped at scaleMax */
export function getScrollZoomProgress(raw: number): number {
  const { zoomStart, zoomEnd } = characterConfig.scroll;
  const t = Math.min(1, Math.max(0, (raw - zoomStart) / (zoomEnd - zoomStart)));
  return t * t * (3 - 2 * t);
}
