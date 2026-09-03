"use client";
import { Star } from "lucide-react";
import { Review } from "@/lib/data";

export default function ReviewsMarquee({ reviews }: { reviews: Review[] }) {
  const doubled = [...reviews, ...reviews];
  return (
    <div
      className="overflow-hidden relative group"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-4 marquee-track group-hover:[animation-play-state:paused]"
        style={{ width: "max-content" }}
      >
        {doubled.map((review, i) => (
          <div
            key={`${review.id}-${i}`}
            className="flex-shrink-0 w-[340px] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: "rgba(247,243,238,0.05)",
              border: "1px solid rgba(247,243,238,0.09)",
            }}
          >
            <div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={11}
                    fill="var(--caramel)"
                    color="var(--caramel)"
                  />
                ))}
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(247,243,238,0.78)" }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
              <span
                className="text-xs font-semibold"
                style={{ color: "rgba(247,243,238,0.55)" }}
              >
                {review.author}
              </span>
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "rgba(184,115,42,0.15)",
                  color: "var(--caramel)",
                }}
              >
                {review.platform}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
