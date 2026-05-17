import type { ReactNode, ElementType } from "react";

interface Props {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Single source for horizontal page padding + max-width.
 * Keeps gutters in sync across every section.
 */
export default function Container({
  as: Tag = "div",
  className = "",
  children,
}: Props) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
