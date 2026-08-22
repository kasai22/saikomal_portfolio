"use client";

import { useId, useState, type FormEvent } from "react";
import { GlassSurface } from "@/components/ui/glass-surface";
import { CONTACT_EMAIL } from "@/features/home/constants/data";

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

    setStatus("Opening your email client with your message pre-filled…");
    form.reset();
  };

  return (
    <GlassSurface level={2} className="p-6">
      <h3 className="mb-5 text-lg font-semibold text-white">Reach Out</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor={nameId} className="mb-2 block text-sm text-white/50">
            Your Name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-brand focus:outline-none"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor={emailId} className="mb-2 block text-sm text-white/50">
            Email Address
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-brand focus:outline-none"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor={messageId} className="mb-2 block text-sm text-white/50">
            Message
          </label>
          <textarea
            id={messageId}
            name="message"
            required
            rows={4}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-brand focus:outline-none"
            placeholder="Tell me about the role — team, tech stack, timeline..."
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-dark"
        >
          Send Message
        </button>
        <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm text-white/50">
          {status}
        </p>
      </form>
    </GlassSurface>
  );
}
