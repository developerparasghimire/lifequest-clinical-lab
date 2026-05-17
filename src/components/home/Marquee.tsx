const words = [
  "Analysis",
  "Laboratory",
  "Research",
  "Science",
  "Diagnostics",
  "Testing",
  "Pathology",
  "Hematology",
];

export default function Marquee() {
  return (
    <div
      className="marquee-wrapper marquee-fade overflow-hidden py-5 border-y relative"
      style={{ background: "linear-gradient(90deg,#0a35c8 0%,#134CF7 50%,#0a35c8 100%)", borderColor: "#134CF7" }}
    >
      <div
        className="flex gap-10 whitespace-nowrap animate-marquee"
        style={{ width: "max-content" }}
      >
        {[...words, ...words, ...words].map((word, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-white"
          >
            {word}
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-60 shrink-0"
            >
              <path
                d="M7 0L8.55 5.45L14 7L8.55 8.55L7 14L5.45 8.55L0 7L5.45 5.45L7 0Z"
                fill="white"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
