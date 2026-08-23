"use client";

import { useId, useState, type FormEvent } from "react";
import { GlassSurface } from "@/components/ui/glass-surface";
import { CONTACT_EMAIL } from "@/features/home/constants/data";

const FIELD_CLASS =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-white placeholder-white/25 transition-colors focus:border-brand focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Role opportunity — from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, "_blank");

    setStatus("Opening your email client with the message pre-filled…");
    form.reset();
  };

  return (
    <GlassSurface level={2} className="p-5">
      <h3 className="t-h3 mb-4 text-white">Reach out</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div>
          <label htmlFor={nameId} className="t-meta mb-1.5 block text-white/45">
            Name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={FIELD_CLASS}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor={emailId} className="t-meta mb-1.5 block text-white/45">
            Email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD_CLASS}
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label htmlFor={messageId} className="t-meta mb-1.5 block text-white/45">
            Message
          </label>
          <textarea
            id={messageId}
            name="message"
            required
            rows={4}
            className={`${FIELD_CLASS} resize-none`}
            placeholder="Team, stack, timeline…"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-brand py-2.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-brand-dark"
        >
          Send message
        </button>
        <p role="status" aria-live="polite" className="t-meta min-h-[1rem] text-white/45">
          {status}
        </p>
      </form>
    </GlassSurface>
  );
}
