/**
 * Wrapper around fetch for admin-side CRUD calls.
 * If the API returns 401 (session missing / expired), the user is
 * redirected to the login page so they can re-authenticate.
 */
export async function adminFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, init);
  if (res.status === 401 && typeof window !== "undefined") {
    const next = window.location.pathname + window.location.search;
    window.location.href = `/questlife-admin/login?callbackUrl=${encodeURIComponent(next)}`;
  }
  return res;
}
