import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Burra Bristol",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20" style={{ color: "var(--espresso)" }}>
      <p className="text-xs font-bold uppercase tracking-[0.4em] mb-4" style={{ color: "var(--caramel)" }}>
        Legal
      </p>
      <h1
        className="text-4xl font-bold mb-3"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Terms &amp; Conditions
      </h1>
      <p className="text-sm mb-12" style={{ color: "rgba(74,44,28,0.45)" }}>
        Last updated: September 2026
      </p>

      <div className="space-y-10 text-sm leading-relaxed" style={{ color: "rgba(74,44,28,0.75)" }}>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>1. About us</h2>
          <p>
            These terms apply to all purchases and bookings made through burrabristol.co.uk, operated by
            Burra Bristol Ltd. By placing an order or booking, you agree to these terms. Our contact email
            is{" "}
            <a href="mailto:hello@burrabristol.co.uk" style={{ color: "var(--caramel)" }}>
              hello@burrabristol.co.uk
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>2. Shop — coffee &amp; merchandise</h2>
          <h3 className="font-semibold mb-2" style={{ color: "var(--espresso)" }}>Orders</h3>
          <p className="mb-3">
            All orders are subject to availability and acceptance. We will confirm your order by email. We reserve
            the right to cancel an order if a product is out of stock or incorrectly priced, in which case a full
            refund will be issued.
          </p>
          <h3 className="font-semibold mb-2" style={{ color: "var(--espresso)" }}>Delivery</h3>
          <p className="mb-3">
            We ship to UK addresses only. Standard delivery is £5.00. We aim to dispatch within 3–5 working days.
            Delivery times are estimates and cannot be guaranteed. Tracking information will be shared where available.
          </p>
          <h3 className="font-semibold mb-2" style={{ color: "var(--espresso)" }}>Returns &amp; refunds</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Clothing</strong> — unworn items in original condition may be returned within 14 days of receipt.
              Contact us first at hello@burrabristol.co.uk. Return postage is at the customer&apos;s expense unless the
              item is faulty.
            </li>
            <li>
              <strong>Coffee</strong> — due to the perishable nature of coffee, we cannot accept returns unless the
              product is damaged or incorrectly sent.
            </li>
            <li>
              Refunds are processed to the original payment method within 5–10 working days of us receiving the return.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>3. Event bookings</h2>
          <h3 className="font-semibold mb-2" style={{ color: "var(--espresso)" }}>Tickets</h3>
          <p className="mb-3">
            Event tickets are non-transferable unless agreed with us in advance. Each ticket is for one person per session
            unless otherwise stated. You will receive a confirmation email after purchase — please bring this (printed or
            on your phone) to the event.
          </p>
          <h3 className="font-semibold mb-2" style={{ color: "var(--espresso)" }}>Cancellations by you</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>More than 14 days before the event</strong> — full refund.</li>
            <li><strong>7–14 days before the event</strong> — 50% refund or credit towards a future event.</li>
            <li><strong>Less than 7 days before the event</strong> — no refund. We may offer a credit at our discretion.</li>
            <li><strong>Latte Art Masterclasses</strong> — full refunds available up to 48 hours before the session. No refund within 48 hours due to small class sizes and ingredient preparation.</li>
          </ul>
          <h3 className="font-semibold mt-4 mb-2" style={{ color: "var(--espresso)" }}>Cancellations by us</h3>
          <p>
            In the unlikely event we need to cancel, you will be offered a full refund or the option to rebook. We are
            not liable for any additional costs you may incur (e.g. travel).
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>4. Gift vouchers</h2>
          <p className="mb-3">
            Gift vouchers are processed via Square and are subject to Square&apos;s terms. Vouchers are valid for 12 months
            from the date of purchase and can be redeemed in-café at any Burra Bristol location. Vouchers cannot be
            exchanged for cash.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>5. Pricing</h2>
          <p>
            All prices are in GBP and include VAT where applicable. We reserve the right to change prices at any time,
            but the price you pay is fixed at the time you place your order.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>6. Intellectual property</h2>
          <p>
            All content on this website — including text, images, logos and branding — is owned by or licensed to
            Burra Bristol Ltd. You may not reproduce, distribute or use any content without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>7. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Burra Bristol Ltd shall not be liable for any indirect, incidental
            or consequential loss arising from use of this website or our products and services. Our total liability
            to you shall not exceed the value of your order.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>8. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive
            jurisdiction of the courts of England and Wales.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--espresso)" }}>9. Contact</h2>
          <p>
            If you have any questions about these terms, please email us at{" "}
            <a href="mailto:hello@burrabristol.co.uk" style={{ color: "var(--caramel)" }}>
              hello@burrabristol.co.uk
            </a>.
          </p>
        </section>

      </div>
    </div>
  );
}
