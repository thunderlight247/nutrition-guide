"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type FormFields = {
  fullName: string;
  phone: string;
  email: string;
  message: string;
  website: string;
};

type FieldErrors = Partial<Record<keyof FormFields, string>>;

const initialFields: FormFields = {
  fullName: "",
  phone: "",
  email: "",
  message: "",
  website: "",
};

const inputClassName =
  "mt-2 block w-full rounded-lg border border-cocoa/15 bg-ivory px-4 py-3 text-[15px] text-cocoa placeholder:text-stone/80 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20";

function validate(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  const digits = fields.phone.replace(/\D/g, "");
  if (!fields.phone.trim()) {
    errors.phone = "Please enter your phone or WhatsApp number.";
  } else if (digits.length < 7 || digits.length > 15) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (
    fields.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())
  ) {
    errors.email = "Please enter a valid email address, or leave this blank.";
  }

  if (!fields.message.trim()) {
    errors.message = "Please tell us what you are interested in.";
  }

  return errors;
}

export default function ContactForm() {
  const router = useRouter();
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof FormFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || result.ok !== true) {
        setFormError(
          result.error ?? "Your message could not be sent. Please try again.",
        );
        return;
      }

      router.push("/contact-success");
    } catch {
      setFormError(
        "We could not connect to send your message. Please try again or contact us on WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-6 space-y-5" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-full-name" className="text-sm font-medium text-cocoa">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-full-name"
            name="fullName"
            autoComplete="name"
            required
            maxLength={120}
            value={fields.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "contact-full-name-error" : undefined}
            className={inputClassName}
          />
          {errors.fullName && (
            <p id="contact-full-name-error" className="mt-1.5 text-sm text-clay" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="text-sm font-medium text-cocoa">
            Phone / WhatsApp number <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={30}
            value={fields.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={inputClassName}
          />
          {errors.phone && (
            <p id="contact-phone-error" className="mt-1.5 text-sm text-clay" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-cocoa">
          Email address <span className="font-normal text-stone">(optional)</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          value={fields.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputClassName}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1.5 text-sm text-clay" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-cocoa">
          Message / What you are interested in <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={inputClassName}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-sm text-clay" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field blank</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      {formError && (
        <p className="rounded-lg bg-clay/10 px-4 py-3 text-sm leading-relaxed text-cocoa" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-moss px-6 py-3 text-[15px] font-medium text-ivory transition-colors hover:bg-moss-dark disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? "Sending message..." : "Send Message"}
      </button>
    </form>
  );
}