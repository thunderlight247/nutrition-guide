import { business } from "@/data/business";

type ContactSubmission = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const submission = payload as ContactSubmission;

  const fullName = typeof submission.fullName === "string" ? submission.fullName.trim() : "";
  const phone = typeof submission.phone === "string" ? submission.phone.trim() : "";
  const email = typeof submission.email === "string" ? submission.email.trim() : "";
  const message = typeof submission.message === "string" ? submission.message.trim() : "";
  const website = typeof submission.website === "string" ? submission.website.trim() : "";

  if (website) {
    return Response.json({ error: "Please submit the form again." }, { status: 400 });
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (
    !fullName ||
    fullName.length > 120 ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15 ||
    !message ||
    message.length > 5000 ||
    email.length > 254 ||
    (email && !isEmail(email))
  ) {
    return Response.json(
      { error: "Please check your name, phone number, email, and message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json(
      {
        error:
          "The contact form is not configured yet. Please contact us on WhatsApp, or try again later.",
      },
      { status: 503 },
    );
  }

  const emailContent = [
    `Name: ${fullName}`,
    `Phone / WhatsApp: ${phone}`,
    `Email: ${email || "Not provided"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [business.email],
        reply_to: email || undefined,
        subject: `Website enquiry from ${fullName}`,
        text: emailContent,
      }),
    });

    if (!response.ok) {
      return Response.json(
        { error: "Your message could not be sent right now. Please try again or use WhatsApp." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "We could not send your message. Please try again or use WhatsApp." },
      { status: 502 },
    );
  }
}