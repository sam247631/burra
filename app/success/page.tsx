import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "var(--warm-white)" }}>
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} style={{ color: "var(--forest)" }} />
        </div>
        <h1
          className="text-4xl font-bold mb-3"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--espresso)" }}
        >
          You&apos;re booked in
        </h1>
        <p className="text-base opacity-60 mb-8" style={{ color: "var(--espresso)" }}>
          Payment confirmed. We&apos;ll send a confirmation email shortly with everything you need to know.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/events"
            className="inline-block px-8 py-4 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--espresso)" }}
          >
            Browse more events
          </Link>
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-xl font-semibold text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--espresso)" }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
