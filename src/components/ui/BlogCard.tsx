import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

const fallbackImages = [
  "/our%20images/DSC00057.jpg",
  "/our%20images/DSC00065.jpg",
  "/our%20images/DSC00149.jpg",
];

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    createdAt: Date;
    image: string | null;
  };
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <article
      className="group bg-white overflow-hidden h-full flex flex-col"
      style={{ borderRadius: "16px", border: "1px solid #E2E6F0" }}
    >
      {/* Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="block relative overflow-hidden shrink-0"
        style={{ height: "220px" }}
      >
        <Image
          src={post.image || fallbackImages[index % fallbackImages.length]}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(4,11,47,0.25) 0%, transparent 50%)" }}
        />
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#00B67A" }}>
            Health &amp; Diagnostics
          </span>
          <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#CBD5E1" }} />
          <time
            className="text-[11px]"
            style={{ color: "#94A3B8" }}
            dateTime={new Date(post.createdAt).toISOString()}
          >
            {formatDate(post.createdAt)}
          </time>
        </div>

        <h2
          className="font-bold text-[15px] mb-3 leading-snug line-clamp-2 group-hover:text-[#00B67A] transition-colors"
          style={{ color: "#040B2F" }}
        >
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: "#5D6478" }}>
            {post.excerpt}
          </p>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold group/link"
          style={{ color: "#00B67A" }}
        >
          Read article
          <svg
            width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
