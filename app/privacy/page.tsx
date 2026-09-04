import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Burra Bristol",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20" style={{ color: "var(--espresso)" }}>
      <p className="text-xs font-bold uppercase tracking-[0.4em] mb-4" style={{ color: "var(--caramel)" }}>
        Legal
      </p>
      <h1
        className="text-4xl font-bold mb-3"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Privacy Policy
      </h1>
      <p className="text-sm mb-12" style={{ color: "rgba(74,44,28,0.45)" }}>
        Last updated: September 2026
      </p>

      <div className="space-y-10 text-sm leading-relaxed" style={{ color: "rgba(74,44,28,0.75)" }}>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>1. Who we are</h2>
          <p>
            Burra Bristol Ltd (&ldquo;Burra&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates three cafés across Bristol and this
            website at burrabristol.co.uk. We are the data controller for personal information collected
            through this site. You can contact us at{" "}
            <a href="mailto:hello@burrabristol.co.uk" style={{ color: "var(--caramel)" }}>
              hello@burrabristol.co.uk
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>2. What data we collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Order data</strong> — name, email address, delivery address, phone number and order details when you purchase from our shop or book an event.</li>
            <li><strong>Payment data</strong> — card details are handled entirely by Stripe. We never see or store your card number, expiry or CVV.</li>
            <li><strong>Contact form submissions</strong> — name, email, and any information you include in your message.</li>
            <li><strong>Newsletter sign-ups</strong> — email address only.</li>
            <li><strong>Cookies &amp; analytics</strong> — basic, anonymised browsing data to understand how the site is used.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>3. How we use your data</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To process and fulfil your orders, and send you confirmation and dispatch emails.</li>
            <li>To forward your enquiries to our team and respond to them.</li>
            <li>To send you our newsletter, if you have subscribed. You can unsubscribe at any time via the link in any email.</li>
            <li>To improve and maintain this website.</li>
            <li>To comply with our legal and financial obligations.</li>
          </ul>
          <p className="mt-3">
            We will never sell your data to third parties or use it for unsolicited marketing beyond what you have consented to.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>4. Legal basis for processing</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Contract</strong> — processing your orders and event bookings.</li>
            <li><strong>Legitimate interest</strong> — responding to enquiries and improving our services.</li>
            <li><strong>Consent</strong> — sending marketing emails (newsletter sign-ups).</li>
            <li><strong>Legal obligation</strong> — retaining financial records as required by HMRC.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>5. Third-party processors</h2>
          <p className="mb-3">We use the following trusted services to operate our business. Each has their own privacy policy and is GDPR-compliant:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Stripe</strong> (payment processing) — stripe.com/gb/privacy</li>
            <li><strong>Resend</strong> (transactional email) — resend.com/privacy</li>
            <li><strong>Netlify</strong> (website hosting) — netlify.com/privacy</li>
            <li><strong>Inkthreadable</strong> (merchandise fulfilment) — inkthreadable.co.uk/privacy</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>6. How long we keep your data</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Order records</strong> — 7 years, as required by UK tax law.</li>
            <li><strong>Contact enquiries</strong> — up to 12 months after the enquiry is resolved.</li>
            <li><strong>Newsletter subscribers</strong> — until you unsubscribe.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>7. Your rights</h2>
          <p className="mb-3">Under UK GDPR, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
            <li><strong>Rectification</strong> — ask us to correct inaccurate data.</li>
            <li><strong>Erasure</strong> — ask us to delete your data, where we are not legally required to keep it.</li>
            <li><strong>Restriction</strong> — ask us to limit how we use your data in certain circumstances.</li>
            <li><strong>Portability</strong> — receive your data in a structured, machine-readable format.</li>
            <li><strong>Object</strong> — object to processing based on legitimate interest or for direct marketing.</li>
            <li><strong>Withdraw consent</strong> — at any time for processing based on consent (e.g. newsletter).</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email us at{" "}
            <a href="mailto:hello@burrabristol.co.uk" style={{ color: "var(--caramel)" }}>
              hello@burrabristol.co.uk
            </a>. We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>8. Cookies</h2>
          <p>
            This website uses only essential cookies required for it to function (e.g. your shopping cart). We do not use tracking or
            advertising cookies. If we add analytics in future, we will update this policy and request your consent.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>9. Complaints</h2>
          <p>
            If you are unhappy with how we handle your data, you can complain to the UK&apos;s Information Commissioner&apos;s Office (ICO)
            at ico.org.uk or by calling 0303 123 1113.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>10. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Any material changes will be posted on this page with a revised &ldquo;last updated&rdquo; date.
            Continued use of the site after changes constitutes acceptance of the updated policy.
          </p>
        </section>

      </div>
    </div>
  );
}
