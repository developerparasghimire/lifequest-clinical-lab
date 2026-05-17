/**
 * Site-area template — runs on every navigation, giving us a soft page-enter
 * animation without adding a wrapper to layout.tsx.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
