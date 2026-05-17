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
      className="p-8 rounded-lg border relative overflow-hidden flex flex-col h-full"
      style={{ borderColor: "#DCDCDC", background: "#fff", borderTop: "3px solid #134CF7" }}
    >
      {/* Decorative large quote */}
      <div className="absolute top-2 right-5 text-8xl font-black leading-none select-none pointer-events-none" style={{ color: "#F0F4FF" }}>&ldquo;</div>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < t.rating ? "#F59E0B" : "#E5E7EB"}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-base leading-relaxed mb-8 italic flex-1" style={{ color: "#444444" }}>
        &ldquo;{t.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: "#F6F6F6" }}>
        {t.avatar ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
            <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
          </div>
        ) : (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0"
            style={{ background: "#134CF7" }}
          >
            {initialsOf(t.name)}
          </div>
        )}
        <div>
          <p className="font-semibold text-sm" style={{ color: "#040B2F" }}>{t.name}</p>
          {t.role && <p className="text-xs mt-0.5" style={{ color: "#444444" }}>{t.role}</p>}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  return (
    <>
      <style>{`
        .testimonials-swiper { padding-bottom: 40px !important; max-width: 720px; margin: 0 auto; }
        .testimonials-swiper .swiper-pagination-bullet {
          width: 8px; height: 8px; background: #DCDCDC; opacity: 1; transition: all 0.3s;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          width: 28px; border-radius: 4px; background: #134CF7;
        }
        .testimonials-swiper .swiper-pagination { bottom: 10px; }
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

