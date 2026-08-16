"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  avatar: string | null;
}

function initialsOf(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="bg-white flex flex-col h-full"
      style={{
        borderRadius: "20px",
        border: "1px solid #E2E6F0",
        boxShadow: "0 4px 24px rgba(0,182,122,0.06)",
        padding: "32px",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "0 20px 50px rgba(0,182,122,0.15)";
        el.style.borderColor = "#9AA4B2";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 4px 24px rgba(0,182,122,0.06)";
        el.style.borderColor = "#E2E6F0";
      }}
    >
      {/* Quote icon circle */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-5 shrink-0"
        style={{ background: "#00B67A" }}
      >
        <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={i < t.rating ? "#F59E0B" : "#E5E7EB"}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "#40474F" }}>
        &ldquo;{t.content}&rdquo;
      </p>

      {/* Author */}
      <div
        className="flex items-center gap-3 pt-5 border-t"
        style={{ borderColor: "#E2E6F0" }}
      >
        {t.avatar ? (
          <div
            className="relative w-11 h-11 rounded-full overflow-hidden shrink-0"
            style={{ border: "2.5px solid #00B67A" }}
          >
            <Image src={t.avatar} alt={t.name} fill sizes="44px" className="object-cover" />
          </div>
        ) : (
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ background: "#00B67A" }}
          >
            {initialsOf(t.name)}
          </div>
        )}
        <div>
          <p className="font-bold text-sm" style={{ color: "#040B2F" }}>{t.name}</p>
          {t.role && (
            <p className="text-xs mt-0.5" style={{ color: "#9AA4B2" }}>{t.role}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  return (
    <>
      <style>{`
        .testimonials-swiper { padding-bottom: 44px !important; max-width: 740px; margin: 0 auto; }
        .testimonials-swiper .swiper-pagination-bullet {
          width: 8px; height: 8px; background: #DCDCDC; opacity: 1; transition: all 0.3s;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          width: 28px; border-radius: 4px; background: #00B67A;
        }
        .testimonials-swiper .swiper-pagination { bottom: 8px; }
      `}</style>
      <Swiper
        className="testimonials-swiper"
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={28}
        loop={items.length > 1}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        watchOverflow
      >
        {items.map((t) => (
          <SwiperSlide key={t.id} style={{ height: "auto" }}>
            <TestimonialCard t={t} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
