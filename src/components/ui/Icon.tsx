import type { SVGProps } from "react";

/**
 * Single source of truth for inline icons.
 * - 24×24 viewBox, 1.75 stroke, currentColor — matches body text by default.
 * - Keeping icons inline (vs. icon library) keeps payload small and lets us
 *   tightly control the stroke weight for a consistent visual rhythm.
 */
export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "phone"
  | "mail"
  | "map-pin"
  | "clock"
  | "shield-check"
  | "microscope"
  | "flask"
  | "heart-pulse"
  | "droplet"
  | "activity"
  | "home"
  | "lock"
  | "spark"
  | "user-doctor"
  | "calendar"
  | "check"
  | "menu"
  | "close"
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "whatsapp"
  | "external"
  | "quote";

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export default function Icon({ name, size = 20, className, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
    ...rest,
  };

  switch (name) {
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...common}>
          <path d="M19 12H5M11 5l-7 7 7 7" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "shield-check":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "microscope":
      return (
        <svg {...common}>
          <path d="M6 18h8" />
          <path d="M3 22h18" />
          <path d="M14 22a7 7 0 1 0 0-14h-1" />
          <path d="M9 14h2" />
          <path d="M9 12V2h2v10" />
          <path d="M12 2h2v4h-2z" />
        </svg>
      );
    case "flask":
      return (
        <svg {...common}>
          <path d="M9 3h6" />
          <path d="M10 3v5L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 8V3" />
          <path d="M7 14h10" />
        </svg>
      );
    case "heart-pulse":
      return (
        <svg {...common}>
          <path d="M3 12h3l2-3 4 6 2-3h7" />
          <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l.71.71" />
        </svg>
      );
    case "droplet":
      return (
        <svg {...common}>
          <path d="M12 2.5s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
        </svg>
      );
    case "activity":
      return (
        <svg {...common}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 1 1 8 0v3" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case "user-doctor":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
          <path d="M12 12v3M10.5 13.5h3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 5 5L20 7" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...common}>
          <path d="M4 4l7.5 9.5L4.5 20H7l5.5-5.5L17 20h3L12 10l7-8h-2.5L11.5 7 7 2H4Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 1 0-4 0v6h-4v-10h4v2a4 4 0 0 1 4-2Z" />
          <rect x="2" y="9" width="4" height="11" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M3 21l1.65-4.5A8.5 8.5 0 1 1 8 19.5L3 21Z" />
          <path d="M9 10c.5 2 1.5 3 3.5 4 1.5-.2 2-.7 2.5-1.5l-2-1c-.5.5-1 .5-2-.5s-1-1.5-.5-2l-1-2C8.7 7.5 8.2 8 8 9.5" />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M14 4h6v6M20 4 10 14M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" />
        </svg>
      );
    case "quote":
      return (
        <svg {...common}>
          <path d="M7 7h4v4H7c0 3 1 4 3 5v2c-4-1-6-4-6-8V9a2 2 0 0 1 3-2Z" fill="currentColor" stroke="none" />
          <path d="M16 7h4v4h-4c0 3 1 4 3 5v2c-4-1-6-4-6-8V9a2 2 0 0 1 3-2Z" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
