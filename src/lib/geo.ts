/**
 * Nepal map projection + Google Maps URL parsing.
 *
 * Shared by the admin branch form (which auto-fills coordinates from a
 * pasted Google Maps link) and the home page Nepal map (which turns those
 * coordinates into pin positions).
 */

/* ── Projection ──────────────────────────────────────────────────────────
   Matches the outline in NepalMap.tsx exactly. Equirectangular with a
   cos(latitude) correction so the country is not horizontally stretched.
   Derived from the geoBoundaries Nepal bounding box.                     */
export const NEPAL_PROJECTION = {
  lon0: 80.0601,
  lat1: 30.4731,
  cosf: 0.8796,
  k: 111.684,
  width: 800,
  height: 460.8,
} as const;

export function projectToMap(latitude: number, longitude: number): { x: number; y: number } {
  const { lon0, lat1, cosf, k } = NEPAL_PROJECTION;
  return {
    x: (longitude - lon0) * cosf * k,
    y: (lat1 - latitude) * k,
  };
}

/** Rough bounding box of Nepal — used to reject obviously wrong coordinates. */
export function isWithinNepal(latitude: number, longitude: number): boolean {
  return latitude >= 26.0 && latitude <= 30.6 && longitude >= 79.9 && longitude <= 88.3;
}

/**
 * Pull latitude/longitude out of a Google Maps URL.
 *
 * Handles the common shapes people paste:
 *   .../data=...!1d85.3256245!2d27.7301249...   ← place marker (most precise)
 *   .../@27.7301249,85.3256245,17z/...          ← viewport centre
 *   ...?q=27.7301249,85.3256245                 ← explicit query
 *
 * The `!1d<lng>!2d<lat>` form is preferred because it is the actual pinned
 * place; the `@lat,lng` form is only where the camera happened to sit, which
 * can be some distance off.
 */
export function parseLatLngFromMapsUrl(url: string): { latitude: number; longitude: number } | null {
  if (!url) return null;

  // 1. Place marker: !1d<lng>!2d<lat>
  const marker = url.match(/!1d(-?\d+(?:\.\d+)?)!2d(-?\d+(?:\.\d+)?)/);
  if (marker) {
    const longitude = parseFloat(marker[1]);
    const latitude = parseFloat(marker[2]);
    if (isWithinNepal(latitude, longitude)) return { latitude, longitude };
  }

  // 2. Explicit q=lat,lng
  const q = url.match(/[?&]q=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (q) {
    const latitude = parseFloat(q[1]);
    const longitude = parseFloat(q[2]);
    if (isWithinNepal(latitude, longitude)) return { latitude, longitude };
  }

  // 3. Viewport centre: @lat,lng
  const at = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (at) {
    const latitude = parseFloat(at[1]);
    const longitude = parseFloat(at[2]);
    if (isWithinNepal(latitude, longitude)) return { latitude, longitude };
  }

  return null;
}
