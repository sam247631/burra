import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const subjectLabels: Record<string, string> = {
  general: "General enquiry",
  private: "Private hire",
  press: "Press / media",
  partnership: "Partnership",
  events: "Events",
  shop: "Shop / orders",
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const isPrivateHire = !!body.eventType || body.type === "private-hire";

  try {
    if (isPrivateHire) {
      const { phone, date, guests, eventType } = body;

      await resend.emails.send({
        from: "Burra Website <noreply@burrabristol.co.uk>",
        to: "hello@burrabristol.co.uk",
        replyTo: email,
        subject: `Private Hire Enquiry — ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #f7f3ee; color: #4a2c1c;">
            <h2 style="margin: 0 0 20px;">New Private Hire Enquiry</h2>
            <table style="width:100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; opacity:0.5; width:120px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; opacity:0.5;">Email</td><td style="padding:8px 0;">${email}</td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; opacity:0.5;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>` : ""}
              ${date ? `<tr><td style="padding: 8px 0; opacity:0.5;">Date</td><td style="padding:8px 0;">${date}</td></tr>` : ""}
              ${guests ? `<tr><td style="padding: 8px 0; opacity:0.5;">Guests</td><td style="padding:8px 0;">${guests}</td></tr>` : ""}
              ${eventType ? `<tr><td style="padding: 8px 0; opacity:0.5;">Event type</td><td style="padding:8px 0;">${eventType}</td></tr>` : ""}
            </table>
            <div style="margin-top:20px; padding-top:20px; border-top:1px solid rgba(74,44,28,0.15);">
              <p style="opacity:0.5; font-size:13px; margin:0 0 8px;">Message</p>
              <p style="font-size:14px; line-height:1.6; margin:0;">${message.replace(/\n/g, "<br/>")}</p>
            </div>
          </div>
        `,
      });

      await resend.emails.send({
        from: "Burra Bristol <hello@burrabristol.co.uk>",
        to: email,
        subject: "We've received your private hire enquiry",
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #f7f3ee; color: #4a2c1c;">
            <h1 style="font-size: 26px; margin: 0 0 12px;">Thanks for getting in touch, ${name}.</h1>
            <p style="font-size: 15px; line-height: 1.65; opacity: 0.75; margin: 0 0 20px;">
              We've received your private hire enquiry and will be in touch within 2 working days to discuss your event.
            </p>
            <p style="font-size: 14px; opacity: 0.55;">
              In the meantime, feel free to browse our <a href="https://burrabristol.co.uk/events" style="color:#b8732a;">upcoming events</a> for inspiration.<br/><br/>
              Warm regards,<br/>The Burra team
            </p>
          </div>
        `,
      });
    } else {
      const { subject } = body;
      const subjectLabel = subjectLabels[subject] ?? subject ?? "General enquiry";

      await resend.emails.send({
        from: "Burra Website <noreply@burrabristol.co.uk>",
        to: "hello@burrabristol.co.uk",
        replyTo: email,
        subject: `Website Enquiry [${subjectLabel}] — ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #f7f3ee; color: #4a2c1c;">
            <h2 style="margin: 0 0 20px;">New Website Enquiry</h2>
            <table style="width:100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; opacity:0.5; width:120px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; opacity:0.5;">Email</td><td style="padding:8px 0;">${email}</td></tr>
              <tr><td style="padding: 8px 0; opacity:0.5;">Subject</td><td style="padding:8px 0;">${subjectLabel}</td></tr>
            </table>
            <div style="margin-top:20px; padding-top:20px; border-top:1px solid rgba(74,44,28,0.15);">
              <p style="opacity:0.5; font-size:13px; margin:0 0 8px;">Message</p>
              <p style="font-size:14px; line-height:1.6; margin:0;">${message.replace(/\n/g, "<br/>")}</p>
            </div>
          </div>
        `,
      });

      await resend.emails.send({
        from: "Burra Bristol <hello@burrabristol.co.uk>",
        to: email,
        subject: "Thanks for your message — Burra Bristol",
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #f7f3ee; color: #4a2c1c;">
            <h1 style="font-size: 26px; margin: 0 0 12px;">Thanks for getting in touch, ${name}.</h1>
            <p style="font-size: 15px; line-height: 1.65; opacity: 0.75; margin: 0 0 24px;">
              We've received your message and will get back to you within 24 hours.
            </p>
            <div style="background: rgba(74,44,28,0.06); border-radius: 12px; padding: 20px 24px; margin-bottom: 24px;">
              <p style="font-size: 14px; font-weight: bold; margin: 0 0 8px; color: #4a2c1c;">A couple of quick things:</p>
              <p style="font-size: 14px; line-height: 1.65; margin: 0 0 10px; opacity: 0.75;">
                <strong>Looking for a job?</strong> All of our vacancies are listed on <a href="https://www.indeed.co.uk/cmp/Burra-Bristol" style="color:#b8732a;">Indeed</a> — keep an eye on there for the latest opportunities.
              </p>
              <p style="font-size: 14px; line-height: 1.65; margin: 0; opacity: 0.75;">
                <strong>Want to visit?</strong> We're walk-ins only — no reservations needed. Just come in.
              </p>
            </div>
            <p style="font-size: 14px; opacity: 0.55;">
              Warm regards,<br/>The Burra team
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
